import type { Journey } from "@/lib/content-types";

export type { Journey };

/** Directus-style workflow status. Public queries only ever read `published`. */
export type PublishStatus = "draft" | "published" | "rejected" | "archived";

export type NewsCategory = "story" | "update" | "project";

/**
 * Unified content collection behind the public "News" section: staff-written
 * stories, missionary field updates, and project updates all live here,
 * distinguished by `category`. Prayer requests are deliberately not part of
 * this collection — see `PrayerRequestRecord` — since they need anonymization
 * and never get a public detail page.
 */
export interface NewsRecord {
  id: string;
  slug: string;
  category: NewsCategory;
  title: string;
  excerpt: string;
  /** Body copy for the detail page; paragraphs are separated by a blank line. */
  body?: string | null;
  /** Staff byline — set for `story` and `project` posts. */
  author?: string | null;
  /** Links to the authoring missionary — set for `update` posts. */
  missionaryId?: string | null;
  place?: string | null;
  journey?: Journey | null;
  tagLabel?: string | null;
  date: string;
  image?: string | null;
  /** Optional highlighted quote drawn from the body, shown between paragraphs. */
  pullQuote?: string | null;
  /** Optional second image placed within the article body (Directus file id). */
  inlineImage?: string | null;
  /** One-line caption for the inline image. */
  inlineImageCaption?: string | null;
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
export interface PrayerRequestRecord {
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

export type PublicPrayerRequestRecord = Omit<
  PrayerRequestRecord,
  "reviewNotes" | "reviewedAt" | "reviewedBy" | "date_created" | "date_updated"
>;

export interface MissionaryRecord {
  id: string;
  slug: string;
  /** New profiles land as `draft`; an admin publishes them once the office fills them in. */
  status: PublishStatus;
  name: string;
  place: string;
  roles: string;
  intro: string;
  /** Longer profile prose for the missionary profile page — paragraphs separated by a blank line. */
  bio?: string | null;
  /** Directus user id owning this profile — links portal logins to the record. */
  user?: string | null;
  /**
   * Public contact address — not a stored column, but the linked portal account's login email
   * (`user.email`), joined in at query time. Missionaries without a portal account have none, so
   * callers fall back to the general contact page rather than assuming every profile has one.
   */
  email?: string | null;
  /** Portrait, 4:5. The face on the prayer card. */
  image?: string | null;
  /**
   * Optional landscape photograph of the whole household. Many of our workers
   * serve as couples or families, and a portrait alone under-represents who
   * the supporter is actually praying for. When present it becomes the
   * profile's opening; when absent the profile opens on the terra masthead.
   */
  familyImage?: string | null;
  /** Names the people in `familyImage`, e.g. "Samuel and Grace with Akiru and Ekitela". */
  familyCaption?: string | null;
  /** A sentence already present in `bio`, set apart as a pull-quote after the opening paragraph. */
  pullQuote?: string | null;
}

export type PublicMissionaryRecord = Omit<MissionaryRecord, "user">;

/**
 * A person in the year-long Internship Program (see
 * src/app/projects/internship-program) — not yet a commissioned missionary,
 * so kept as its own collection rather than a `missionaries` row. Presented
 * on its own /interns section with a lighter profile page (no field updates
 * or prayer requests, since interns don't hold portal accounts).
 */
export interface InternRecord {
  id: string;
  slug: string;
  name: string;
  place: string;
  roles: string;
  intro: string;
  /** Longer profile paragraphs for the intern profile page. */
  bio?: string[] | null;
  image?: string | null;
  /** Phone number or other direct contact shown on the profile. */
  contact?: string | null;
  /** Monthly support goal, e.g. "$75/month". */
  monthlyGoal?: string | null;
  /** Payment channels for direct giving (mobile money, bank account, paybill). */
  giveDetails?: string[] | null;
}

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
  prayer_requests: PrayerRequestRecord[];
  missionaries: MissionaryRecord[];
  interns: InternRecord[];
  resources: ResourceRecord[];
  faqs: FaqRecord[];
}
