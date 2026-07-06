#!/usr/bin/env node
/**
 * Create OR update a client portal (idempotent upsert).
 *
 *   npm run new-portal                       # reads scripts/portal-input.json
 *   npm run new-portal path/to/client.json   # reads a specific input file
 *
 * Stable links: the first run generates an unguessable token and writes it back
 * into the input file as "token". Every later run reuses that token, so editing
 * a client's questions/preface UPDATES their portal in place — the link never
 * changes. Her saved checkboxes and submissions (separate tables) are untouched.
 *
 * Requires (in .env, loaded via --env-file):
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY   (service key is SECRET, local only)
 *   PORTAL_BASE_URL                           e.g. https://your-domain.com (optional)
 *
 * Input JSON shape:
 * {
 *   "token": "…",                         // auto-added on first run; do not edit
 *   "clientName": "Renée",
 *   "company": "Acme Co.",                // optional
 *   "auditIntro": "markdown preface…",    // optional
 *   "audit": [ "question" | { "text": "…", "section": "…" } ],
 *   "docs":  [{ "label": "…", "note": "…", "url": "…" }],
 *   "calls": [{ "name": "…", "date": "…", "summary": "…", "recordingUrl": "…" }]
 * }
 */
import { createClient } from '@supabase/supabase-js';
import { readFileSync, writeFileSync } from 'node:fs';
import { randomBytes } from 'node:crypto';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('✖ Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

const file = process.argv[2] || 'scripts/portal-input.json';
let input;
try {
  input = JSON.parse(readFileSync(file, 'utf8'));
} catch (e) {
  console.error(`✖ Could not read/parse ${file}: ${e.message}`);
  process.exit(1);
}

if (!input.clientName) {
  console.error('✖ Input must include "clientName".');
  process.exit(1);
}

// Readable slug (from `slug` override, else the client name), accent-stripped.
function slugify(s) {
  return (
    String(s)
      .normalize('NFD')
      .replace(/\p{Diacritic}/gu, '') // drop accents: Renée -> Renee
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 40) || 'client'
  );
}

// Unguessable random tail (10 lowercase alphanumerics ≈ 51 bits).
function randomSuffix(len = 10) {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  const bytes = randomBytes(len);
  let out = '';
  for (let i = 0; i < len; i++) out += chars[bytes[i] % chars.length];
  return out;
}

// Stable link: reuse the token in the input file; mint a readable one on first run.
// Format: <slug>-<random>  e.g.  renee-k3m9xq2p4a  (human-readable + unguessable).
const isNew = !input.token;
const token = input.token || `${slugify(input.slug || input.clientName)}-${randomSuffix()}`;

const auditQuestions = (input.audit || []).map((q, i) => {
  if (typeof q === 'string') return { id: `q${i + 1}`, text: q };
  return {
    id: q.id || `q${i + 1}`,
    text: q.text,
    ...(q.section ? { section: q.section } : {}),
  };
});

// Persist the token back into the input file FIRST so the DB row and the input
// file can never diverge. A failed write aborts before we touch the DB; a failed
// DB write below self-heals on the next run, reusing this same token (no orphan).
if (isNew) {
  input.token = token;
  try {
    writeFileSync(file, JSON.stringify(input, null, 2) + '\n');
  } catch (e) {
    console.error(`✖ Could not write token back to ${file}: ${e.message}`);
    process.exit(1);
  }
}

const supabase = createClient(url, key, { auth: { persistSession: false } });

try {
  const { error } = await supabase.from('portals').upsert(
    {
      token,
      client_name: input.clientName,
      company: input.company ?? null,
      next_step: input.nextStep ?? null,
      audit_intro: input.auditIntro ?? null,
      audit_questions: auditQuestions,
      docs: input.docs ?? [],
      calls: input.calls ?? [],
    },
    { onConflict: 'token' }
  );
  if (error) {
    console.error('✖ Failed to save portal:', error.message);
    process.exit(1);
  }
} catch (e) {
  console.error('✖ Failed to save portal:', e.message);
  process.exit(1);
}

const base = (process.env.PORTAL_BASE_URL || 'http://localhost:5173').replace(/\/$/, '');
console.log(`\n✔ Portal ${isNew ? 'created' : 'updated'} for ${input.clientName}`);
console.log('  Token:', token);
console.log('  Link :', `${base}/portal/${token}\n`);
