---
version: 1
slug: "src-app-missionaries-slug"
primary_target: "src/app/missionaries/[slug]"
related_targets: ["src/components/organisms/missionary","src/components/templates/MissionaryProfileTemplate.tsx"]
---

## Scope

`/missionaries/[slug]` — the missionary profile page and the organisms under
`src/components/organisms/missionary/`. Visitor mode: **Persuade**.

## Audience and job

A supporter, prospective sender, or church leader who arrived from the directory or from a shared
link. Their job is to decide whether to pray for, give to, or write to this person. Success is a
gift, a greeting, or a prayer point they actually pray.

## Proof and content

The missionary's own record: portrait, optional landscape household photograph with a caption naming
who is pictured, field, ministry, bio paragraphs, published non-sensitive prayer requests, and
published `news` posts of category `update`. Everything is Directus-backed; nothing on this page is
authored by the site.

## Constraints

- Two openings, one card stock: `familyImage` present → full-bleed photographic hero; absent →
  terra-900 masthead with the portrait tipped in. The portrait never appears twice.
- `familyCaption` is optional and never invented. A family photo with no caption ships uncaptioned.
- `familyImage` and `familyCaption` must exist in Directus (`scripts/setup-missionary-portal.mjs`)
  before this page is deployed — the public field list queries them, and a missing field is a
  FORBIDDEN error on every profile, not a graceful degrade.
- Mid-range Android over metered data: the hero is the only large image; prayer points and updates
  carry no imagery at all.

## Direction and memorable moment

**The Prayer Card** (seed `deeec26c`, candidate 7 of 7). The memorable moment is the card face — the
household photograph at full bleed with the name at 76px and the caption naming each person on a
hairline, so the supporter meets a family rather than a headshot. The authored motion is the
`rule-draw` division rule on the two section heads.

## Unresolved

- No missionary in Directus has a `familyImage` yet; the photographic opening is unexercised in
  production until one is uploaded.
- Missionaries cannot upload a family photo themselves — there is no profile editor in the portal,
  so this is an admin-side upload in Directus for now.
