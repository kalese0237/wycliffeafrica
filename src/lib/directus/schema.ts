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

export interface FieldUpdateRecord {
  id: string;
  type: UpdateType;
  missionaryId: string;
  title: string;
  body: string;
  date: string;
  image?: string;
}

export interface MissionaryRecord {
  id: string;
  slug: string;
  name: string;
  place: string;
  roles: string;
  intro: string;
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
