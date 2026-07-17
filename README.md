# Wycliffe Africa website

Content-led ministry platform for Wycliffe Africa, built from the Wycliffe
Africa design system.

## Stack

- **Next.js (App Router) + TypeScript + Tailwind CSS v4** — tokens live as CSS
  custom properties in [`src/app/globals.css`](src/app/globals.css) (`@theme`),
  ported verbatim from the design system tokens. Never hardcode a hex/px value —
  use the token utilities (`bg-primary`, `text-strong`, `tracking-caps`, ...).
- **Directus (headless CMS)** — client scaffolded in
  [`src/lib/directus/`](src/lib/directus/) but no live instance yet. Pages read
  from [`src/lib/content.ts`](src/lib/content.ts), which currently re-exports
  mock fixtures (`src/lib/mock-data.ts`) shaped identically to the Directus
  schema; swap its re-exports to `directus/queries` when an instance exists.
- **Fonts** — Cormorant Garamond (display), Karla (body/UI), JetBrains Mono
  (data), loaded via `next/font/google` in `src/app/layout.tsx`. These are
  stand-ins pending licensed binaries from Wycliffe Africa.
- **Icons** — `lucide-react`, monochrome only.

## Strict atomic design

```
src/components/
  atoms/       Button, Input, Badge, Tag, Icon, Wordmark, Divider, Avatar
  molecules/   StatItem, ProgressBar, FormField, StoryCard, ResourceCard,
               NewsletterSignup, UpdateCard, PhotoPlaceholder
  organisms/   SiteHeader, SiteFooter, DonationCTA, ImpactStats, PageHero,
               PageIntro, StickySideNav, UpdatesGrid, ContactForm,
               QuestionnaireForm, home/*, give/*
  templates/   PageTemplate
```

Pages (`src/app/*/page.tsx`) compose templates + organisms only.

## Running

Node v23 via nvm (WSL). Package manager is **pnpm** (pinned via the
`packageManager` field; native build scripts approved in `pnpm-workspace.yaml`):

```bash
pnpm install
pnpm dev     # dev server on :3000
pnpm build   # production build (26 static pages)
pnpm lint
```

## Status / next pass

- Fully built: Home, About Us, Give, Get Involved, Motivate your Church.
- Scaffolded with lighter content (real routes, shared template):
  Church Partnership, Resources, FAQs, Stories (+detail), Missionaries
  (+detail), Updates, Contact, Questionnaire.
- Photography is intentionally `PhotoPlaceholder` (striped gradient + caption)
  per the design system — drop in real photography at the same aspect ratios.
- Form submissions are stubbed (`preventDefault`) pending the Directus pass.
