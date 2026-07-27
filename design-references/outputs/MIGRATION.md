# Adopting this look in the Wycliffe Africa design system

You liked the sunrise pages better than what you're building. This folder turns that
look into a portable layer you can fold into your existing system rather than
rebuilding it. Three files matter:

- `wycliffe-africa.tokens.css` — the source of truth: colors, type, spacing, radius,
  shadows, gradients, all as CSS custom properties (`--wa-*`).
- `wycliffe-africa.components.css` — thin component classes (`.wa-btn`, `.wa-card`,
  `.wa-hero`, `.wa-panel`, `.wa-stats`) built only on those tokens.
- `tailwind.wycliffe.snippet.js` — the same values mapped into a Tailwind theme, so
  utility classes and CSS vars never drift apart.

## The core idea: token-first

The reason these pages feel coherent is that every color, size, and shadow comes from
one small set of values. Nothing is hardcoded twice. Get your system pointing at the
same tokens and the look follows; skip that and you're back to matching hex codes by
hand forever.

So the migration is really one move: **make the tokens your single source of truth,
then delete the old scattered values.**

## If your system is plain CSS

1. Copy `wycliffe-africa.tokens.css` into your repo (e.g. `src/styles/tokens.css`) and
   import it before everything else, so `:root` is defined first.
2. Copy `wycliffe-africa.components.css` in after it.
3. In your existing stylesheets, replace literal values with the variables:
   - swap hardcoded colors for `var(--wa-terra)`, `var(--wa-ink)`, etc.
   - swap `border-radius: 16px` for `var(--wa-radius-lg)`, and so on.
4. Delete any old color/spacing definitions that now duplicate the tokens. This is the
   step people skip, and it's the one that keeps the system consistent.

Reconcile clashes as you go: where your current palette disagrees with a token, decide
which wins and change it in one place — the token file.

## If your system uses Tailwind

1. Open `tailwind.wycliffe.snippet.js` and merge its `theme.extend` block into your
   `tailwind.config.js`. Keep your `content` globs; just fold in colors, fontFamily,
   fontSize, borderRadius, boxShadow, and backgroundImage.
2. Also import `wycliffe-africa.tokens.css` for the raw gradients and any values you
   reach for outside utility classes (the hero sun, the bullet dot, etc.).
3. Rebuild UI with the new utilities: `bg-wa-cream`, `text-wa-ink`, `bg-wa-terra`,
   `rounded-wa-xl`, `shadow-wa-panel`, `bg-wa-sunrise`, `font-serif text-hero`.
4. Retire your old theme values once nothing references them.

Keeping both the Tailwind map and the CSS var file means a designer editing tokens.css
and a developer using `bg-wa-terra` are pulling from the same numbers.

## What defines the look, in plain terms

If you only carry a few things across, carry these:

- **The sunrise gradient.** `--wa-grad-sunrise` on the hero is the signature. Cream body,
  warm hero, one deep-green accent panel for contrast. Don't add a second cool color.
- **Two typefaces, clear jobs.** Serif for headings and body (the reading voice), sans
  for eyebrows, stat numbers, buttons, and labels (the interface voice). The mix is
  most of why it reads warm rather than corporate.
- **Uppercase kicker + big heading + calm paragraph** as the repeating section rhythm.
- **Soft, low, warm-tinted shadows** (`--wa-shadow-*`), never gray drop shadows.
- **Pill buttons, generously rounded cards** (16–22px), lots of cream breathing room.

## Suggested repo layout

```
design-system/
  tokens.css                <- wycliffe-africa.tokens.css
  components.css            <- wycliffe-africa.components.css (optional if all-Tailwind)
  tailwind.config.js        <- merge in tailwind.wycliffe.snippet.js
  README.md                 <- document the tokens + a do/don't for the palette
```

## Doing it in place

I couldn't mount your repo directly because it lives on a WSL/UNC path
(`\\wsl.localhost\...`), which can't be attached here. Two options if you'd rather I
edit it for you instead of you merging by hand:

- Copy or clone the repo into a Windows-native folder (somewhere under `C:\Users\...`)
  and point me at that path, or
- Push it to a Git remote and share access.

Either way, hand me the current tokens/config and I'll reconcile them against this layer
file by file, so you keep your structure and naming and only the values change.
