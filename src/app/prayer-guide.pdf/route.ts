import fs from "node:fs";
import path from "node:path";
import PDFDocument from "pdfkit";
import { getMissionaries, getPrayerRequests } from "@/lib/content";
import type { PublicFieldUpdateRecord, PublicMissionaryRecord } from "@/lib/directus/schema";

export const runtime = "nodejs";
/** Regenerate at most every 14 days; readers in between get the cached PDF. */
export const revalidate = 1209600;

// ------------------------------------------------------------- brand tokens
// Mirrors the semantic colors in src/app/globals.css (@theme) so the PDF
// reads as the same brand as the website.

const INK_0 = "#030308"; // --color-strong
const INK_1 = "#23263f"; // --color-body
const INK_2 = "#565b70"; // --color-muted
const INK_3 = "#878ca0"; // --color-faint
const HAIR = "#dce0e9"; // --color-hair
const GREEN_500 = "#33b00f"; // --color-accent
const TAG_PRAY = "#4a4fa0"; // --color-tag-pray

// Fonts: self-hosted @fontsource copies of the same Google Fonts the site
// uses (Cormorant Garamond for display, Karla for body/UI — see
// src/app/layout.tsx). pdfkit needs real font files, not CSS font names.
const FONT_DIR = path.join(process.cwd(), "node_modules/@fontsource");
const font = (pkg: string, file: string) => fs.readFileSync(path.join(FONT_DIR, pkg, "files", file));

const CORMORANT_BOLD = font("cormorant-garamond", "cormorant-garamond-latin-700-normal.woff");
const CORMORANT_SEMIBOLD = font("cormorant-garamond", "cormorant-garamond-latin-600-normal.woff");
const KARLA_REGULAR = font("karla", "karla-latin-400-normal.woff");
const KARLA_MEDIUM = font("karla", "karla-latin-500-normal.woff");
const KARLA_ITALIC = font("karla", "karla-latin-400-italic.woff");

const LOGO = fs.readFileSync(path.join(process.cwd(), "public/brand/logo-wycliffe-africa.png"));
const LOGO_ASPECT = 304 / 801; // height / width, from the source PNG

// Karla/Cormorant apply an "fi" ligature by default; pdfkit's ToUnicode map
// for the merged glyph drops a character, so copy-pasted or searched text
// comes out missing letters ("fiscal" → "fscal"). Disabling ligature
// substitution keeps every glyph mapped to its own character. The @types
// declare `features` as string[] only, but pdfkit (via fontkit) also accepts
// an object of feature overrides — {liga: false} is the only form that
// actually disables a default-on feature rather than just enabling another.
const NO_LIGA = { features: { liga: false } as unknown as PDFKit.Mixins.OpenTypeFeatures[] };

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function formatDate(date: Date) {
  return `${date.getDate()} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** The region is the segment after the last comma of `place` ("Turkana, Kenya" → "Kenya"). */
function regionOf(place?: string) {
  if (!place) return "Africa";
  const parts = place.split(",");
  return parts[parts.length - 1].trim();
}

function renderPdf(
  requests: PublicFieldUpdateRecord[],
  missionaries: PublicMissionaryRecord[],
  dateLabel: string,
): Promise<Buffer> {
  const byId = new Map(missionaries.map((m) => [m.id, m]));
  const doc = new PDFDocument({
    size: "A4",
    margins: { top: 56, bottom: 56, left: 60, right: 60 },
    bufferPages: true,
    info: { Title: `Wycliffe Africa Prayer Guide — ${dateLabel}`, Author: "Wycliffe Africa" },
  });
  const chunks: Buffer[] = [];
  doc.on("data", (chunk) => chunks.push(chunk));
  const done = new Promise<Buffer>((resolve) => doc.on("end", () => resolve(Buffer.concat(chunks))));

  doc.registerFont("Cormorant-Bold", CORMORANT_BOLD);
  doc.registerFont("Cormorant-SemiBold", CORMORANT_SEMIBOLD);
  doc.registerFont("Karla", KARLA_REGULAR);
  doc.registerFont("Karla-Medium", KARLA_MEDIUM);
  doc.registerFont("Karla-Italic", KARLA_ITALIC);

  const { left, right, top, bottom } = doc.page.margins;
  const width = doc.page.width - left - right;

  // ------------------------------------------------------------- header
  const logoWidth = 150;
  const logoHeight = logoWidth * LOGO_ASPECT;
  doc.image(LOGO, left + (width - logoWidth) / 2, top, { width: logoWidth });
  doc.y = top + logoHeight + 22;

  const ruleWidth = 48;
  const ruleX = left + (width - ruleWidth) / 2;
  doc.moveTo(ruleX, doc.y).lineTo(ruleX + ruleWidth, doc.y).lineWidth(2).strokeColor(GREEN_500).stroke();
  doc.y += 18;

  doc.font("Cormorant-Bold").fontSize(30).fillColor(INK_0).text("Prayer Guide", left, doc.y, { width, align: "center", ...NO_LIGA });
  doc.moveDown(0.35);
  doc
    .font("Karla-Medium")
    .fontSize(11)
    .fillColor(INK_2)
    .text(`Edition of ${dateLabel} · updated every two weeks`, left, doc.y, { width, align: "center", ...NO_LIGA });
  doc.moveDown(0.9);

  const introWidth = 380;
  doc
    .font("Karla")
    .fontSize(10.5)
    .fillColor(INK_1)
    .text(
      "Requests shared by our missionaries and team across Africa. Some are shared anonymously " +
        "to protect workers serving in security-restricted areas.",
      left + (width - introWidth) / 2,
      doc.y,
      { width: introWidth, align: "center", lineGap: 1.5, ...NO_LIGA },
    );
  doc.moveDown(1.1);

  doc.moveTo(left, doc.y).lineTo(left + width, doc.y).lineWidth(1).strokeColor(HAIR).stroke();
  doc.moveDown(1.2);

  // -------------------------------------------------------------- entries
  if (requests.length === 0) {
    doc
      .font("Karla-Italic")
      .fontSize(11.5)
      .fillColor(INK_2)
      .text("No prayer requests are published right now.", left, doc.y, { width, ...NO_LIGA });
  }

  const textX = left + 16;
  const textWidth = width - 16;

  requests.forEach((request, index) => {
    const missionary = byId.get(request.missionaryId);
    const sensitive = Boolean(request.sensitive);
    const attribution = sensitive
      ? `A Wycliffe Africa worker · ${regionOf(missionary?.place)} · ${request.date}`
      : `${missionary?.name ?? "Wycliffe Africa"} · ${missionary?.place ?? "Africa"} · ${request.date}`;

    doc.font("Cormorant-SemiBold").fontSize(15.5);
    const titleHeight = doc.heightOfString(request.title, { width: textWidth, ...NO_LIGA });
    doc.font("Karla").fontSize(10.6);
    const bodyHeight = doc.heightOfString(request.body, { width: textWidth, lineGap: 2.2, ...NO_LIGA });
    doc.font("Karla-Italic").fontSize(9.3);
    const attrHeight = doc.heightOfString(attribution, { width: textWidth, ...NO_LIGA });
    const entryHeight = titleHeight + bodyHeight + attrHeight + 30;

    if (doc.y + entryHeight > doc.page.height - bottom) {
      doc.addPage();
      doc.y = top;
    }

    const startY = doc.y;
    doc
      .font("Cormorant-SemiBold")
      .fontSize(15.5)
      .fillColor(INK_0)
      .text(request.title, textX, doc.y, { width: textWidth, ...NO_LIGA });
    doc.y += 5;
    doc
      .font("Karla")
      .fontSize(10.6)
      .fillColor(INK_1)
      .text(request.body, textX, doc.y, { width: textWidth, lineGap: 2.2, ...NO_LIGA });
    doc.y += 6;
    doc
      .font("Karla-Italic")
      .fontSize(9.3)
      .fillColor(INK_2)
      .text(attribution, textX, doc.y, { width: textWidth, ...NO_LIGA });
    const endY = doc.y;

    doc
      .moveTo(left, startY + 2)
      .lineTo(left, Math.max(endY - 2, startY + 2))
      .lineWidth(2.5)
      .strokeColor(sensitive ? INK_3 : TAG_PRAY)
      .stroke();

    doc.y = endY + 16;
    if (index < requests.length - 1) {
      doc.moveTo(left, doc.y).lineTo(left + width, doc.y).lineWidth(1).strokeColor(HAIR).stroke();
      doc.y += 16;
    }
  });

  // --------------------------------------------------------------- footer
  const range = doc.bufferedPageRange();
  const bottomMargin = doc.page.margins.bottom;
  for (let i = 0; i < range.count; i++) {
    doc.switchToPage(range.start + i);
    // Drawing this close to the page edge sits inside the margin box, which
    // would otherwise make pdfkit auto-insert a trailing blank page.
    doc.page.margins.bottom = 0;
    doc
      .font("Karla")
      .fontSize(8.5)
      .fillColor(INK_3)
      .text("Wycliffe Africa · wycliffeafrica.org", left, doc.page.height - 36, {
        width,
        align: "left",
        lineBreak: false,
        ...NO_LIGA,
      });
    doc
      .font("Karla")
      .fontSize(8.5)
      .fillColor(INK_3)
      .text(`${i + 1} / ${range.count}`, left, doc.page.height - 36, {
        width,
        align: "right",
        lineBreak: false,
        ...NO_LIGA,
      });
    doc.page.margins.bottom = bottomMargin;
  }

  doc.end();
  return done;
}

export async function GET() {
  const [requests, missionaries] = await Promise.all([getPrayerRequests(), getMissionaries()]);
  const buffer = await renderPdf(requests, missionaries, formatDate(new Date()));

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'attachment; filename="prayer-guide.pdf"',
      "Cache-Control": "public, max-age=1209600",
    },
  });
}
