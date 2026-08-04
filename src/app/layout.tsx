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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fraunces.variable} ${sourceSans.variable} ${gentium.variable} ${jbMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
