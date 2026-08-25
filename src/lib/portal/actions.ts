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
  updateSubmission,
  uploadPortalImage,
} from "./auth";
import { parseSubmission } from "./validation";
import { supportsRichNewsFields } from "@/lib/directus/queries";

export interface ActionState {
  error?: string;
  success?: string;
  /**
   * Echoed back after a failed sign-in only. React resets an uncontrolled form
   * once its action settles, so without this the address has to be retyped on
   * every attempt. Never carries the password.
   */
  email?: string;
}

export async function loginAction(_prev: ActionState, formData: FormData): Promise<ActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  if (!email || !password) return { error: "Please enter your email and password.", email };

  try {
    await loginWithPassword(email, password);
  } catch (error) {
    if (error instanceof DirectusRequestError && (error.status === 400 || error.status === 401)) {
      return { error: "Sign-in failed. Check your email and password, or contact the office.", email };
    }
    console.error("Missionary portal login backend error", error);
    return { error: "The portal is temporarily unavailable. Please try again shortly.", email };
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
  const { type, title, body, sensitive, pullQuote, inlineImageCaption } = parsed.value;
  const richFieldsSupported = type === "update" && (await supportsRichNewsFields());

  const date = new Date().toLocaleString("en-GB", { month: "long", year: "numeric" });
  let image: string | undefined;
  let inlineImage: string | undefined;
  try {
    if (type === "update") {
      image = await uploadPortalImage(formData.get("image"));
      if (richFieldsSupported) inlineImage = await uploadPortalImage(formData.get("inlineImage"));
    }
    await createSubmission({
      type,
      title,
      body,
      sensitive,
      missionaryId: user.missionary.id,
      date,
      image,
      pullQuote: richFieldsSupported ? pullQuote : undefined,
      inlineImage: richFieldsSupported ? inlineImage : undefined,
      inlineImageCaption: richFieldsSupported ? inlineImageCaption : undefined,
    });
  } catch (error) {
    await deletePortalImage(image).catch(() => undefined);
    await deletePortalImage(inlineImage).catch(() => undefined);
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
  let inlineImage: string | undefined;
  const richFieldsSupported =
    parsed.value.type === "update" && (await supportsRichNewsFields());
  try {
    if (parsed.value.type === "update") {
      image = await uploadPortalImage(formData.get("image"));
      if (richFieldsSupported) inlineImage = await uploadPortalImage(formData.get("inlineImage"));
    }
    await updateSubmission(id, missionaryId, {
      ...parsed.value,
      richFieldsSupported,
      // A newly uploaded photo wins if both controls were selected; otherwise
      // the uploaded file would be detached immediately and left orphaned.
      removeInlineImage:
        richFieldsSupported && !inlineImage && formData.get("removeInlineImage") === "on",
      ...(image ? { image } : {}),
      ...(inlineImage ? { inlineImage } : {}),
    });
  } catch (error) {
    await deletePortalImage(image).catch(() => undefined);
    await deletePortalImage(inlineImage).catch(() => undefined);
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

