import type { Journey } from "@/components/atoms/Tag";

export type { Journey };

export interface StoryRecord {
  id: string;
  slug: string;
  journey: Journey;
  tagLabel: string;
  title: string;
  excerpt: string;
  /** Body paragraphs for the story detail page. */
  body?: string[];
  author: string;
  place: string;
  date: string;
  image?: string;
}

export type UpdateType = "update" | "prayer";

/** Directus-style workflow status. Public queries only ever read `published`. */
export type PublishStatus = "draft" | "published" | "archived";

export interface FieldUpdateRecord {
  id: string;
  type: UpdateType;
  missionaryId: string;
  title: string;
  body: string;
  date: string;
  image?: string;
  /** Missionary submissions land as `draft`; an admin publishes them. */
  status: PublishStatus;
  /**
   * Prayer requests only: render anonymized on public pages (no name or
   * portrait, region instead of place) for workers in security-restricted areas.
   */
  sensitive?: boolean;
}

export interface MissionaryRecord {
  id: string;
  slug: string;
  name: string;
  place: string;
  roles: string;
  intro: string;
  /** Longer profile paragraphs for the missionary profile page. */
  bio?: string[];
  /** Directus user id owning this profile — links portal logins to the record. */
  user?: string;
  image?: string;
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
  stories: StoryRecord[];
  field_updates: FieldUpdateRecord[];
  missionaries: MissionaryRecord[];
  resources: ResourceRecord[];
  faqs: FaqRecord[];
}
