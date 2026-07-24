# TODO

## Verify: Next.js image-optimizer caching for the `/media/[id]` Directus proxy

`src/app/media/[id]/route.ts` sets `Cache-Control: private, no-store` on the raw
asset response — intentional, since it re-checks publish/sensitivity
authorization on every request.

Unconfirmed: whether Next's built-in image optimizer still caches its own
transcoded AVIF/WebP output independently (via `images.minimumCacheTTL`), or
whether the upstream's `no-store` also suppresses caching of the optimized
result. If it's the latter, every request for a missionary/news/update photo
re-fetches from Directus and re-encodes via sharp on every load — a real
latency/cost concern under traffic, unlike static `public/photos/*` images
which cache aggressively.

**How to check**: in a production (or prod-like) build, request the same
`/_next/image?url=/media/<id>&w=...` URL twice and compare response
headers/timing on the second request to see if it was served from the
optimizer's cache despite the upstream's `no-store`.
