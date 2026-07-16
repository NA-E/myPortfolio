// The MCP server: tool definitions the routine composes into a publish pipeline.
//   get_style_guide → get_examples → suggest_next_issue → create_draft
//   → check_draft → publish_post   (+ list_posts / get_post / update_post / unpublish_post)
import { McpServer } from "mcp-lite";
import { z } from "zod";
import * as db from "./db.ts";
import { findOverlaps, validateStructure } from "./validate.ts";
import { MAPPING_GUIDE, REFERENCE_DIGESTS, STYLE_GUIDE, TONE_RUBRIC } from "./brand.ts";

const BASE_URL = (Deno.env.get("JOURNAL_BASE_URL") ?? "https://nourin.dev").replace(/\/$/, "");

function text(value: unknown) {
  return {
    content: [{
      type: "text" as const,
      text: typeof value === "string" ? value : JSON.stringify(value, null, 2),
    }],
  };
}

// --- Shared schema pieces ---------------------------------------------------
const SectionSchema = z.object({
  heading: z.string(),
  paragraphs: z.array(z.string()).default([]),
  bullets: z.array(z.string()).optional(),
});
const RecipeSchema = z.object({
  name: z.string(),
  problem: z.string(),
  solution: z.string(),
  why: z.string(),
  snippet: z.string().optional(),
});
const PostSchema = z.object({
  slug: z.string().describe("kebab-case, e.g. claude-digest-2026-07-13"),
  date: z.string().describe('human display date, e.g. "July 13, 2026"'),
  title: z.string().describe("the day's single headline, in CAPS"),
  subtitle: z.string(),
  project: z.string().default("Daily Digest"),
  author: z.string().optional(),
  tags: z.array(z.string()).default([]),
  tldr: z.string(),
  sections: z.array(SectionSchema).default([]),
  recipes: z.array(RecipeSchema).default([]),
});

// Patch schema for update_post: every field optional, NO defaults (so an
// omitted field is left untouched rather than reset to a default value).
const PatchSchema = z.object({
  date: z.string(),
  title: z.string(),
  subtitle: z.string(),
  project: z.string(),
  author: z.string(),
  tags: z.array(z.string()),
  tldr: z.string(),
  sections: z.array(SectionSchema),
  recipes: z.array(RecipeSchema),
}).partial();

export const mcp = new McpServer({
  name: "journal-mcp",
  version: "1.0.0",
  schemaAdapter: (schema) => z.toJSONSchema(schema as z.ZodType),
});

// 1. get_style_guide — everything needed to write on-brand.
mcp.tool("get_style_guide", {
  description:
    "Returns the journal house-style guide, the rules for mapping the routine's daily digest into a public post, and the reference digests that define the target tone. Call this FIRST, before writing a post.",
  inputSchema: z.object({}),
  handler: () =>
    text(
      [
        STYLE_GUIDE,
        "\n\n---\n\n",
        MAPPING_GUIDE,
        "\n\n---\n\n# Reference digests (the tone to match)\n",
        ...REFERENCE_DIGESTS.map((d) => `\n## ${d.label}\n\n${d.text}`),
      ].join(""),
    ),
});

// 2. get_examples — recent published posts as few-shot references.
mcp.tool("get_examples", {
  description:
    "Returns the most recent published posts (full JSON) as concrete examples of the target JournalEntry shape and voice.",
  inputSchema: z.object({ limit: z.number().int().min(1).max(5).default(2) }),
  handler: async (args: { limit?: number }) => {
    const list = await db.listPosts("published", args.limit ?? 2);
    const posts = [];
    for (const p of list) posts.push(await db.getPost(p.slug));
    return text(posts);
  },
});

// 3. suggest_next_issue — the next issue number + slug availability.
mcp.tool("suggest_next_issue", {
  description:
    "Returns the next journal issue number to use, and whether a proposed slug is already taken.",
  inputSchema: z.object({ slug: z.string().optional() }),
  handler: async (args: { slug?: string }) => {
    const next = await db.nextIssue();
    const taken = args.slug ? Boolean(await db.getPost(args.slug)) : undefined;
    return text({ nextIssue: next, slug: args.slug, slugTaken: taken });
  },
});

// 4. create_draft — persist a draft (status=draft, not public).
mcp.tool("create_draft", {
  description:
    "Creates or overwrites (by slug) a DRAFT post. Not visible on the public site until publish_post. Returns the stored draft and any structure warnings. Run check_draft next.",
  inputSchema: PostSchema,
  handler: async (post: z.infer<typeof PostSchema>) => {
    const structure = validateStructure(post);
    if (!structure.ok) {
      return text({ saved: false, structure, hint: "Fix the errors and call create_draft again." });
    }
    const saved = await db.upsertDraft(post);
    return text({
      saved: true,
      slug: saved?.slug,
      status: saved?.status,
      structureWarnings: structure.warnings,
      nextStep: "Call check_draft with this slug before publishing.",
    });
  },
});

// 5. check_draft — the gate: structure + dedup (deterministic) + tone materials.
mcp.tool("check_draft", {
  description:
    "Checks a draft before publishing. Returns: (1) structure validity, (2) dedup overlaps vs posts published in the last `dedupWindowDays` days, and (3) the reference digests + tone rubric so YOU can judge whether the draft's tone matches. Revise and re-run create_draft if anything is off.",
  inputSchema: z.object({
    slug: z.string(),
    dedupWindowDays: z.number().int().min(1).max(14).default(1),
  }),
  handler: async (args: { slug: string; dedupWindowDays?: number }) => {
    const windowDays = args.dedupWindowDays ?? 1;
    const draft = await db.getPost(args.slug);
    if (!draft) throw new Error(`No draft found for slug "${args.slug}". Call create_draft first.`);

    const structure = validateStructure(draft as unknown as db.PostInput);
    const priors = (await db.getRecentPublished(windowDays)).filter((p) => p.slug !== args.slug);
    const overlaps = findOverlaps(draft as unknown as db.PostInput, priors);

    return text({
      slug: args.slug,
      structure,
      dedup: {
        windowDays,
        comparedAgainst: priors.map((p) => ({ slug: p.slug, title: p.title, date: p.date })),
        overlaps,
        note: overlaps.length
          ? "Overlaps found — drop or reframe the repeated items before publishing."
          : "No overlaps with recent posts.",
      },
      toneCheck: {
        instruction:
          "Judge the draft against the rubric and the reference digests below. If it drifts (hype, vagueness, addressed-to-Nourin, missing sources), revise and re-run create_draft.",
        rubric: TONE_RUBRIC,
        referenceDigests: REFERENCE_DIGESTS,
      },
      readyToPublish: structure.ok && overlaps.length === 0,
    });
  },
});

// 6. publish_post — draft → published (re-validates structure).
mcp.tool("publish_post", {
  description:
    "Publishes a draft: assigns the next issue number, flips it to published, and it goes live at /journal/<slug>. Re-runs structure validation and refuses on errors unless force=true.",
  inputSchema: z.object({ slug: z.string(), force: z.boolean().default(false) }),
  handler: async (args: { slug: string; force?: boolean }) => {
    const draft = await db.getPost(args.slug);
    if (!draft) throw new Error(`No post found for slug "${args.slug}".`);
    if (draft.status === "published") {
      return text({ published: true, alreadyPublished: true, url: `${BASE_URL}/journal/${args.slug}`, issue: draft.issue });
    }
    const structure = validateStructure(draft as unknown as db.PostInput);
    if (!structure.ok && !(args.force ?? false)) {
      return text({ published: false, structure, hint: "Fix errors or pass force=true." });
    }
    const issue = draft.issue ?? (await db.nextIssue());
    const row = await db.publish(args.slug, issue);
    return text({ published: true, slug: args.slug, issue: row?.issue, url: `${BASE_URL}/journal/${args.slug}` });
  },
});

// 7. list_posts — inspect / dedup.
mcp.tool("list_posts", {
  description: "Lists posts (published, draft, or all), newest first — for inspection and dedup.",
  inputSchema: z.object({
    status: z.enum(["published", "draft", "all"]).default("all"),
    limit: z.number().int().min(1).max(50).default(20),
  }),
  handler: async (args: { status?: "published" | "draft" | "all"; limit?: number }) =>
    text(await db.listPosts(args.status ?? "all", args.limit ?? 20)),
});

// 8. get_post — full post by slug (any status).
mcp.tool("get_post", {
  description: "Returns the full stored post for a slug (draft or published).",
  inputSchema: z.object({ slug: z.string() }),
  handler: async (args: { slug: string }) => {
    const post = await db.getPost(args.slug);
    if (!post) throw new Error(`No post found for slug "${args.slug}".`);
    return text(post);
  },
});

// 9. update_post — edit fields on an existing post.
mcp.tool("update_post", {
  description: "Updates fields on an existing post (draft or published) by slug. Only provided fields change.",
  inputSchema: z.object({
    slug: z.string(),
    patch: PatchSchema,
  }),
  handler: async (args: { slug: string; patch: Record<string, unknown> }) => {
    const existing = await db.getPost(args.slug);
    if (!existing) throw new Error(`No post found for slug "${args.slug}".`);
    const updated = await db.patchPost(args.slug, args.patch as Partial<db.PostInput>);
    return text({ updated: true, post: updated });
  },
});

// 10. unpublish_post — pull a post back to draft (never deletes).
mcp.tool("unpublish_post", {
  description: "Reverts a published post back to draft so it disappears from the public site. Does not delete it.",
  inputSchema: z.object({ slug: z.string() }),
  handler: async (args: { slug: string }) => {
    const post = await db.getPost(args.slug);
    if (!post) throw new Error(`No post found for slug "${args.slug}".`);
    return text({ unpublished: true, result: await db.setStatus(args.slug, "draft") });
  },
});
