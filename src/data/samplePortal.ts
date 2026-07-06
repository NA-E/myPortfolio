import type { Portal } from '../types/portal';

/**
 * Placeholder portal used for local preview at /portal/sample and as the
 * fallback when Supabase isn't configured yet. Real portals are created with
 * `npm run new-portal` and live in the database.
 */
export const samplePortal: Portal = {
  token: 'sample',
  clientName: 'Sarah',
  company: 'Acme Co.',
  nextStep:
    'Record a Loom walking through the audit questions below, then drop the link in Files & Links. ~15 min.',
  auditIntro:
    "This questionnaire is the single highest-leverage step in our work together — everything I design comes out of it.\n\n" +
    'There\'s a principle I keep coming back to (**Kidlin\'s Law**): *if you can write the problem down clearly, it\'s already half solved.*\n\n' +
    '> **What I need from you:** rough answers are perfect. Treat the questions as guidance, and add anything the questions don\'t cover.',
  audit: [
    { id: 'q1', text: 'What does your current lead flow look like end-to-end?', section: 'How things run today' },
    { id: 'q2', text: "Which tasks eat the most of your team's time each week?", section: 'How things run today' },
    { id: 'q3', text: 'What tools are you using today (CRM, email, scheduling, etc.)?', section: 'Tools' },
    { id: 'q4', text: 'Where do leads or clients most often drop off?', section: 'Where it strains' },
    { id: 'q5', text: 'What would "this worked" look like 90 days from now?', section: 'What "fixed" looks like' },
    { id: 'q6', text: 'Any tools or workflows that are off-limits to change?', section: 'What to protect' },
  ],
  docs: [
    { label: 'Nourin — CV / Resume', note: 'PDF · for your reference', url: null },
    { label: 'Audit Report', note: 'added after your walkthrough', url: null },
  ],
  calls: [
    {
      name: 'Kickoff Call',
      date: '2026-06-28',
      summary: 'Walked through goals, current stack, and the scope of the audit.',
      recordingUrl: 'https://www.loom.com/',
    },
    {
      name: 'Discovery Deep-Dive',
      date: '2026-07-02',
      summary: 'Mapped the lead journey and flagged 3 automation candidates.',
      recordingUrl: 'https://www.loom.com/',
    },
  ],
  checks: {},
  submissions: [],
};
