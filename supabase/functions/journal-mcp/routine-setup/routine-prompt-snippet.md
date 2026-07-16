# Append this to the routine's prompt (the blog-publishing step)

Add a final step to the daily routine, AFTER it has committed the learning
digest to the repo. It reuses the digest it just wrote.

---

## STEP: PUBLISH A PUBLIC VERSION TO THE BLOG

After committing `entries/YYYY-MM-DD.md`, publish an on-brand public version of
today's digest to Nourin's journal using the `journal` MCP tools. Do NOT curl or
use Bash for this — only the MCP tools can reach the blog from this sandbox.

Follow this pipeline exactly:

1. Call `get_style_guide` — read the house voice, the mapping rules, and the
   reference digests. This is the tone you must match.
2. Call `suggest_next_issue` with your proposed slug
   (e.g. `claude-digest-2026-07-13`) to get the issue number and confirm the
   slug is free.
3. Write the post as a JournalEntry, applying the mapping rules:
   - Map "What I Learned Today", "Top Thing to Implement", and "What I'm
     Noticing Over Time" into `sections[]`.
   - DROP "What I've Done" and "My Question for You" — never publish those.
   - Keep every number, version, price, URL, and source. `project` = "Daily Digest".
   - `recipes` = [] unless the day produced a genuinely reusable pattern.
4. Call `create_draft` with the post. If it returns structure errors, fix and retry.
5. Call `check_draft` with the slug. Then:
   - If `structure.ok` is false → fix and re-run `create_draft`.
   - If `dedup.overlaps` is non-empty → drop/reframe the repeated stories so you
     are not republishing yesterday's news, then re-run `create_draft`.
   - Judge the draft against `toneCheck.rubric` and `toneCheck.referenceDigests`.
     If the tone drifts (hype, vagueness, addressed-to-Nourin, missing sources),
     revise and re-run `create_draft`.
6. When structure passes, there are no unresolved overlaps, and the tone matches,
   call `publish_post` with the slug. It returns the live URL.
7. In the run transcript, report the published URL and issue number alongside the
   git commit SHA.
