-- Abuse hardening for the anon-callable write functions: since the link is the
-- only credential, cap the size of client-submitted text so a leaked/forwarded
-- link can't be used to flood the tables with oversized content. (Full auth is
-- a separate phase; this bounds the blast radius cheaply.)

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
