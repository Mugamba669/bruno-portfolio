# Portfolio Admin CMS — MongoDB + shadcn/ui

**Date:** 2026-06-17
**Owner:** Mugamba Bruno M.H.
**Branch:** `admin-cms` (off `main`)
**Status:** Approved design → implementation planning

## Summary

Add an authenticated `/admin` section that fully edits the portfolio's content,
backed by **MongoDB via Mongoose**, with a professional **shadcn/ui** interface.
The public page is rewired to read its content (and SEO) from the database
instead of the static `lib/data.ts`, while preserving the static-cached, SEO-rich
rendering already in place (ISR + revalidate-on-save).

## Goals

- One admin UI to edit every section of the page: profile, skills, experience,
  projects, stats, and the SEO metadata (title/description/keywords).
- MongoDB/Mongoose as the source of truth; `lib/data.ts` becomes the typed
  default **seed** so the site works before anything is saved.
- Public page stays statically cached and crawlable; edits go live within seconds
  via `revalidatePath('/')`.
- Single-admin auth (password + signed httpOnly cookie), no external auth service.
- shadcn/ui (Tailwind v4) scoped to `/admin` so it never touches the public 3D
  site's custom CSS.

## Non-Goals

- No image/media uploads (text-only editing for now).
- No multi-user accounts or roles (single admin).
- No public-facing changes to the 3D scroll-story design or interactions.
- No Server Actions for mutations — explicit Route Handlers (REST) are used.

## Environment / Platform facts

- Next.js 16.2.9 (App Router, Turbopack), React 19. `next.config.ts` has NO
  `output: 'export'` → full SSR is available (API routes, middleware, ISR).
- Deploy: Netlify via `@netlify/plugin-nextjs` (SSR runtime; supports API routes,
  middleware, ISR, and outbound DB connections).
- Package manager: **yarn** (committed `yarn.lock`; Netlify uses it). Use `yarn`
  for all installs.
- The public page currently statically prerenders and is fully crawlable; SEO
  (JSON-LD Person/WebSite, OG image, robots, sitemap, rich metadata) is already
  implemented in `app/layout.tsx`, `components/StructuredData.tsx`,
  `app/opengraph-image.tsx`, `app/robots.ts`, `app/sitemap.ts`.

## New environment variables

| Var | Purpose |
| :-- | :-- |
| `MONGODB_URI` | MongoDB connection string (MongoDB Atlas recommended for Netlify). |
| `ADMIN_PASSWORD` | The single admin password checked at login. |
| `SESSION_SECRET` | HMAC/JWT secret used to sign the session cookie (≥32 chars). |

Add a committed `.env.example` documenting these. The owner provides real values
in `.env.local` (dev) and Netlify env (prod).

## Data model

A single (singleton) `Portfolio` Mongoose document keyed by `key: "default"`,
mirroring today's `lib/data.ts` shape plus an editable `seo` block:

```
Portfolio {
  key: "default"                      // unique; one doc
  profile: {
    name, shortName, role, tagline, location,
    email, phone, github, site, summary, education
  }
  skills:     [{ group, items: [string] }]
  experience: [{ role, company, place, period, points: [string] }]
  projects:   [{ index, name, stack: [string], description,
                 link: string|null, linkLabel: string|null, accent }]
  stats:      [{ value, label }]
  seo: { title, description, keywords: [string] }
  updatedAt   // mongoose timestamps
}
```

`lib/data.ts` stays as the canonical TypeScript types + default values; it is the
seed used when the DB has no document yet. A single zod schema validates the whole
document (shared by the API and the admin forms).

## Architecture & data flow

```
                        ┌──────────────────────────────┐
   Browser (public)  ──▶│ app/page.tsx (async RSC)     │
                        │  getPortfolio() ── ISR cache  │──▶ MongoDB (Mongoose)
   generateMetadata ──▶ │ + StructuredData (RSC)        │      ▲
                        └──────────────────────────────┘      │ PUT writes
                                                              │ + revalidatePath('/')
   Browser (/admin)  ──▶ middleware (cookie gate) ──▶ admin UI (shadcn)
                                                  └─▶ /api/admin/* Route Handlers
```

- **`lib/mongoose.ts`** — cached global connection (the standard Next/serverless
  singleton pattern) so Netlify function invocations reuse one pool.
- **`lib/models/Portfolio.ts`** — Mongoose schema + model (guard against model
  recompilation on hot reload).
- **`lib/portfolio.ts`** — `getPortfolio()`: connects, reads the singleton doc,
  seeds from `lib/data.ts` defaults if missing, returns a plain typed object.
  Used by the public page, `generateMetadata`, and `StructuredData`.
- **`lib/schema.ts`** — zod schema for the full portfolio (validation for API +
  forms) + inferred TS types.

## Public page rewiring (SEO-safe)

- `app/page.tsx` becomes an async server component: `const data = await
  getPortfolio()`, passing the relevant slice to each section as **props**.
- Section components (`Hero`, `About`, `Skills`, `Experience`, `Projects`,
  `Contact`, plus `Nav`) are refactored to accept their data via props instead of
  importing `@/lib/data` directly. (They remain client components for animation.)
- `app/layout.tsx` `metadata` export becomes `generateMetadata()` reading
  `getPortfolio().seo` (+ profile) so admin SEO edits drive the real
  `<title>`/description/OG. `StructuredData` and `opengraph-image` read
  `getPortfolio()` too.
- Rendering stays statically cached. The page uses **on-demand revalidation
  only** (no time-based `revalidate`): it renders once and is served from cache
  until an admin save calls `revalidatePath('/')`, which regenerates it within
  seconds. Deterministic and free of arbitrary TTLs. Netlify's Next plugin
  supports on-demand revalidation.

## Auth

- `lib/auth.ts` — `createSession()` signs a compact JWT (via `jose`) with the
  `SESSION_SECRET`; `verifySession()` validates it. Cookie: `admin_session`,
  httpOnly, secure (prod), sameSite=lax, ~7-day expiry.
- `app/api/admin/login/route.ts` — `POST { password }`; constant-time compare to
  `ADMIN_PASSWORD`; on success set the cookie; on failure 401.
- `app/api/admin/logout/route.ts` — clears the cookie.
- `middleware.ts` — matches `/admin/:path*` (except `/admin/login`) and
  `/api/admin/:path*` (except `/api/admin/login`); redirects/401s when the cookie
  is missing/invalid.

## API (Route Handlers, zod-validated)

- `GET /api/admin/portfolio` — returns the current portfolio doc (admin-only).
- `PUT /api/admin/portfolio` — validates the body with the zod schema, upserts the
  singleton doc, calls `revalidatePath('/')`, returns the saved doc. Section-level
  saves send the full validated document (simple, race-free for one editor).

## Admin UI (shadcn/ui, route-scoped Tailwind)

- **Tailwind v4 + shadcn** installed; the Tailwind stylesheet + shadcn theme
  tokens are imported **only** in `app/admin/layout.tsx`. Because Next.js splits
  CSS per route, Tailwind's preflight loads on `/admin` routes only and never
  affects the public site's custom CSS/CSS-modules. shadcn primitives live in
  `components/ui/*`; admin-specific pieces in `components/admin/*`.
- **`app/admin/login/page.tsx`** — centered shadcn `Card` + password `Input` +
  `Button`; posts to the login route; redirects to `/admin` on success.
- **`app/admin/layout.tsx`** — server layout: verifies the session (redirect to
  login if absent), imports admin CSS, renders a sidebar nav (Profile, Skills,
  Experience, Projects, Stats, SEO) + a logout button + `Toaster` (sonner).
- **`app/admin/page.tsx`** — dashboard: loads the portfolio (server) and renders
  the section editors as a client form app.
- **Section editors** (`components/admin/*`): `react-hook-form` + zod resolver +
  shadcn `Form/Input/Textarea/Label/Card/Button/Separator`. Nested lists use
  `useFieldArray` with add / remove / reorder (move up/down):
  - Profile: flat fields + summary textarea.
  - Skills: list of groups, each with a label + a string-array editor (items).
  - Experience: list of roles, each with fields + a string-array editor (points).
  - Projects: list of cards (index, name, stack[], description, link, linkLabel,
    accent color input).
  - Stats: list of `{ value, label }`.
  - SEO: title, description, keywords[] (+ a small live note that this drives the
    page `<title>` and JSON-LD).
  Each section has its own Save button → PUT full doc → success/error **toast** →
  the public page revalidates.

## File layout

New:
- `lib/mongoose.ts`, `lib/models/Portfolio.ts`, `lib/portfolio.ts`,
  `lib/schema.ts`, `lib/auth.ts`
- `middleware.ts`
- `app/api/admin/login/route.ts`, `logout/route.ts`, `portfolio/route.ts`
- `app/admin/layout.tsx`, `app/admin/login/page.tsx`, `app/admin/page.tsx`,
  `app/admin/admin.css`
- `components/admin/*` (section editors + shared bits), `components/ui/*` (shadcn)
- `.env.example`, `tailwind`/`postcss` config + `components.json` (shadcn)

Modified:
- `app/page.tsx` (async, props down), `app/layout.tsx` (`generateMetadata`),
  `components/StructuredData.tsx` + `app/opengraph-image.tsx` (read `getPortfolio`)
- `components/{Hero,About,Skills,Experience,Projects,Contact,Nav}.tsx`
  (data via props)
- `package.json` (mongoose, jose, zod, tailwind, shadcn deps via yarn)

## Risks & mitigations

- **Tailwind preflight leaking into the public site** → import Tailwind only in
  `app/admin/layout.tsx`; verify the public page's computed styles are unchanged
  in the browser after install.
- **Mongoose hot-reload model recompilation / connection storms** → cached global
  connection + `models.Portfolio || model(...)` guard.
- **Public page no longer fully static** → use ISR + on-demand
  `revalidatePath('/')`; confirm the page still renders without a DB at build
  (seed fallback) so builds don't require a live DB.
- **Secrets** → never commit real env; `.env.example` only; constant-time
  password compare; httpOnly secure cookie.
- **Two lockfiles** (`package-lock.json` + `yarn.lock`) → standardize on yarn;
  optionally remove `package-lock.json` to avoid CI ambiguity (call out, don't
  silently delete).

## Success criteria

- `yarn build` passes; public page renders from DB (or seed) and is crawlable;
  SEO `<title>`/JSON-LD reflect the DB `seo` block.
- Visiting `/admin` unauthenticated redirects to `/admin/login`; correct password
  logs in; wrong password is rejected; logout clears the session.
- Editing each section and saving persists to MongoDB and the public page reflects
  it after revalidation.
- Tailwind/shadcn styles apply on `/admin` only; the public 3D site is visually
  unchanged (verified in browser).
- No secrets committed; `.env.example` present.
