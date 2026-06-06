create extension if not exists pgcrypto;

create table if not exists public.seller_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz,
  property_address text not null,
  property_city text,
  property_state text,
  property_zip text,
  seller_name text not null,
  seller_phone text not null,
  seller_email text,
  property_condition text,
  reason_for_selling text,
  desired_timeline text,
  estimated_value text,
  mortgage_balance text,
  is_owner text,
  best_time_to_contact text,
  notes text,
  admin_notes text,
  lead_status text not null default 'new',
  source_page text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  ip_address text,
  user_agent text,
  consent_to_contact boolean not null default false
);

alter table public.seller_leads enable row level security;

create index if not exists seller_leads_created_at_idx on public.seller_leads (created_at desc);
create index if not exists seller_leads_status_idx on public.seller_leads (lead_status);
create index if not exists seller_leads_phone_idx on public.seller_leads (seller_phone);
create index if not exists seller_leads_email_idx on public.seller_leads (seller_email);
