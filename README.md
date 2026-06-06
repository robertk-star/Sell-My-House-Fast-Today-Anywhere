# Sell My House Today Anywhere - Phase 1 Fast Build

This version uses static HTML/CSS/JS plus Vercel Serverless Functions. It avoids the Next.js build trace step that can hang on Vercel.

## Required Supabase SQL
Run `sql/001_seller_leads.sql` in Supabase SQL Editor.

## Required Vercel Environment Variables
- NEXT_PUBLIC_SUPABASE_URL
- SUPABASE_SERVICE_ROLE_KEY
- ADMIN_PASSWORD
- ADMIN_SESSION_SECRET

## Admin URLs
- /admin/login
- /admin/leads

## Build
`npm run build` only verifies required files exist. No Next.js compile is needed.
