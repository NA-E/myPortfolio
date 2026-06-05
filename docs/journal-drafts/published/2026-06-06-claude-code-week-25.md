---
issue: 11
slug: claude-code-week-25-2026
date: June 6, 2026
title: LET CLAUDE BUILD ITS OWN TEAM
subtitle: The new dynamic workflows let one prompt spin up a crew of agents that check each other. Plus the model split that plans before it builds, the skill habit that ends repeat work, and the trick of showing Claude the bug instead of describing it.
project: Field Notes
author: Nourin
tags: ['Claude Code', 'Dynamic Workflows', 'Skills', 'Agents', 'Plan Mode']
tldr: The sharpest move this week is letting Claude run a team instead of working alone. You add one word to a prompt and it spins up many agents that split the work and fact-check each other, which is how people clear a seventy-file review in half an hour. The rest is the discipline that makes a single session worth it, plan with the smart model, build with the fast one, save your repeat jobs as skills, and show Claude the broken screen instead of explaining it.
---

# WHAT YOU'LL LEARN

1. One word turns a prompt into a team. Add "workflow" and Claude spins up many agents that split the job and check each other's work.
2. The big context window has three failure modes. A long single session gets lazy, grades its own work too high, and drifts off the goal.
3. Plan with the smart model, build with the fast one. Opus thinks through the plan, then Sonnet follows it, which is cheaper and quicker.
4. Skills end repeat work. Save a prompt once, test it, and run it by name in Chat, Cowork, or Code.
5. Skip the description, show the bug. A screenshot or a pasted error gets a fix faster than a paragraph of explanation.
6. Big agent teams are not free. They burn millions of tokens, so save them for wide jobs worth finishing.
7. New controls let Claude work while you step away. Phone approvals, a repeat timer, and cloud schedules move the work off your keyboard.

# WHY THIS MATTERS

The model stopped being the slow part a while ago. What is left is your attention, every prompt you type and every yes you click. The best moves this week all point one way, hand off more of the work without losing your grip on the result.

# DYNAMIC WORKFLOWS LET CLAUDE BUILD ITS OWN TEAM

The biggest shift this week is a feature called dynamic workflows. Instead of doing a job in one chat, Claude writes a short plan and spins up a team of agents, each with its own fresh memory. The team splits the work, and some agents exist only to check the others.

This matters because of what goes wrong in one long session. The creators who dug into Anthropic's own guide named three failure modes.

- It gets lazy. Give it fifteen tasks and it may finish seven, then report that it did them all.
- It grades itself too high. Ask one session whether its own work is good and it almost always says yes.
- It drifts. After a long chat and many auto-summaries, the goal you set at the start fades.

A team of agents fixes all three, because no agent grades its own homework. The same guide lays out six shapes the team can take.

- Classify and act. One agent reads each item and routes it, the way you sort support tickets into bug, refund, or spam before anyone acts.
- Fan out and synthesize. Split a big read across many agents, then merge their notes into one report with a source path on every claim.
- Adversarial verification. Spin up a few skeptics to attack the output against a checklist, which is how you fact-check a draft at scale.
- Generate and filter. Overproduce a thousand options, then let a separate judge agent score them down to three.
- Tournament. Compare options two at a time with a fresh agent each match, so good ones climb a bracket with no bias.
- Loop until done. Tell it not to stop until a clean pass finds nothing new, good for a bug that shows up once in fifty runs.

The proof is in the demo one creator ran. He pointed Claude at a data room of more than seventy contracts, it spun up over fifty agents, and it handed back a finished review in about half an hour. You turn this on by adding the word workflow to your prompt, and you watch the team run with /workflows.

# PLAN WITH THE SMART MODEL, BUILD WITH THE FAST ONE

The cleanest habit this week splits one job across two models. You ask Opus, the slower and smarter one, to plan the work first. Then you switch to Sonnet, the fast one, and tell it to follow the plan exactly.

Each model trades depth for speed in a different way. Opus spends more time reasoning and catches edge cases a rushed plan would miss. Once the thinking is done, Sonnet writes the code fast and clean.

You switch with /model opus and /model sonnet as often as you like. Before any task that touches more than two or three files, drop into plan mode with shift and tab so Claude writes the steps and waits for your yes.

One more dial is effort, set with /effort from low to max. Low is fine for tiny edits, high earns its keep on a hard bug, and you can bake an effort level into a skill so an important one always runs at full strength.

# TURN ANY REPEATED PROMPT INTO A SKILL

A skill is a prompt you save once and run by typing a slash and its name. Under the hood it is a plain text file of instructions that can also carry code. The same skill runs across Chat, Cowork, and Claude Code.

The fastest way is to let Claude build the skill. Open Customize, then Skills, then create with Claude, and it interviews you before writing the file. Add the line "what else should I clarify" so it asks questions instead of guessing.

Most people skip the step that matters, testing the skill on real examples before they save. That is where the real work is, because your feedback on a few test runs is what makes the skill good. If it signs off your emails in a way you dislike, you tell Claude to update the skill.

Claude Code keeps skills as folders on disk under .claude/skills, unlike the web. A global skill runs in every project, and a project skill lives in that one folder. To bring a web skill over, download it, unzip it, and drop the folder into .claude/skills.

The creators who teach this add one honest note. Calling a skill by name beats hoping Claude picks it from context.

# SHOW CLAUDE THE BUG, DO NOT DESCRIBE IT

The fastest debugging trick this week is to stop explaining and start showing. When a page looks wrong, take a screenshot, drop it in, and say fix this. Claude reads the image, finds the file, and often fixes every matching element.

The same idea works for errors. Paste the error text straight into Claude and ask for the fix, rather than retyping what it said. The desktop app now has an app preview, where Claude opens your running app and reads its console errors.

When a session starts looping or inventing answers, the window is usually full. Run /context to see what is eating it, then /compact to keep the key decisions and drop the rest. If two fixes in a row do not stick, open a fresh session, because a clean context almost always wins.

# WHERE THE CREATORS DISAGREE

A few real splits showed up this week.

On models, one guide plans with Opus for almost everything, while another reaches for Sonnet by default and only switches up for hard planning. Both are right. Use the fast model as your default, and pay for the smart one when the plan itself is the hard part.

On letting Claude run free, the gap is wider. One creator turns on auto-accept and walks away, while a more careful read warns that bypassing permissions outright is a real risk. The middle ground is auto mode, where a separate safety check clears the safe actions and still stops to ask on the risky ones.

Even the people most excited about agent teams agree on the limit. A dynamic workflow can burn a few million tokens in one run, so it is for wide jobs worth finishing, not for changing a button color. As the models get cheaper and stronger, you will reach for the heavy setup less, not more.

# WHAT I'D TRY THIS WEEK

If I were setting up from scratch today, here is the order I would go.

- Start with the model split and plan mode. It is the cheapest habit and it saves the most rework.
- Save your top three repeat prompts as skills. Test each one before you trust it.
- Use the screenshot and paste-the-error tricks on your next bug. They beat typing a description.
- Try one dynamic workflow on a wide job, like auditing every file for one kind of mistake. Watch it with /workflows.
- Hold off on full autonomy. Turn on auto mode before you ever bypass permissions, and keep a human yes on anything that ships.

Two things I would skip. A big agent team for small tasks, and any unattended run that changes code with no review.

# WHERE I'M LEARNING THIS FROM

- [Ultimate Claude Code Guide: How to Use Claude Code for Beginners in 2026](https://www.youtube.com/watch?v=RywmhLTFeFk) by AI Master. The Opus to Sonnet handoff, screenshot debugging, and the five beginner mistakes.
- [Every Claude Code Dynamic Workflow (& When to Use Each)](https://www.youtube.com/watch?v=g9b9G8dcS8Y) by Mark Kashef. The six workflow patterns pulled from Anthropic's own masterclass, and when to skip them.
- [The Claude Update Everyone Missed (Dynamic Workflows)](https://www.youtube.com/watch?v=-tLlZqrXpo8) by Mark Kashef. The fifty-agent data room demo, the token cost, and use cases for nearly every field.
- [Claude Skills Tutorial (2026): Build, Run, and Share](https://www.youtube.com/watch?v=O_z9vDLgvoY) by Kevin Stratvert. Building a skill with Claude, testing it, and the four ways to share one.
- [Everything NEW in Claude Code Explained (March 2026 Edition)](https://www.youtube.com/watch?v=3vrn03I5Tss) by Jay E from RoboNuggets. App preview, phone approvals, the loop and schedule commands, and auto mode.

# RECIPES

## 1. The plan-then-build handoff

Problem: You hand Claude a big task in one go and it starts coding before it has thought it through, then paints itself into a corner halfway.

Solution: Run /model opus and ask only for a plan. Read it, fix it, then run /model sonnet and tell it to follow the plan exactly and build.

Why: The smart model is worth its slower speed at the planning stage, where one missed edge case costs you the most. The fast model is the better builder once the thinking is locked.

Snippet:
```
/model opus
Plan a <feature> for this project. List every file you will touch
and every step, but do not write any code yet.

/model sonnet
Good plan. Follow it exactly and build it.
```

## 2. The fact-check workflow

Problem: You have a draft or a report full of claims and no time to check each one by hand.

Solution: Ask for a workflow that pulls out every claim, then sends each claim to its own agent to check against a real source. Have it return only the failed claims, each with the reason it failed.

Why: A single session that wrote the text is biased toward saying the text is fine. Separate checker agents have no such loyalty, so they catch what the author would wave through.

Snippet:
```
Use a workflow to verify every factual claim in draft.md before I ship it.
Have one agent extract each claim as its own item. For each claim, spin up
a separate agent that checks it against a real source. Return only the
claims that failed, with the reason and the source for each.
```

## 3. The whole-repo audit, one mistake at a time

Problem: You suspect one kind of bug is scattered across a large codebase, and reading every file yourself is hopeless.

Solution: Ask for a workflow that checks every file for that one issue, has a second agent try to disprove each finding, and returns only the confirmed ones with the file and line.

Why: Fanning out gives every file a fresh set of eyes. The refute step strips out the false alarms, so you get a short, trusted list instead of noise.

Snippet:
```
Build a workflow that audits every file under src for missing authorization
checks. Have a second agent try to refute each finding against the code.
Return only the confirmed issues, each with the file and the exact line.
```

## 4. Drop a saved skill into Claude Code

Problem: You built a skill on the web or in Cowork and want the same one in Claude Code, but Code does not show the same list.

Solution: In the skills view, open the skill menu and choose download. Rename the download to end in .zip, unzip it, and move the whole folder into .claude/skills in your project. Start a new session and it appears.

Why: Claude Code keeps skills as folders on disk, not in the shared cloud list. Dropping in the folder registers the skill, and a fresh session brings it online.

Snippet:
```
.claude/
  skills/
    thread-reply/
      skill.md
```

## 5. Show the bug with a screenshot

Problem: Describing a visual bug in words takes longer than the fix, and Claude still guesses at which element you mean.

Solution: Take a screenshot of the part that looks wrong, drop it into Claude Code, and say fix this. Let it find the file and the element on its own.

Why: The image carries more than a sentence ever could, and Claude can see the whole project at once. It will often fix every matching element, so your page does not end up half-updated.

Snippet:
```
[drag the screenshot into the prompt]
This button looks off. Fix it, and make the others match.
```

## 6. Cap the token bill before a big run

Problem: A dynamic workflow can quietly burn a few million tokens, and you do not want a surprise on a job that did not need the heavy machinery.

Solution: Tell Claude its token budget in the prompt, and save workflows for jobs that are wide, repeatable, and worth running to the end. For small edits, use a normal prompt.

Why: The big agent teams pay off on a seventy-file review, not a button color. Naming a budget keeps a long run from sprawling, and matching the tool to the job keeps your usage sane.

Snippet:
```
Use a workflow to <wide, repeatable job>. Keep total token use under
<N>. If the task turns out small, skip the workflow and do it yourself.
```
