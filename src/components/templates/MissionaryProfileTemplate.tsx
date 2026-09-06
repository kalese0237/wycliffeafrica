import * as React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { PageTemplate } from "@/components/templates/PageTemplate";
import { AboutCTA } from "@/components/organisms/about";
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
 * Card face (the opening: family photograph where there is one, terra masthead with a tipped-in
 * portrait where there is not) → the reverse (fact rail, then the story) → the prayer points you
 * pray down → the ledger of updates → the response slip. The previous layout's sticky support rail
 * is gone: the ask now closes the page, where a supporter arrives at it having read the reason for
 * it, rather than being asked for money beside the first paragraph.
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
  const hasFamilyPhoto = Boolean(m.familyImage);

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

      <div className="mx-auto max-w-(--container-max) px-5 py-6 sm:px-12 sm:py-7">
        <Link
          href="/missionaries"
          className="inline-flex items-center gap-1.5 font-ui text-sm font-semibold text-link underline-offset-4 hover:underline"
        >
          <ArrowLeft size={15} aria-hidden /> All missionaries
        </Link>
      </div>

      <MissionaryDossier
        name={m.name}
        place={m.place}
        bio={bio}
        portrait={m.image}
        showPortrait={hasFamilyPhoto}
        email={m.email}
      />

      <PrayerPoints firstName={firstName} requests={prayerRequests} />

      <FieldUpdatesIndex updates={fieldUpdates} authorName={m.name} />

      <div className="pt-16 sm:pt-20">
        <AboutCTA
          flush
          flat
          title={`Stand with ${firstName}`}
          body="Missionaries serve on the monthly support and the prayers of partners. A gift here goes to this ministry; a greeting reaches them on the field."
          primary={{ label: `Support ${firstName}`, href: "/give" }}
          secondary={{ label: "Send a greeting", href: "/contact" }}
        />
      </div>
    </PageTemplate>
  );
}
