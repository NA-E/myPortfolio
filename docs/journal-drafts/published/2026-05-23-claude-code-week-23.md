---
issue: 7
slug: claude-code-week-23-2026
date: May 23, 2026
title: ROUTINES MAKE CLAUDE PROMPT ITSELF
subtitle: The week the default shifted from prompting Claude to having Claude prompt Claude.
project: Field Notes
author: Nourin
tags: ['Claude Code', 'Routines', 'Auto Mode', 'Work Trees', 'Auto Memory']
tldr: Anthropic shipped Routines, Auto Mode, Work Trees, and Auto Memory in the same window. Together they push the developer up one level. You stop typing prompts and you start writing the thing that types the prompts. The recipes at the bottom are the exact setup steps.
---

# WHAT YOU'LL LEARN

1. Routines are a saved prompt that fires on a schedule, on a webhook, or on a GitHub event. They run in the cloud while your laptop is closed.
2. Local routines have four fields and zero setup. Remote routines add a repo, env vars, and connectors. Start local, graduate to remote.
3. Auto Mode is a new permission setting. A classifier decides if a tool call is safe or risky. Safe ones run without asking. You stop saying yes one hundred times an hour.
4. Work Trees ship as a first-class flag. The command is cloud -w. Each new feature gets its own folder and branch so parallel agents do not step on each other.
5. Auto Memory writes a memory.md index file per project. Claude decides what to remember between sessions. It is the same progressive disclosure pattern that powers skills.
6. Secrets go in the environment variables panel, not in a .env file. Routines clone your repo from GitHub. .env is in .gitignore. The cloud run never sees it.
7. Verification loops are how async coding actually works. Claude runs the change, hits the browser through Playwright, watches the result, and only stops when it passes.

# WHY THIS MATTERS

The model is not the bottleneck anymore. The bottleneck is how much of your attention each task still needs. Routines, Auto Mode, and Work Trees all attack the same problem from different angles, which is your laptop being open and your eyes being on the screen.

# ROUTINES ARE A HIGHER ORDER PROMPT

Boris from the Cloud Code team said the line that stuck with me. The default isn't I'm going to prompt Cloud Code. The default is now I'm going to have Cloud prompt Cloud Code. A routine is a saved prompt plus a trigger.

You write the paragraph once. You pick a cron, a webhook, or a GitHub event. Cloud spins up a fresh environment, runs the prompt, and pushes the result.

The creators using routines well already have a routine watching their repo for new issues, a routine fixing CI failures on every PR, and a routine triaging unread email at 8am local time. Each one used to be a manual task. Now each one runs while they sleep.

# LOCAL OR REMOTE IS THE FIRST FORK IN THE ROAD

Click new routine and Claude asks the question right away. Local means it runs on your machine, in your CPU, while Claude Code is open. Remote means it runs on Anthropic servers in a fresh Linux box.

Local has four fields. Name, description, instructions, schedule. No GitHub. No env vars. No connectors. You can ship a local routine in under five minutes.

Remote adds a private GitHub repo as a workspace, a panel for environment variables, and a connectors directory for Slack, Gmail, Notion, Linear. The only reason to skip local is if you need the laptop off promise or you need real connectors.

Start local, prove the logic, then graduate. Don't try to set up a remote routine on day one.

# THE ENV TRAP IS THE BUG EVERYONE HITS

This is the one that cost the creators using routines the most hours. Cloud Code on your laptop reads secrets from .env. Every developer has muscle memory for this. So when a remote routine needs an API key, the instinct is to put it in .env.

It will fail silently. .env is in .gitignore. GitHub never sees it. The remote cloud environment clones the repo, finds no key, and either crashes or, worse, runs without it.

The fix is two parts. Put every secret in the environment variables panel inside cloud environment. Add a single line to the prompt: "The API key is available as an environment variable. Do not look for a .env file." That last sentence matters because Claude will try the .env path by habit if you don't tell it not to.

# AUTO MODE, WORK TREES, AND AUTO MEMORY ARE THE QUIET WINS

Auto Mode is a new permissions mode. Instead of prompting for every shell command, a classifier checks two things. Is the action destructive. Does it look like prompt injection. If neither, it runs. If either, Claude blocks it and figures out what to do next.

The win is concrete. A long-running session no longer freezes the moment Claude wants to read a file. You come back to finished work, not a pending prompt.

Work Trees got a real upgrade. The flag is cloud -w. You can also tell Claude in plain English to create a work tree, and a new enter-work-tree tool will do it. Each tree is its own folder and its own branch.

The creators using work trees run three or four sessions at once. One does refunds. One does color schemes. One does the slider. Nothing steps on anything else.

Auto Memory writes a memory.md file per project. It is to memory what skills are to instructions. Claude picks what to keep, and the index links out to deeper files only when needed. Less context spent on the same setup every session.

# VERIFICATION IS HOW ASYNC CODING ACTUALLY WORKS

The thing the keynote demos kept circling back to was verification. A routine running for thirty minutes is only useful if you trust the result when you wake up. So the agent has to check its own work.

The pattern looks like this. Claude writes the change. It pulls up the dev server, opens the browser through Playwright, and triggers the new feature. It watches for the result. If a modal closes before a success toast appears, it sees that, traces the race condition, fixes it, and reruns.

The senior engineers shipping with this pattern then layer in a second pass. A QA skill runs the app like a real user, breadth-first through the pages. Every bug found gets handed back to a fix loop. The whole cycle stops when two iterations come back clean.

The point isn't that Claude is good at testing. The point is that without verification, you can't trust anything an async agent ships. Verification is the price of running things while you are not watching.

# WHERE THE CREATORS DISAGREE

Two friction points worth flagging.

First, the one-hour minimum on routine schedules. Anthropic capped scheduled triggers at one hour. The argument is that anything more frequent should be an API trigger or a GitHub event. The argument against is that thirty-minute polling is a real use case and now requires a second cron service like Zapier to fire the API trigger. Both sides have a point.

Second, the build-loop pattern using GitHub Projects as a kanban for Claude. Some creators love it because the agent picks the next ticket on its own. Others say it is overkill for solo dev and slows the iteration loop. I will probably try the GitHub Projects flow this week on something small before I commit.

# WHAT I'D TRY THIS WEEK IF I WAS STARTING OVER

If I was new to Claude Code today, here's the order I'd install things:

- Routines on local mode first. Pick one morning task you do by hand. Wire it up. See it fire once.
- Auto Mode on. The permission prompts were never adding safety, they were adding friction.
- Work Trees as the default when you start a new feature. cloud -w from the terminal.
- Auto memory enabled per project. memory user for cross-project things, memory project for one repo.
- Playwright CLI in the toolchain so Claude can verify its own UI changes.
- One remote routine that drops a daily summary into Slack. This is the lowest-stakes way to learn the env vars panel without something important breaking.

# WHERE I'M LEARNING THIS FROM

- [Code with Claude London 2026: Opening Keynote](https://www.youtube.com/watch?v=6amLO7I9xdg) by Claude. Boris and Cat walking through routines, autofix, and the desktop app.
- [Code with Claude 2026: What's New in Claude Code](https://www.youtube.com/watch?v=2g8A53SIv3w) by Techusiness. Dickson's tour of Auto Mode, Work Trees, Auto Memory, and the /loop slash command.
- [How to Use Claude Routines, Full Workflow Automation Guide 2026](https://www.youtube.com/watch?v=w4MbjaMFrAM) by AI Master. The deep dive on local vs remote, the env trap, and the seven gotchas.
- [My Complete Claude Code Workflow (Amazon Engineer Edition)](https://www.youtube.com/watch?v=3DYYFj_MBkM) by Eric Tech. Spec-driven phases, GitHub Projects as the agent kanban, and the verify-fix loop.
- [I Mapped Every Claude Code Concept So You Don't Have To](https://www.youtube.com/watch?v=9JoIpWgAsZ8) by Prograamer. The full mind map of Claude Code in 2026 if you want a single tree to keep open in another tab.

# RECIPES

## 1. Your first local routine in five minutes

Problem: You want to try routines but every tutorial assumes you have a GitHub repo, a cloud environment, and three connectors authorized. You don't have that yet.

Solution: Open claude.ai/code/routines, click new, then click local. Fill four fields. Name your routine. Write a one-sentence description. Paste a paragraph prompt. Pick a schedule. Save.

Why: Local routines run on your machine while Claude Code is open. There is no repo, no env vars, no connectors. Just a paragraph and a clock. It is the fastest way to feel the shape of the product before you commit to remote infrastructure.

Snippet:
```
Name: Daily AI brief
Description: Every weekday morning, scan top AI news and write a three-bullet briefing.
Instructions: Every weekday morning, search the web for the most significant
  AI news from the last 24 hours. Focus on model releases, major product
  launches, and concrete benchmark results. Skip funding announcements and
  opinion pieces. Pick the three highest signal stories. For each, write
  the headline, one sentence on what shipped, and one sentence on why it
  matters. Output plain text to the session log.
Schedule: Weekdays at 8:00am local
```

## 2. Secrets in the environment panel, not .env

Problem: Your remote routine needs an API key. You put it in .env like you always do. The routine fails silently or runs without the key. You spend two hours debugging.

Solution: Open the cloud environment panel of your remote routine. Add the key as an environment variable. Then add one explicit line to your prompt: "The API key is available as an environment variable. Do not look for a .env file."

Why: .env is in .gitignore. The remote cloud environment clones your repo from GitHub. The .env file never makes it across. The explicit prompt line stops Claude from trying the old habit anyway.

## 3. The API trigger for sub-hourly schedules

Problem: The minimum schedule for a routine is one hour. You need something to run every fifteen minutes.

Solution: Switch the trigger from schedule to API. Each routine gets its own HTTPS endpoint and bearer token. Use any external cron, a Zapier webhook, a form submission, or a cheap n8n flow to POST to that endpoint as often as you want.

Why: Anthropic capped scheduled triggers but left the API trigger open. The cron service handles the timing. The routine handles the reasoning. Not competitors, collaborators.

Snippet:
```bash
curl -X POST https://api.anthropic.com/v1/routines/<id>/invoke \
  -H "Authorization: Bearer $ROUTINE_TOKEN" \
  -H "anthropic-beta: experimental-cc-routine-20260401" \
  -H "Content-Type: application/json" \
  -d '{}'
```

## 4. Work trees with cloud -w

Problem: You want to run three Claude sessions in parallel on the same repo. Each one is editing files. They keep colliding.

Solution: Start each new session with cloud -w. Claude creates a new git worktree, copies the repo, and opens a fresh branch. The session lives in its own folder. No collisions.

Why: Git worktrees existed before this, but the sharp edges made them painful. The new flag handles the cleanup. You can also declare shared files like node_modules in your Claude Code settings so each tree doesn't reinstall everything.

Snippet:
```bash
cloud -w
# inside Claude: "add a sixth color to the stroke palette"
# meanwhile in another terminal:
cloud -w
# inside Claude: "add a border radius slider"
```

## 5. The /loop slash command for in-session cron

Problem: Routines need to be saved and configured. Sometimes you just want one task to repeat for the next hour while you do something else.

Solution: Inside a Claude Code session, run /loop 5m <prompt>. Claude schedules itself with the cronCreate tool and reruns the prompt every five minutes until you say stop the loop.

Why: This is routines without the overhead. No repo, no save. Just a short-lived loop you can cancel with natural language. Useful for polling a build, watching a metric, or babysitting a deploy.

## 6. Auto memory per project

Problem: You spend the first ten minutes of every new session re-teaching Claude the same project facts. Build commands. The repo layout. The dev server port.

Solution: At the start of a fresh project, tell Claude "remember the key build commands and any debugging insights for this project." Claude creates a memory directory with a memory.md index file. It accumulates facts across sessions on its own.

Why: memory.md is loaded into context like CLAUDE.md, but Claude manages it instead of you. Progressive disclosure means the index links out to detailed files only when needed. You stop paying the re-teach tax on every session.

## 7. Two-routine approval gate

Problem: You want a routine that sends client emails or deploys to production, but you don't trust an unattended agent to make that call without a human in the loop. There is no built-in pause-and-confirm.

Solution: Split it into two routines. Routine A drafts the action and posts to Slack with the proposed message. You approve in Slack. Routine B fires via API trigger and executes the approved action.

Why: There is no mid-run human approval inside a single routine. The approval gate lives between two routines, not inside one. Slack becomes the queue. Your thumbs-up becomes the trigger.
