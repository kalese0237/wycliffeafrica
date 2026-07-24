"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  clearSession,
  createSubmission,
  deletePortalImage,
  deleteSubmission,
  DirectusRequestError,
  getPortalUser,
  loginWithPassword,
  PortalInputError,
  requestPasswordReset,
  resetPassword,
  updateSubmission,
  uploadPortalImage,
} from "./auth";
import { parseSubmission } from "./validation";

export interface ActionState {
  error?: string;
  success?: string;
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Please enter your email and password." };

  try {
    await loginWithPassword(email, password);
  } catch (error) {
    if (error instanceof DirectusRequestError && (error.status === 400 || error.status === 401)) {
      return { error: "Sign-in failed. Check your email and password, or contact the office." };
    }
    console.error("Missionary portal login backend error", error);
    return { error: "The portal is temporarily unavailable. Please try again shortly." };
  }
  redirect("/portal");
}

export async function logoutAction(): Promise<void> {
  await clearSession();
  redirect("/portal/login");
}

export async function submitEntryAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getPortalUser();
  if (!user) redirect("/portal/login");
  if (!user.missionary) {
    return { error: "No missionary profile is linked to your account yet. Please contact the office." };
  }

  const parsed = parseSubmission(formData);
  if ("error" in parsed) return { error: parsed.error };
  const { type, title, body, sensitive } = parsed.value;

  const date = new Date().toLocaleString("en-GB", { month: "long", year: "numeric" });
  let image: string | undefined;
  try {
    image = type === "update" ? await uploadPortalImage(formData.get("image")) : undefined;
    await createSubmission({ type, title, body, sensitive, missionaryId: user.missionary.id, date, image });
  } catch (error) {
    await deletePortalImage(image).catch(() => undefined);
    if (error instanceof PortalInputError) return { error: error.message };
    console.error("Missionary portal submission error", error);
    return { error: "Your submission could not be saved. Please try again shortly." };
  }
  revalidatePath("/portal");
  return {
    success:
      type === "prayer"
        ? "Prayer request received. The office will review and publish it shortly."
        : "Field update received. The office will review and publish it shortly.",
  };
}

export async function updateEntryAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const user = await getPortalUser();
  if (!user) redirect("/portal/login");
  if (!user.missionary) return { error: "No missionary profile is linked to your account." };
  const missionaryId = user.missionary.id;
  const id = String(formData.get("id") ?? "");
  if (!id) return { error: "The draft could not be identified." };
  const parsed = parseSubmission(formData);
  if ("error" in parsed) return { error: parsed.error };

  let image: string | undefined;
  try {
    image =
      parsed.value.type === "update"
        ? await uploadPortalImage(formData.get("image"))
        : undefined;
    await updateSubmission(id, missionaryId, { ...parsed.value, ...(image ? { image } : {}) });
  } catch (error) {
    await deletePortalImage(image).catch(() => undefined);
    console.error("Missionary portal draft update error", error);
    return { error: "This draft could not be updated. It may already be under review or published." };
  }
  revalidatePath("/portal");
  return { success: "Draft updated." };
}

export async function deleteEntryAction(formData: FormData): Promise<void> {
  const user = await getPortalUser();
  if (!user) redirect("/portal/login");
  if (!user.missionary) return;
  const id = String(formData.get("id") ?? "");
  const type = formData.get("type") === "prayer" ? "prayer" : "update";
  if (id) await deleteSubmission(id, user.missionary.id, type);
  revalidatePath("/portal");
}

export async function requestPasswordResetAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  if (!email) return { error: "Please enter your email address." };
  const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";
  try {
    await requestPasswordReset(email, `${siteUrl.replace(/\/$/, "")}/portal/reset-password`);
  } catch {
    // Return the same response whether the account exists to prevent user enumeration.
  }
  return { success: "If that address has a portal account, a password-reset link is on its way." };
}

export async function resetPasswordAction(
  _prev: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const token = String(formData.get("token") ?? "");
  const password = String(formData.get("password") ?? "");
  const confirmation = String(formData.get("confirmation") ?? "");
  if (!token) return { error: "This password-reset link is invalid or has expired." };
  if (password.length < 12) return { error: "Use a password of at least 12 characters." };
  if (password !== confirmation) return { error: "The passwords do not match." };
  try {
    await resetPassword(token, password);
  } catch {
    return { error: "This password-reset link is invalid or has expired. Request a new one." };
  }
  return { success: "Password updated. You can now sign in." };
}
