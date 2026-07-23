# securi-tee

Personal portfolio and blog for Adam Takeuchi — cybersecurity analyst.

Live at [securi-tee.com](https://securi-tee.com).

## Stack

- Next.js 14 (App Router, TypeScript)
- TinaCMS — git-backed headless CMS, content lives as MDX in this repo
- GSAP for scroll reveal, dynamically imported so it never blocks the first paint
- Vercel (deploy, security headers)
- No database, no custom auth backend — content is files, admin auth is Tina Cloud OAuth

## Project structure

```
app/
  components/       Hero, ScrollReveal, RecentWorkFeed, SiteHeader
  content/          Shared data (e.g. featured-work.tsx) pulled into components
  blog/             Blog list + dynamic post routes
  projects/         Project list + dynamic project routes
  contact/          Contact form (Formspree)
  work/             Full work archive (blog + projects on one page)
  admin/            Tina visual editor (Tina Cloud OAuth gated)
  layout.tsx        Root layout, fonts, meta, noscript fallback, footer
  page.tsx          Home page — hero, pillars, recent work, about, contact
  globals.css       All styles, single file, no CSS modules
content/
  blog/             Blog posts as .mdx
  projects/         Project writeups as .mdx
tina/
  config.js         Tina schema config (clientId, branch, token, media)
  collections/      Schema definitions: page.js, post.js, project.js
  __generated__/    Tina-generated types and client (auto, don't edit)
next.config.js      CSP, security headers, image domains, dev/prod header split
```

## Content model

Three Tina collections, all git-backed:

| Collection | Path              | Contents                                          |
|------------|-------------------|----------------------------------------------------|
| page       | content/          | Static page content (about, home)                  |
| post       | content/blog/     | Blog posts: title, date, excerpt, body (MDX)        |
| project    | content/projects/ | Project writeups: title, date, excerpt, body (MDX) |

### Adding a blog post or project

1. Go to `/admin` (Tina Cloud auth required).
2. Create a new entry in the `post` or `project` collection.
3. Tina writes a new `.mdx` file and commits it to the repo.

Or skip the CMS and add the file by hand — `content/blog/your-post-slug/index.mdx` or `content/projects/your-project-slug/index.mdx`, with frontmatter matching `tina/collections/post.js` / `project.js`.

### Featuring work on the home page

The hero's three "proof" links and the "recent work" feed both read from `app/content/featured-work.tsx`. Add or reorder entries there — no need to touch component logic.

## Security

This site has been self-audited; see the writeup linked from the home page.

**CSP** — `next.config.js` defines two policies:
- Main site (`/((?!admin).*)`): strict — no `unsafe-eval`, `object-src 'none'`, `form-action` limited to self + Formspree.
- Admin (`/admin(.*)`): relaxed for Tina's editor — `unsafe-eval`, inline styles, `connect-src` to `*.tinajs.io` / `app.tina.io`.

The negative-lookahead regex on the main-site route keeps Next.js from stacking both CSPs on admin routes (browsers enforce every CSP header they receive, so the strict policy would break the editor).

**Headers** — all routes send HSTS (2 years, includeSubDomains), `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, and a `Permissions-Policy` that disables camera/mic/geolocation.

**Admin access** — `/admin` has no app-level middleware; authentication is delegated entirely to Tina Cloud OAuth.

**Dev vs. production** — `next dev` allows `unsafe-eval` in the CSP for React Fast Refresh. Production builds drop it.

## Local development

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

Create `.env` with:

```
NEXT_PUBLIC_TINA_CLIENT_ID=<from app.tina.io>
TINA_TOKEN=<from app.tina.io>
NEXT_PUBLIC_TINA_BRANCH=<your branch, optional — falls back to the Vercel git branch, then "main">
```

### Building without Tina Cloud

```bash
pnpm build-local
```

Builds with `--local --skip-indexing --skip-cloud-checks`, useful offline or in CI without Tina Cloud access.

## Deployment

Vercel, deploying on push to `main`. The Tina Cloud branch is read from `NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF` (Vercel's git-branch env var), falling back to `main`.

## Notes

- All styles live in `app/globals.css` — no CSS modules, no Tailwind.
- The hero's text-scramble effect (`app/components/Hero.tsx`) is hand-rolled, not a library. `streamGlitch` scrambles each character through random glyphs before locking it in, and returns a cancel function so pending timeouts get cleared on unmount.
- `prefers-reduced-motion` is respected everywhere; every animation has a static fallback.
- The `<noscript>` block in `layout.tsx` forces scroll-reveal elements visible so content works without JavaScript.
