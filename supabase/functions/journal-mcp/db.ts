// Data-access layer for the journal_posts table, using the service role
// key (auto-injected into Edge Functions — never leaves Supabase).
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

export const supa = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
});

// The shape the tools accept/return. Mirrors src/types/journal.ts.
export interface Section {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}
export interface Recipe {
  name: string;
  problem: string;
  solution: string;
  why: string;
  snippet?: string;
}
export interface PostInput {
  slug: string;
  date: string;
  title: string;
  subtitle: string;
  project?: string;
  author?: string;
  tags?: string[];
  tldr: string;
  sections?: Section[];
  recipes?: Recipe[];
}

const COLUMNS =
  "issue,slug,status,date,title,subtitle,project,author,tags,tldr,sections,recipes,published_at";

export async function listPosts(status: "published" | "draft" | "all", limit: number) {
  let q = supa
    .from("journal_posts")
    .select("issue,slug,status,date,title,project,published_at")
    .order("published_at", { ascending: false, nullsFirst: false })
    .order("issue", { ascending: false, nullsFirst: true })
    .limit(limit);
  if (status !== "all") q = q.eq("status", status);
  const { data, error } = await q;
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function getPost(slug: string) {
  const { data, error } = await supa
    .from("journal_posts")
    .select(COLUMNS)
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

/** Published posts published within the last `days` days — for dedup. */
export async function getRecentPublished(days: number) {
  const since = new Date(Date.now() - days * 86_400_000).toISOString();
  const { data, error } = await supa
    .from("journal_posts")
    .select("slug,title,date,tldr,sections,recipes,published_at")
    .eq("status", "published")
    .gte("published_at", since)
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

/** Highest issue currently assigned (draft or published), + 1. */
export async function nextIssue(): Promise<number> {
  const { data, error } = await supa
    .from("journal_posts")
    .select("issue")
    .not("issue", "is", null)
    .order("issue", { ascending: false })
    .limit(1);
  if (error) throw new Error(error.message);
  return (data?.[0]?.issue ?? 0) + 1;
}

/** Insert or update a draft (issue stays null until publish). */
export async function upsertDraft(post: PostInput) {
  const row = {
    slug: post.slug,
    status: "draft" as const,
    date: post.date,
    title: post.title,
    subtitle: post.subtitle,
    project: post.project ?? "Daily Digest",
    author: post.author ?? null,
    tags: post.tags ?? [],
    tldr: post.tldr,
    sections: post.sections ?? [],
    recipes: post.recipes ?? [],
  };
  const { data, error } = await supa
    .from("journal_posts")
    .upsert(row, { onConflict: "slug" })
    .select(COLUMNS)
    .single();
  if (error) throw new Error(error.message);
  return data;
}

export async function patchPost(slug: string, patch: Partial<PostInput>) {
  const { data, error } = await supa
    .from("journal_posts")
    .update(patch)
    .eq("slug", slug)
    .select(COLUMNS)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function publish(slug: string, issue: number) {
  const { data, error } = await supa
    .from("journal_posts")
    .update({ status: "published", issue, published_at: new Date().toISOString() })
    .eq("slug", slug)
    .select(COLUMNS)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function setStatus(slug: string, status: "draft" | "published") {
  const { data, error } = await supa
    .from("journal_posts")
    .update({ status })
    .eq("slug", slug)
    .select("slug,status")
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}
