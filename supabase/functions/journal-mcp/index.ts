// Entry point for the journal-mcp Edge Function.
//
// Deploy WITHOUT Supabase's JWT gate so our own bearer check governs access:
//   supabase functions deploy journal-mcp --no-verify-jwt
//
// Secrets (Supabase → Edge Functions → journal-mcp → Secrets):
//   JOURNAL_MCP_TOKEN   the bearer token the routine sends (required)
//   JOURNAL_BASE_URL    optional, defaults to https://nourin.dev
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are injected automatically.
import { Hono } from "hono";
import { StreamableHttpTransport } from "mcp-lite";
import { mcp } from "./server.ts";

const AUTH_TOKEN = Deno.env.get("JOURNAL_MCP_TOKEN");

const transport = new StreamableHttpTransport();
const httpHandler = transport.bind(mcp);

const app = new Hono();

// App-layer auth. The token may arrive two ways:
//   1. Authorization: Bearer <token>  — used by the repo-committed .mcp.json
//      (local dev + anything that can set headers).
//   2. A path segment: .../journal-mcp/<token>/mcp  — used by Claude.ai custom
//      connectors, whose UI only offers OAuth, no custom-header field. The
//      connector sends the URL, so the token rides in the path.
// Trade-off: a path token can appear in request logs where a header would not.
// It is a single, rotatable secret for this one server, so the exposure is low.
app.use("*", async (c, next) => {
  if (!AUTH_TOKEN) return c.json({ error: "server misconfigured: JOURNAL_MCP_TOKEN unset" }, 500);
  const header = c.req.header("Authorization") ?? "";
  const headerToken = header.startsWith("Bearer ") ? header.slice(7) : "";
  const pathSegments = new URL(c.req.url).pathname.split("/").filter(Boolean);
  const pathHasToken = pathSegments.includes(AUTH_TOKEN);
  if (headerToken !== AUTH_TOKEN && !pathHasToken) {
    return c.json({ error: "unauthorized" }, 401);
  }
  await next();
});

// The MCP endpoint. Wildcard so /functions/v1/journal-mcp and .../journal-mcp/mcp both work.
app.all("*", async (c) => await httpHandler(c.req.raw));

Deno.serve(app.fetch);
