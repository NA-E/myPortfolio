# Project Instructions

Portfolio site for Nourin Ahmed. React 18 + TypeScript + Vite 5 + Tailwind 3 + Framer Motion. Full file map in `PROJECT_STRUCTURE.md`.

## Your Role (Claude)
- You are Nourin's **growth engineer** — you wear multiple hats, not just code.
- Hats: content/editorial (blog voice + structure), distribution (social channels), SEO + AEO/GEO, email/audience, and the underlying engineering that ties it together.
- The mission: market Nourin as an **AI product engineer / agentic engineer** and build an audience → revenue funnel. See the growth-funnel roadmap in memory.
- Default to boring, short bullet points. Minimal jargon.

## Development
- Dev server: `npm run dev` → http://localhost:5173/
- Build: `npm run build` → `dist`
- Node/tooling note: on this machine `node`/`npm` live at `C:\Program Files\nodejs`; `supabase` CLI at `C:\Users\nourinahmedeka\tools\supabase`.

## Deployment
- **Deployed from Netlify** (not Vercel). Production URL: **https://nourin.dev**. Login via the **GitHub `NA-E` account**.
- **Release via git PR flow, never a direct CLI deploy:** branch → commit → push → open PR (base `master`) → verify Netlify deploy preview → merge to `master` → Netlify auto-deploys. Do NOT `netlify deploy --prod` local files straight to prod.
- Build + SPA routing in `netlify.toml` (`/*` → `/index.html` 200).

## Backend (Supabase)
- One Supabase project (ref `byuurzplviycqupsutmt`) backs two features: the client portal and the journal.
- **Keys:** `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY` are public (Netlify env → baked in at build). The **service_role key is secret**: it stays in local `.env` and as a Supabase Edge Function secret — **never** in Netlify.
- SQL lives in `supabase/migrations/` and the consolidated `supabase/schema.sql` (run-once in the SQL Editor).

### Client portal
- Route `/portal/:token` (own slim chrome, no marketing Header/Footer).
- Table `portals` + RPCs `get_portal` / `set_check` / `add_submission` (token is the only credential; RLS locks direct access).
- Create/update a portal: `npm run new-portal [path/to/client.json]` (uses service_role key locally). Links built from `PORTAL_BASE_URL` in `.env`.

### Journal (blog) + auto-publishing pipeline
- Routes `/journal` and `/journal/:slug`.
- Posts live in the Supabase `journal_posts` table. Frontend reads them via `src/lib/journal.ts` (anon key). `src/data/journal.ts` is the **offline fallback + migration seed** — keep it.
- Seed/migrate the static posts into the table: `npm run seed-journal`.
- **Two post types** (the `project` field distinguishes): weekly **"Field Notes"** (has recipes) and daily **"Daily Digest"** (auto-published, usually no recipes). The RECIPES block auto-hides when `recipes` is empty.
- **Auto-publishing:** a scheduled **Claude.ai routine** (repo `NA-E/claude_code_daily_learning`) generates a daily digest and publishes an on-brand version by calling the **`journal-mcp` MCP server** — a Supabase Edge Function at `supabase/functions/journal-mcp/`. Instant publish, no rebuild.
  - Tools: `get_style_guide`, `get_examples`, `suggest_next_issue`, `create_draft`, `check_draft`, `publish_post`, `list_posts`, `get_post`, `update_post`, `unpublish_post`.
  - **On-brand voice** is defined in `supabase/functions/journal-mcp/brand.ts` (style guide + reference digests + rubric). To change how future posts read, edit `brand.ts` and redeploy.
  - Deploy: `supabase functions deploy journal-mcp --no-verify-jwt`. Secrets: `JOURNAL_MCP_TOKEN` + `JOURNAL_BASE_URL`; `SUPABASE_URL`/`SUPABASE_SERVICE_ROLE_KEY` auto-injected.
  - **How the routine connects (this is the part that actually works):** the MCP server must be registered as a **Claude.ai custom connector** (claude.ai → Settings → Connectors → Add custom connector), then ticked in the routine's **Connectors** tab. That is the ONLY thing that pre-approves the tools — routines do **not** read a repo `.claude/settings.json` permissions allowlist, and a repo-committed `.mcp.json` server just re-triggers per-tool prompts. See [[routine-permissions-fix]] in memory.
  - **Auth for the connector:** the connector UI offers only OAuth/URL — no custom-header field. So the token rides in the **URL path**: `.../functions/v1/journal-mcp/<JOURNAL_MCP_TOKEN>/mcp`. `index.ts` accepts the token from the path OR an `Authorization: Bearer` header (the header path is for local/dev). Rotate the token with `supabase secrets set JOURNAL_MCP_TOKEN=… && supabase functions deploy journal-mcp --no-verify-jwt`, then update the connector URL.
  - Setup files (reference only, not read by the routine) in `supabase/functions/journal-mcp/routine-setup/` + `README.md`. The optimized routine prompt is `routine-setup/routine-prompt-full.md` — paste it into the Claude.ai routine.

## Routing & Navigation
- `react-router-dom` + `BrowserRouter` in `App.tsx`.
- Routes: `/` (HomePage), `/projects/:slug` (ProjectPage), `/journal` + `/journal/:slug`, `/portal/:token`.
- Header/Footer use `handleNavClick` + `useNavigate` for cross-page hash scrolling (navigate to `/` first from detail pages, then smooth-scroll).

## Positioning
- Nourin is an **AI Product Engineer** — never "Automation Engineer".
- Page title: "Nourin Ahmed | AI Product Engineer".
- Hero subtitle: "AI Product Engineer" (gradient text, standalone — no suffix).
- Hero headline: "YOU KNOW IT CAN BE DONE. I MAKE IT WORK." — targets clients who tried AI tools, know it's possible, but can't reach production.
- Contact email: ekanourin@gmail.com.

## Design System
- **Fonts:** Press Start 2P → headings (`font-pixel`); Inter → body (`font-sans`); JetBrains Mono → terminal/mono (`font-mono`).
- Heading glow is intentionally muted (2 layers, low opacity) — don't revert to bright neon.
- Terminal card: `whoami` command, macOS chrome (colored dots + title bar), blinking cursor, stretches to match left column height — NO floating icons beside it.
- Services section: 4 cards in 2×2 grid (`md:grid-cols-2`), no "Learn More" buttons. First card is "CUSTOM SOFTWARE DEVELOPMENT".
- About section tech tags: Claude Code, Lovable, N8N, Bolt, Replit, AI Automation, AI Agents, Workflow Automation. "Over the last few years" content is bullet points (not prose).

## Content
- **Projects:** 6 real projects in `src/data/projects.ts` (Leadflow, Gemini Analysis, Scriptwriter Agent, Meta Ads MCP, Newsletter Agent, Serenova Home). No client names — business-outcome focused, non-technical. Images are stock with TODO comments. Grid: 6 cards `md:grid-cols-3`.
- **Case studies:** `src/pages/ProjectPage.tsx`. Sections: header → optional video → What It Does → The Problem → The Solution → Tech Stack → Key Features → Results → Client Feedback → CTA. Max width 800px, `whileInView` fade-in. Testimonial frame supports screenshot image OR text quote.

## Patterns & Gotchas
- `TestWayOfCode.tsx` is experimental — keep the file, do NOT render it in `App.tsx` unless requested.
- Hover: don't combine framer-motion `whileHover` with `react-tilt` — use CSS transitions (prevents visual conflicts).
- Don't put `absolute inset-0` hover overlays over images — causes a "black card" effect.
- Use a standard hyphen `-`, not a non-breaking hyphen `‑`, in pixel-font headings (renders poorly in Press Start 2P).
