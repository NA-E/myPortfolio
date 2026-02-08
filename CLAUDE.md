# Project Instructions

## Development
- Dev server: `npm run dev` → http://localhost:5173/
- Tech stack: React 18 + TypeScript + Vite 5 + Tailwind CSS 3 + Framer Motion
- Full project structure documented in `PROJECT_STRUCTURE.md`

## Component Notes
- `TestWayOfCode.tsx` is an experimental/test component — keep the file but do NOT render it in App.tsx unless requested

## Positioning
- Nourin is an **AI Product Engineer** — never use "Automation Engineer"
- Page title: "Nourin Ahmed | AI Product Engineer"
- Hero subtitle: "AI Product Engineer" (gradient text, standalone — no suffix)
- Hero headline: "YOU KNOW IT CAN BE DONE. I MAKE IT WORK." — targets clients who tried AI tools, know it's possible, but can't get to production
- Contact email: ekanourin@gmail.com

## Font Stack
- Press Start 2P → headings (via `font-pixel` class)
- Inter → body text (via `font-sans` class)
- JetBrains Mono → terminal/mono elements (via `font-mono` class)

## Design Notes
- Heading glow is intentionally muted (2 layers, low opacity) — don't revert to bright neon
- Terminal card: uses `whoami` command, macOS chrome (colored dots + title bar), blinking cursor, stretches to match left column height — NO floating icons beside it
- Services section: 4 cards in 2×2 grid (`md:grid-cols-2`), no "Learn More" buttons. First card is "CUSTOM SOFTWARE DEVELOPMENT"
- About section tech tags: Claude Code, Lovable, N8N, Bolt, Replit, AI Automation, AI Agents, Workflow Automation
- About section "Over the last few years" content is bullet points (not prose)

## Patterns & Gotchas
- Hover effects: Avoid combining framer-motion `whileHover` with `react-tilt` — use CSS transitions instead to prevent visual conflicts
- Card overlays: Don't use `absolute inset-0` overlays on hover that cover images — causes "black card" effect
- Use standard hyphen `-` not non-breaking hyphen `‑` in pixel font headings (renders poorly in Press Start 2P)
