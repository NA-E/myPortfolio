---
issue: 10
slug: claude-cowork-week-24-2026
date: May 30, 2026
title: PUT COWORK ON AUTOPILOT, THEN GO TO BED
subtitle: The shift from prompting Cowork to handing it a brief and walking off. Plus the daily rhythm, the plugin layer, and the MCPs that close the gaps.
author: Nourin
project: Field Notes
tags: ['Claude Cowork', 'Automation', 'Plugins', 'MCP', 'Scheduled Tasks']
---

## TLDR

Last week was about setting Cowork up. This week is about getting it to keep working after you close the laptop. The creators getting real leverage are writing briefs instead of step-by-step prompts, packaging their flows as plugins, and wiring in MCPs to cover what native connectors miss.

## WHAT YOU'LL LEARN

1. The brief beats the prompt. A one-page product requirements doc, written before any build, is the single biggest quality lever in Cowork right now.
2. Two daily commands stop the forgetting. "Good morning" and "I am done for the day" bookend every session and write the memory bridge for you.
3. Plugins are the unit of distribution. One install drops a bundle of skills, connectors, and slash commands into your workspace.
4. The autonomous build queue is real. Four folders and one scheduled checker, and Cowork ships features while you sleep.
5. MCPs cover what native connectors miss. Apify gets you 1,300 public-web actors. Zapier gets you 8,000 apps. Both install in under five minutes.
6. Dispatch and Computer Use are real but raw. Use them for low-stakes tasks until the next round of fixes lands.
7. Cowork is a super nerd, not a magic genie. It has the knowledge, not the taste. Your job is to supply the taste.

## WHY THIS MATTERS

Issue 8 was the setup playbook. This issue is the layer above. The creators making real progress with Cowork this week are not the ones prompting better, they are the ones building loops that fire without them.

## WRITE THE BRIEF, NOT THE PROMPT

The single highest leverage habit this week was writing a real brief before any build. Not a sentence in the chat box. A short markdown file that names the problem, the success criteria, the scope, and the constraints.

The creators using this approach call it a PRD, product requirements doc. They make Cowork ask for explicit sign-off before it touches a single file.

The reason this works is the model defaults to average output. One creator described it as the "brown average".

If you ask for a website with no context, the model blends every website it has ever seen and gives you something beige. A brief is how you point at the specific color you actually want.

The other half of the habit is telling Cowork to push back. Ask for it directly in your global instructions. Say "disagree with me when the plan seems off, flag trade-offs I have not considered, ask one clarifying question before complex tasks."

Without that line, the model will quietly do what you said, even when what you said was wrong.

## THE DAILY RHYTHM, NOT JUST THE WORKFLOW

The most underrated trick from this week is a two-command daily rhythm. You start every session with "good morning" and you end every session with "I am done for the day". That is it.

Why it works is the memory bridge. The end-of-day command runs a skill that writes a short log file with what got done, what is still open, and what the next step is. The good-morning command reads that file and gives you the recap.

Without it, Cowork forgets the thread between sessions. You spend the first ten minutes of every day re-explaining yourself.

The creators leaning on this pattern hard ship it as part of a starter plugin. You install the plugin, you type "/setup" once, and the daily rhythm skills are wired in. If you do not want to install someone else's plugin, the same two skills are a thirty-minute build in your own workspace.

## PLUGINS ARE WHERE COWORK GROWS UP

A plugin in Cowork is a single install that bundles three things, skills, connectors, and slash commands. Think of it as a packaged workspace setup that someone else figured out for you. The plugin marketplace inside Cowork has bundles for legal, marketing, finance, HR, and productivity, all ready to drop in.

The pattern is finally maturing. One creator runs a library of more than fifty skills in his business, all packaged as plugins he updates weekly.

The marketplace bundles for finance, legal, and marketing are full enough that most people can drop one in and customize from there. That is faster than building every skill yourself, and the official ones go through Anthropic review.

The trade-off is trust. Plugins from the official marketplace go through Anthropic review. Plugins from GitHub do not.

Before you install anything from outside the marketplace, open the skill files and actually read them. If the skill is asking for write access to a connector you care about, you want to know what it plans to do with it.

## BUILD THE QUEUE, LET COWORK WORK THE NIGHT SHIFT

The most ambitious pattern from this week is the autonomous build queue. The idea is simple and the setup is four folders and one scheduled task.

You create pending, in-progress, done, and failed folders inside your Cowork workspace. During the day, when you have an idea, you drop a short PRD file into pending. Every thirty minutes a scheduled task wakes up, checks pending, picks the highest-priority file, moves it to in-progress, and starts building.

When it finishes, the file moves to done. If it crashes, it lands in failed with a log.

The creator running this pattern wakes up to finished projects most mornings. A resource hub one day. A dashboard the next.

Some get used, some do not. The cost of an unused build is small because the build happened while she slept.

The catch is the machine has to stay awake. One creator pays for a VPS so the agent never sleeps. Others toggle keep-awake on a spare laptop.

Both work. Just pick one before you build the queue.

## MCPs ARE THE LONG TAIL OF CONNECTORS

The native connector list in Cowork is good but finite. Gmail, Calendar, Drive, Notion, Slack, HubSpot, the usual. The trick when something you use every day is not in that list is the MCP marketplace.

Two MCPs cover most of the gaps. Apify is the public-web one. You install the MCP, plug in your API key, and you can ask Cowork to pull data from Instagram, TikTok, Reddit, or any of 1,300 other targets without picking the actor yourself.

The MCP handles the routing. Zapier is the everything-else one. You install the MCP and Cowork can take actions across more than 8,000 apps through your existing Zapier zaps.

Both install in under five minutes. The pattern is identical, browse connectors, find the name, paste the API key. After that the model picks the right tool for the prompt.

Most people set these up once and forget about them, which is the right way.

## DISPATCH AND COMPUTER USE ARE NOT READY YET

Two newer features got a lot of airtime this week and both deserve an honest read.

Dispatch lets you text Cowork from your phone and have the work happen on your desktop. The same conversation thread is visible on both devices, which is the part that actually surprises people.

The catch is the desktop has to be awake and unlocked, your VPN has to play nice with the pairing, and the feature is still in beta. The creators using it found it hit and miss. Set it up if you are curious, but do not build a workflow that depends on it yet.

Computer Use is the bigger one. The model can now see your screen and click, type, and drag inside any app on your machine. There is a permission pyramid, connectors first, browser second, screen control last, so the model tries the cheap option before the expensive one.

In the demos it works, but it is slow. Two to three minutes for a task that takes you ten seconds. The honest framing from the creators is this is laying the foundation for next quarter, not solving your problems this quarter.

## WHERE THE CREATORS DISAGREE

A few sharp differences worth flagging.

One creator builds every skill from scratch and recommends you do the same so you understand what is in it. Another always uses the built-in "create with Claude" skill creator and lets the model write the skill file for you. A third just ships a pre-built starter plugin and tells you to install it and move on.

All three are defensible. The first gives you control, the second gives you speed, the third gives you safety if you trust the source.

There is also a tension on Sonnet versus Opus. One creator says use Sonnet for almost everything because the context window is bigger and the usage budget goes further. Another runs Opus on anything that involves planning.

I lean toward Sonnet for the day-to-day. Opus is worth it only when the build plan itself is the hard part.

The last tension is on autonomy. The autonomous build queue creator is happy waking up to projects she did not approve in detail. The brief-first creator wants explicit sign-off before every build.

The right answer is probably to start with the brief-first version. Only move to autonomy on workflows you have run by hand ten times already.

## WHAT I WOULD ADD THIS WEEK

If issue 8 was the foundation, here is what I would actually install on top of it this week.

- Add a "always ask one clarifying question before complex tasks" line to global instructions. This alone is worth the setup time.
- Build the good-morning and end-of-day skills. Even without the rest of the rhythm, the memory bridge changes how the model treats you across sessions.
- Install Apify or Zapier, whichever closes the bigger gap for your work. Do not install both on day one. Pick the one that unlocks one specific workflow you skip today because it is too annoying.
- Try writing one real brief before your next build. A short markdown file with the problem, the success criteria, the scope, and what done looks like. See how different the output is.
- Leave the autonomous build queue for week three. It works, but you want one real workflow running on the queue before you build the queue, not the other way around.

## WHERE I'M LEARNING THIS FROM

- [My Full Claude Cowork Setup (steal my workflows!)](https://www.youtube.com/watch?v=gdrPkpXuNks) by Tina Huang. The full PRD-first build, the mission control dashboard, and the autonomous build queue she wakes up to.
- [All 4 NEW Claude Cowork Features Explained (and how to master them)](https://www.youtube.com/watch?v=TU5GBkyuOSs) by Brock Mesarich. Projects, scheduled tasks, dispatch, computer use, plus the Apify and Zapier MCPs that fill the connector gaps.
- [How to Use Claude Cowork Better Than 99% of People (2026)](https://www.youtube.com/watch?v=Dj_YurERlpY) by Thetips4you. The receipts to expense report demo and the four pro tips most users skip on day one.
- [Claude COWORK Full Course: Zero To Working AI Employee (2026)](https://www.youtube.com/watch?v=C9gKWTzRukM) by KJ Rainey. The good-morning daily rhythm, the starter pack plugin, and the super-nerd mental model for prompting.
- [Full Claude Cowork Tutorial for Beginners in 2026! (Become a PRO)](https://www.youtube.com/watch?v=xEoVCx9CmxQ) by AI Foundations. The skill creator workflow, the global versus folder instructions split, and the plugins overview.

## RECIPES

### The PRD-first build prompt

**Problem:** You ask Cowork to build something. Forty minutes later it returns the wrong thing. You do not know whether the problem was the prompt, the model, or the missing context.

**Solution:** Add a rule to global instructions that says "before building anything, write a one-page PRD covering the problem, success criteria, scope, constraints, and a phased build plan. Ask for explicit sign-off before writing any code or moving any files." Then approve the PRD in chat before letting the build start.

**Why:** The build cost of a wrong direction is hours. The cost of reviewing a one-page PRD is two minutes. The PRD step pays for itself the first time it catches a misunderstanding.

**Snippet:**
```
Before you build anything in this workspace, follow this rule:

1. Write a PRD as docs/prd-<name>.md with these sections:
   - Problem: what we are solving and why
   - Success criteria: how we know it worked
   - Scope: what is in and out
   - Constraints: tools, files, time budget
   - Build plan: phased steps with a checkpoint per phase
2. Show me the PRD and ask "approve as is, edit, or scrap?"
3. Do not write code or move files until I say "approved".
4. If I push back on the plan, update the PRD and re-ask.
```

### The good-morning daily rhythm

**Problem:** Every session starts with five minutes of "what were we working on" before any actual work happens. The model has the files but not the thread.

**Solution:** Build two skills. The end-of-day skill writes a daily log with what got done, what is still open, and a next-step suggestion. The good-morning skill reads the latest log and gives you a short recap before the new session starts. Trigger them with "/end-of-day" and "/good-morning".

**Why:** Memory bridges across sessions are what turn Cowork from a smart chat into a coworker. The model remembers the files, but the log is what remembers the intent.

**Snippet:**
```
Create two skills in this workspace.

Skill 1: /end-of-day
When I type "/end-of-day" or say "I am done for the day",
write a file at logs/YYYY-MM-DD.md with three sections:
- What got done today (3 to 5 bullets)
- What is still open (with file paths)
- Suggested first move for tomorrow (one sentence)

Skill 2: /good-morning
When I type "/good-morning", read the most recent file in
logs/, give me a four-line recap covering the three sections,
and ask "where do you want to start?" Do not start work
until I answer.
```

### The autonomous build queue

**Problem:** You have a backlog of small builds you keep meaning to ship. Dashboards, internal tools, small scripts. None of them are urgent enough to block your day but you never get to them.

**Solution:** Create four folders inside your workspace, queue/pending, queue/in-progress, queue/done, and queue/failed. Drop a one-page PRD into pending whenever you have an idea. Schedule a task to run every thirty minutes that checks pending, picks the oldest file, moves it to in-progress, builds it, and moves it to done or failed when finished.

**Why:** Most small builds are blocked by your attention, not the model. Decoupling the idea capture from the build means you ship more without having to context-switch yourself.

**Snippet:**
```
Create a scheduled task called queue-worker that runs every
30 minutes with these steps:

1. List files in queue/pending sorted oldest first.
2. If empty, log "queue empty" and exit.
3. Move the first file into queue/in-progress.
4. Read the PRD and execute the build plan it contains.
5. On success, move the file to queue/done with a build log
   appended at the bottom.
6. On failure, move the file to queue/failed with the error
   appended at the bottom.
7. Send me one Telegram line summarizing what just shipped
   or what just failed.

Keep computer awake while task runs. Skip if my display
is on and I am actively typing.
```

### Apify MCP for public-web data

**Problem:** Cowork cannot reach Instagram, TikTok, Reddit, or most public web sources out of the box. You end up copy-pasting links and asking the model to summarize.

**Solution:** Sign up at apify.com, generate an API token in settings, then in Cowork go to customize, connectors, browse, search Apify, and paste the token. After that you can ask the model to pull from any source and it will pick the right actor from the 1,300 in the marketplace automatically.

**Why:** The MCP routes the request. You do not have to know which Apify actor to call. The model picks one, runs it, and hands you the structured data.

### Zapier MCP for the missing app

**Problem:** Your favorite app is not in the connector list. You either give up the workflow or write a custom MCP yourself.

**Solution:** Sign up at zapier.com if you have not already. Create a new MCP server, pick Cowork as the target, choose which app actions you want to expose, copy the generated URL, then add it as a custom connector in Cowork. You get every Zapier-supported app, more than 8,000 of them, with the same one-step install.

**Why:** Zapier already mapped the long tail of business apps. Reusing that mapping is faster than writing a connector yourself and the auth is handled.

### Use the skill creator instead of writing skills by hand

**Problem:** You want a custom skill but writing the markdown file from scratch is a friction wall. You give up and just paste the prompt every time.

**Solution:** Open customize, skills, and select "create with Claude". The skill creator interviews you, generates the skill file with the right structure, runs test cases against it, and packages it. Install it to your skills folder with one click.

**Why:** The skill creator catches the structural mistakes that break skill loading. It is also faster than hand-rolling the file and the test pass rate jumps from about a third to nearly all.

**Snippet:**
```
/create-skill

When asked, describe the skill like this:
- Name: <short kebab-case>
- Trigger: /<command> or natural language phrase
- Inputs: what context the model needs at trigger time
- Steps: numbered list of what should happen
- Output: what should land in chat, in a file, or both
- Edge cases: what to do if a step has no data

Approve the test cases when they appear. The skill creator
will write the file into .claude/skills/<name>/ and install
it for you.
```
