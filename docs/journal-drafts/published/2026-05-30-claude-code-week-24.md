---
issue: 9
slug: claude-code-week-24-2026
date: May 30, 2026
title: STOP TYPING ONE PROMPT AT A TIME
subtitle: The shift this week was from running one Claude at a time to orchestrating many, plus the context discipline that keeps it from turning into a mess.
project: Field Notes
author: Nourin
tags: ['Claude Code', 'Workflows', 'Skills', 'Routines', 'Parallel Agents']
tldr: The model has not been the bottleneck for a while. Your attention is. Almost everything sharp this week points at the same idea, take yourself out of the loop without losing control of the result. That means lean context, reusable skills, phased plans, many agents running at once, and routines that work while your laptop is closed. The recipes at the bottom are the exact setup steps.
---

# WHAT YOU'LL LEARN

1. Context discipline is the cheapest win there is. A lean CLAUDE.md plus a .claudeignore can cut a session's token use by half because Claude stops reading junk like node_modules.
2. Skills are the unit of reuse. Package a repeatable job once, push it to GitHub, and pull it into any new project with a single command.
3. Plan first, then split the plan into phases. Letting Claude one-shot an entire app in a single session is the mistake that burns the most hours.
4. A feedback loop is what makes the output trustworthy. Tell Claude to write a test, run it, and keep going until it passes on its own.
5. Parallelism is the real unlock. Worktrees, sub-agents, and dynamic workflows all let many Claudes work at once instead of one prompt at a time.
6. Hooks and CI turn good intentions into guarantees. A rule in a markdown file can be forgotten in a long session, a hook cannot.
7. Routines move the work off your keyboard. A scheduled or event-triggered Claude can open the pull request before you sit down.

# WHY THIS MATTERS

The model stopped being the bottleneck a while ago. What is left is your attention, every prompt you type and every yes you click. Almost everything sharp this week is really one idea, take yourself out of the loop without losing control of the result.

# CONTEXT IS A BUDGET, SPEND IT ON PURPOSE

Claude reads your project at the start of every session. If that context is bloated, you pay for it twice, once in tokens and again in quality, because a full window starts to forget early details and make things up.

The fix is two small files. CLAUDE.md holds the always-true rules of your project, kept short, things like your stack, your naming, and what Claude should never do. A .claudeignore is just a list of files Claude should not read at all.

The numbers people are quoting are big. One creator measured node_modules alone eating around 70 percent of the context before Claude read a single line of real code, and a .claudeignore cutting token use by 50 to 70 percent. Another keeps his rules file to about 37 lines and routes everything else out to a separate file.

- CLAUDE.md is for rules that never change, not task steps. Task instructions belong in the prompt.
- .claudeignore should list node_modules, build and dist folders, lock files, and your .env.
- Use /compact when a long session slows down, /clear when you switch to a brand new task, and /insights for a report on how you have been using Claude Code.

# SKILLS ARE HOW YOU STOP REPEATING YOURSELF

A skill is a folder under .claude/skills with a skill.md file inside it. You trigger it with a forward slash and its name, and Claude runs the steps you wrote down once.

The creators leaning on this turn almost every repeatable job into a skill. One ships a skill that scaffolds his whole tech stack, a checkpoint skill that commits with a one-line summary, and another that turns a rough plan into phased task files.

The sharing part is the good part. You push a skill to a GitHub repo and install it into a new project with one command, npx skills and the repo name, so your setup follows you everywhere.

Design fits the same mold. The creators avoiding the generic purple look wire it in through a front-end design skill and tools like Paper or Google Stitch, then save the result in a design.md file that every new page has to follow.

# PLAN IN PHASES, NEVER ONE-SHOT THE WHOLE THING

The most expensive mistake this week was the same one every time, approving a plan and then telling Claude to build the whole app in one session with permissions bypassed. One creator with nearly twenty years of experience called that a massive mistake outright.

The better move is planning mode first, where you push Claude to ask clarifying questions instead of guessing. Then you break the plan into phases, each with its own checklist, often saved as task files in a specs folder so no single session has to hold everything.

A feedback loop is what makes any of it trustworthy. The most quoted line, from the team that built Claude Code, is that giving an agent a way to check its own work improves the result two to three times. In practice that means one sentence in your prompt, write the test first, run it, and do not stop until it is green.

# THE REAL UNLOCK IS MANY CLAUDES AT ONCE

Running one agent, in one terminal, on one branch, is the bottleneck nobody names. Three ways to break it showed up this week.

- Git worktrees give each agent its own folder and branch, so five Claudes can fix bugs, add tests, and write docs at the same time with zero merge conflicts.
- Sub-agents let one main agent act as a coordinator and fan work out in waves, instead of making every edit itself.
- Dynamic workflows go furthest. The main agent writes an orchestration script, a kind of planner, and spawns tens or even hundreds of sub-agents that run in phases and sync at the end.

You kick off a dynamic workflow by adding the word workflow to your prompt, or by bumping the effort menu up to ultra code for the really long jobs. You watch them run with /workflows. This is overkill for small tasks, and the creator who demoed it said so himself, normal effort is fine most of the time.

It helps that the newest model, Opus 4.8, costs the same as the last one but runs noticeably faster. That is what makes spinning up a crowd of agents something you can actually afford to do.

# HOOKS, CI, AND ROUTINES TAKE YOU OUT OF THE LOOP

A rule you write in CLAUDE.md is a suggestion. Deep in a long session Claude can forget it. A hook cannot, because it is wired to fire on an event whether Claude remembers or not.

The common example is a hook that runs your linter every time Claude writes or edits a file, set once in settings.json. Others add a hook that announces out loud when a task finishes, or one that scans for secrets before they get committed.

CI is the same idea one level up. The flag claude -p runs Claude with no chat window, so a GitHub Action can have it review the diff on every pull request. Keys live in GitHub secrets, never in the prompt.

Routines are the furthest version of this. A routine is a remote Claude Code session on managed infrastructure, triggered by a schedule or a GitHub event, so the work happens while your laptop is closed. Anthropic's own team runs one that keeps its documentation in sync as code gets merged.

The clean way to think about a routine is three decisions, when it triggers, what context it can see, and how you keep it honest. The last one matters most. Whatever access you give it is the ceiling on how well it can do, and a second routine that reviews the first one's pull request is a cheap way to add a check before anything reaches you.

# WHERE THE CREATORS DISAGREE

Two tensions are worth flagging.

First, spec frameworks. One creator builds detailed phased specs by hand but flatly rejects the popular frameworks for it, saying they wasted him hours. The idea of phased specs is sound, but the heavy tooling around it is where people split.

Second, how much to let an agent run unattended. The same workflow that loops a security scan every ten minutes also loops in one low-risk UI change every fifteen, with no prompt. That is fun on a side project and nerve-racking on anything real, so I would gate the autonomous edits behind a review.

# WHAT I'D TRY THIS WEEK IF I WAS STARTING OVER

If I was new to Claude Code today, here is the order I would set things up.

- A .claudeignore and a lean CLAUDE.md, before anything else. Lowest effort, biggest immediate token saving.
- One checkpoint skill that commits with a one-line summary. You will reach for it constantly.
- The feedback-loop prompt on your next real task. Write the test, run it, do not stop until green.
- Git worktrees the next time you have two features to build. One terminal each.
- One routine for a boring recurring chore, like a weekly issue triage that drops its summary in Slack. The lowest-stakes way to learn the trigger, context, and steering model.

Two things I would skip for now. Bypassing permissions to build a whole app in one go, and any unattended agent that edits code without a review gate.

# WHERE I'M LEARNING THIS FROM

- [10 Claude Code Tips That Will Change How You Code (2026)](https://www.youtube.com/watch?v=T5jylUte3J8) by Thetips4you. The ten-feature tour, CLAUDE.md, .claudeignore, hooks, worktrees, and the feedback loop.
- [Claude Code Advanced Workflow - Build & Ship Real Apps](https://www.youtube.com/watch?v=zVZotTk6ZWU) by Leon van Zyl. Skills, design systems, phased specs, and the build-until-done loop.
- [Opus 4.8 + Claude Code's NEW Dynamic Workflows is INSANE](https://www.youtube.com/watch?v=ReTx6ku4_dc) by Eddie Chen. How dynamic workflows fan out across many agents and the two ways to trigger them.
- [Build a proactive agent workflow with Claude Code](https://www.youtube.com/watch?v=eSP7PLTXNy8) by Claude. Maya from Anthropic on routines, triggers, context, and steerability.
- [My Claude Code workflow to A/B startups in seconds](https://www.youtube.com/watch?v=YiitvyQGbkc) by Greg Isenberg. Wiring MCP tools and design skills together to go from idea to landing page fast.

# RECIPES

## 1. The two-file context diet

Problem: Every session feels slow and Claude keeps reading files that have nothing to do with your code.

Solution: Add a CLAUDE.md with only your always-true rules, and a .claudeignore that lists the folders Claude should ignore. Keep the rules file short, around 200 lines or less.

Why: CLAUDE.md loads on every session, so anything task-specific in it is a tax you pay forever. The .claudeignore stops Claude from burning most of its window on machine-generated files before it reads a line of your real code.

Snippet:
```
# .claudeignore
node_modules/
dist/
build/
.next/
*.lock
package-lock.json
.env
```

## 2. A checkpoint skill for one-line commits

Problem: You want frequent commits with readable messages, but writing them by hand keeps breaking your flow.

Solution: Create .claude/skills/checkpoint/skill.md with steps that stage your changes and commit with a one-line summary. Run /checkpoint whenever you want a snapshot.

Why: A skill runs the same steps every time with no re-explaining. Frequent checkpoints give you safe points to roll back to when an agent goes down a wrong path.

Snippet:
```
---
name: checkpoint
description: Stage all changes and commit with a one-line summary.
---
1. Run git add -A
2. Summarize the diff in one line, present tense.
3. Commit with that line as the message.
```

## 3. The feedback-loop prompt

Problem: Claude writes code that looks right, you find the bugs later, and you bounce messages back and forth fixing them.

Solution: Put the check inside the request. Ask Claude to write a test first, run it, and keep iterating until it passes, before it hands anything back to you.

Why: An agent that can verify its own work delivers a finished result instead of a draft. The team that built Claude Code put the gain at two to three times the quality.

Snippet:
```
Add email validation to the signup form. Write a test for it first,
run the test, and do not stop until it passes. Show me the passing run.
```

## 4. Parallel agents with git worktrees

Problem: You have three things to build but one terminal, and running them in sequence wastes the whole afternoon.

Solution: Make a worktree, a second working folder linked to the same repo, for each task. Each one gets its own branch. Start a Claude Code session in each folder, then merge the branches when each task is done.

Why: Separate branches mean zero merge conflicts while three agents work at once. Same repo, same history, different files.

Snippet:
```bash
git worktree add ../app-bugfix bugfix
git worktree add ../app-tests tests
git worktree add ../app-docs docs
# open a Claude Code session in each folder
```

## 5. Trigger a dynamic workflow for the big jobs

Problem: You have a task too big for one agent, like a migration that touches hundreds of files or a plan you want stress-tested from every angle.

Solution: Add the word workflow to your prompt. Claude writes an orchestration script and fans the job out across many parallel sub-agents, then syncs the results. Watch progress with /workflows.

Why: One agent reads and edits in sequence. A workflow runs phases in parallel, which is the difference between minutes and hours on a large task. Save the ultra code effort setting for the genuinely huge jobs.

Snippet:
```
Audit every route in this repo for missing auth checks and write a report,
then propose fixes. Use a workflow.
```

## 6. A scheduled routine that stays honest

Problem: A recurring chore eats your time every week, but you do not trust an unattended agent to do it without supervision.

Solution: Create a routine with /schedule. Decide three things, when it triggers, what repos and connectors it can see, and how you check it. Add a second routine that reviews the first one's pull request before you do.

Why: Routines run on managed infrastructure, so your laptop can be closed. The context you grant is the ceiling on quality, and one agent reviewing another catches mistakes before they reach you.

Snippet:
```
Once a week, review everything merged to main against the docs repo and
open a pull request if anything is out of date. Ping me on Slack when it is up.
```
