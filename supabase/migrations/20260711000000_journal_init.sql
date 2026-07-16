-- ============================================================
--  Journal (blog) schema
--  Moves the journal from the static src/data/journal.ts file into
--  a table, so an automated routine can publish posts via the MCP
--  server (service_role key) without a code change or rebuild.
--
--  Reads: the browser's anon key can SELECT only PUBLISHED rows
--  (RLS policy below). Drafts stay invisible to the public.
--  Writes: only the service_role key (MCP server + seed script),
--  which bypasses RLS entirely — the anon key can write nothing.
-- ============================================================

create extension if not exists pgcrypto;

-- One row per journal post. Columns mirror the JournalEntry type
-- in src/types/journal.ts; the nested shapes live in jsonb.
create table if not exists journal_posts (
  id           uuid primary key default gen_random_uuid(),
  issue        integer unique,                         -- display/sort number; assigned at publish (null while draft)
  slug         text not null unique,                   -- kebab-case, drives /journal/:slug
  status       text not null default 'draft'
                 check (status in ('draft', 'published')),
  date         text not null,                          -- human display date, e.g. "July 5, 2026"
  title        text not null,
  subtitle     text not null,
  project      text not null default 'Field Notes',    -- e.g. "Field Notes" | "Daily Digest"
  author       text,
  tags         jsonb not null default '[]'::jsonb,      -- string[]
  tldr         text not null,
  sections     jsonb not null default '[]'::jsonb,      -- [{ heading, paragraphs[], bullets?[] }]
  recipes      jsonb not null default '[]'::jsonb,      -- [{ name, problem, solution, why, snippet? }]
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now(),
  published_at timestamptz                              -- set when status flips to 'published'
);

-- Index the reads the site actually makes: published posts, newest issue first.
create index if not exists journal_posts_published_idx
  on journal_posts (issue desc)
  where status = 'published';

-- Keep updated_at honest on every write.
create or replace function journal_touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists journal_posts_touch on journal_posts;
create trigger journal_posts_touch
  before update on journal_posts
  for each row execute function journal_touch_updated_at();

-- Lock the table down, then open exactly one hole: the public may
-- read PUBLISHED posts. Drafts and all writes require the service key.
alter table journal_posts enable row level security;

drop policy if exists journal_public_read on journal_posts;
create policy journal_public_read on journal_posts
  for select
  to anon, authenticated
  using (status = 'published');
