// Deterministic checks used by check_draft (and re-run at publish).
// Tone is NOT judged here — check_draft returns the reference digests +
// rubric so the routine judges tone itself.
import type { PostInput, Recipe, Section } from "./db.ts";

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export interface StructureResult {
  ok: boolean;
  errors: string[];
  warnings: string[];
}

/** Hard structural requirements (errors) + softer brand nudges (warnings). */
export function validateStructure(p: Partial<PostInput>): StructureResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (!p.slug || !SLUG_RE.test(p.slug)) errors.push("slug must be kebab-case ([a-z0-9-]).");
  if (!p.title?.trim()) errors.push("title is required.");
  if (!p.subtitle?.trim()) errors.push("subtitle is required.");
  if (!p.tldr?.trim()) errors.push("tldr is required.");
  if (!p.date?.trim()) errors.push("date is required.");

  const sections = (p.sections ?? []) as Section[];
  if (sections.length === 0) errors.push("at least one section is required.");
  sections.forEach((s, i) => {
    if (!s.heading?.trim()) errors.push(`section[${i}] is missing a heading.`);
    const hasBody = (s.paragraphs?.some((x) => x.trim()) ?? false) ||
      (s.bullets?.some((x) => x.trim()) ?? false);
    if (!hasBody) errors.push(`section[${i}] ("${s.heading ?? ""}") has no paragraphs or bullets.`);
  });

  const recipes = (p.recipes ?? []) as Recipe[];
  recipes.forEach((r, i) => {
    if (!r.name?.trim() || !r.problem?.trim() || !r.solution?.trim() || !r.why?.trim()) {
      errors.push(`recipe[${i}] must have name, problem, solution, and why.`);
    }
  });

  const tags = p.tags ?? [];
  if (tags.length < 3) warnings.push("fewer than 3 tags — aim for 3–6.");
  if (tags.length > 6) warnings.push("more than 6 tags — trim to 3–6.");
  if (p.title && p.title !== p.title.toUpperCase()) {
    warnings.push("title is conventionally in CAPS.");
  }
  if (allText(p).length < 400) {
    warnings.push("post looks thin (<400 chars of body) — digests are usually richer.");
  }

  return { ok: errors.length === 0, errors, warnings };
}

// --- Dedup ------------------------------------------------------------------

const URL_RE = /https?:\/\/[^\s)"']+/g;
const STOP = new Set(
  "the a an and or of to for in on with your you it is are was were this that these those be as at by from".split(" "),
);

function allText(p: Partial<PostInput>): string {
  const parts: string[] = [p.title ?? "", p.subtitle ?? "", p.tldr ?? ""];
  for (const s of p.sections ?? []) {
    parts.push(s.heading ?? "", ...(s.paragraphs ?? []), ...(s.bullets ?? []));
  }
  for (const r of p.recipes ?? []) {
    parts.push(r.name ?? "", r.problem ?? "", r.solution ?? "", r.why ?? "", r.snippet ?? "");
  }
  return parts.join("\n");
}

function links(text: string): Set<string> {
  return new Set((text.match(URL_RE) ?? []).map((u) => u.replace(/[.,;]+$/, "")));
}

function tokens(text: string): Set<string> {
  return new Set(
    text.toLowerCase().replace(/[^a-z0-9\s]/g, " ").split(/\s+/)
      .filter((w) => w.length > 2 && !STOP.has(w)),
  );
}

function jaccard(a: Set<string>, b: Set<string>): number {
  if (a.size === 0 || b.size === 0) return 0;
  let inter = 0;
  for (const x of a) if (b.has(x)) inter++;
  return inter / (a.size + b.size - inter);
}

export interface DedupOverlap {
  priorSlug: string;
  priorTitle: string;
  kind: "shared-link" | "similar-title" | "similar-body";
  detail: string;
}

/** Compare a draft against recently-published posts; flag likely repeats. */
export function findOverlaps(
  draft: Partial<PostInput>,
  priors: { slug: string; title: string; tldr: string; sections: unknown; recipes: unknown }[],
): DedupOverlap[] {
  const overlaps: DedupOverlap[] = [];
  const draftText = allText(draft);
  const draftLinks = links(draftText);
  const draftTitleTokens = tokens(draft.title ?? "");
  const draftBodyTokens = tokens(draftText);

  for (const prior of priors) {
    const priorAsPost = {
      title: prior.title,
      tldr: prior.tldr,
      sections: prior.sections as Section[],
      recipes: prior.recipes as Recipe[],
    };
    const priorText = allText(priorAsPost);

    const shared = [...draftLinks].filter((u) => links(priorText).has(u));
    if (shared.length > 0) {
      overlaps.push({
        priorSlug: prior.slug,
        priorTitle: prior.title,
        kind: "shared-link",
        detail: `shares ${shared.length} source link(s): ${shared.slice(0, 3).join(", ")}`,
      });
    }

    const titleSim = jaccard(draftTitleTokens, tokens(prior.title));
    if (titleSim >= 0.5) {
      overlaps.push({
        priorSlug: prior.slug,
        priorTitle: prior.title,
        kind: "similar-title",
        detail: `title ~${Math.round(titleSim * 100)}% overlapping`,
      });
    }

    const bodySim = jaccard(draftBodyTokens, tokens(priorText));
    if (bodySim >= 0.45) {
      overlaps.push({
        priorSlug: prior.slug,
        priorTitle: prior.title,
        kind: "similar-body",
        detail: `body ~${Math.round(bodySim * 100)}% overlapping — likely repeats stories`,
      });
    }
  }
  return overlaps;
}
