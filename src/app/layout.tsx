import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

// Local files instead of next/font/google: the latter fetches from Google's
// font CDN at compile time, which this environment cannot always reach.
// These are the same Google Fonts, vendored once into src/fonts (originally
// sourced via @fontsource) — next/font/local still runs its usual build-time
// optimization (fallback metric matching, preload) over them, so this is the
// Next.js-recommended way to self-host rather than a workaround.

/** Display voice. Variable across wght + opsz; SOFT and WONK are the axes that
 *  give Fraunces its character — see the `.wonk` utility in globals.css, which
 *  engages them only at hero sizes. */
const fraunces = localFont({
  variable: "--font-fraunces",
  display: "swap",
  src: [
    { path: "../fonts/fraunces/fraunces-latin-full-normal.woff2", weight: "100 900", style: "normal" },
    { path: "../fonts/fraunces/fraunces-latin-full-italic.woff2", weight: "100 900", style: "italic" },
  ],
});

/** Text and interface — one face for prose and UI. */
const sourceSans = localFont({
  variable: "--font-source-sans",
  display: "swap",
  src: [
    { path: "../fonts/source-sans-3/source-sans-3-latin-wght-normal.woff2", weight: "200 900", style: "normal" },
    { path: "../fonts/source-sans-3/source-sans-3-latin-wght-italic.woff2", weight: "200 900", style: "italic" },
  ],
});

/** Scripture only. SIL's Gentium carries extended-Latin diacritics used by
 *  some African orthographies that the display faces do not. */
const gentium = localFont({
  variable: "--font-gentium",
  display: "swap",
  preload: false,
  src: [
    { path: "../fonts/gentium-book-plus/gentium-book-plus-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/gentium-book-plus/gentium-book-plus-latin-400-italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/gentium-book-plus/gentium-book-plus-latin-700-normal.woff2", weight: "700", style: "normal" },
    { path: "../fonts/gentium-book-plus/gentium-book-plus-latin-700-italic.woff2", weight: "700", style: "italic" },
  ],
});

/** Codes and reference numbers only (M-Pesa paybill, transaction refs). */
const jbMono = localFont({
  variable: "--font-jbmono",
  display: "swap",
  preload: false,
  src: [
    { path: "../fonts/jetbrains-mono/jetbrains-mono-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "../fonts/jetbrains-mono/jetbrains-mono-latin-500-normal.woff2", weight: "500", style: "normal" },
  ],
});

export const metadata: Metadata = {
  title: "Wycliffe Africa | Bible translation across Africa",
  description:
    "An African-led movement raising, training and sending missionaries so that every language community in Africa can read Scripture in its own language.",
};

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
      <body className="antialiased">{children}</body>
    </html>
  );
}
