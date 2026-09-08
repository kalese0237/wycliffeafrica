/**
 * The ichthys textures used behind solid terracotta grounds.
 *
 * The fish is drawn the classical way — two arcs springing from one nose and crossing at the tail —
 * rather than as a closed outline, so it holds up at the hairline stroke widths this world uses. Both
 * patterns are stroked in `terra-100` at the same near-invisible opacities the vertical column rules
 * used, because they are texture: they must read as watermark from a metre away and never compete
 * with type set over them.
 *
 * Tiles are inline SVG data URIs rather than image files: they are a few hundred bytes, they need no
 * extra request on a metered connection, and the stroke colour stays in the token vocabulary.
 */

/** One ichthys on a 100 × 50 canvas, nose left, tail right. */
const FISH_PATHS = '<path d="M4 25 C 26 2, 62 6, 92 38"/><path d="M4 25 C 26 48, 62 44, 92 12"/>';

interface FishOptions {
  x: number;
  y: number;
  scale: number;
  opacity: number;
  strokeWidth: number;
  /** Mirrors the fish so it swims the other way. */
  flip?: boolean;
}

function fish({ x, y, scale, opacity, strokeWidth, flip = false }: FishOptions) {
  const transform = `translate(${x} ${y}) scale(${flip ? -scale : scale} ${scale})`;
  return `<g transform="${transform}" fill="none" stroke="rgba(243,217,196,${opacity})" stroke-width="${strokeWidth}" stroke-linecap="round">${FISH_PATHS}</g>`;
}

function tile(width: number, height: number, inner: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">${inner}</svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

/**
 * Large and sparse, alternating direction — for the full-width mastheads, where there is room for the
 * symbol to be read as a symbol rather than as a grain.
 */
export const FISH_SPARSE = tile(
  300,
  230,
  fish({ x: 20, y: 40, scale: 1.05, opacity: 0.075, strokeWidth: 2.2 }) +
    fish({ x: 290, y: 160, scale: 1.05, opacity: 0.075, strokeWidth: 2.2, flip: true }),
);

/**
 * A smaller, closer shoal — for the bands and card faces that are only a few hundred pixels tall,
 * where the masthead's sparse tile would show one fish or none. No column rules: the ichthys is now
 * the only texture this world puts on solid terracotta.
 */
export const FISH_DENSE = tile(
  184,
  140,
  fish({ x: 20, y: 30, scale: 0.5, opacity: 0.12, strokeWidth: 2.8 }) +
    fish({ x: 158, y: 100, scale: 0.5, opacity: 0.12, strokeWidth: 2.8, flip: true }),
);
