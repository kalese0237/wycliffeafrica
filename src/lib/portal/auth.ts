import { cookies } from "next/headers";
import type { FieldUpdateRecord, MissionaryRecord } from "@/lib/directus/schema";

/**
 * Missionary-portal session layer, backed by Directus auth.
 * Tokens live in httpOnly cookies; all requests here run server-side only —
 * missionary names on sensitive items never reach the client.
 */

const DIRECTUS_URL = process.env.DIRECTUS_URL;

/** The portal needs a live Directus instance; without one, login is disabled. */
export const portalEnabled = Boolean(DIRECTUS_URL);

const ACCESS_COOKIE = "wa_portal_access";
const REFRESH_COOKIE = "wa_portal_refresh";

const COOKIE_BASE = {
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
    throw new Error(message);
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
    ...COOKIE_BASE,
    maxAge: Math.floor(tokens.expires / 1000),
  });
  store.set(REFRESH_COOKIE, tokens.refresh_token, {
    ...COOKIE_BASE,
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
}

/** Create a submission as the logged-in user. Always lands as a draft for review. */
export async function createSubmission(input: NewSubmission): Promise<void> {
  const token = await getAccessToken();
  if (!token) throw new Error("Your session has expired — please sign in again.");
  await directusFetch("/items/field_updates", {
    method: "POST",
    body: JSON.stringify({ ...input, status: "draft" }),
  }, token);
}
