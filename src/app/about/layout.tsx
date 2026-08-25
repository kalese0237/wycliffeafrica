/** Impeccable direction contract for the About Us family — audited against the shipped render. */
const DIRECTION_CONTRACT = `<!-- impeccable:direction b3750dfb — About Us family
  (/about/why-bible-translation, /about/what-we-believe, /about/leadership)

  THESIS: The About family is a document — preamble, confession, signatory page — not a marketing
  section. It refuses the agency-About default of a mission-statement hero over three icon tiles.

  OWN-WORLD: Warm cream ground; full-bleed African photography under a terra-900 scrim; a cream creed
  plate with hanging Roman numerals; near-square corners, 1px hairlines, 2px ink rules marking document
  divisions; Fraunces display with italic emphasis over Source Sans 3.

  STORY: A pastor, a donor, a would-be missionary and a partner agency each read to decide whether to
  trust this. They learn why mother tongue matters, exactly what is believed, and who is accountable —
  then take the next step matched to them.

  FIRST VIEWPORT: Why and Leadership open on a 600px full-bleed photograph, 76px Fraunces headline with
  an italic span, bottom-left, over a terra scrim. What We Believe refuses photography and opens on a
  dark terra masthead, because a photograph beside the creed is decoration.

  FORM: The Bound Document, candidate 3 of 7 grounded structures; seed key b3750dfb (roll ran degraded,
  no challengers). Comps approved by the user: b-why, a-believe, b-leadership.

  FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the
  verdict, and DESIGN.md
-->`;

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* The Impeccable direction contract must survive the production build, so it is emitted as a
          real HTML comment rather than a JSX comment (which the compiler strips). Scoped to the About
          family's own layout rather than the root layout, so pages outside /about don't ship it. */}
      <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
      {children}
    </>
  );
}
