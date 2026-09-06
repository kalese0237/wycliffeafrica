/** Impeccable direction contract for /missionaries/[slug] — audited against the shipped render. */
const DIRECTION_CONTRACT = `<!-- impeccable:direction deeec26c — Missionary profile (/missionaries/[slug])

  THESIS: The prayer card at page scale — the artifact a supporter actually keeps. It refuses the
  profile default of portrait, sticky donate rail, and a grid of update tiles: this is a card with a
  face, a reverse, and points you pray down in order.

  OWN-WORLD: Inherited from the About family — cream ground, terra-900 openings, Fraunces over
  Source Sans 3, hanging numerals, 2px terra-900 division rules over 1px hairlines, no cards and no
  elevation on a series. Elevation belongs only to the tipped-in portrait.

  STORY: A supporter or prospective sender meets the household, checks field and ministry, reads the
  story, prays down the numbered requests, sees the work in the ledger of updates, and gives or
  writes at the close.

  FIRST VIEWPORT: Where a family photograph exists, it is the card face — full-bleed under a
  four-stop terra scrim, place ruled against WYCLIFFE AFRICA, the name at 76px Fraunces with the
  surname in terra-300 italic, ministry beneath, the caption naming who is pictured on a hairline.
  Where it does not, the same type block sits on the ruled terra-900 masthead with the portrait
  tipped in at the right.

  FORM: The Prayer Card, candidate 7 of 7 grounded structures; seed key deeec26c.

  FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the
  verdict, and DESIGN.md
-->`;

export default function MissionaryProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Emitted as a real HTML comment so the contract survives the production build; JSX comments
          are stripped by the compiler. Scoped to this route rather than the root layout. */}
      <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
      {children}
    </>
  );
}
