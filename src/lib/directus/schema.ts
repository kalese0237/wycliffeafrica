import type { Journey } from "@/components/atoms/Tag";

export type { Journey };

/** Directus-style workflow status. Public queries only ever read `published`. */
export type PublishStatus = "draft" | "published" | "rejected" | "archived";

export type NewsCategory = "story" | "update" | "project";

/**
 * Unified content collection behind the public "News" section: staff-written
 * stories, missionary field updates, and project updates all live here,
 * distinguished by `category`. Prayer requests are deliberately not part of
 * this collection — see `FieldUpdateRecord` — since they need anonymization
 * and never get a public detail page.
 */
export interface NewsRecord {
  id: string;
  slug: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  /** Body paragraphs for the detail page. */
  body?: string[] | null;
  /** Staff byline — set for `story` and `project` posts. */
  author?: string | null;
  /** Links to the authoring missionary — set for `update` posts. */
  missionaryId?: string | null;
  place?: string | null;
  journey?: Journey | null;
  tagLabel?: string | null;
  date: string;
  image?: string | null;
  /** Missionary-submitted updates land as `draft`; an admin publishes them. */
  status: PublishStatus;
  /** Private feedback from the office; never included in public content queries. */
  reviewNotes?: string | null;
  reviewedAt?: string | null;
  reviewedBy?: string | null;
  date_created?: string | null;
  date_updated?: string | null;
}

export type PublicNewsRecord = Omit<
  NewsRecord,
  "reviewNotes" | "reviewedAt" | "reviewedBy" | "date_created" | "date_updated"
>;

export type UpdateType = "update" | "prayer";

/**
 * Prayer requests only, going forward — missionary field updates now live in
 * `NewsRecord`/`news` instead. `type` stays a union rather than narrowing to
 * `"prayer"` so historical `"update"`-tagged rows stay typeable during
 * migration.
 */
export interface FieldUpdateRecord {
  id: string;
  type: UpdateType;
  missionaryId: string;
  title: string;
  body: string;
  date: string;
  image?: string | null;
  status: PublishStatus;
  /**
   * Render anonymized on public pages (no name or portrait, region instead
   * of place) for workers in security-restricted areas.
   */
  sensitive?: boolean | null;
  /** Private feedback from the office; never included in public content queries. */
  reviewNotes?: string | null;
  reviewedAt?: string | null;
  reviewedBy?: string | null;
  date_created?: string | null;
  date_updated?: string | null;
}

export type PublicFieldUpdateRecord = Omit<
  FieldUpdateRecord,
  "reviewNotes" | "reviewedAt" | "reviewedBy" | "date_created" | "date_updated"
>;

export interface MissionaryRecord {
  id: string;
  slug: string;
  name: string;
  place: string;
  roles: string;
  intro: string;
  /** Longer profile paragraphs for the missionary profile page. */
  bio?: string[] | null;
  /** Directus user id owning this profile — links portal logins to the record. */
  user?: string | null;
  image?: string | null;
}

export type PublicMissionaryRecord = Omit<MissionaryRecord, "user">;

export type ResourceKind = "pdf" | "video" | "guide" | "report" | "audio";

export interface ResourceRecord {
  id: string;
  type: ResourceKind;
  title: string;
  meta: string;
  href: string;
}

export interface FaqRecord {
  id: string;
  question: string;
  /** May contain inline links to other pages (e.g. "involved", "questionnaire"). */
  answer: string;
}

/** Collection map matching the PID's content model — used to type the Directus client. */
export interface DirectusSchema {
  news: NewsRecord[];
  field_updates: FieldUpdateRecord[];
  missionaries: MissionaryRecord[];
  resources: ResourceRecord[];
  faqs: FaqRecord[];
}
