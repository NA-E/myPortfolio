// Brand corpus for the journal MCP server.
//
// This is the single source of truth for "on brand". `get_style_guide`
// serves STYLE_GUIDE + MAPPING_GUIDE + the reference digests; `check_draft`
// returns the reference digests + TONE_RUBRIC so the routine can judge its
// own draft's tone against them (the server does not call a model).

/** The two sample digests Nourin supplied — the canonical tone anchor. */
export const REFERENCE_DIGESTS: { label: string; text: string }[] = [
  {
    label: "CLAUDE & ANTHROPIC DIGEST — July 9–10, 2026",
    text: `CLAUDE & ANTHROPIC DIGEST — July 9–10, 2026
Condensed from ~13 newsletters/emails in your inbox so you don't have to read them all.

1. BIG NEWS

• Fable 5 access restored after export-control suspension. Claude Fable 5 (and the more capable internal "Mythos" tier) was pulled for ~3 weeks after a June 12 U.S. Commerce Dept export-control order — triggered when Amazon researchers used Fable 5 to obtain cyberattack info shortly after its June 9 global launch. Anthropic added safety classifiers and restored access July 1 for the API, Claude Code, and other platforms. Paid-plan users get full (uncapped) Fable 5 access through July 12 before usage limits kick back in. Some users report new guardrails silently downgrading coding/biology queries to Opus 4.8. (The Batch / DeepLearning.AI)

• Anthropic committed $50B to new U.S. data centers (Texas + New York, built with Fluidstack) to meet Claude demand — reported in two separate newsletters today. (The Rundown, The Neuron)

• Claude Cowork rolling out to web and mobile for Max subscribers — remote agent sessions now persist across devices, not just desktop. Positioned as the middle ground between plain chat and full Claude Code: no terminal required, real UI, memory. (The Neuron, The Rundown, Artificial Corner)

• Rumor: Fable 5.1 is reportedly "deep in Anthropic's pipeline" for release in the coming weeks. Unconfirmed, sourced to an r/ClaudeCode thread. (The Neuron)

2. FABLE 5 vs GPT-5.6 — HOW THEY STACK UP

• Coding: Fable 5 scores 80.3% on SWE-bench Pro vs GPT-5.5's 58.6%. On Every.to's "Senior Engineer" benchmark, Fable scored 90/100 vs GPT-5.6 Sol's 56/100. Boris Cherny (creator of Claude Code) is quoted calling Fable 5 "the best model I have used for coding, by a wide margin." (AI with Allie, Every.to Vibe Check)

• But GPT-5.6 Sol wins on speed and steerability, and is cheaper ($1–5 input / $6–30 output per million tokens vs Fable's $10/$50).

• Cost-saving tip going around: don't run everything on Fable 5. Use the /advisor skill in Claude Code to let cheap Sonnet 5 escalate to Fable only when stuck — cited result: ~92% of Fable's solo SWE-bench score at ~63% of the cost.

3. HOW PEOPLE ARE ACTUALLY USING IT

• "Second brain" workflows: two separate newsletters describe using Claude Code to scaffold a personal knowledge base, then Fable 5 to run a deep "audit" pass across months of notes. McFarland's line: "The model is rented. The brain is yours."

Sources this digest was built from: The Batch (DeepLearning.AI), Every.to "Vibe Check", AI with Allie, The Rundown AI, The Neuron, Artificial Corner, Alex McFarland, Mike Futia, The Pragmatic Engineer, Taplio, Luma event invite.

— Compiled automatically by Claude from your daily inbox scan.`,
  },
  {
    label: "CLAUDE & ANTHROPIC DAILY DIGEST — Wed 8 Jul 2026",
    text: `CLAUDE & ANTHROPIC DAILY DIGEST — Wed 8 Jul 2026
(Condensed from your newsletter inbox so you don't have to read them all)

1. ANTHROPIC RESEARCH: Claude's "hidden workspace" (J-space)
Source: The Neuron, The Rundown

- Anthropic published research finding a small internal "workspace" inside Claude — nicknamed "J-space" — where the model holds and edits concepts before they show up in its answer. Researchers say it wasn't designed; it "emerged on its own" during training.
- Demo: asked "how many legs does the animal that spins webs have," Claude internally loaded the concept "spider" then answered 8. When researchers swapped the internal concept to "ant," it answered 6.
- When researchers suppressed J-space, Claude could still chat fluently but its multi-step reasoning collapsed.
- Why it matters: gives researchers a possible new way to inspect a model's unstated "thoughts."

2. FABLE 5: PRICING CHANGED THIS WEEK
Source: Every.to (Context Window)

- As of today, Fable 5 is no longer included in the weekly usage limits for Claude Pro, Max, Team, and select Enterprise plans — it has moved to pay-as-you-go usage credits. It's roughly 2x the cost of Opus 4.8 per use.
- Anthropic's own guidance (via staffer Thariq Shihipar): don't save Fable just for "big" tasks — it's most worth its price when the goal/standard itself might be wrong, not just when the task is large.

3. PRACTICAL GUIDE: Which Claude model to use, and when
Source: The AI Break

- Haiku 4.5 — fastest/cheapest. Quick rewrites, formatting, brainstorm lists.
- Sonnet 5 — your default/daily driver. Drafting, summarizing, research briefs, editing, planning.
- Opus 4.8 — heavier, for high-stakes thinking: pricing/hiring decisions, contract review.
- Fable 5 — the specialist, most expensive. Save for the 1-2 genuinely hard, open-ended problems a month.

4. CLAUDE CODE — SPOTTED IN THE WILD
- "Master Claude Code for Product Building and Agentic GTM" — a 6-week Maven course announced its second cohort, starting Aug 4.
- Quick industry note (The Neuron): Alibaba reportedly banned employees from using Claude Code internally.

That's everything Claude/Anthropic-related that landed in your inbox recently.`,
  },
];

/** House voice + structure rules. Served by get_style_guide. */
export const STYLE_GUIDE = `# Nourin's Journal — House Style Guide

You are writing a public "Daily Digest" post for Nourin's journal at nourin.dev/journal.
The journal's ethos: "Building in public — what I made, what broke, and the patterns I
extracted." Each post is agent-readable: a reader can point their own Claude at the URL
and lift the concrete details directly.

## Voice
- Direct, specific, no filler. Plain language a smart non-expert understands.
- NEVER vague. No "various improvements", "several updates", "the AI space is evolving".
  Every claim carries a number, version, price, URL, command, or named source.
- Confident and calm. No hype, no marketing adjectives ("game-changing", "revolutionary",
  "insane"), no emoji, no exclamation marks.
- First person is fine and on-brand ("I'd reach for…", "what I'd try this week"), but the
  post speaks to a PUBLIC reader — not to Nourin. See the mapping rules.

## Structure (maps to the JournalEntry schema)
- title: short, in CAPS, concrete. The single headline of the day.
- subtitle: one line — what happened and why it matters.
- tldr: 2–4 sentences. The punchline a reader gets in ten seconds. What's new, what to do.
- sections[]: each { heading (CAPS), paragraphs[], bullets? }. One section per story beat.
  Lead with the biggest news. Group related items. End with a sources beat when relevant.
- tags: 3–6, e.g. ["Fable 5", "Claude Code", "Pricing"].
- project: "Daily Digest".
- recipes: usually empty for a digest. Only add a recipe if the day produced a genuinely
  reusable, copy-pasteable pattern (a command, a workflow). Leave [] otherwise.

## Quality bar (from the reference digests)
- Specific over general: exact prices ($10/$50 per M tokens), versions (Fable 5, Opus 4.8),
  benchmarks (80.3% SWE-bench Pro), stars, commands (/advisor), URLs.
- Attribute sources inline, e.g. "(The Rundown, The Neuron)".
- Flag rumors as rumors ("Unconfirmed, sourced to an r/ClaudeCode thread").
- Include a closing sources beat listing the newsletters the day was built from.`;

/**
 * How to turn the routine's private daily learning digest into a public post.
 * The routine's raw output is a personal learning log; two of its sections are
 * internal and must NOT be published.
 */
export const MAPPING_GUIDE = `# Mapping the routine's digest → a public post

The routine's daily file has these sections. Map them like this:

KEEP and map into sections[]:
- "What I Learned Today"        → the main body sections (one per TYPE/story beat).
- "Top Thing to Implement Now"  → a section, or fold into the TL;DR if short.
- "What I'm Noticing Over Time" → a "PATTERNS" section (great public content).

DROP entirely (internal, never publish):
- "What I've Done"   — git/commit plumbing addressed to the system.
- "My Question for You" — a prioritization question addressed to Nourin personally.

REFRAME:
- The raw digest is addressed to "Nourin". The public post is addressed to a general
  reader. Strip second-person-to-Nourin ("Nourin, you should…") → neutral or first person.
- Keep every concrete number/version/URL/source. Those are the whole value.

SLUG: kebab-case, date-stamped is fine, e.g. "claude-digest-2026-07-13".
DATE: human display form, e.g. "July 13, 2026".`;

/** The checklist check_draft returns for the routine to self-judge tone. */
export const TONE_RUBRIC: string[] = [
  "Every claim carries a specific: number, version, price, URL, command, or named source. No vague summaries.",
  "No hype or marketing adjectives (game-changing, revolutionary, insane), no emoji, no exclamation marks.",
  "Sources are attributed inline, and a closing sources beat lists the newsletters the day drew from.",
  "Rumors are labelled as rumors, not stated as fact.",
  "The post speaks to a public reader — no text addressed to Nourin, no 'What I've Done' git plumbing, no 'My Question for You'.",
  "Reads like the two reference digests: condensed, calm, high signal-per-word.",
];
