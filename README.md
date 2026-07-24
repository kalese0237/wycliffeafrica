# Wycliffe Africa website

Content-led ministry platform for Wycliffe Africa, built from the Wycliffe
Africa design system.

## Stack

- **Next.js (App Router) + TypeScript + Tailwind CSS v4** — tokens live as CSS
  custom properties in [`src/app/globals.css`](src/app/globals.css) (`@theme`),
  ported verbatim from the design system tokens. Never hardcode a hex/px value —
  use the token utilities (`bg-primary`, `text-strong`, `tracking-caps`, ...).
- **Directus (headless CMS)** — production content, missionary authentication,
  submission review, and file storage. Pages use local fixtures only when
  `DIRECTUS_URL` is absent.
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
pnpm test
```

## Missionary portal operations

The portal uses Directus credentials only on the server. Missionary access and
refresh tokens are stored in secure, HTTP-only cookies. Missionary tokens can
read only their linked profile and submissions; all draft mutations use the
server-only `DIRECTUS_TOKEN` after the application verifies ownership.

Apply or reconcile the schema, relationships, reviewer queue, and permissions:

```bash
DIRECTUS_URL=https://your-directus.example \
DIRECTUS_ADMIN_TOKEN=... \
pnpm portal:setup
```

This also creates a **Website** role wired to the "Site (read-only)" policy that
backs `DIRECTUS_TOKEN`. Generate that token once: in the Directus admin, add a
user (or reuse a service account), set its role to **Website**, then open the
user's detail page and generate a static token. Set that value as
`DIRECTUS_TOKEN` wherever the website runs — never on operator machines.

Provision a missionary account (the generated password is displayed once):

```bash
DIRECTUS_URL=... DIRECTUS_ADMIN_TOKEN=... pnpm portal:provision -- \
  --missionary-id wanjiru \
  --email person@example.org \
  --first-name Miriam \
  --last-name Wanjiru
```

Provision an office reviewer who can use the saved Directus review queue:

```bash
DIRECTUS_URL=... DIRECTUS_ADMIN_TOKEN=... pnpm portal:provision-reviewer -- \
  --email reviewer@example.org \
  --first-name Office \
  --last-name Reviewer
```

Provisioning is composable: when the email already belongs to an administrator,
missionary, or another Directus user, the existing primary role is preserved and
the required portal policy is attached directly to that account. The same user
can therefore administer Directus, review submissions, and own a missionary
profile.

Run the live, self-cleaning authorization and upload check:

```bash
DIRECTUS_URL=... DIRECTUS_ADMIN_TOKEN=... DIRECTUS_TOKEN=... pnpm portal:verify
```

Refresh the checked-in last-known-good public content snapshot after publishing
significant CMS changes. The snapshot is used only when a new build or cold
server process cannot reach Directus:

```bash
DIRECTUS_URL=... DIRECTUS_TOKEN=... pnpm content:snapshot
```

Password recovery additionally requires Directus email delivery and
`PASSWORD_RESET_URL_ALLOW_LIST` to include
`${SITE_URL}/portal/reset-password`. Keep `DIRECTUS_ADMIN_TOKEN` on operator
machines only; it must never be added to the Next.js service.

## Status / next pass

- Fully built: Home, About Us, Give, Get Involved, Motivate your Church.
- Scaffolded with lighter content (real routes, shared template):
  Church Partnership, Resources, FAQs, Stories (+detail), Missionaries
  (+detail), Updates, Contact, Questionnaire.
- Photography is intentionally `PhotoPlaceholder` (striped gradient + caption)
  per the design system — drop in real photography at the same aspect ratios.
- Form submissions are stubbed (`preventDefault`) pending the Directus pass.
