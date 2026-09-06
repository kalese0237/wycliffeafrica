---
name: Wycliffe Africa
description: A printed-document world on warm cream — terra mastheads, hanging numerals, ruled lists, and no cards where a list will do.
colors:
  cream: "#fdfbf8"
  paper-0: "#ffffff"
  paper-1: "#fdf7ec"
  paper-2: "#f3e9d6"
  paper-3: "#e3ddd6"
  ink-0: "#17140f"
  ink-1: "#3a332b"
  ink-2: "#514940"
  ink-3: "#9e8470"
  terra-900: "#2a140a"
  terra-800: "#42200e"
  terra-700: "#8c3313"
  terra-600: "#a23d16"
  terra-500: "#b5471b"
  terra-300: "#d98a5c"
  terra-100: "#f3d9c4"
  terra-050: "#fbeee3"
  green-900: "#001e09"
  green-700: "#1e7d08"
  green-600: "#269a0b"
  green-500: "#33b00f"
  green-400: "#5cc23f"
  green-300: "#8dd674"
  green-200: "#c1e8b3"
  green-100: "#e6f5de"
  tag-give: "#1e7d08"
  tag-serve: "#1f2350"
  tag-churches: "#0f6f7d"
  tag-pray: "#4a4fa0"
  tag-stories: "#b0761a"
  tag-resources: "#4f5a69"
  success: "#269a0b"
  warning: "#b0761a"
  danger: "#c2372c"
  info: "#0f6f7d"
typography:
  display:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "76px"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.015em"
    fontVariation: "'SOFT' 40, 'WONK' 1"
  headline:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "48px"
    fontWeight: 400
    lineHeight: 1.05
  title:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.2
  creed:
    fontFamily: "Fraunces, Georgia, serif"
    fontSize: "25px"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  lead:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  standfirst:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Source Sans 3, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.15em"
  scripture:
    fontFamily: "Gentium Book Plus, Georgia, serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.6
  code:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 500
    lineHeight: 1.6
rounded:
  sm: "3px"
  md: "6px"
  lg: "16px"
  xl: "22px"
  "2xl": "26px"
  pill: "999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  6: "24px"
  8: "32px"
  12: "48px"
  16: "64px"
  24: "96px"
components:
  button-primary:
    backgroundColor: "{colors.terra-500}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "10px 22px"
    typography: "{typography.label}"
  button-primary-hover:
    backgroundColor: "{colors.terra-700}"
  button-accent:
    backgroundColor: "{colors.green-700}"
    textColor: "#ffffff"
    rounded: "{rounded.md}"
    padding: "10px 22px"
  button-accent-hover:
    backgroundColor: "#155f05"
  button-secondary:
    backgroundColor: "{colors.paper-0}"
    textColor: "{colors.terra-500}"
    rounded: "{rounded.md}"
    padding: "10px 22px"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.terra-500}"
    rounded: "{rounded.md}"
    padding: "10px 22px"
  input-text:
    backgroundColor: "{colors.paper-0}"
    textColor: "#000000"
    rounded: "{rounded.md}"
    padding: "10px 14px"
  tag-journey:
    backgroundColor: "{colors.green-100}"
    textColor: "{colors.tag-give}"
    rounded: "{rounded.pill}"
    padding: "5px 13px"
  badge-status:
    backgroundColor: "{colors.terra-050}"
    textColor: "{colors.terra-500}"
    rounded: "{rounded.sm}"
    padding: "3px 9px"
  masthead-band:
    backgroundColor: "{colors.terra-900}"
    textColor: "#ffffff"
    rounded: "0"
    padding: "80px 48px"
  index-row:
    backgroundColor: "{colors.cream}"
    textColor: "{colors.ink-0}"
    rounded: "0"
    padding: "24px 0"
---

# Design System: Wycliffe Africa

## Overview

**Creative North Star: "The Bound Document"**

Wycliffe Africa reads as a printed thing that happens to be on the web: a confession, a prospectus, a roster. The ground is warm cream, the openings are dark terracotta bands, and the content beneath them is set as ruled series — hanging numerals in their own column, a 2px rule under the section head, 1px hairlines between entries — rather than as tiles. Readers arriving here are vetting: a pastor weighing doctrine, a prospective missionary weighing a school, a donor weighing governance. The document grammar is the argument that these words are owned and can be read closely, printed, forwarded.

The world is flat where it is editorial and lifted only where something is genuinely an object. Long-form surfaces (the creed, the article lists, the training index, the core values) carry no shadow and no card at all; elevation is reserved for the small collectible units — a board portrait tile, a header dropdown, an image frame. Photography is used sparingly and in two forms only: full-bleed under a heavy terra-900 scrim, or a captioned figure standing in its own column with a folio beneath it. It is never a decorative inset beside prose. Where content has not been supplied, the build ships a visibly marked placeholder rather than a plausible-looking fact; that honesty is part of the visual system, not a temporary state.

Anti-references confirmed by the build: the mission-statement-over-tiles arrangement, the directory of equal-sized logo cards, doctrine buried in an accordion.

**Key Characteristics:**
- Warm cream ground (`#fdfbf8`) under dark terracotta opening bands (`#2a140a`)
- Fraunces for everything that is read as a document; Source Sans 3 for everything that is read as interface
- Hanging Roman numerals in a fixed 44/70px (or 28/52px) column so entries share a left edge
- Two line weights only: a 2px section rule and a 1px hairline
- No cards and no elevation on editorial lists; radii are small (3-6px) where they exist at all
- Placeholders are designed, labelled and impossible to mistake for content

## Colors

A warm document palette: cream paper, terracotta as the voice of the institution, and a single green taken from the logo reserved for action and growth.

### Primary
- **Terracotta 500 / Terra** (`{colors.terra-500}`): the institutional voice. Hanging numerals, ordinal marks, links in hover, primary buttons, the contents-rail position marker. It appears as a small mark far more often than as a fill.
- **Burnt Umber / Terra 900** (`{colors.terra-900}`): every opening band and every section rule of consequence. This is the darkest ground the site uses and the only full-bleed dark on interior pages.
- **Terra 700 / 800** (`{colors.terra-700}`, `{colors.terra-800}`): hover and active states of primary, and the colour of uppercase micro-labels set on cream (`text-primary-active`).
- **Clay 300** (`{colors.terra-300}`): the italic accent word inside a masthead headline, the rubric text on dark ground, the dashed border of a placeholder, and the monogram glyph on an unsupplied portrait.
- **Terra 100 / 050** (`{colors.terra-100}`, `{colors.terra-050}`): standfirst copy on dark ground, the oversized "01" ordinals in Core Values, and the tinted top of a portrait placeholder gradient.

### Secondary
- **Logo Green 700** (`{colors.green-700}`): the action colour. Accent buttons, links in body copy, footer icon rules. It is the only green permitted on a text link.
- **Logo Green 500** (`{colors.green-500}`): the spark — the accent divider rule, the input focus glow, the progress and growth register.
- **Deep Forest / Green 900** (`{colors.green-900}`): the site footer ground, the one place the palette leaves terracotta.

### Tertiary
- **Journey tags** (`{colors.tag-give}`, `{colors.tag-serve}`, `{colors.tag-churches}`, `{colors.tag-pray}`, `{colors.tag-stories}`, `{colors.tag-resources}`): six fixed hues that colour-code the visitor paths. They appear on pill tags and nowhere else.

### Neutral
- **Cream** (`{colors.cream}`): the page ground, everywhere, always.
- **Sunk Paper** (`{colors.paper-1}`): the recessed band behind a creed, an endnote or a placeholder — the only tonal shift the editorial surfaces use.
- **Warm Paper 2 / 3** (`{colors.paper-2}`, `{colors.paper-3}`): ruled-baseline texture and the hairline colour. `paper-3` is `--color-hair`, the 1px rule of the whole site.
- **Ink 0** (`{colors.ink-0}`): headings and the 2px section rule under a section head.
- **Ink 2 / 3** (`{colors.ink-2}`, `{colors.ink-3}`): supporting prose and the faint register used for unconfirmed values. Body copy itself is set at pure `#000000` (`--color-body`) for contrast on cream.

### Named Rules
**The Terra-Above, Cream-Below Rule.** A page opens on terracotta and reads on cream. Dark ground belongs to mastheads, photographic heroes and the closing CTA band; the body of a page is never inverted mid-scroll.

**The One Green Rule.** Green is action, growth and translation progress — buttons that move a reader forward, links, the accent rule, the focus ring. Green is never a heading, a background for prose, or a decorative fill.

**The Alias Rule.** Components reference the semantic aliases (`--color-primary`, `--color-hair`, `--color-body`, `--color-sunk`), not the ramp steps, wherever an alias exists. Re-theming means repointing aliases, never hand-picking a new hex.

## Typography

**Display Font:** Fraunces (variable, with `SOFT` / `WONK` / `opsz` axes; Georgia fallback)
**Body Font:** Source Sans 3 — prose and interface are the same face
**Scripture Font:** Gentium Book Plus, for Scripture only (SIL's face, for the extended-Latin diacritics African orthographies need)
**Mono Font:** JetBrains Mono, for codes and reference numbers only (paybill numbers, transaction refs)

**Character:** A flared, slightly eccentric book serif over a plain, large-x-height humanist sans. Fraunces does the arguing; Source Sans 3 does the explaining. The scale is anchored at the ordinary 16px web body floor and does not inflate to compensate.

### Hierarchy
- **Display** (Fraunces, 400, 76px at `lg`, 1.05, `-0.015em`, `.wonk` engaged): the page H1 inside a masthead or photo hero, with its tail word set in italic. Steps down to 48px / 60px on smaller viewports.
- **Headline** (Fraunces, 400, 48px, 1.05): section heads — "The Board", "Our core values", "How Wycliffe Africa began". Set against a 2px rule.
- **Creed** (Fraunces, 400, 25px, 1.2, max 34ch): doctrinal statements only. Reading scale, not UI scale, because these are read word by word.
- **Title** (Fraunces, 400-600, 20-23px, 1.2): country divisions in the training index, board member names, core-value titles, institution names in an index row.
- **Standfirst** (Source Sans 3, 400, 20px, 1.6, max 56-60ch): the paragraph under a display headline, and the paragraph that opens a list.
- **Lead** (Source Sans 3, 400, 18px, 1.6, max 62-68ch): article statements, long-form supporting prose.
- **Body** (Source Sans 3, 400, 16px, 1.6, max 58-68ch): entry descriptions, notes, captions.
- **Label** (Source Sans 3, 600, 12px, `0.15em`, uppercase): division labels ("Article Four", "Contents", "Before you write"), the masthead rubric, the host folio at the end of an index row, and count marks. `0.2em` (`--tracking-caps-loose`) is the alternate for short labels over imagery or dark ground.
- **Coda / Rubric** (Fraunces italic, 16-18px, muted): the short gloss opposite a section head and the closing paragraph of an article series.

### Named Rules
**The Wonk-At-Hero-Only Rule.** Fraunces' `SOFT 40 / WONK 1` axes read as intent above ~40px and as noise below it. `.wonk` is permitted on H1s, on the creed title, and on a country division head; nowhere smaller.

**The Reading-Scale Rule.** Text that is weighed gets a display face at reading size (25px creed); text that is understood once gets the body face (16-18px article list). The ramp is what tells the reader which kind of text they are looking at.

**The Face-Per-Job Rule.** Gentium appears only where Scripture is quoted. JetBrains Mono appears only on codes and reference numbers. An ordinal is neither — numerals in a list are Fraunces.

## Layout

One container throughout: `--container-max` at 1200px, with `--container-wide` at 1320px for the rare full-width case and `--container-prose` at 68ch for measure. Horizontal padding is 20px on mobile and 48px from `sm` up; vertical section rhythm is 64px on mobile and 80px from `sm` up, with 96px for the recessed creed band.

Spacing is the 4px base scale (4/8/12/16/24/32/48/64/96px), which maps directly onto Tailwind's numeric utilities — there is no separate custom spacing scale.

The signature spatial move is the **two-column document grid**: a fixed narrow left column for the apparatus and a fluid right column for the content. It appears as `[210px_1fr]` with a 80px gutter for the training contents rail and endnote heading, and as `[44px_1fr]` / `[70px_1fr]` (or `[28px_1fr]` / `[52px_1fr]`) for the hanging numeral column inside a list. Below `lg` the columns stack and the narrow column becomes a stacked head. The contents rail is `position: sticky` at `top: 7rem` and only sticks at `lg`.

Grids for collectible objects are exception, not rule: the board is 2 / 3 / 5 across so ten members fill complete rows, and the history rail is 1 / 2 / 4 across. Header offsets are tokenised (`--site-topbar-height` 42px, `--site-main-header-height` 74px) and every anchor scrolls to `header-stack + 24px`.

A full-bleed photographic opening resolves differently at the two ends of the range. Below `sm` the image sits in the flow at its own aspect (16:9) with no scrim and the type block beneath it on solid terra-900; from `sm` up the same element goes absolute and the type overlays it under the scrim. It is one image element and one type block, not two components — a landscape photograph cropped to a short band loses its subject on a phone, and type over the thinnest stop of the scrim does not hold contrast at that width.

### Named Rules
**The Shared Left Edge Rule.** In any numbered series, the numeral hangs in its own fixed column so every entry title starts on the same left edge. The list scans as a series; a numeral inline with the title breaks it.

**The Scrim-Or-Solid Rule.** Type sits over a photograph only where the scrim was built for it. Where the composition cannot carry the scrim — narrow viewports, a subject that would be cropped away — the image drops into the flow and the type moves onto solid ground beneath it. Type is never set on a weakened scrim to keep one composition.

**The Measure Rule.** No prose block runs unbounded. Standfirsts cap at 50-60ch, article statements at 66ch, creed statements at 34ch, notes at 68-74ch, and display headlines at 15-18ch with `text-balance`.

## Elevation & Depth

The system is **flat where it is editorial and lifted only where something is an object**. Every long-form surface — the creed band, article lists, core values, the training index, the endnote — carries no shadow whatsoever. Depth on those surfaces is made from three things instead: tonal ground shifts (cream to `paper-1` for a recessed band), rule weight (2px above, 1px between), and the dark terra band that separates one movement of the page from the next. The sunk band can carry a section on its own: a `paper-1` ground closed top and bottom by hairlines marks the section without a heading or a 2px rule above it, the tone change doing the work a section head would otherwise do. A full-bleed sunk band centres its measure rather than pinning it left: a 66ch column against the left edge of a 1200px container leaves half the ground empty and reads as a missing second column, where the same column centred reads as the leaf of a book.

Shadows exist and are used, but only on discrete objects: a board portrait tile, an image frame, a header dropdown, a button at rest. They are warm and low — the token comment calls them "paper lifting off a desk" — and none of them is offset or hard-edged.

### Shadow Vocabulary
- **Resting** (`box-shadow: 0 1px 2px rgba(60, 35, 10, 0.07)`): buttons and small tiles at rest. Barely present; it separates the object from the paper and no more.
- **Object** (`box-shadow: 0 3px 12px rgba(60, 35, 10, 0.1)`): image frames and photo placeholders — anything that stands for a physical print.
- **Floating** (`box-shadow: 0 12px 34px rgba(60, 35, 10, 0.15)`): things that leave the flow (the header navigation dropdown) and the portrait tipped onto a terra-900 band, where the resting and object shadows have no cream left to read against.
- **Pressed** (`box-shadow: inset 0 1px 2px rgba(60, 35, 10, 0.1)`): the active state of a button.
- **Focus glow** (`box-shadow: 0 0 0 3px var(--color-spark-tint)`): input focus-within only, paired with a green border.

### Named Rules
**The No-Card List Rule.** A list of things is ruled rows on the page ground. It is never a grid of shadowed cards. This is the single most load-bearing rule in the system: the About family and the training index both exist because the card grid was refused.

**The Warm Shadow Rule.** Every shadow is cast in warm brown (`rgba(60, 35, 10, …)`), never neutral black. Shadows are diffuse and directly below; there is no offset or hard-edged shadow anywhere in this world.

## Shapes

Corners are small and restrained: 3px (`sm`) for badges and inline chips, 6px (`md`) for buttons, inputs, dropdowns and board tiles, 16px (`lg`) for image frames and photo placeholders, and full pill (999px) for journey tags and dots. The larger 22px and 26px steps exist in the token set but the shipped surfaces do not reach for them.

Editorial structure is **square**: mastheads, photo heroes, the CTA band, recessed bands, and every ruled row are unrounded, full-bleed rectangles. Rounding is a signal that something is a discrete object you could pick up.

Borders carry more of the form language than radius does. There are exactly two weights — a **1px hairline** in `paper-3` (`--color-hair`) between entries in a series, and a **2px rule** that heads a section (`ink-0` under a section head, `terra-900` under a country division or a creed signature, `terra-500` above the history rail). A third border style, **1px dashed in `terra-300`**, is reserved exclusively for the placeholder note; dashed means "not yet real" and means nothing else.

Two texture treatments recur, both `aria-hidden`: faint vertical column rules across a masthead (`repeating-linear-gradient` at 92px pitch, 9% terra-100) and horizontal ruled baselines inside a photo placeholder (26px pitch, `paper-2`).

### Named Rules
**The Two Weights Rule.** Rules are 1px or 2px. 1px separates entries; 2px heads a section. There is no third weight, and no rule is ever dotted or coloured outside the hair / ink-0 / terra-900 / terra-500 set.

**The Dashed-Means-Pending Rule.** A dashed border appears only on a `PendingNote`. Never use dashes decoratively.

## Components

### Buttons
- **Shape:** Softly cornered (6px radius), always bordered, never pill.
- **Primary:** Terracotta fill on white text, 10px/22px at `md` (7px/15px `sm`, 14px/30px `lg`), Source Sans 3 semibold, resting shadow.
- **Accent:** Green 700 fill on white — the forward action. This is what the CTA band uses for its primary.
- **Secondary:** White paper on a terra-100 border with terracotta text.
- **Ghost:** Transparent with terracotta text and no shadow; on dark ground it is overridden to a white/50 border with a white/10 hover.
- **Hover / Focus:** Background transitions only, 130ms on `cubic-bezier(0.4, 0, 0.2, 1)`. Active adds the inset pressed shadow. Focus is a 2px green-400 outline at 2px offset.

### Tags and Badges
- **Journey tag:** Full pill, tinted ground with a matching 6px colour dot and 12px uppercase bold text at `0.06em`. One of six fixed journey colours; used for audience/path labels only.
- **Badge:** 3px corner, 9px/3px padding, 12px uppercase bold. Soft (tint on tinted ground) by default, solid available. Status and counts only.

### Inputs
- **Style:** White paper, 1px hairline border, 6px corner, 10px/14px padding, body face.
- **Focus:** Border shifts to spark green and a 3px green tint ring appears (`focus-within`), 130ms.
- **Error:** Border shifts to danger red. Disabled drops opacity to 55%.

### Navigation
- **Header:** Fixed two-tier stack (42px topbar + 74px main header) with a token-driven collapse. Nav items are Source Sans 3; dropdowns are 6px-cornered white panels with a hairline border and the floating shadow, revealed on hover and focus-within over 200ms.
- **Footer:** Deep forest green ground, white/72 body text, green-300 for column headings and leading icons, a white/12 hairline above the legal strip.

### Masthead (signature)
Dark terra-900 band, faint vertical column rules behind. A head row runs an optional division label at the left, a hairline that flexes to fill the middle, and the uppercase rubric at the right. Below it, the 76px Fraunces H1 with its tail word in `terra-300` italic, then a standfirst in `terra-100`. This is the non-photographic opening; the photographic sibling is the same type block set bottom-left on a full-bleed image under a four-stop terra scrim.

The two openings are one card stock, and a single template may choose between them from the record rather than from the page: where a photograph exists it takes the ground, where it does not the masthead does, and the rubric row, the H1 with its tail word in `terra-300` italic, the standfirst and the folio are identical across both. Only the ground changes — and with it the rubric row's colour, which lifts from `terra-300` with a `terra-300/40` hairline on solid terra-900 to `terra-100` with a `terra-100/40` hairline over photography, because clay does not hold on the thinnest stop of a scrim.

**The One Card Stock Rule.** Where a surface has two openings, they differ in ground only. Same rubric row, same type block, same folio; a second opening is never a second layout.

### Closing CTA Band
- **Default:** full-bleed team photograph under a left-weighted terra scrim (97% / 90% / 78%), heading and body at the left, accent and ghost buttons at the right.
- **Flat:** solid terra-900 carrying the masthead's column-rule texture in place of the photograph. Used where the page already opened on a photograph under a scrim, so the close does not read as the opening again.

### Index Row (signature)
The unit of every ruled series: a grid of `[numeral | content]`, the numeral hanging in Fraunces terracotta, the content a title in the display face with a description beneath in the body face and — where the row links out — a lowercase host folio plus a 14px arrow at the far right. The whole row is one link with a 2px green focus outline at 4px offset. Bottom hairline; no card, no fill, no hover background. Hover underlines the title and warms the folio to terracotta.

### Placeholder (signature)
Two paired conventions for absent content. `PendingNote` is a dashed terra-300 box on sunk paper with an uppercase terracotta chip, stating in plain words what is missing. `PhotoPlaceholder` holds the exact aspect ratio of the real photograph with a ruled-baseline texture, a warm radial light, and either a Fraunces monogram in a terra ring (for a person) or an oversized italic quotation glyph. Unconfirmed values render in muted italic ("Role to be confirmed", "Year to be confirmed").

### Motion
The budget is deliberately small: **one authored motion moment per page**, plus 130-220ms state transitions on interactive elements. Durations are tokenised at 130ms / 220ms / 380ms with `cubic-bezier(0.4, 0, 0.2, 1)` standard and `(0, 0, 0.2, 1)` out. The training index adds a scroll-driven `rule-draw` that clips a division rule in from the left across `entry 10%` to `entry 60%`, and a contents-rail marker that slides on a 300ms `(0.16, 1, 0.3, 1)` curve. Both degrade to the finished state: the rule ships fully drawn and the animation is wrapped in `@supports (animation-timeline: view())` inside `prefers-reduced-motion: no-preference`.

**The Never-Hidden-Waiting Rule.** No content is hidden at rest waiting for an animation to reveal it. Every animated element is complete on first paint; motion only moves what is already there.

## Do's and Don'ts

### Do:
- **Do** open a page on a terra-900 band and read it on cream. The masthead or photo hero is the only inverted region above the closing CTA.
- **Do** set numbered series with the numeral hanging in its own column (44/70px, or 28/52px on tighter rows) so titles share a left edge.
- **Do** use exactly two rule weights: 1px `--color-hair` between entries, 2px under a section head.
- **Do** reference semantic aliases (`--color-primary`, `--color-hair`, `--color-sunk`) and the numeric spacing utilities; never hand-pick a hex or a px.
- **Do** cap every prose block by measure — 34ch creed, 50-60ch standfirst, 66-68ch article and note.
- **Do** ship a visibly marked placeholder when content is unsupplied: dashed terra border, uppercase chip, plain statement of what is missing. Nothing unverified may look like fact.
- **Do** keep motion to one authored moment per page and make it degrade to the finished state.

### Don't:
- **Don't** render a list of things as a grid of shadowed cards. Ruled rows on the page ground are the house form for a series.
- **Don't** put a shadow on an editorial surface. Shadows belong to discrete objects (portrait tiles, image frames, dropdowns, buttons), and only in the warm brown vocabulary — no offset shadows, no neutral black.
- **Don't** engage `.wonk` below ~40px, or set a heading in the body face.
- **Don't** use Gentium for anything but Scripture, or JetBrains Mono for anything but codes and reference numbers. A list ordinal is Fraunces.
- **Don't** use green as a heading colour, a prose background, or a decorative fill. Green is action, links and focus.
- **Don't** use a dashed border for anything other than a pending-content note.
- **Don't** place an image beside body prose as decoration. Photography is full-bleed under a terra scrim, or it is a captioned figure — its own column, its own aspect, a folio naming where it was made — or it is not on the page. A picture that carries no caption and names nothing is decoration.
