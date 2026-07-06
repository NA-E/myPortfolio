import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { samplePortal } from '../data/samplePortal';
import type { Portal, PortalSubmission } from '../types/portal';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const client: SupabaseClient | null = url && anon ? createClient(url, anon) : null;
const SAMPLE_TOKEN = samplePortal.token;

/* ------------------------------------------------------------------ *
 * localStorage fallback — used only until Supabase keys are set.
 * Lets you click through /portal/sample with persistence on this device.
 * ------------------------------------------------------------------ */
const checksKey = (token: string) => `portal:${token}:checks`;
const subsKey = (token: string) => `portal:${token}:submissions`;

function loadLocalChecks(token: string): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(checksKey(token)) || '{}');
  } catch {
    return {};
  }
}

function saveLocalCheck(token: string, questionId: string, checked: boolean) {
  const checks = loadLocalChecks(token);
  checks[questionId] = checked;
  localStorage.setItem(checksKey(token), JSON.stringify(checks));
}

function loadLocalSubs(token: string): PortalSubmission[] {
  try {
    return JSON.parse(localStorage.getItem(subsKey(token)) || '[]');
  } catch {
    return [];
  }
}

function saveLocalSub(token: string, label: string, url: string) {
  const subs = loadLocalSubs(token);
  subs.push({ label, url, createdAt: new Date().toISOString() });
  localStorage.setItem(subsKey(token), JSON.stringify(subs));
}

/* ------------------------------------------------------------------ *
 * Public API — same signatures whether or not Supabase is configured.
 * ------------------------------------------------------------------ */
export async function getPortal(token: string): Promise<Portal | null> {
  // The sample preview always uses local state — there is no 'sample' row in the DB.
  if (token === SAMPLE_TOKEN) {
    return {
      ...samplePortal,
      checks: loadLocalChecks(token),
      submissions: loadLocalSubs(token),
    };
  }
  if (!client) return null;

  const { data, error } = await client.rpc('get_portal', { p_token: token });
  if (error || !data) return null;
  return data as Portal;
}

export async function setCheck(token: string, questionId: string, checked: boolean): Promise<void> {
  if (!client || token === SAMPLE_TOKEN) {
    saveLocalCheck(token, questionId, checked);
    return;
  }
  const { error } = await client.rpc('set_check', {
    p_token: token,
    p_question_id: questionId,
    p_checked: checked,
  });
  if (error) throw error;
}

export async function addSubmission(token: string, label: string, url: string): Promise<void> {
  if (!client || token === SAMPLE_TOKEN) {
    saveLocalSub(token, label, url);
    return;
  }
  const { error } = await client.rpc('add_submission', {
    p_token: token,
    p_label: label,
    p_url: url,
  });
  if (error) throw error;
}
