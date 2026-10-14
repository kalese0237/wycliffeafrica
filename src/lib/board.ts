import type { BoardMember } from "../content/about";
import { initialsOf } from "./initials";

/** The URL fragment for a member's profile: "daniel-muvengi" opens /about/leadership#daniel-muvengi. */
export function boardSlug(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** The name as shown, with the honorific when there is one: "Dr. Daniel Muvengi". */
export function boardDisplayName({ name, honorific }: Pick<BoardMember, "name" | "honorific">): string {
  return honorific ? `${honorific} ${name}` : name;
}

/**
 * The monogram for a member without a portrait. First and last name, so "Joseph Opanda Namutala" reads
 * "JN"; `initialsOf` alone takes the first two words, which is right for couples but not here.
 */
export function boardMonogram(name: string): string {
  const words = name.split(/\s+/).filter(Boolean);
  return initialsOf(words.length > 2 ? `${words[0]} ${words[words.length - 1]}` : name);
}
