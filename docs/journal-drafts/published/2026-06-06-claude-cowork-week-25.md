---
issue: 12
slug: claude-cowork-week-25-2026
date: June 6, 2026
title: STOP PROMPTING COWORK, START TEACHING IT SKILLS
subtitle: The loop that turns a chat box into a coworker - set up the workspace, save your work as skills, then put them on a timer.
author: Nourin
project: Field Notes
tags: ['Claude Cowork', 'Skills', 'Scheduled Tasks', 'Connectors']
---

## TLDR

Cowork is the desktop tool that gives Claude hands on your own files. The creators getting the most from it all run one loop: set up a workspace, turn real tasks into reusable skills, then schedule those skills to run on their own. Do that and the boring half of your week starts moving without you.

## WHAT YOU'LL LEARN

1. Cowork is an employee, not a chat. It works inside your real files and folders and finishes whole tasks while you step away.
2. Set up the workspace before the work. A context folder plus a few notes about you is the single biggest quality lever.
3. Let Cowork interview you. Ask it to write your context files by asking you questions, instead of typing them yourself.
4. Build skills from real work. Do a job once by hand, then have Cowork save those steps as a skill you run by name.
5. Put the boring jobs on a timer. Scheduled tasks run your skills on their own, as long as the computer is awake.
6. Pre-approve the tools first. Hit run now once so future runs never stop to ask permission.
7. Default to the fast model. Save the slow, smart one for building something new or reading years of numbers.

## WHY THIS MATTERS

Most people install Cowork and still use it like a chat box. The ones getting real leverage do three things in order: set up a workspace, save their work as skills, then put those skills on a timer. That loop is the whole gap between a smart assistant and a coworker.

## WHAT COWORK IS, AND WHEN TO REACH FOR IT

Cowork is the third tab in the Claude desktop app, next to Chat and Code. It is an agent that lives on your computer. It reads your files, works across your apps, and finishes tasks on its own.

The creators all draw the same line between the three tools.

- Chat answers questions while you wait. Good for quick bursts, brainstorms, and first drafts.
- Code builds software in a terminal. Powerful if you write code, hard to use if you do not.
- Cowork is the middle ground. Same power as Code, but through plain folders and files, so you never touch a command line.

One creator framed it the clearest way I have heard. Chat is an assistant, Code is a developer, and Cowork is an employee who finishes the task.

Any of this needs a paid plan and the desktop app. Cowork does not run in a browser or on your phone. Start on Pro, and move up to Max only when you keep hitting the usage wall.

## SET UP THE WORKSPACE BEFORE YOU DO ANYTHING

The biggest quality jump comes before the first task. You give Cowork one folder to work in, then you fill it with context.

Two creators build the same shape: a context folder, a projects folder, and an output folder. Context holds standing notes about you and your work. Projects holds the active jobs, and output holds the finished files.

Then you make the context files. The trick is to let Cowork interview you instead of writing them by hand.

Ask it to create three files: an about-you file, a brand-voice file, and a working-preferences file. Tell it to ask you questions before it writes each one.

Last, set the global instructions in Settings under Cowork. One line does most of the work: tell Cowork to read the context folder before it starts any task. That single rule makes it forget less and guess less.

## SKILLS ARE THE WHOLE GAME

A skill is a saved workflow you run by typing a slash and its name. Think of it as a long, detailed prompt you reuse instead of retype.

Every creator lands on the same way to build one. You do the task once by hand, get the result you want, then ask Cowork to package those steps into a skill. Install the skill-creator skill first, because that is the tool that writes the rest.

One creator turned a messy invoice cleanup into a /summarize-invoices skill in a single session. The skill even held a small script, so the next run used the script instead of spending tokens on every file.

Connectors and plugins stretch the reach further. A connector links Cowork to one app like Gmail or Drive. A plugin bundles skills and connectors together, so one install can set up a whole role.

One honest warning from a creator who lost hours to it: skills you built in Claude Code do not carry into Cowork. They install in different places, so plan to rebuild the ones you want here.

## PUT THE BORING JOBS ON A TIMER

Once a skill works, the next move is to run it without you. Cowork handles that with scheduled tasks.

You find them under the clock icon in the sidebar. You can build one by hand, or type /schedule on any chat to turn it into a repeating task. You set how often it runs and at what time, then pick the model and the folder.

The one rule everyone repeats: a scheduled task only runs while your computer is awake. If the machine is asleep at 5 a.m., the task waits until you turn the computer on. So schedule jobs for hours you are at the desk, or leave the laptop open and plugged in.

One tip saves the most pain. Hit run now once so you can pre-approve the tools the task needs. After that, future runs will not stop to ask for permission.

On models, default to the fast one. One creator runs the fast model for almost all knowledge work and saves the slow, smart model for building something new or reading years of numbers.

## WHERE THE CREATORS DISAGREE

A few real splits showed up, worth calling out.

On global instructions, one creator writes a long detailed set, while another keeps them to a line or two so they do not box Cowork in. I lean light. Put the detail inside each project, not in the rule that touches every task.

On keeping the computer awake, the gap is wider. One creator will tell Cowork to keep the machine awake so schedules never miss, then admits he would not recommend it himself. Safer to schedule for hours you are already at work.

On skills, all of them agree you should build your own from real work. Still, the official plugins for marketing and sales are a fine head start, and those go through Anthropic review. Read any skill from outside that marketplace before you trust it with write access.

## WHERE I'M LEARNING THIS FROM

- [Claude Cowork Full Tutorial: How to Use Claude Cowork Better Than 99% of People](https://www.youtube.com/watch?v=vMo-yRCN3QM) by Bart Slodyczka. The invoice cleanup demo, the workspace and context file setup, and the skill-to-schedule chain.
- [These 12 Claude CoWork Skills Will Make You $$$ In 2026](https://www.youtube.com/watch?v=KuUzUBg78gM) by Craig Hewitt. A dozen ready skills like morning briefing and inbox triage, plus the warning that Code skills do not carry over.
- [Claude Cowork: 8 Use Cases Every Marketer Should Know (Full Tutorial)](https://www.youtube.com/watch?v=qiqw-_6TUZ0) by Grace Leung. The marketing workspace, live artifacts, and packaging a lead magnet into a reusable skill.
- [8 Insane Claude Cowork Use Cases! (automate anything)](https://www.youtube.com/watch?v=gp3d7RAgFME) by 9x. Eight real use cases, from cutting video clips to scraping competitor ads, each one run by a skill.
- [How to Use Claude Cowork Scheduled Tasks (Step-by-Step Tutorial)](https://www.youtube.com/watch?v=o-5Esj459GQ) by Ryan and Matt Data Science. The two ways to schedule a task, the pre-approve tip, and the computer-awake catch.

## RECIPES

### The workspace setup

**Problem:** You point Cowork at a folder and it keeps guessing who you are and what you want. Every task starts from scratch.

**Solution:** Give it one empty folder. Ask it to build a context folder, a projects folder, and an output folder. Have it write your context files by interviewing you. Then set one global instruction: read the context folder before every task.

**Why:** Better context in means better work out. Once the files exist, every new task already knows your voice, your goals, and how you like to work.

**Snippet:**
```
This is my Cowork workspace. Set it up before we do any real work.

1. Create three folders: context, projects, and output.
   - context: standing notes about me and my work
   - projects: active jobs we are working on
   - output: finished files you deliver
2. Create three files in context by interviewing me first:
   - about-me.md: who I am, what I do, my current priorities
   - brand-voice.md: how I write, words I like, words I avoid
   - working-preferences.md: how I start, run, and store work
   Ask me questions for each file before you write it.
3. Remind me to add this line to global instructions:
   "Read the context folder before starting any task."
```

### The do-it-once skill

**Problem:** You keep retyping the same long prompt for a job you do every week. The steps live in your head, not in the tool.

**Solution:** Do the job once in Cowork. When the result is right, ask it to use the skill-creator skill to package those exact steps into a named skill. Tell it to make the skill general, so it works beyond this one case.

**Why:** The skill captures the steps that already worked, so you stop re-explaining. Calling a skill by name beats hoping Cowork remembers what you meant.

**Snippet:**
```
That came out exactly right. Now turn it into a skill so I never
redo it by hand.

Use your skill-creator skill to build a skill called <name>.
- Trigger: /<command>
- Input: <what you hand it each time>
- Steps: the same steps we just did, in order
- Output: where the finished file should land

Make the skill general, not tied to this one example, then save it.
```

### The set-and-forget schedule

**Problem:** A skill works, but you still open Cowork and run it yourself every morning. The repeat run is on you.

**Solution:** Open scheduled tasks, create one, and point it at your skill. Set the time for an hour you are at your desk. Hit run now once to pre-approve the tools the task needs.

**Why:** The pre-approve step is the one people skip. Without it, the task stops mid-run to ask permission, which kills the whole point of a schedule.

**Snippet:**
```
Create a scheduled task called <name>.
- Prompt: Use my <skill-name> skill.
- Frequency: weekdays
- Time: 8:00 a.m. (an hour I am already at my computer)
- Model: the fast one
- Folder: <my workspace>

After you save it, I will hit run now once to pre-approve the
tools, so future runs do not pause for permission.
```

### The daily morning brief

**Problem:** You start the day in five tabs, mail, calendar, and chat, piecing together what actually matters. It eats the first ten minutes every time.

**Solution:** Build a morning-brief skill that reads your mail and calendar and writes one short dashboard. Schedule it to run just before you usually start. Pull the result up with one click.

**Why:** It gathers everything into one place, so you skip the tab hunt. This was the first task nearly every creator said to build.

**Snippet:**
```
Build a skill called /morning-brief.

When I run it, do this:
1. Read my calendar for today and list every meeting with the time
   and who it is with.
2. Read my inbox and pull only the messages that need a reply.
3. Pick the single most important thing to handle first.
4. Write it all into one short dashboard file in output/.

Then create a scheduled task that runs /morning-brief on weekdays
at 7:00 a.m. in my workspace folder.
```

### The script-backed skill

**Problem:** A skill that reads many files spends tokens on every run. A big weekly batch can eat your whole usage limit in one go.

**Solution:** Ask Cowork to write a small script for the repeatable part, then store that script inside the skill. The next run calls the script instead of reading each file with the model.

**Why:** The model only sets up and checks the work, not chews through every file by hand. That keeps a heavy job inside your plan limits and runs it faster.

**Snippet:**
```
This skill reads too many files and burns tokens each run.

Rewrite it so the heavy, repeatable part is a small script stored
inside the skill. The skill should run the script to do the bulk
work, then only use the model to set things up and check the
result. Keep the same output as before.
```
