# journal-mcp — publish blog posts from the daily routine

A remote **MCP server** (Supabase Edge Function, `mcp-lite` + Streamable HTTP) that
lets Nourin's cloud **Claude routine** publish on-brand posts to the nourin.dev
journal. Posts land in the Supabase `journal_posts` table; the site reads them live.

Why an MCP server and not a plain HTTP endpoint: in a Claude routine sandbox,
`Bash`/`curl` can only reach `github.com` — every other host is blocked. But MCP
traffic is routed through Anthropic's trusted sidecar and bypasses that proxy, so
MCP is the **only** way the routine can reach this service.

## Tools (the publish pipeline)

`get_style_guide` → `get_examples` → `suggest_next_issue` → `create_draft`
→ `check_draft` → `publish_post`, plus `list_posts` / `get_post` / `update_post`
/ `unpublish_post`. See [`routine-setup/routine-prompt-snippet.md`](routine-setup/routine-prompt-snippet.md).

`check_draft` runs deterministic **structure** + **dedup** (vs posts published in the
last N days) checks, and returns the reference digests + a tone rubric so the routine
judges tone itself — the server never calls a model.

---

## Deploy

Prereqs: the `journal_posts` table exists (run `supabase/migrations/20260711000000_journal_init.sql`)
and the project is linked (`supabase link`).

```bash
# 1. Generate the shared bearer token (keep it secret)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# 2. Set function secrets (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY are auto-injected)
supabase secrets set JOURNAL_MCP_TOKEN=<the-token-from-step-1>
supabase secrets set JOURNAL_BASE_URL=https://nourin.dev

# 3. Deploy WITHOUT the JWT gate so our own bearer check governs access
supabase functions deploy journal-mcp --no-verify-jwt
```

Endpoint: `https://<project-ref>.supabase.co/functions/v1/journal-mcp/mcp`

## Smoke-test locally (you can curl; the routine can't)

```bash
supabase functions serve journal-mcp --no-verify-jwt --env-file supabase/.env.local
# .env.local needs JOURNAL_MCP_TOKEN + SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY

curl -s http://localhost:54321/functions/v1/journal-mcp/mcp \
  -H "Authorization: Bearer $JOURNAL_MCP_TOKEN" \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

A wrong/absent token returns `401`. `tools/list` should return the 10 tools.

---

## Wire it into the routine

In the routine's repo (`NA-E/claude_code_daily_learning`):

1. Commit [`routine-setup/.mcp.json`](routine-setup/.mcp.json) to the repo root as
   `.mcp.json` — set the real `<project-ref>` in the URL.
2. Commit [`routine-setup/settings.json`](routine-setup/settings.json) as
   `.claude/settings.json` (pre-approves the tools so an unattended run never pauses).
3. In the routine's **environment variables** (claude.ai → routine → environment),
   set `JOURNAL_MCP_TOKEN` = the token from deploy step 1. `.mcp.json` expands
   `${JOURNAL_MCP_TOKEN}` at connect time — the token is never committed.
4. Append the publish step from
   [`routine-setup/routine-prompt-snippet.md`](routine-setup/routine-prompt-snippet.md)
   to the routine's prompt.
5. Run the routine once and confirm the `journal` server connects (its tools appear
   in the run) and a post publishes.

## Files

| File | Role |
|---|---|
| `index.ts` | Deno entry: Hono + bearer auth + Streamable HTTP transport |
| `server.ts` | `McpServer` + the 10 tool definitions |
| `db.ts` | `journal_posts` data access (service role key) |
| `validate.ts` | structure validation + dedup |
| `brand.ts` | style guide, mapping rules, reference digests, tone rubric |
| `deno.json` | import map (mcp-lite, zod, hono, supabase-js) |
