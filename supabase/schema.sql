-- ============================================================
--  Client Portal schema
--  Run this ONCE in Supabase → SQL Editor → New query → Run.
-- ============================================================

create extension if not exists pgcrypto;

-- One row per client portal ----------------------------------
create table if not exists portals (
  token           text primary key,
  client_name     text not null,
  company         text,
  next_step       text,
  audit_intro     text,                                -- markdown preface above the questions
  audit_questions jsonb not null default '[]'::jsonb,  -- [{ id, text, section }]
  docs            jsonb not null default '[]'::jsonb,  -- [{ label, note, url }]
  calls           jsonb not null default '[]'::jsonb,  -- [{ name, date, summary, recordingUrl }]
  created_at      timestamptz not null default now()
);

-- Her checkbox state -----------------------------------------
create table if not exists portal_progress (
  token       text not null references portals(token) on delete cascade,
  question_id text not null,
  checked     boolean not null default false,
  updated_at  timestamptz not null default now(),
  primary key (token, question_id)
);

-- Links she shares back --------------------------------------
create table if not exists portal_submissions (
  id         uuid primary key default gen_random_uuid(),
  token      text not null references portals(token) on delete cascade,
  label      text,
  url        text not null,
  created_at timestamptz not null default now()
);

-- Lock every table down. With RLS on and NO policies, the public
-- "anon" key can read/write nothing directly. All access goes
-- through the SECURITY DEFINER functions below, which require the
-- exact (unguessable) token — so portals can't be listed or guessed.
alter table portals            enable row level security;
alter table portal_progress    enable row level security;
alter table portal_submissions enable row level security;

-- Read a portal + its progress + submissions, by exact token ---
create or replace function get_portal(p_token text)
returns jsonb
language sql
security definer
set search_path = public
as $$
  select jsonb_build_object(
    'token',       p.token,
    'clientName',  p.client_name,
    'company',     p.company,
    'nextStep',    p.next_step,
    'auditIntro',  p.audit_intro,
    'audit',       p.audit_questions,
    'docs',        p.docs,
    'calls',       p.calls,
    'checks', coalesce(
      (select jsonb_object_agg(question_id, checked)
         from portal_progress where token = p.token), '{}'::jsonb),
    'submissions', coalesce(
      (select jsonb_agg(jsonb_build_object(
                 'id', id, 'label', label, 'url', url, 'createdAt', created_at)
               order by created_at)
         from portal_submissions where token = p.token), '[]'::jsonb)
  )
  from portals p
  where p.token = p_token;
$$;

-- Toggle a checkbox ------------------------------------------
create or replace function set_check(p_token text, p_question_id text, p_checked boolean)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from portals where token = p_token) then
    raise exception 'invalid token';
  end if;
  if p_question_id is null or length(p_question_id) > 128 then
    raise exception 'invalid question_id';
  end if;
  insert into portal_progress (token, question_id, checked, updated_at)
  values (p_token, p_question_id, p_checked, now())
  on conflict (token, question_id)
  do update set checked = excluded.checked, updated_at = now();
end;
$$;

-- Record a shared link ---------------------------------------
create or replace function add_submission(p_token text, p_label text, p_url text)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from portals where token = p_token) then
    raise exception 'invalid token';
  end if;
  if p_url is null or length(p_url) = 0 then
    raise exception 'url required';
  end if;
  if length(p_url) > 2000 then
    raise exception 'url too long';
  end if;
  if p_label is not null and length(p_label) > 200 then
    raise exception 'label too long';
  end if;
  insert into portal_submissions (token, label, url)
  values (p_token, left(p_label, 200), left(p_url, 2000));
end;
$$;

-- Expose ONLY these functions to the browser's anon/auth roles.
grant execute on function get_portal(text)                     to anon, authenticated;
grant execute on function set_check(text, text, boolean)       to anon, authenticated;
grant execute on function add_submission(text, text, text)     to anon, authenticated;

-- ============================================================
--  Journal (blog) schema
--  The journal moved from the static src/data/journal.ts file into
--  this table so an automated routine can publish via the MCP server
--  (service_role key) with no code change or rebuild.
--
--  Reads: the browser's anon key can SELECT only PUBLISHED rows.
--  Writes: only the service_role key (MCP server + seed script),
--  which bypasses RLS — the anon key can write nothing.
-- ============================================================

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

create index if not exists journal_posts_published_idx
  on journal_posts (issue desc)
  where status = 'published';

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

alter table journal_posts enable row level security;

drop policy if exists journal_public_read on journal_posts;
create policy journal_public_read on journal_posts
  for select
  to anon, authenticated
  using (status = 'published');
