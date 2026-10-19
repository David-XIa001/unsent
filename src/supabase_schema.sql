-- ==============================================================================
-- GeoCapsule / 时空微光 - Supabase 数据库一键初始化脚本
-- 在 Supabase Dashboard -> SQL Editor 中粘贴运行即可
-- ==============================================================================

-- 1. 创建心事胶囊主表
create table if not exists public.capsules (
    id uuid primary key default gen_random_uuid(),
    author_nickname varchar(64) not null default '星夜漫游者',
    content text not null,
    mood_color varchar(16) not null default 'blue', -- blue, purple, orange, green, rose
    photo_url text,
    lng double precision not null,
    lat double precision not null,
    location_name varchar(128),
    unlock_at timestamptz not null default now(),
    resonances_count integer not null default 0,
    created_at timestamptz not null default now()
);

-- 2. 创建纸飞机回信表
create table if not exists public.capsule_replies (
    id uuid primary key default gen_random_uuid(),
    capsule_id uuid not null references public.capsules(id) on delete cascade,
    author_nickname varchar(64) not null default '拾光者',
    content varchar(200) not null,
    created_at timestamptz not null default now()
);

-- 3. 索引优化 (经纬度与时间)
create index if not exists idx_capsules_coords on public.capsules (lng, lat);
create index if not exists idx_capsules_created_at on public.capsules (created_at desc);
create index if not exists idx_replies_capsule on public.capsule_replies (capsule_id);

-- 4. 原子点赞计数 RPC 函数
create or replace function increment_resonance(target_capsule_id uuid)
returns void as $$
begin
  update public.capsules
  set resonances_count = resonances_count + 1
  where id = target_capsule_id;
end;
$$ language plpgsql security definer;

-- 5. 开启行级安全策略 (RLS)
alter table public.capsules enable row level security;
alter table public.capsule_replies enable row level security;

-- 任何人可读
create policy "Allow public read capsules" on public.capsules for select using (true);
create policy "Allow public read replies" on public.capsule_replies for select using (true);

-- 任何人可插入
create policy "Allow public insert capsules" on public.capsules for insert with check (true);
create policy "Allow public insert replies" on public.capsule_replies for insert with check (true);
