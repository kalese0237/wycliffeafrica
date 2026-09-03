/** Impeccable direction contract for /resources/training — audited against the shipped render. */
const DIRECTION_CONTRACT = `<!-- impeccable:direction f038b4b4 — Where to get Training (/resources/training)

  THESIS: A prospectus index, not a school-finder. It refuses the directory default of equal-sized
  logo cards in a grid: this is a short, authoritative list a reader scans for their own country and
  then leaves the site to act on.

  OWN-WORLD: Inherited from the About family — cream ground, terra masthead ruled with faint columns,
  hanging numerals, 2px terra-900 division rules over 1px hairlines, Fraunces over Source Sans 3, no
  cards and no elevation on the list.

  STORY: A prospective African missionary asks where they can train. They find their country in the
  contents, read the school and programme in the words SIL uses, click out to the institution, and
  come back to the preliminary questionnaire.

  FIRST VIEWPORT: Dark terra masthead, "Resources" ruled against "SIL Partner Schools in Africa",
  76px Fraunces headline with an italic span, standfirst beneath; the index begins immediately below
  with the sticky contents rail at the left.

  FORM: The Prospectus Index, candidate 6 of 7 grounded structures; seed key f038b4b4 (roll ran
  degraded, no challengers).

  FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the
  verdict, and DESIGN.md
-->`;

export default function TrainingLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Emitted as a real HTML comment so the contract survives the production build; JSX comments
          are stripped by the compiler. Scoped to this route rather than the root layout. */}
      <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
      {children}
    </>
  );
}
