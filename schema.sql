-- Run this whole file once in your Supabase project's SQL Editor
-- (Dashboard -> SQL Editor -> New query -> paste this -> Run)

-- 1. Profiles (one row per user, created automatically on first sign-in)
create table if not exists profiles (
  id uuid references auth.users primary key,
  username text unique not null,
  created_at timestamptz default now()
);

-- 2. Posts (a build photo + caption)
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references profiles(id) not null,
  car text not null,
  category text not null,
  caption text not null,
  image_url text not null,
  likes int default 0,
  created_at timestamptz default now()
);

-- 3. Pins (parts tagged on a post's photo)
create table if not exists pins (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references posts(id) on delete cascade not null,
  part text not null,
  brand text,
  fits text,
  price numeric default 0,
  x numeric default 50,
  y numeric default 50
);

-- 4. Likes (tracks who liked what, so counts are accurate per-user)
create table if not exists post_likes (
  post_id uuid references posts(id) on delete cascade,
  user_id uuid references profiles(id) on delete cascade,
  primary key (post_id, user_id)
);

-- 5. A helper function so liking/unliking updates the count safely
create or replace function increment_likes(post_id uuid, delta int)
returns void as $$
  update posts set likes = greatest(0, likes + delta) where id = post_id;
$$ language sql;

-- 6. Row Level Security: everyone can read, only owners can write their own stuff
alter table profiles enable row level security;
alter table posts enable row level security;
alter table pins enable row level security;
alter table post_likes enable row level security;

create policy "profiles are public" on profiles for select using (true);
create policy "users insert own profile" on profiles for insert with check (auth.uid() = id);

create policy "posts are public" on posts for select using (true);
create policy "users insert own posts" on posts for insert with check (auth.uid() = user_id);

create policy "pins are public" on pins for select using (true);
create policy "users insert pins on own posts" on pins for insert with check (
  exists (select 1 from posts where posts.id = pins.post_id and posts.user_id = auth.uid())
);

create policy "likes are public" on post_likes for select using (true);
create policy "users like as themselves" on post_likes for insert with check (auth.uid() = user_id);
create policy "users remove own like" on post_likes for delete using (auth.uid() = user_id);

-- 7. Storage: after running this file, also go to
-- Dashboard -> Storage -> Create a new bucket named "post-photos" -> make it Public.
