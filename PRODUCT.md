# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Four audiences, all confirmed by the user as primary for the About-family pages:

- **Prospective African missionaries** — weighing a call, reading to decide whether Wycliffe Africa is theologically sound and worth joining. Next step: the preliminary questionnaire / application process.
- **Pastors and church leaders** — vetting the agency before endorsing it to a congregation or entering partnership. They read *What We Believe* hardest. Next step: church partnership.
- **Donors and supporters** — deciding whether to trust the organisation with money. They read *Leadership* and the history for governance credibility. Next step: give / support a missionary.
- **Sending-partner organisations** — peer agencies and international Wycliffe/SIL entities assessing alignment. Next step: contact.

Secondary audiences already served elsewhere on the site: serving missionaries (portal), interns and applicants, prayer partners.

## Product Purpose

Wycliffe Africa is an African-led movement that raises, trains and sends missionaries so every language community in Africa can read Scripture in its own language. The website exists to make the work legible and joinable: explain why mother-tongue Scripture matters, introduce the people doing it, and convert conviction into an application, a partnership, a gift, or prayer.

Success for the About family specifically: a first-time reader from any of the four audiences can say what Wycliffe Africa believes, who is accountable for it, and what their own next step is.

## Positioning

African-led. The missionaries, the board, and the sending churches are African; the organisation is not a field office of a Northern agency but a movement mobilising the African church for translation on its own continent. Mother-tongue Scripture — not merely Scripture access — is the specific claim: a borrowed language keeps the gospel at arm's length.

## Operating Context

- Readers arrive from the header's **About Us** dropdown, which already lists four items — *Why Bible Translation*, *What We Believe*, *Our Core Values*, *Leadership* — all currently dead-ending on `/about`.
- Confirmed structure for this work: three new routes, `/about/why-bible-translation`, `/about/what-we-believe` (core values folded in), `/about/leadership` (board + a brief history/founders module). `/about` remains the hub.
- Many readers are on mid-range Android phones over metered mobile data across East and West Africa; page weight and image budget are real constraints.
- Vetting readers (pastors, partner agencies) read the doctrinal statement closely and may print or forward it.

## Capabilities and Constraints

- Next.js App Router + TypeScript + Tailwind v4. Design tokens are CSS custom properties in `src/app/globals.css` under `@theme`; never hardcode hex or px — use token utilities.
- Strict atomic design: `atoms / molecules / organisms / templates`; pages compose templates and organisms only.
- Directus headless CMS backs production content, the missionary portal, and file storage. Local fixtures are used only when `DIRECTUS_URL` is absent.
- Icons are `lucide-react`, monochrome only.
- Fonts: Fraunces (display), Source Sans 3 (body + UI), Gentium Book Plus (Scripture only — SIL's face for minority-language Latin diacritics), JetBrains Mono (codes and reference numbers only).
- Undecided: whether the board, history milestones, and core values become Directus collections or ship as typed local constants. Default to local constants unless the user asks for CMS editing.

## Brand Commitments

- Name and logo lockups in `public/brand/` (SVG, several colourways).
- Established visual world, treated as authority for this work: warm cream ground, terracotta "terra" primary ramp, green accent taken from the logo, Fraunces display over Source Sans 3, restrained radii, soft warm "paper lifting off a desk" shadows. Documented in `globals.css` as final brand values.
- Scripture is always set in Gentium.
- The doctrinal statement and the Wycliffe Africa beliefs list are **verbatim, non-negotiable text**. Wording may not be edited, condensed, or paraphrased. The user has directed that it be set as a creed — the page's typographic centrepiece — not buried in an accordion.

## Evidence on Hand

- Real photography: `public/photos/*` (African church and community photography), `public/Missionaries/wycliffe-africa-team.webp`, two missionary portraits, `public/Sunrise-africa/african-sunrise.webp`, `public/Internship/`.
- Real board roster, names only: Daniel Muvengi, Joyce Kule, Edwyn Kiptinness, Joseph Namutala, George Mwita, Bryan Harrison, Mary Wamey, Onesmas Muchesia, Mark Mwanzia, Jerry Faruk.
- **Absent, must not be fabricated:** board portraits, board roles/titles, board bios, founding dates, founders' names, and the history narrative. The user confirmed all of these will be supplied later. Any placeholder must be visibly marked as such and must never read as fact.
- Verbatim supplied copy: the *Why We Do Bible Translation* prose, the seven doctrinal truths, the Wycliffe Africa beliefs list, the role-of-the-church list, and the five core values.

## Product Principles

1. **Mother tongue over mere access.** Every explanation returns to the language someone prays in, not the number of Bibles distributed.
2. **African-led is shown, not asserted.** Faces, names, places and governance carry the claim; adjectives do not.
3. **Verbatim where it is doctrine.** Supplied theological text is set, never rewritten. Design serves the words.
4. **Nothing unverified ships as fact.** Missing bios, dates and photos appear as marked placeholders on a replacement list, never as invented content.
5. **Every page ends with a next step** matched to who was reading it: apply, partner, give, or contact.

## Accessibility & Inclusion

- Mid-range Android over metered data is a first-class target: image budget and layout stability matter more than motion.
- Extended-Latin diacritics and tone marks must render correctly wherever a language name or Scripture line appears — keep those on Gentium.
- The doctrinal statement must remain readable when printed or forwarded, and legible at large text sizes without layout collapse.
