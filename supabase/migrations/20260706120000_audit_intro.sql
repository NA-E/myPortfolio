-- Add a rich markdown intro (the audit preface) to portals,
-- and surface it from get_portal. Questions carry an optional
-- `section` inside the existing audit_questions jsonb (no DDL needed).

alter table portals add column if not exists audit_intro text;

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
