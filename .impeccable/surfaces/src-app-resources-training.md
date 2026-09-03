---
version: 1
slug: "src-app-resources-training"
primary_target: "src/app/resources/training"
related_targets: []
---

## Scope

`/resources/training` — "Where to get Training", the SIL partner schools in Africa. Reached from the header's Resources dropdown. Visitor mode: **Read**.

## Audience and job

Primarily a prospective African missionary asking where they can train without leaving the continent; secondarily a pastor or supporter checking that the training path is real. The job is done when the reader has found their country, opened the school's own programme page, and knows the preliminary questionnaire is the next step here.

## Direction

**The Prospectus Index** — the page as the contents pages of a printed prospectus, not a school-finder. Country divisions carry hanging Roman numerals under 2px terra-900 rules; schools are ruled entry rows, each one link out, with the destination host set as a folio at the row's end. It refuses the directory default of equal-sized logo cards in a grid: seven entries do not need filters, and the reader's real question is "is there one near me".

Inherits the About family's world wholesale (`src-app-about`): cream ground, terra masthead with faint column rules, Fraunces over Source Sans 3, hairlines, no cards, no elevation on the list. `AboutMasthead` and `AboutCTA` are reused directly (`eyebrow` on the masthead and `flush` on the CTA were added for this page).

Seed key `f038b4b4`; candidate 6 of 7 grounded structures. The roll ran degraded — no network, so no challengers and no quality-bar board.

## Memorable moment

The sticky contents rail with the terra marker sliding down it as the reader passes each country division — the page's one authored motion moment, and its wayfinding.

## Content truth

Institution names, programme titles and links are verbatim from Wycliffe Africa. Language of instruction, fees, duration, intake dates and entry requirements were **not** supplied and are deliberately absent — never infer them from the `sil.org/program/*-fr` / `-en` URLs. i-DELTA appears under both Cameroon and Uganda, so seven programmes sit at six institutions; the page counts programmes throughout.

## Unresolved

1. Whether Wycliffe Africa wants a statement about what it does and does not administer for these schools — the current note says only that admissions go to the school directly, because the stronger wording (fees, awarding qualifications) was never confirmed.
2. Whether the list should carry language of instruction once Wycliffe Africa confirms it; the row is designed with room for a third line.
3. Whether this list is CMS-backed later, or stays the typed constant in `src/content/training.ts`.
