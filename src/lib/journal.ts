import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { journalEntries as staticEntries } from '../data/journal';
import type { JournalEntry } from '../types/journal';

/* ------------------------------------------------------------------ *
 * Journal data source.
 *
 * Posts live in the Supabase `journal_posts` table (published by the
 * MCP server). The static src/data/journal.ts array is kept as an
 * offline fallback so the site renders even before the table is
 * seeded, if the keys are missing, or if a query fails.
 * ------------------------------------------------------------------ */
const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const client: SupabaseClient | null = url && anon ? createClient(url, anon) : null;

// Only the columns the site renders. Order matches newest issue first.
const COLUMNS = 'issue,slug,date,title,subtitle,project,author,tags,tldr,sections,recipes';

type Row = {
  issue: number;
  slug: string;
  date: string;
  title: string;
  subtitle: string;
  project: string;
  author: string | null;
  tags: string[];
  tldr: string;
  sections: JournalEntry['sections'];
  recipes: JournalEntry['recipes'];
};

function rowToEntry(r: Row): JournalEntry {
  return {
    issue: r.issue,
    slug: r.slug,
    date: r.date,
    title: r.title,
    subtitle: r.subtitle,
    project: r.project,
    author: r.author ?? undefined,
    tags: r.tags ?? [],
    tldr: r.tldr,
    sections: r.sections ?? [],
    recipes: r.recipes ?? [],
  };
}

const staticSorted = (): JournalEntry[] =>
  [...staticEntries].sort((a, b) => b.issue - a.issue);

export async function getJournalEntries(): Promise<JournalEntry[]> {
  if (!client) return staticSorted();
  const { data, error } = await client
    .from('journal_posts')
    .select(COLUMNS)
    .eq('status', 'published')
    .order('issue', { ascending: false });

  // Any failure or an unseeded table falls back to the bundled posts.
  if (error || !data || data.length === 0) return staticSorted();
  return (data as Row[]).map(rowToEntry);
}

export async function getJournalPost(slug: string): Promise<JournalEntry | null> {
  if (!client) return staticEntries.find((e) => e.slug === slug) ?? null;
  const { data, error } = await client
    .from('journal_posts')
    .select(COLUMNS)
    .eq('status', 'published')
    .eq('slug', slug)
    .maybeSingle();

  // Fall back to the static copy so a not-yet-migrated post still resolves.
  if (error || !data) return staticEntries.find((e) => e.slug === slug) ?? null;
  return rowToEntry(data as Row);
}
