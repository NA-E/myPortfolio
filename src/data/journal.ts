import { JournalEntry } from '../types/journal';

export const journalEntries: JournalEntry[] = [
  {
    issue: 1,
    slug: 'ten-agents-no-api-key',
    date: 'March 10, 2026',
    title: '10 AGENTS. NO API KEY.',
    subtitle: 'How I built the team that runs my business — and why it went dark at 19:46.',
    project: 'OpenClaude',
    tags: ['OpenClaude', 'Multi-Agent', 'Claude Code', 'Architecture'],
    tldr: 'Built a 10-agent AI team running locally with no API key by spawning Claude Code as a subprocess. Then it stopped responding at 19:46 and I found out why: the error was being swallowed in silence. Three lines of code later, it never goes dark again.',
    sections: [
      {
        heading: 'THE ARTICLE THAT BROKE MY BRAIN',
        paragraphs: [
          'Bhanu Teja P posted a thread about "Mission Control" — a system where 10 AI agents work together like a real startup team. Each one has a role. They wake up on a schedule, check their task board, collaborate via @mentions, and produce actual deliverables. Jarvis leads. Shuri handles product analysis. Friday writes code. Wong writes docs. They don\'t just answer questions — they work.',
          'I read it twice. Then I wanted it running on my machine by morning.',
          'The problem: the original setup requires an Anthropic API key and a Convex cloud database. I already pay for Claude Pro. I didn\'t want to pay again for API access on top of that. And I wanted it local — my data, my machine, no cloud dependency.',
          'So I started building OpenClaude. Same architecture, rebuilt from scratch, with one rule: it has to run on what I already have.',
        ],
      },
      {
        heading: 'THE OAUTH RABBIT HOLE',
        paragraphs: [
          'My first move seemed obvious: Claude Pro authenticates via OAuth. Claude Code stores those tokens at `~/.claude/.credentials.json`. The Anthropic SDK accepts a `authToken` option. Connect the dots.',
          'I connected them. Got a 401. The API server explicitly blocks OAuth tokens — it only accepts `sk-ant-*` API keys. Not a misconfiguration. A deliberate wall.',
          'I tried everything. Direct Bearer token headers. Custom client headers mimicking the Claude Code app. I even grepped the Claude binary to find the real token refresh endpoint (it\'s `platform.claude.com/v1/oauth/token`, not the documented console URL — that discovery took an hour). Token refresh worked perfectly. The API still wouldn\'t accept the refreshed token.',
          'That was the turning point. Instead of climbing the wall, I walked around it.',
        ],
      },
      {
        heading: 'WE JUST SPAWN THE CLI',
        paragraphs: [
          'Claude Code CLI works. It\'s authenticated via the same OAuth session. What if instead of calling the API, I just called the CLI?',
          '`claude -p "Hello" --output-format=json` — it returns clean JSON with the response. Takes system prompts via `--append-system-prompt`. Uses your existing session. Zero additional cost.',
          'I built `SubprocessClient` — a drop-in replacement for the Anthropic SDK that spawns `claude` as a subprocess, pipes the message in, and reads the JSON out. Rewired the orchestrator to use it. First end-to-end test: Jarvis responded.',
          'There were gotchas. On Windows, you have to set `CLAUDECODE` to an empty string before spawning — not delete it. Delete doesn\'t reliably unset environment variables on Windows due to how the env proxy handles case-insensitive keys. The agent would silently inherit the parent `CLAUDECODE` env and refuse to run. This one took me longer than it should have. The rule now: always `env[\'CLAUDECODE\'] = \'\'`, always loop through case variants, never rely on delete.',
          'But once it worked, it worked completely. 10 agents, full conversation history, system prompt injection, all running on my Claude Pro subscription.',
        ],
      },
      {
        heading: '19:46 — THE SILENCE',
        paragraphs: [
          'Three days in, I sent Jarvis a message about accessing a file path. The typing indicator appeared. Then nothing.',
          '5 minutes passed. Still nothing. I checked the dashboard. No error. No response. Just silence.',
          'I pulled up the diagnostics I\'d built — a JSONL log at `~/.openclaude/gateway.log` with every event timestamped. There it was: `subprocess timed out after 300s`. The `claude -p` process had hit the 5-minute limit trying to read the file, been killed, and thrown an error.',
          'The error was logged. It was broadcast to the WebSocket dashboard. It was recorded in the ring buffer.',
          'It was never sent to me on Telegram.',
          'The catch block was doing everything right except the one thing that matters: telling the user. The error went to logs, to the dashboard, to nowhere a human on their phone would see it. From my side, Jarvis just stopped responding.',
          'The fix was three lines. In the catch block, after logging the error, send a message back through the originating channel: "Sorry, I ran into an issue and couldn\'t respond. Please try again." Wrapped in its own try/catch so a Telegram API failure can\'t cause a second unhandled error.',
          'That\'s it. Three lines, and the worst failure mode — silence — becomes the most visible one.',
        ],
      },
      {
        heading: 'WHAT\'S RUNNING NOW',
        paragraphs: [
          'OpenClaude is live on my machine. Jarvis sits in a Telegram DM, available 24/7, routing messages through Claude Pro with no API key and no monthly overage. The 10-agent squad is initialized on startup, ready for task board work once I wire up the MCP tools.',
          'The diagnostics system shows response times, success rates, and a ring buffer of the last 100 events. The Task Scheduler service is registered — it starts at logon and restarts 3 times on failure. The catch block now talks back.',
          'Next: expose Mission Control tools as an MCP server so the agents can actually do things autonomously — create tasks, post comments, trigger each other. That\'s when it stops being a chatbot and starts being a team.',
        ],
      },
    ],
    recipes: [
      {
        name: 'Subprocess Client Pattern',
        problem: 'Anthropic API blocks OAuth tokens — you can\'t use Claude Pro credentials with the official SDK.',
        solution: 'Spawn `claude -p` as a subprocess with `--output-format=json` and read the JSON response. Claude Code handles its own auth.',
        why: 'Claude Code is already authenticated on your machine. The CLI is just a process — you can call it from Node.js like any other tool. Zero extra cost on top of your existing subscription.',
        snippet: `const proc = spawn('claude', [
  '-p', message,
  '--output-format', 'json',
  '--no-session-persistence',
  '--model', 'claude-sonnet-4-6',
  '--append-system-prompt', systemPrompt,
], {
  env: { ...process.env, CLAUDE_CONFIG_DIR: '~/.claude-acc1',
         CLAUDECODE: '', ANTHROPIC_API_KEY: '' },
  stdio: ['pipe', 'pipe', 'pipe'],
});
proc.stdin.end(); // critical on Windows`,
      },
      {
        name: 'Error Reply Pattern',
        problem: 'Catch blocks log errors internally but never tell the user. The result is silence — the worst failure mode.',
        solution: 'In every agent catch block, call `sendToChannel` with a friendly message. Wrap it in its own try/catch so a channel failure can\'t cause a second unhandled error.',
        why: 'Silence feels like a bug to the user. An error message — even a generic one — closes the loop. The user can retry. Without it, they\'re left wondering if their message was received at all.',
        snippet: `} catch (err) {
  logger.error('Gateway', \`Agent error\`, err);
  diagnostics.recordEvent('error', { error: err.message });
  try {
    await router.sendToChannel(message.channelType, {
      channelId: message.channelId,
      recipientId: message.senderId,
      content: 'Sorry, I ran into an issue. Please try again.',
    });
  } catch (sendErr) {
    logger.error('Gateway', 'Failed to send error reply', sendErr);
  }
}`,
      },
      {
        name: 'Windows CLAUDECODE Env Fix',
        problem: '`delete env[\'CLAUDECODE\']` doesn\'t reliably unset the variable on Windows due to case-insensitive env proxy. Nested Claude processes inherit it and refuse to run.',
        solution: 'Set to empty string. Also loop through all keys and zero out any case variant.',
        why: 'Windows environment variable keys are case-insensitive. The process.env proxy may hold multiple representations of the same key. delete only removes one. Setting to \'\' works regardless of casing.',
        snippet: `env['CLAUDECODE'] = '';
env['ANTHROPIC_API_KEY'] = '';
for (const key of Object.keys(env)) {
  if (key.toUpperCase() === 'CLAUDECODE') env[key] = '';
}`,
      },
    ],
  },
];
