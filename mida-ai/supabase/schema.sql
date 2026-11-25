-- Mida AI: copy/paste had l-fichier f Supabase -> SQL Editor -> Run

-- 1) Profiles (credits dyal kol user)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  credits integer not null default 0 check (credits >= 0),
  created_at timestamptz not null default now()
);

-- 2) Generations (kol video)
create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  mode text not null check (mode in ('text-to-video', 'image-to-video')),
  preset text,
  model text not null,
  prompt text not null,
  image_url text,
  aspect_ratio text not null default '16:9',
  cost integer not null,
  status text not null default 'queued' check (status in ('queued', 'running', 'done', 'failed')),
  fal_request_id text,
  video_url text,
  error text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists generations_user_idx on public.generations (user_id, created_at desc);

-- 3) Payments (bach ma nzidouch credits jouj mrrat l nafs l'order)
create table if not exists public.payments (
  order_id text primary key,
  user_id uuid not null references auth.users (id) on delete cascade,
  credits integer not null,
  amount_cents integer,
  created_at timestamptz not null default now()
);

-- Row Level Security: user kaychouf ghir dyalo, w ma y9derch ybdel walou mn browser
alter table public.profiles enable row level security;
alter table public.generations enable row level security;
alter table public.payments enable row level security;

drop policy if exists "own profile" on public.profiles;
create policy "own profile" on public.profiles for select using (auth.uid() = id);
drop policy if exists "own generations" on public.generations;
create policy "own generations" on public.generations for select using (auth.uid() = user_id);
drop policy if exists "own payments" on public.payments;
create policy "own payments" on public.payments for select using (auth.uid() = user_id);

-- Profile automatique mlli user kaysjel.
-- Free credits dyal tjriba: bdel 0 b chi ra9m (kol credit kaykhllsek nta flouss!)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, credits) values (new.id, new.email, 0)
  on conflict (id) do nothing;
  return new;
end;
$$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users
  for each row execute function public.handle_new_user();

-- Credits: atomic (ma ymknch ynzel ta7t 0)
create or replace function public.spend_credits(p_user uuid, p_amount integer)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  update public.profiles set credits = credits - p_amount
  where id = p_user and credits >= p_amount;
  return found;
end;
$$;

create or replace function public.add_credits(p_user uuid, p_amount integer)
returns void language plpgsql security definer set search_path = public as $$
begin
  update public.profiles set credits = credits + p_amount where id = p_user;
end;
$$;

revoke execute on function public.spend_credits(uuid, integer) from public, anon, authenticated;
revoke execute on function public.add_credits(uuid, integer) from public, anon, authenticated;
grant execute on function public.spend_credits(uuid, integer) to service_role;
grant execute on function public.add_credits(uuid, integer) to service_role;

-- Storage bucket l tsawer li kayrfe3 user (image-to-video)
insert into storage.buckets (id, name, public) values ('inputs', 'inputs', true)
on conflict (id) do nothing;
