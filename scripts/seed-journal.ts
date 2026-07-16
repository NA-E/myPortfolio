#!/usr/bin/env -S node --import tsx
/**
 * One-time (idempotent) migration: push the existing static journal
 * entries from src/data/journal.ts into the Supabase `journal_posts`
 * table as PUBLISHED posts, so the site can read them from the DB and
 * the MCP server can add new ones without touching code.
 *
 *   npm run seed-journal
 *
 * Safe to re-run: upserts on `slug`, so it heals/updates in place and
 * never creates duplicates. The static file stays as the offline
 * fallback + the source of truth for this migration.
 *
 * Requires (in .env, loaded via --env-file):
 *   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY   (service key is SECRET, local only)
 */
import { createClient } from '@supabase/supabase-js';
import { journalEntries } from '../src/data/journal';

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) {
  console.error('✖ Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY in .env');
  process.exit(1);
}

// "July 5, 2026" -> ISO timestamp for published_at (null if unparseable).
function toIso(date: string): string | null {
  const t = Date.parse(date);
  return Number.isNaN(t) ? null : new Date(t).toISOString();
}

const rows = journalEntries.map((e) => ({
  issue: e.issue,
  slug: e.slug,
  status: 'published' as const,
  date: e.date,
  title: e.title,
  subtitle: e.subtitle,
  project: e.project,
  author: e.author ?? null,
  tags: e.tags,
  tldr: e.tldr,
  sections: e.sections,
  recipes: e.recipes,
  published_at: toIso(e.date),
}));

const supabase = createClient(url, key, { auth: { persistSession: false } });

const { error } = await supabase
  .from('journal_posts')
  .upsert(rows, { onConflict: 'slug' });

if (error) {
  console.error('✖ Seed failed:', error.message);
  process.exit(1);
}

console.log(`✔ Seeded ${rows.length} journal post(s) into journal_posts.`);
console.log('  Issues:', rows.map((r) => r.issue).sort((a, b) => a - b).join(', '));
