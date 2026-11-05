-- ==========================================================
-- VERDORA — Production PostgreSQL Supabase Database Schema
-- Run this script in the Supabase SQL Editor
-- ==========================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES TABLE (Linked with Supabase Auth users)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text not null,
  email text unique not null,
  phone text,
  avatar_url text,
  role text default 'customer' check (role in ('customer', 'admin')),
  membership_tier text default 'Botanical Enthusiast',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. PRODUCTS TABLE
create table if not exists public.products (
  id text primary key,
  name text not null,
  botanical_name text,
  slug text unique not null,
  price numeric(10, 2) not null,
  original_price numeric(10, 2),
  rating numeric(3, 2) default 5.0,
  review_count integer default 0,
  category text not null,
  is_bestseller boolean default false,
  is_rare boolean default false,
  is_pet_safe boolean default false,
  is_air_purifier boolean default false,
  difficulty text default 'Easy',
  sunlight text,
  watering text,
  size text,
  growth_rate text,
  stock_count integer default 10,
  short_description text,
  description text,
  images text[] default '{}',
  care_instructions jsonb default '{}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. ORDERS TABLE
create table if not exists public.orders (
  id uuid default uuid_generate_v4() primary key,
  order_number text unique not null,
  user_id uuid references public.profiles(id) on delete set null,
  customer_email text not null,
  customer_name text not null,
  status text default 'Processing' check (status in ('Processing', 'Shipped', 'In Transit', 'Delivered', 'Cancelled')),
  subtotal numeric(10, 2) not null,
  discount numeric(10, 2) default 0,
  shipping_fee numeric(10, 2) default 0,
  total numeric(10, 2) not null,
  payment_method text default 'Razorpay',
  payment_id text,
  shipping_address jsonb not null,
  order_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. ORDER ITEMS TABLE
create table if not exists public.order_items (
  id uuid default uuid_generate_v4() primary key,
  order_id uuid references public.orders(id) on delete cascade not null,
  product_id text references public.products(id) on delete set null,
  product_name text not null,
  unit_price numeric(10, 2) not null,
  quantity integer not null,
  product_image text
);

-- 5. ROW LEVEL SECURITY (RLS) POLICIES
alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Public can read all active catalog products
create policy "Allow public read-only access to products"
  on public.products for select using (true);

-- Users can view and update their own profile
create policy "Users can view own profile"
  on public.profiles for select using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update using (auth.uid() = id);

-- Users can view their own orders
create policy "Users can view own orders"
  on public.orders for select using (auth.uid() = user_id);

-- Trigger to automatically create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

