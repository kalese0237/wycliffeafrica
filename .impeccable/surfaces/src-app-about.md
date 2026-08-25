---
version: 1
slug: "src-app-about"
primary_target: "src/app/about"
related_targets: ["src/app/about/why-bible-translation","src/app/about/what-we-believe","src/app/about/leadership"]
---

## Scope

The About Us family: `/about/why-bible-translation`, `/about/what-we-believe` (core values folded in at `#core-values`), `/about/leadership` (board + brief history). `/about` remains the hub. Visitor mode: **Read** — the visitor is here to understand something and decide whether to trust it.

## Audience and job

Four audiences, all primary (confirmed): prospective African missionaries (next step: questionnaire), pastors and church leaders vetting orthodoxy (next step: partnership), donors checking governance (next step: give), and sending-partner agencies checking alignment (next step: contact). Each page closes on the next step matched to who was reading it.

## Direction

**Preamble & Plate** (comp direction B), with the What We Believe page built from **The Bound Document** (comp direction A) at the user's explicit request.

The family reads as a document, not a marketing section: a preamble, a confession, and a signatory page. Photography carries the argument on Why and Leadership; the doctrinal page deliberately refuses photography and enters on a dark terra masthead, because a photograph beside the creed is decoration.

Approved comps (sidecars carry `"approved": true`):
- `.impeccable/mocks/pages/b-why.png`
- `.impeccable/mocks/pages/a-believe.png`
- `.impeccable/mocks/pages/b-leadership.png`

## Memorable moment

The creed plate. Seven Roman-numeraled truths set in Fraunces at 25px on the cream `paper-1` band, hanging numerals in terra, closing on a 2px terra-900 signature rule with the Wycliffe Africa name set as a signatory. It is the one region that must not be flattened into a bulleted list.

## Comp design system (what everything not shown inherits)

- **Corner language:** near-square. Cards and plates use `radius-sm`/`radius-md` at most; only pills (buttons) and monogram avatars are round. No large radii.
- **Line weights:** 1px `--color-hair` hairlines separate rows and sections; 2px `--color-ink-0` or `--color-terra-500` under a section head or above a rail signals a document division. 3px terra top-border marks a value cell.
- **Elevation:** `--shadow-sm` on cards, `--shadow-md` on lifted plates. Nothing heavier on cream. Dark grounds use a deep drop only under the creed plate.
- **Type ramp:** hero h1 76px Fraunces 400 with italic emphasis span; section h2 50px/400; card h3 23px/600; creed statement 25px Fraunces 400; body 17–18.5px Source Sans 3; micro-labels 12px caps at `tracking-caps` in terra-600.
- **Photography stance:** full-bleed, warm, African subjects, always under a terra-900 gradient scrim so white type holds. Never a floating rounded thumbnail.
- **Placeholders:** every unverified fact renders as a visible, dashed-border placeholder note in terra. Board portraits render as monogram tiles stamped "PORTRAIT PENDING". This is a designed state, not a defect.

## Constraints carried from PRODUCT.md

Verbatim doctrinal text; nothing unverified shipped as fact; mid-range Android over metered data, so the image budget is real and layout stability outranks motion.

## Unresolved

1. The "Wycliffe Africa believes" list repeats the last two doctrinal truths verbatim — building with the five unique items, awaiting the user's confirmation that the duplicates were a copy-paste slip.
2. Founding year, founders, and all history milestones read TBC. The team photo in `public/Missionaries/wycliffe-africa-team.webp` shows a "20th Anniversary" backdrop — a real date the user has not yet confirmed.
3. Board roles and biographies absent; rows are sized for a 40–70 word bio when it arrives.
4. Whether board/history/values become Directus collections or stay typed local constants. Building as local constants.

## Cited adaptations from the approved comps

Recorded at the finish review. Each is a deliberate deviation, not a fidelity miss.

1. **Buttons are `radius-md`, not pills.** The comp CSS drew the primary action as a pill, but the
   site's shared `Button` atom (`src/components/atoms/Button.tsx`) uses `rounded-md` across every
   existing route. The atom is product truth and site-wide consistency outranks the comp here; the
   comp's pill was a mock-up shorthand, not an incumbent brand fact.
2. **"The doctrine of the trinity." ships lowercase.** The comp rendered "Trinity". The text Wycliffe
   Africa supplied reads lowercase, and PRODUCT.md declares this text verbatim and non-negotiable, so
   the supplied casing wins over the comp. Flagged to the user as a query; a one-character change if
   they confirm it was a typo in their source.
3. **No kickers or eyebrows anywhere.** The comps carried them above most headings; the craft floor
   bans the device outright, and fidelity to a comp cannot authorize it. Document-division labels
   (Article One–Four, and the masthead's running head) are retained — there the sequence is
   information the reader needs.
4. **The What We Believe CTA is Direction B's photographic band**, harmonised so all three pages close
   identically, with "Our leadership" leading per the comp's action hierarchy.
