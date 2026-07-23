import { cookies } from "next/headers";
import type { FieldUpdateRecord, MissionaryRecord } from "@/lib/directus/schema";
import { submissionImageValue } from "./validation";

/**
 * Missionary-portal session layer, backed by Directus auth.
 * Tokens live in httpOnly cookies; all requests here run server-side only —
 * missionary names on sensitive items never reach the client.
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL;
const DIRECTUS_TOKEN = process.env.DIRECTUS_TOKEN;

export const ACCESS_COOKIE = "wa_portal_access";
export const REFRESH_COOKIE = "wa_portal_refresh";

export const PORTAL_COOKIE_OPTIONS = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};

interface AuthTokens {
  access_token: string;
  refresh_token: string;
  /** Access-token lifetime in ms. */
  expires: number;
}

export class DirectusRequestError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
  }
}

async function directusFetch<T>(path: string, init: RequestInit = {}, token?: string): Promise<T> {
  if (!DIRECTUS_URL) throw new Error("DIRECTUS_URL is not configured");
  const res = await fetch(`${DIRECTUS_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...init.headers,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    const message = body?.errors?.[0]?.message ?? `Directus request failed (${res.status})`;
    throw new DirectusRequestError(message, res.status);
  }
  if (res.status === 204) return undefined as T;
  const body = await res.json();
  return body.data as T;
}

export async function loginWithPassword(email: string, password: string): Promise<void> {
  const tokens = await directusFetch<AuthTokens>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password, mode: "json" }),
  });
  const store = await cookies();
  store.set(ACCESS_COOKIE, tokens.access_token, {
    ...PORTAL_COOKIE_OPTIONS,
    maxAge: Math.floor(tokens.expires / 1000),
  });
  store.set(REFRESH_COOKIE, tokens.refresh_token, {
    ...PORTAL_COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function clearSession(): Promise<void> {
  const store = await cookies();
  const refresh = store.get(REFRESH_COOKIE)?.value;
  if (refresh) {
    await directusFetch("/auth/logout", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refresh, mode: "json" }),
    }).catch(() => undefined);
  }
  store.delete(ACCESS_COOKIE);
  store.delete(REFRESH_COOKIE);
}

async function getAccessToken(): Promise<string | null> {
  const store = await cookies();
  return store.get(ACCESS_COOKIE)?.value ?? null;
}

export interface PortalUser {
  userId: string;
  email: string;
  firstName: string;
  /** The missionary profile owned by this login, if one is linked. */
  missionary: MissionaryRecord | null;
}

/** Resolve the logged-in missionary, or null when there is no valid session. */
export async function getPortalUser(): Promise<PortalUser | null> {
  const token = await getAccessToken();
  if (!token) return null;
  try {
    const me = await directusFetch<{ id: string; email: string; first_name: string | null }>(
      "/users/me?fields=id,email,first_name",
      {},
      token,
    );
    const missionaries = await directusFetch<MissionaryRecord[]>(
      `/items/missionaries?filter[user][_eq]=${encodeURIComponent(me.id)}&limit=1`,
      {},
      token,
    );
    return {
      userId: me.id,
      email: me.email,
      firstName: me.first_name ?? me.email,
      missionary: missionaries[0] ?? null,
    };
  } catch {
    return null;
  }
}

/** All of the missionary's own submissions, drafts included, newest first. */
export async function getMySubmissions(missionaryId: string): Promise<FieldUpdateRecord[]> {
  const token = await getAccessToken();
  if (!token) return [];
  const params = new URLSearchParams({
    "filter[missionaryId][_eq]": missionaryId,
    sort: "-date_created",
  });
  return directusFetch<FieldUpdateRecord[]>(`/items/field_updates?${params}`, {}, token);
}

export interface NewSubmission {
  type: "update" | "prayer";
  title: string;
  body: string;
  sensitive: boolean;
  missionaryId: string;
  date: string;
  image?: string;
}

const ALLOWED_IMAGE_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;

export class PortalInputError extends Error {}

export async function uploadPortalImage(file: FormDataEntryValue | null): Promise<string | undefined> {
  if (!(file instanceof File) || !file.size) return undefined;
  if (!DIRECTUS_URL || !DIRECTUS_TOKEN) throw new Error("The portal service is not configured.");
  if (!ALLOWED_IMAGE_TYPES.has(file.type)) throw new PortalInputError("Use a JPG, PNG, or WebP image.");
  if (file.size > MAX_IMAGE_BYTES) throw new PortalInputError("Images must be 5 MB or smaller.");

  const form = new FormData();
  form.set("file", file);
  form.set("title", file.name.replace(/\.[^.]+$/, ""));
  const response = await fetch(`${DIRECTUS_URL}/files`, {
    method: "POST",
    headers: { Authorization: `Bearer ${DIRECTUS_TOKEN}` },
    body: form,
    cache: "no-store",
  });
  if (!response.ok) throw new Error("The image could not be uploaded.");
  const result = await response.json();
  return result.data.id as string;
}

export async function deletePortalImage(id: string | undefined): Promise<void> {
  if (!id || !DIRECTUS_TOKEN) return;
  await directusFetch(`/files/${encodeURIComponent(id)}`, { method: "DELETE" }, DIRECTUS_TOKEN);
}

/** Create a submission as the logged-in user. Always lands as a draft for review. */
export async function createSubmission(input: NewSubmission): Promise<void> {
  if (!DIRECTUS_TOKEN) throw new Error("The portal service is not configured.");
  const { image, ...content } = input;
  const safeImage = submissionImageValue(input.type, image);
  await directusFetch("/items/field_updates", {
    method: "POST",
    body: JSON.stringify({
      ...content,
      ...(safeImage ? { image: safeImage } : {}),
    }),
  }, DIRECTUS_TOKEN);
  await notifyPortalReviewers(input).catch(() => undefined);
}

async function notifyPortalReviewers(input: NewSubmission): Promise<void> {
  if (!DIRECTUS_TOKEN) return;
  const reviewers = await directusFetch<Array<{ id: string }>>(
    "/users?filter[role][name][_eq]=Portal%20Reviewer&filter[status][_eq]=active&fields=id&limit=-1",
    {},
    DIRECTUS_TOKEN,
  );
  await Promise.all(
    reviewers.map((reviewer) =>
      directusFetch("/notifications", {
        method: "POST",
        body: JSON.stringify({
          recipient: reviewer.id,
          subject: `New missionary ${input.type === "prayer" ? "prayer request" : "field update"}`,
          message: `${input.title} is ready for review.`,
          collection: "field_updates",
        }),
      }, DIRECTUS_TOKEN),
    ),
  );
}

async function getOwnSubmission(id: string, missionaryId: string, token: string) {
  const item = await directusFetch<Pick<FieldUpdateRecord, "id" | "missionaryId" | "image">>(
    `/items/field_updates/${encodeURIComponent(id)}?fields=id,missionaryId,image`,
    {},
    token,
  );
  if (item.missionaryId !== missionaryId) throw new Error("This submission does not belong to your profile.");
  return item;
}

/** Update an owned submission. Directus additionally restricts this to drafts. */
export async function updateSubmission(
  id: string,
  missionaryId: string,
  input: Pick<NewSubmission, "type" | "title" | "body" | "sensitive"> & { image?: string },
): Promise<void> {
  const token = await getAccessToken();
  if (!token) throw new Error("Your session has expired — please sign in again.");
  if (!DIRECTUS_TOKEN) throw new Error("The portal service is not configured.");
  const previous = await getOwnSubmission(id, missionaryId, token);
  const { image, ...content } = input;
  const nextImage = submissionImageValue(input.type, image);
  await directusFetch(`/items/field_updates/${encodeURIComponent(id)}`, {
    method: "PATCH",
    body: JSON.stringify({
      ...content,
      ...(nextImage !== undefined ? { image: nextImage } : {}),
      status: "draft",
    }),
  }, DIRECTUS_TOKEN);
  if (previous.image && nextImage !== undefined && nextImage !== previous.image) {
    await deletePortalImage(previous.image).catch(() => undefined);
  }
}

/** Permanently remove an owned draft. Published and reviewed entries are protected by policy. */
export async function deleteSubmission(id: string, missionaryId: string): Promise<void> {
  const token = await getAccessToken();
  if (!token) throw new Error("Your session has expired — please sign in again.");
  if (!DIRECTUS_TOKEN) throw new Error("The portal service is not configured.");
  const submission = await getOwnSubmission(id, missionaryId, token);
  await directusFetch(`/items/field_updates/${encodeURIComponent(id)}`, {
    method: "DELETE",
  }, DIRECTUS_TOKEN);
  await deletePortalImage(submission.image).catch(() => undefined);
}

export async function requestPasswordReset(email: string, resetUrl: string): Promise<void> {
  await directusFetch("/auth/password/request", {
    method: "POST",
    body: JSON.stringify({ email, reset_url: resetUrl }),
  });
}

export async function resetPassword(token: string, password: string): Promise<void> {
  await directusFetch("/auth/password/reset", {
    method: "POST",
    body: JSON.stringify({ token, password }),
  });
}
