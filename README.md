# Sell My House Today Anywhere - Phase 1

This is the Phase 1 build for `sellmyhousetodayanywhere.com`.

## Included

- Next.js 15 marketing website
- Mobile-first homepage
- Pages:
  - `/`
  - `/how-it-works`
  - `/sell-your-house-fast`
  - `/we-buy-houses-as-is`
  - `/locations`
  - `/faq`
  - `/contact`
  - `/privacy-policy`
  - `/terms`
  - `/admin/login`
  - `/admin/leads`
- Lead form that saves to Supabase
- Admin login with signed HTTP-only cookie
- Admin leads dashboard
- Search and status filtering
- Lead status and admin notes update
- `robots.txt`
- `sitemap.xml`
- FAQ schema
- Supabase SQL migration

## Setup

1. Upload this project to GitHub.
2. Connect the GitHub repo to Vercel.
3. Create a Supabase project.
4. Run `sql/001_seller_leads.sql` in the Supabase SQL editor.
5. Add the environment variables listed below to Vercel.
6. Deploy on Vercel.
7. Visit `/admin/login` and use the `ADMIN_PASSWORD` value.

## Environment variables needed

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
ADMIN_PASSWORD
ADMIN_SESSION_SECRET
```

Optional later:

```text
RESEND_API_KEY
LEAD_NOTIFICATION_EMAIL
FROM_EMAIL
```

## SQL migration needed

Yes. Run:

```text
sql/001_seller_leads.sql
```

## Vercel ENV needed

Yes. Add the required environment variables above before testing the form.

## Notes

- Admin pages are marked noindex.
- Lead form submissions are handled by a server route using the Supabase service role key.
- The service role key must never be exposed on the client.
- Email notifications are intentionally left for Phase 2. Phase 1 safely stores leads in Supabase.
- Privacy Policy and Terms are starter templates and should be reviewed before heavy advertising.

## Local commands

```bash
npm install
npm run dev
npm run typecheck
npm run build
```
