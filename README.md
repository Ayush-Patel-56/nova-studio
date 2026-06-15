# Nova Studio

Digital agency platform — web design, front-end development, and branding for modern businesses.

## Setup

1. Clone the repo and install dependencies: `npm install`
2. Copy `.env.local.example` to `.env.local` and fill in all values (Supabase, MongoDB, NextAuth, GCS)
3. Run the SQL in `docs/supabase-schema.sql` in your Supabase SQL editor
4. Generate a bcrypt hash for your admin password: `node scripts/generate-password-hash.js yourpassword`
5. Paste the hash into `ADMIN_PASSWORD` in `.env.local`
6. Start the dev server: `npm run dev`

## Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | Next.js 16 (App Router) |
| UI / Styling | Material UI v9 + CSS-in-JS |
| Backend | Next.js API Routes |
| Primary Database | Supabase (PostgreSQL) |
| Secondary Database | MongoDB Atlas (analytics, logs) |
| Auth | NextAuth v5 (credentials provider) |
| Images | Google Cloud Storage |
| Deploy | Vercel |

## API Reference

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | /api/projects | public | All portfolio projects |
| POST | /api/projects | admin | Add project (multipart/form-data with image) |
| DELETE | /api/projects/:id | admin | Delete project |
| GET | /api/services | public | Agency services |
| GET | /api/stats | public | Key metrics |
| POST | /api/contact | public | Submit contact form |
| GET | /api/contacts | admin | All contact submissions |
| POST | /api/analytics | public | Log CTA click or page visit |

## Admin Panel

Go to `/admin/login`. Credentials are set via `ADMIN_USERNAME` and `ADMIN_PASSWORD` in `.env.local`.

## Design Decisions

- **App Router server components** handle data fetching for the landing page (SSR on every request)
- **MongoDB Atlas** is used only for append-only analytics events and contact logs
- **Supabase** handles all structured data (projects, contacts, stats, services)
- **Google Cloud Storage** serves project images — avoids Vercel's read-only filesystem
- **No animation libraries** — scroll animations use the Intersection Observer API, count-up is a custom hook
- **next-auth v5** is used instead of v4 because this project runs Next.js 16 + React 19
