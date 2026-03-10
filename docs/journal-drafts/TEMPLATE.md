# Journal Draft Template
# Copy this file to YYYY-MM-DD-[slug].md and fill in each section.
# Run /publish-journal in the nourin-portfolio project to turn this into a live post.

---
date: YYYY-MM-DD
project: OpenClaude
issue: (auto-assigned — leave blank, publish-journal fills it in)
slug: short-kebab-case-slug
title: TITLE IN CAPS
subtitle: One line. What happened and why it matters.
tags: [Tag1, Tag2, Tag3]
---

## TL;DR
One paragraph. What was built/fixed, what broke, what the punchline is.
Keep it tight — this is what agents read first when extracting recipes.

## Sections
Each section = one story beat. Sections should flow as a narrative arc:
- Setup / context / the idea
- The attempt / what we tried
- The problem / what broke
- The fix / what clicked
- Where things stand now

For each section, include:
### HEADING IN CAPS
Paragraphs of prose. First person, past tense. Specific details (timestamps,
error messages, exact file paths) make it real. Don't sanitize the failures.

## Recipes
One recipe per pattern extracted. Each recipe should be independently usable.

### Recipe: [Name]
- **Problem**: What situation triggers this
- **Solution**: What to do
- **Why it works**: The underlying reason (not just what, but why)
- **Snippet** (optional): Minimal code showing the pattern

---
## Session Notes (not published — delete before commit)
Raw notes from the session. Anything that happened, broken or not.
Use this section during the session to capture things while they're fresh.
The /publish-journal skill will strip everything below the "---" divider.
