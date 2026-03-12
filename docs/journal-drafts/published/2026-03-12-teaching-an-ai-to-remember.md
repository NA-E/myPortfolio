---
date: 2026-03-12
project: OpenClaude
slug: teaching-an-ai-to-remember
title: TEACHING AN AI TO REMEMBER
subtitle: I improved my AI assistant's memory recall from 60% to 95% using the same train/val/test split we use in ML. Then I tested it live.
tags: [OpenClaude, Memory, Information Retrieval, Autoresearch]
author: Nourin
---

## TL;DR
OpenClaude has 10 AI agents that share a memory store. When you ask Jarvis "what was that moltbook double-posting bug?", he needs to find the right memory from 96 entries. The keyword algorithm scored 60%. I rewrote the recall function with stemming, synonym expansion, and tag tokenization, hitting 95% on training, 100% on blind holdout, and 100% on live end-to-end through the actual Telegram bot. The whole thing was designed like an ML experiment: training set, validation set, live test set. No embeddings. No API calls. Pure in-memory text matching.

## Sections

### THE PROBLEM: JARVIS FORGETS WHAT HE KNOWS
OpenClaude stores memories as JSON entries on disk. Each memory has content, tags, a category, and an importance score. When an agent needs context, it calls recall(query, 10) which returns the top 10 most relevant memories.

The original algorithm was dead simple: split the query into words, check if each word appears as a substring in the memory's content or tags, multiply by importance, add a recency boost. It worked for obvious queries like "playwright mcp browser automation." It completely failed for natural ones.

Ask "what was that bug where moltbook posted the same comment twice?" and the answer should be the isRunning mutex memory. But the memory says "concurrent" and the query says "simultaneous." The memory says "mutex" and the query says "posted twice." Zero keyword overlap. Zero score. The right answer doesn't even make the top 10.

### THE BENCHMARK: 96 MEMORIES, 20 QUERIES
I needed a way to measure improvement without guessing. So I exported all 96 real memories from the MCP memory graph into a benchmark file. Not synthetic data. Real memories from real sessions: bugs we hit, patterns we learned, gotchas that cost hours.

Then I wrote 20 test cases. 2 easy (direct keyword match), 3 medium (partial overlap), and 15 hard. The hard ones use natural language that a developer would actually type, with zero keyword overlap to the target memory.

The benchmark seeds all 96 entries into a temp MemoryFileStore, runs all 20 queries, and measures recall@10: what fraction of queries have the right answer in the top 10 results. Baseline: 0.6000. Target: 0.75.

### THE FIRST ATTEMPT: AUTORESEARCH LOOP (FAILED)
The plan was elegant. A loop runner spawns claude -p, Claude modifies recall(), the runner benchmarks it, keeps improvements, reverts regressions. Overnight optimization. No human in the loop.

It ran 20 iterations. Every single one scored 0.0000.

The problem was the code injection. The loop runner used a regex to find the recall() method in store.ts and replace it with Claude's output. The regex was fragile. Every iteration corrupted the file, broke the function signature, and the benchmark returned zero matches. Six different approaches, all the same result: regex ate the code.

### THE FIX: JUST DO IT DIRECTLY
I stopped trying to be clever and read the 8 failing cases myself. Each one had a clear semantic gap:

- "serializing simultaneous invocations" needs to match "concurrent Moltbook check-ins"
- "free tier API error causing fallback" needs to match "HTTP 402" and "Playwright"
- "normalizing garbled text" needs to match "doubled-letter obfuscation"

Three changes to recall() fixed it:

1. Suffix stemming. "signatures" becomes "signatur" which matches "signing" as a substring. "invocations" becomes "invoc." Simple suffix stripping, no library.

2. Domain synonym expansion. A map of 35 word pairs: "simultaneous" maps to ["concurrent", "parallel", "mutex"]. Synonyms score at half weight (0.5 vs 1.0 for exact matches) so they boost without dominating.

3. Tag tokenization. Tags like "moltbook-isrunning-mutex" get split on hyphens into ["moltbook", "isrunning", "mutex"]. Now a query containing "mutex" matches the tag.

Score jumped from 0.6000 to 0.9500. 19 out of 20 cases passing.

### THE WORRY: DID I JUST OVERFIT?
The synonym map was hand-picked to fix the exact 8 failing cases. That is textbook overfitting. A model that memorizes the training set and fails on anything new.

So I built the validation set. A separate Claude agent that could only see the 96 memory entries. Not the 20 training queries. Not the synonym map. It wrote 10 new test cases: 3 easy, 3 medium, 4 hard.

Validation score: 1.0000. All 10 pass, all at rank 1.

This was suspicious. Maybe the blind agent wrote easy queries by accident. The stemming and tag tokenization (the general improvements) might be doing all the work, and the synonym map might be irrelevant for these new queries. But that would mean the general improvements actually generalize. Which is the point.

### THE REAL TEST: TALKING TO JARVIS
Benchmarks run in a temp directory with synthetic setup. The live system has real sessions, real memories in ~/.openclaude/memory/, and real Claude subprocess calls generating responses. The only way to know if recall actually improved is to talk to Jarvis and see if he uses the right memories.

I wrote 5 natural conversation queries. Things you'd actually type in Telegram:

- "hey, what was that bug where moltbook posted the same comment twice?"
- "remind me why we use playwright to post tweets instead of the API directly"
- "the gateway keeps crashing with EADDRINUSE, what causes that?"

Each query checks if Jarvis's response contains key markers from the correct memory. Not just "did recall return it" but "did Claude actually use it in the answer."

The gateway was running on acc1 which was out of credits. Switched to acc3 via the runtime API (POST /api/runtime with {"account":"acc3"}), ran the test.

live@5: 1.0000. All 5 passed. Jarvis correctly recalled and explained the right memory every time.

### WHERE IT STANDS NOW
The recall function went from keyword-only to keyword + stemming + synonyms + tag tokenization. No external dependencies. No API calls. No embeddings. Runs in microseconds on 96 entries.

The autoresearch loop infrastructure is built but the autonomous part (claude -p editing the file) needs a better injection mechanism. The regex approach is dead. Next version should let Claude use its own Edit tool via --dangerously-skip-permissions instead of regex substitution.

The benchmark, validation, and live test are all in place. If someone improves recall() in the future, they run three commands and know immediately if it works.

## Recipes

### Recipe: ML-Style Evaluation for AI Memory
- **Problem**: You improved a retrieval function but don't know if it generalizes or just overfits your test cases.
- **Solution**: Split evaluation into three tiers. Training set (what you optimize against), validation set (written by a blind agent that cannot see training queries or the optimization), live test (real end-to-end through the running system). All three must pass.
- **Why it works**: Same principle as train/val/test in ML. Training catches regressions. Validation catches overfitting. Live catches integration bugs that benchmarks miss. A function that passes all three actually works.

### Recipe: Synonym Expansion at Half Weight
- **Problem**: Keyword search fails when users use different words than what's stored. "simultaneous" vs "concurrent."
- **Solution**: Add a synonym map. Expand query words with known synonyms. Score synonyms at 0.5x weight, exact matches at 1.0x. This lets synonyms boost relevant results without drowning out exact matches when they exist.
- **Why it works**: Half weight means an exact keyword match always outranks a synonym-only match. The synonym just gets the right result into the top 10, it doesn't have to be #1. And because recall returns 10 results, being anywhere in the top 10 counts as success.
- **Snippet**: `expanded.push({ word: synonym, weight: 0.5 });`

### Recipe: Tag Tokenization on Hyphens
- **Problem**: A tag like "moltbook-isrunning-mutex" only matches queries containing that exact string. A query with just "mutex" misses it entirely.
- **Solution**: Split hyphenated tags into sub-tokens. "moltbook-isrunning-mutex" becomes ["moltbook-isrunning-mutex", "moltbook", "isrunning", "mutex"]. Check query words against all tokens.
- **Why it works**: Hyphenated tags are compound identifiers. Splitting them lets any component match. This is a general improvement that helps every memory with hyphenated tags, not just the ones in the test set.
