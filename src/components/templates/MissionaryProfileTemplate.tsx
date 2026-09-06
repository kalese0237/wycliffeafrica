import * as React from "react";
import { PageTemplate } from "@/components/templates/PageTemplate";
import {
  FieldUpdatesIndex,
  MissionaryCardFace,
  MissionaryDossier,
  PrayerPoints,
} from "@/components/organisms/missionary";
import type {
  PublicPrayerRequestRecord,
  PublicMissionaryRecord,
  PublicNewsRecord,
} from "@/lib/directus/schema";
import { normalizeMissionaryBio } from "@/lib/missionary-bio";

export interface MissionaryProfileTemplateProps {
  missionary: PublicMissionaryRecord;
  /** Published `news` posts (category "update") authored by this missionary. */
  updates: PublicNewsRecord[];
  /** Published, non-sensitive prayer requests from this missionary. */
  prayerRequests: PublicPrayerRequestRecord[];
}

/**
 * Missionary profile — the prayer card at page scale.
 *
 * Card face (the opening: family photograph with the portrait tucked into its corner where there is
 * one, terra masthead with the portrait tipped in at the right where there is not) → the reverse (the
 * story, with the back link and the partner ask stacked beside it, sticky once the column is taller
 * than the viewport) → the prayer points you pray down → the ledger of updates. No closing CTA band —
 * the sticky partner card already carries "Support" and "Send a greeting" the whole way down the
 * page, so a second copy of the same ask at the bottom was the page repeating itself, not adding one.
 */
export function MissionaryProfileTemplate({
  missionary: m,
  updates: fieldUpdates,
  prayerRequests,
}: MissionaryProfileTemplateProps) {
  const firstName = m.name.split(" ")[0];
  const normalizedBio = normalizeMissionaryBio(m.bio);
  const bio = (normalizedBio?.trim() ? normalizedBio : m.intro)
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <PageTemplate>
      <MissionaryCardFace
        name={m.name}
        place={m.place}
        roles={m.roles}
        image={m.image}
        familyImage={m.familyImage}
        familyCaption={m.familyCaption}
      />

      <MissionaryDossier name={m.name} bio={bio} pullQuote={m.pullQuote} email={m.email} />

      <PrayerPoints firstName={firstName} requests={prayerRequests} />

      <FieldUpdatesIndex updates={fieldUpdates} authorName={m.name} />
    </PageTemplate>
  );
}
