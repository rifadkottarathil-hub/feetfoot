-- Foot Feet: run this once in your Supabase project's SQL editor
-- (Dashboard -> SQL Editor -> New query -> paste this whole file -> Run).

-- ── Brands ──────────────────────────────────────────────────────────────
create table if not exists brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_description text not null default '',
  created_at timestamptz not null default now()
);

-- ── Products ────────────────────────────────────────────────────────────
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  brand_id uuid not null references brands(id) on delete restrict,
  category text not null check (category in ('Running', 'Lifestyle', 'Basketball', 'Training')),
  -- Nullable: a product with no price shows "Contact for price" on the site.
  price numeric(10, 2) check (price >= 0),
  sale_price numeric(10, 2) check (sale_price is null or (sale_price >= 0 and price is not null)),
  colourway text not null default '',
  description text[] not null default '{}',
  size_fit text[] not null default '{}',
  available_sizes text not null default '',
  images text[] not null default '{}',
  sold_out boolean not null default false,
  new_arrival boolean not null default false,
  best_seller boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists products_brand_id_idx on products (brand_id);

create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists products_set_updated_at on products;
create trigger products_set_updated_at
  before update on products
  for each row execute function set_updated_at();

-- ── Row Level Security ──────────────────────────────────────────────────
-- Public (anon key) can only ever read. All writes happen server-side in
-- this app's admin panel using the service-role key, which bypasses RLS
-- entirely — so no insert/update/delete policies are defined here at all.
alter table brands enable row level security;
alter table products enable row level security;

create policy "Public can read brands" on brands for select using (true);
create policy "Public can read products" on products for select using (true);

-- ── Storage bucket for product images ───────────────────────────────────
-- Public bucket: anyone can view/download an image by its URL, but only the
-- service-role key (used server-side by the admin panel) can upload or
-- delete — regular visitors and the anon key have no write access.
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do nothing;
