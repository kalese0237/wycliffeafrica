# Security Audit — Wycliffe Africa Website

Audit date: 2026-08-18. Scope: this repository (Next.js 16 app + scripts), static
analysis and manual review only — no dynamic/pen-testing was performed against
the deployed Directus instance. Items requiring verification against the live
Railway/Directus deployment are marked accordingly.

## Critical / High

- [ ] **Upgrade Next.js off the vulnerable 16.2.10 range.** `pnpm audit` reports
  five HIGH advisories against `next@16.2.10` (patched in `16.2.11`), including
  a middleware/proxy bypass in App Router + Turbopack with a single locale, SSRF
  in Server Actions on custom servers, SSRF via attacker-controlled rewrite
  hostnames, and a Server Actions DoS. This app ships `src/proxy.ts` as its
  auth-adjacent middleware, so the proxy-bypass advisory is directly relevant.
  Run `pnpm add next@latest` (or pin to `>=16.2.11`) and re-test the portal
  login/refresh flow. Also fixes six MODERATE Next advisories (cache
  confusion, unbounded Edge Server Action payloads, image-optimization DoS via
  SVG, unauthenticated Server Function endpoint disclosure).

- [ ] **Upgrade `sharp`** — inherited libvips CVEs (CVE-2026-33327/33328/35590/35591),
  HIGH severity, patched in `sharp@0.35.0`. Confirm the resolved version used by
  Next's image optimizer.

- [ ] **Upgrade `postcss`** to `>=8.5.23` (repo currently resolves multiple older
  postcss ranges via `next` and `@tailwindcss/postcss`). Advisories include
  HIGH-severity arbitrary `.map` file disclosure / path traversal via
  attacker-controlled `sourceMappingURL`, and a MODERATE XSS via unescaped
  `</style>` in stringified output. Run `pnpm audit` again after bumping `next`
  and `@tailwindcss/postcss` since postcss is a transitive dependency of both.

- [ ] **No rate limiting on the portal login endpoint.** `loginAction`
  ([actions.ts](src/lib/portal/actions.ts)) calls Directus directly with no
  application-level throttling, lockout, or CAPTCHA. Confirm Directus's own
  `RATE_LIMITER_*` env vars are enabled on the Railway deployment; if not, an
  attacker can brute-force missionary portal credentials. This cannot be
  verified from this repo — check the Directus service config directly.
  (Self-service password reset was removed — the office now resets portal
  passwords by hand — so that endpoint is no longer in scope here.)

## Medium

- [ ] **No security response headers.** Nothing in [next.config.ts](next.config.ts)
  or [layout.tsx](src/app/layout.tsx) sets `Content-Security-Policy`,
  `Strict-Transport-Security`, `X-Frame-Options`/`frame-ancestors`, or a global
  `X-Content-Type-Options`. (The `/media/[id]` route sets `nosniff` for itself
  only.) Add these via `next.config.ts` `headers()` — at minimum HSTS,
  `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY` (or CSP
  `frame-ancestors 'none'`), and a CSP scoped to the fonts/Directus asset
  origins actually used.

- [ ] **Client-supplied `Content-Type` trusted for portal image uploads.**
  `uploadPortalImage` in [auth.ts](src/lib/portal/auth.ts#L238-L257) validates
  `file.type` against an allow-list, but that value is attacker-controlled
  (browsers/clients set it from the file's declared MIME type, not its actual
  content). A missionary account — or a stolen portal session — could upload
  an HTML/SVG file mislabeled as `image/png`. Impact depends on how Directus
  serves `/assets/:id` (the `Content-Type` returned by the `/media/[id]` proxy
  is whatever upstream Directus reports back — see
  [route.ts](src/app/media/[id]/route.ts#L112)). Verify Directus does not
  trust the browser-declared type either, or add server-side magic-byte
  sniffing before upload.

- [ ] **Refresh-token cookie is a static 7-day `maxAge`
  ([auth.ts](src/lib/portal/auth.ts#L72-L75), [proxy.ts](src/proxy.ts#L66-L72))**
  regardless of the actual Directus refresh-token TTL or any server-side
  revocation. If a missionary's device is compromised, the only way to end
  that session early is a Directus-side token revocation/password change —
  confirm that operational runbook exists (e.g. in
  `scripts/provision-missionary-portal-user.mjs --rotate-password`) and is
  known to the office staff who'll need to act on a report of a lost device.

## Low / Informational

- [ ] **Dependency audit backlog.** Besides the items above, `pnpm audit`
  reports HIGH-severity `brace-expansion` (DoS via unbounded expansion,
  dev-only via eslint/vitest tooling) and `js-yaml` (quadratic CPU on `!!omap`,
  dev-only) and `nanoid` (infinite loop on negative/zero size, via
  postcss/vite). None are reachable from production request paths since
  they're build/test tooling, but run `pnpm update` to pick up patched
  transitive versions and keep CI/build infra off vulnerable code.

- [ ] **`.claude/settings.local.json` grants broad filesystem read** (`Read(//home/kalese/.claude/**)`).
  This is local tooling config, not shipped to production, but confirm it's
  intentional and not committed to a shared repo if this project's `.claude`
  directory is ever made public.

- [ ] **`GivingForm.tsx` has no actual submit handler** (`onSubmit={(e) =>
  e.preventDefault()}` in [GivingForm.tsx](src/components/organisms/give/GivingForm.tsx#L24)) —
  functionally incomplete rather than a vulnerability today, but flag this so
  that whichever payment processor integration replaces it goes through its
  own review (PCI scope, CSRF on the real submit action, server-side amount
  validation instead of trusting the client-computed `amount`).

- [ ] **Confirm CORS policy on the Directus service.** The website's own
  server-to-server calls use a static token from `DIRECTUS_TOKEN`
  ([client.ts](src/lib/directus/client.ts), [auth.ts](src/lib/portal/auth.ts)),
  which is never exposed to the browser — good. But this repo can't see
  Directus's CORS allow-list; confirm it doesn't wildcard `Access-Control-Allow-Origin`
  for the public API, which would let any origin call the missionary/portal
  REST endpoints directly using a leaked bearer token.

## Reviewed and found sound (no action needed)

- Secrets handling: `.env.local` and `.env*` are gitignored (only
  `.env.example` is tracked, unpopulated); no hardcoded credentials, API keys,
  or private keys found anywhere in `src/`, `scripts/`, or config files.
- `DIRECTUS_ADMIN_TOKEN` is confined to one-off admin CLI scripts
  (`scripts/*.mjs`) and is explicitly documented as "never configure this on
  the website service" in `.env.example` — the running app only ever holds the
  constrained `DIRECTUS_TOKEN`.
- Auth cookies (`wa_portal_access`, `wa_portal_refresh`) are `httpOnly`,
  `sameSite: lax`, and `secure` in production
  ([auth.ts](src/lib/portal/auth.ts#L17-L22)).
- `/media/[id]` ([route.ts](src/app/media/[id]/route.ts)) validates the file ID
  against a strict UUID regex, fails closed unless the asset is proven to
  belong to published/public content, and explicitly excludes sensitive prayer
  request images — including from cross-collection lookup failures being
  misread as authorization.
- Server actions (`updateSubmission`, `deleteSubmission` in
  [auth.ts](src/lib/portal/auth.ts)) re-verify ownership (`missionaryId`) and
  status (`draft`/`rejected` only) server-side before mutating, rather than
  trusting client-supplied state.
- No `dangerouslySetInnerHTML`, `eval`, `exec`/`execSync`/`child_process`
  usage anywhere in `src/` or `scripts/`.
- No open redirects — the only dynamic `redirect()`/`NextResponse.redirect()`
  targets are hardcoded internal paths.
- Directus queries use the SDK's structured filter objects throughout
  ([queries.ts](src/lib/directus/queries.ts)), not string-concatenated
  queries — no injection surface there.
- PDF generation (`prayer-guide.pdf/route.ts`) reads only bundled font/logo
  assets from fixed paths and draws user-sourced text via pdfkit's text APIs
  (no shell-out, no template injection).

## Not verifiable from this repository — check directly against the deployed services

- [ ] Directus RBAC roles/policies actually restrict the public/`DIRECTUS_TOKEN`
  identity to read-only + the specific draft-mutation endpoints the portal
  needs (there's a `scripts/verify-portal-permissions.mjs` — re-run it against
  production and confirm a clean pass).
- [ ] Directus rate limiting (`RATE_LIMITER_ENABLED`) and CORS allow-list.
- [ ] TLS/HSTS configuration at the Railway edge in front of both the Next.js
  app and Directus.
- [ ] Whether Directus sniffs/validates uploaded file content server-side
  independent of the client-declared MIME type.
