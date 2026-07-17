"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  clearSession,
  createSubmission,
  getPortalUser,
  loginWithPassword,
  portalEnabled,
} from "./auth";

export interface ActionState {
  error?: string;
  success?: string;
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  if (!portalEnabled) {
    return { error: "The portal backend is not connected yet. Please contact the office." };
  }
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Please enter your email and password." };

  try {
    await loginWithPassword(email, password);
  } catch {
    return { error: "Sign-in failed. Check your email and password, or contact the office." };
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

  const type = formData.get("type") === "prayer" ? "prayer" : "update";
  const title = String(formData.get("title") ?? "").trim();
  const body = String(formData.get("body") ?? "").trim();
  const sensitive = type === "prayer" && formData.get("sensitive") === "on";
  if (!title || !body) return { error: "Please give your submission a title and a message." };

  const date = new Date().toLocaleString("en-GB", { month: "long", year: "numeric" });
  try {
    await createSubmission({ type, title, body, sensitive, missionaryId: user.missionary.id, date });
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Submission failed — please try again." };
  }
  revalidatePath("/portal");
  return {
    success:
      type === "prayer"
        ? "Prayer request received. The office will review and publish it shortly."
        : "Field update received. The office will review and publish it shortly.",
  };
}
