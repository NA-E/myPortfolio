---
issue: 8
slug: claude-cowork-week-23-2026
date: May 23, 2026
title: COWORK IS NOT CHAT, SET THE FOUNDATION FIRST
subtitle: The five setup rules that decide whether Cowork becomes your daily driver or just another tool you forget about.
author: Nourin
project: Field Notes
tags: ['Claude Cowork', 'Workstations', 'Memory', 'Skills', 'Connectors']
---

## TLDR

Most people open Cowork, ask it a question, get an answer, and quietly drift back to chat. The shift is not the model. It is treating Cowork as a place where work happens to files instead of a window where you type. This week is the setup playbook the tutorials skip, plus the recipes that turn it into a daily habit.

## WHAT YOU'LL LEARN

1. Cowork is not the chat box with a different label. It reads and writes files on your computer. Once you internalize that, every other lesson clicks.
2. Pick a folder on day one and live in it. Cowork can only touch what you point it at, and that boundary is what makes it safe.
3. The root claude.md file loads every session. Keep it under 250 lines or you pay the token tax forever.
4. Memory.md is for facts that might change. Claude.md is for rules that should not. Mixing them tanks your output quality.
5. Skills are for repeatable processes that can run on autopilot. Workstations are for ongoing places of work that build context over time. Knowing which is which saves you weeks of cleanup.
6. Connectors plus a scheduled task plus a tight prompt is the loop. Email, calendar, files, all moved while you sleep.
7. The first thirty minutes of disciplined setup pay back for months. Skip it and you will keep retyping context every session.

## WHY THIS MATTERS

The model can already do the work. What stops most people is that they treat Cowork like a smarter ChatGPT and never set the foundation. The creators getting real value out of it have one thing in common, they invested in the folder structure, the rules, and the memory layout before they sent a single prompt.

## COWORK IS NOT CHAT, IT IS AN OPERATING SYSTEM

Regular Claude lives in a browser tab. It reads what you paste and answers in text. It cannot touch a single file on your machine.

Cowork is a different mode inside the desktop app. You point it at a folder and now Claude can read those files, edit them, create new ones, and save finished work straight to your drive. That is the whole shift in one sentence.

The mistake everyone makes early is treating it like chat. They ask "summarize this" and copy the answer somewhere else. The creators using it well send prompts that look more like job briefs. They name the outcome, the inputs, and the file format they want back. The model is the same. The frame is everything.

## THE FOLDER IS THE PRIMITIVE, NOT THE CHAT

In Cowork, your work lives in a folder on your computer. You pick the folder when you start a task and Claude can only touch what is inside it. The operating system pops a permission dialog the first time, and that is the safety boundary you want.

So the first move is to create a dedicated folder for Cowork. Call it cowork-playground or tasks. Drop the files you want Claude to read into that folder, and keep everything else outside it.

This sounds basic, but the people who skip it end up giving Claude access to their whole Downloads folder or their Desktop, and then they get nervous about what got moved. Bound the blast radius from the first prompt. You can always add new folders later.

## THE 300 LINE RULE FOR YOUR ROOT CLAUDE FILE

Your root claude.md file gets loaded into every single session. That means a bloated file is a token tax you pay forever. The creators who measured this saw a 25 percent drop in token usage when they cut their root file from 600 lines to 250.

The rule of thumb is to keep it between 200 and 250 lines, with 300 as the absolute ceiling. Most of what bloats it is task-specific instructions that do not need to load every session. If a rule only applies when you are creating a new file, it does not belong in the root. It belongs in a reference file with a one-line pointer in the root.

The cleanup is simple. Open the root, find any section that serves one specific task, and tell Cowork to move it into a reference file and replace the original with a pointer. The model does the move for you. Your root gets shorter without losing anything.

## CLAUDE.MD VERSUS MEMORY.MD IS THE BUG NOBODY DEBUGS

The other foundation mistake is putting the wrong content in the wrong file. Cowork uses two different markdown files at the root, and they have different jobs.

Claude.md is for prescriptive behavior. It contains things that start with "always" or "never". Always ask clarifying questions before complex tasks. Never edit files in the workspace without explaining the change. These are rules that should not drift.

Memory.md is for facts that could change. My company uses Notion. My newsletter is called Workspace Essentials. My current LinkedIn URL is this. Facts get stale. Rules should not.

When people put rules in memory.md, the model treats them as soft facts and ignores them when they conflict with the task. When people put facts in claude.md, the file bloats and gets re-validated as if it were a rule. The output quality drops on both sides. The fix is a one-line test, is this prescriptive or is this a fact, and you sort everything that way.

## SKILLS, WORKSTATIONS, AND PROJECTS, KNOW WHICH IS WHICH

This is the question that confuses every beginner. Skills, workstations, and projects all look similar in the menu, but they do different jobs.

A skill is a repeatable process that should run the same way every time. Subject line generation. A weekly newsletter format check. An invoice extraction routine. You invoke it with a forward slash and the name. If it can run on autopilot once you trigger it, it is a skill.

A workstation or project is a place where you do ongoing work with context that builds over time. A newsletter workstation. A client project. Something with its own voice, its own files, and a workflow that has decision points you actually make. The test is the one a creator named Jeff Su uses, is this a place I work or a thing I do. Place equals workstation. Thing equals skill.

Get this wrong and you will end up with skills that bloat from missing context, or workstations that you never use because the workflow needs no human input.

## CONNECTORS PLUS A SCHEDULE IS THE REAL WORKFLOW

The single highest leverage feature in Cowork is the connector panel. You can wire Gmail, Calendar, Drive, Notion, Slack, HubSpot, and a long list of others directly into the model. Once a connector is live, Claude can read your inbox or write a calendar event from a single prompt.

The pattern that pays off is connector plus scheduled task. Set a daily brief skill to run at 8am that pulls overnight email, today's calendar, and any flagged threads. Set a Friday digest skill that summarizes the week. Set a receipts skill that scans Gmail for invoices and writes them to a spreadsheet.

The computer has to be awake when the task fires. There is a keep-awake toggle in the schedule panel. Use it for anything you actually depend on.

## WHERE CREATORS DISAGREE

A few sharp differences worth flagging.

One creator argued Cowork is essentially Claude Code with a friendlier interface, and for 80 percent of users there is no real reason to use the terminal version. Others treat them as separate tools with different audiences. I lean closer to the first take. If you are not a developer, the CLI is friction, not power.

Another tension is around Obsidian. Jeff Su strongly recommends opening your Cowork folder as an Obsidian vault so the markdown files render properly. The other tutorials never mention it. Obsidian is free and the rendering is genuinely better. I am going to try it for a week and see if it sticks.

The last disagreement is on parallel subagents. One creator spins up eight subagents from a single prompt to do research in parallel. Others never use this pattern. It is genuinely impressive on demo, but I am skeptical it is worth the token cost for most real work. Test it on something low-stakes first.

## WHAT I WOULD DO THIS WEEK IF I WAS STARTING OVER

If I was opening Cowork for the first time today, here is the order I would install things.

- Make a dedicated cowork folder somewhere on the drive, then point Cowork at it and give the always-allow permission.
- Spend twenty minutes writing global instructions. Who you are. How you want output formatted. File naming conventions. The rules that should never drift.
- Connect Gmail and Calendar before anything else. Those two unlock the most everyday automations.
- Build one daily brief skill. Trigger it with /daily-brief. Let it run for a week before you build a second one.
- Migrate one Claude project from chat into a workstation. Pick the smallest one. The migration teaches you the workstation pattern faster than reading about it.
- Only after that, start adding more connectors or scheduling tasks. The temptation is to install everything on day one and then never use any of it.

## WHERE I'M LEARNING THIS FROM

- [Top 5 Claude Cowork Tips I Wish I Knew from Day One](https://www.youtube.com/watch?v=4wvLHFgnQZQ) by Jeff Su. The deep dive on the 300-line rule, the memory diet, and migrating Claude projects into workstations.
- [The Ultimate Claude Cowork Tutorial For Beginners 2026](https://www.youtube.com/watch?v=AxN7wkYRexQ) by Charlie Chang. A clean walkthrough of setup, the connector panel, scheduled tasks, and dispatch from mobile.
- [FULL Claude Cowork Tutorial For Beginners in 2026 (Zero to PRO)](https://www.youtube.com/watch?v=JdQ_FHgP5ms) by AI Foundations. The long one. Live artifacts, parallel subagents, the daily brief skill, and the blog generator project.
- [The ONLY Claude Cowork Tutorial You'll Ever Need in 2026](https://www.youtube.com/watch?v=PnPsf-hwGtI) by Aishwarya Srinivasan. The outcome, context, format framework for prompts that actually return useful work.
- [Claude Cowork Tutorial: 2 Real Workflows That Save Hours](https://www.youtube.com/watch?v=O6SVv33gPDU) by Riko Nazza. Two end-to-end examples, organizing a Downloads folder by aspect ratio, and turning a folder of trade screenshots into a finished spreadsheet.

## RECIPES

### The fifteen-minute foundation setup

**Problem:** You just opened Cowork and want to use it immediately. You skip the settings and start asking questions. Three weeks in, the output quality is uneven and you cannot figure out why.

**Solution:** Before your first real task, go to Settings, then Cowork, and write global instructions. Cover four things. Who you are and what you do. How you want output formatted, including tone and length. Your file naming convention. The three or four rules that should never drift.

**Why:** Without global instructions, you re-teach Claude every session. With them, every workstation inherits your defaults and you only customize the differences.

```
WHO I AM
I run a small business doing X. I work in markdown files
and Google Drive. I prefer short, direct responses.

OUTPUT
Lead with the answer, then the details. Save finished files
next to the source files unless I say otherwise. For
spreadsheets, include a totals row at the bottom.

FILE NAMING
Use lowercase with hyphens. No spaces. Example:
project-name.md, not "Project Name.md".

RULES
Always ask one clarifying question before complex tasks.
Never edit files in the workspace without summarizing the
change in chat. If something seems wrong with my idea, say so.
```

### The 300 line audit

**Problem:** Your root claude.md file has grown to 500 plus lines. Sessions feel slower and the model is missing rules you wrote three months ago.

**Solution:** Open Cowork and tell it to audit your root claude.md. Find any section that only applies to one specific task and move it to a reference file under a resources folder. Replace the original section with a one-line pointer.

**Why:** Claude.md loads every session. Reference files load on demand. Moving task-specific content out of the root drops your token cost without losing any of the content.

```
Audit my root claude.md. For each section, decide if it
applies every session or only when a specific task runs.
Move task-specific sections into resources/<name>.md and
replace the original with a one-line pointer in a references
table. Show me the plan before you move anything.
```

### The memory diet

**Problem:** Your memory.md has bloated to 400 lines of stale project notes from six months ago. The model is now spending tokens on facts that no longer apply.

**Solution:** Add a size ceiling rule to your root claude.md that says memory.md has a 150-line cap, and when the cap is breached, the fix is always compression and archiving, never raising the ceiling. Create an archive.md file at the root. Tell Cowork to compress current entries and move stale ones to the archive.

**Why:** Memory.md loads every session. Archive.md does not. Anything older than a couple of months belongs in the archive where it is searchable but does not cost tokens.

### The screenshot to spreadsheet trick

**Problem:** You have a folder of screenshots of trades, receipts, business cards, or invoices. Manually typing them into a spreadsheet would take hours and you will never do it.

**Solution:** Drop the screenshots in a folder. Point Cowork at it. Ask it to extract the structured fields you care about and build a CSV file in the same folder, with a totals row at the bottom and a short summary file next to it.

**Why:** This is where Cowork blows past regular chat. Chat would make you upload one file at a time. Cowork reads the whole folder, parses the images, and writes a finished spreadsheet to your computer in one pass.

```
Look at every image in this folder. Each one is a screenshot
of a closed trade. For each screenshot, pull out the trading
pair, direction, entry price, exit price, P&L percentage,
and date. Build a CSV called trades.csv in this folder with
one row per trade and a totals row at the bottom showing win
rate and average P&L. Then write a short summary.md with the
overall win rate, biggest winners, and biggest losers.
```

### The daily brief skill

**Problem:** You spend the first twenty minutes of every morning checking email, calendar, and Slack. You want a single command that catches you up.

**Solution:** Connect Gmail and Calendar in the connector panel. Then tell Cowork to create a daily-brief skill. Specify what to pull from each tool, how to format the output, and what to do if a section is empty. Save it as a skill. Trigger it with /daily-brief every morning.

**Why:** Once a workflow is a skill, you stop typing the prompt. The model runs the same playbook every day. Skills are how you compound the time you save.

```
Create a daily brief skill. When I type /daily-brief, you
should check my Gmail for the last 12 hours, my Google
calendar for today, and write a structured brief with:
overnight summary, today's schedule, emails that need a
response, and worth-knowing items. Skip newsletters and
shipping noise. If a section is empty, say so plainly.
```

### The plan-first prompt

**Problem:** You ask Cowork to organize a folder. It immediately starts moving files based on what it thinks you meant, and you spend an hour undoing it.

**Solution:** Add "show me the plan before you move anything" to every destructive prompt for the first few weeks. Read the plan, push back where it is wrong, and only then approve. Once you trust the workflow, you can flip the toggle to act-without-asking.

**Why:** Cowork has an "ask or act" toggle for every task. The default should be ask until you have run a workflow enough times to know exactly what it will do. The plan-first pattern is the cheap safety net.

### Project to workstation migration

**Problem:** You have years of context inside a Claude project, but project memory is a single AI-generated paragraph you cannot edit cleanly. Project knowledge files are read-only. You want the same context inside Cowork where you can actually edit it.

**Solution:** Copy the project instructions into a new file called workstation-claude.md. Copy the project memory into memory.md. Save any knowledge files as markdown into a resources folder. Open Cowork, paste a migration prompt, and let it set up the workstation. Add a one-line routing entry in your root claude.md so future sessions know to load the workstation when relevant.

**Why:** Cowork workstations beat Claude projects on every axis except the learning curve. Once the migration is done, you can edit instructions and memory directly in markdown, version them, and stack scheduled tasks against them. The migration is a one-time cost you only pay once per project.
