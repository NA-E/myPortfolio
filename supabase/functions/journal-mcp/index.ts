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

// App-layer auth: constant-time-ish check of the bearer token on every request.
app.use("*", async (c, next) => {
  if (!AUTH_TOKEN) return c.json({ error: "server misconfigured: JOURNAL_MCP_TOKEN unset" }, 500);
  const header = c.req.header("Authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (token !== AUTH_TOKEN) return c.json({ error: "unauthorized" }, 401);
  await next();
});

// The MCP endpoint. Wildcard so /functions/v1/journal-mcp and .../journal-mcp/mcp both work.
app.all("*", async (c) => await httpHandler(c.req.raw));

Deno.serve(app.fetch);
