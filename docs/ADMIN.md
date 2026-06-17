# Portfolio Admin (CMS)

The site content lives in **MongoDB** and is edited through an authenticated admin
at **`/admin`** (built with shadcn/ui, themed to match the portfolio).

## How it works

- A single `Portfolio` document (Mongoose) holds everything: `profile`, `skills`,
  `experience`, `projects`, `stats`, and `seo`.
- On first load the DB is **seeded** from `lib/data.ts`, so the site works before
  anything is saved. If the DB is ever unreachable, the public page falls back to
  that same seed (it never hard-fails).
- The public homepage and its SEO (`<title>`, meta description, JSON-LD, OG image)
  read the document via `getPortfolio()`. Saving any section calls
  `revalidatePath('/')`, so edits publish to the live site within seconds.
- Auth: a single password → a signed httpOnly session cookie (`jose`). `proxy.ts`
  gates `/admin/*` and `/api/admin/*`.

## Environment variables

Set these in `.env.local` for local dev and in Netlify (Site settings →
Environment variables) for production. `.env.local` is gitignored — never commit
real secrets.

| Variable | Purpose |
| :--- | :--- |
| `MONGODB_URI` | MongoDB Atlas connection string. **Percent-encode special characters in the password** (e.g. `@` → `%40`). |
| `ADMIN_PASSWORD` | The password for the single admin at `/admin/login`. |
| `SESSION_SECRET` | Long random string used to sign the session cookie (≥32 chars; `openssl rand -base64 48`). |

See `.env.example` for the template.

## MongoDB Atlas setup

The `MONGODB_URI` must use a **Database User** (Atlas → **Database Access**), which
is *separate* from your Atlas account login. If you get `bad auth: authentication
failed`:

1. Atlas → **Database Access** → **Add New Database User** (Password auth).
2. Give it the **Read and write to any database** role.
3. Use that username/password in `MONGODB_URI`, percent-encoding any special
   characters in the password.

Also ensure the connecting machine's IP is allowed under **Network Access**.

## Local development

```bash
yarn install
# create .env.local with the three variables above
yarn dev      # http://localhost:3000  (public)  /  /admin (CMS)
```

Log in at `/admin/login` with `ADMIN_PASSWORD`. Edit any section and click **Save**;
the public page revalidates automatically.

## Notes

- Package manager is **yarn** (Netlify uses the committed `yarn.lock`).
- The admin UI (Tailwind v4 + shadcn) is scoped to `/admin` only — the public 3D
  site's CSS is untouched.
