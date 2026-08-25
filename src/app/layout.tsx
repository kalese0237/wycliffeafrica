import type { Metadata } from "next";
import { Fraunces, Source_Sans_3, Gentium_Book_Plus, JetBrains_Mono } from "next/font/google";
import "./globals.css";

/** Display voice. Variable across wght + opsz; SOFT and WONK are the axes that
 *  give Fraunces its character — see the `.wonk` utility in globals.css, which
 *  engages them only at hero sizes. */
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["SOFT", "WONK", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Text and interface — one face for prose and UI. */
const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Scripture only. SIL's Gentium carries the extended-Latin diacritics that
 *  African orthographies need and the display faces do not. */
const gentium = Gentium_Book_Plus({
  variable: "--font-gentium",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/** Codes and reference numbers only (M-Pesa paybill, transaction refs). */
const jbMono = JetBrains_Mono({
  variable: "--font-jbmono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Wycliffe Africa | Bible translation across Africa",
  description:
    "An African-led movement raising, training and sending missionaries so that every language community in Africa can read Scripture in its own language.",
};

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // The next/font variables must land on <html>, not <body>: the @theme
    // font tokens are declared at :root and substituted there, so a variable
    // defined only on <body> resolves to nothing and every untagged element
    // silently falls back to the Tailwind system sans.
    <html
      lang="en"
      className={`${fraunces.variable} ${sourceSans.variable} ${gentium.variable} ${jbMono.variable}`}
    >
      <body className="antialiased">
        {/* The Impeccable direction contract must survive the production build, so it is emitted as a
            real HTML comment rather than a JSX comment (which the compiler strips). */}
        <div hidden dangerouslySetInnerHTML={{ __html: DIRECTION_CONTRACT }} />
        {children}
      </body>
    </html>
  );
}
