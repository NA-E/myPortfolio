import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import {
  ArrowDown,
  Check,
  Square,
  FileText,
  Link2,
  Plus,
  Send,
  Play,
  Loader2,
} from 'lucide-react';
import type { AuditQuestion, Portal, PortalSubmission } from '../types/portal';
import { getPortal, setCheck, addSubmission } from '../lib/supabase';

const CONTACT_EMAIL = 'ekanourin@gmail.com';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

/* Brand-styled renderers for the markdown preface.
   One factory; strips react-markdown's `node` prop so it doesn't leak to the DOM. */
const mdTag =
  (Tag: any, className: string, extra: Record<string, unknown> = {}) =>
  (props: any) => {
    const rest = { ...props };
    delete rest.node;
    return <Tag className={className} {...extra} {...rest} />;
  };

const HEADING = 'font-pixel text-sm text-text mt-6 mb-3';
const md = {
  p: mdTag('p', 'text-text-secondary leading-relaxed mb-4'),
  ul: mdTag('ul', 'list-disc pl-5 space-y-1.5 mb-4 text-text-secondary'),
  ol: mdTag('ol', 'list-decimal pl-5 space-y-1.5 mb-4 text-text-secondary'),
  li: mdTag('li', 'leading-relaxed'),
  strong: mdTag('strong', 'text-text font-semibold'),
  em: mdTag('em', 'italic'),
  a: mdTag('a', 'text-accent-primary hover:text-accent-secondary', {
    target: '_blank',
    rel: 'noreferrer',
  }),
  blockquote: mdTag(
    'blockquote',
    'border-l-2 border-accent-primary/40 bg-dark-surface rounded-r-lg px-4 py-3 my-5 text-text-secondary [&_p]:mb-0'
  ),
  h1: mdTag('h3', HEADING),
  h2: mdTag('h3', HEADING),
  h3: mdTag('h4', 'font-pixel text-xs text-text mt-5 mb-2'),
};

const Section: React.FC<{ children: React.ReactNode; className?: string; id?: string }> = ({
  children,
  className = '',
  id,
}) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: '-50px' }}
    variants={fadeIn}
    className={className}
  >
    {children}
  </motion.section>
);

const SlimHeader: React.FC<{ clientName?: string }> = ({ clientName }) => (
  <header className="border-b border-accent-primary/10 bg-dark-surface/60 backdrop-blur sticky top-0 z-10">
    <div className="max-w-[900px] mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
      <span className="font-pixel text-sm md:text-base gradient-text">
        NOURIN<span className="text-accent-primary">.</span>
      </span>
      {clientName && (
        <span className="font-mono text-xs text-text-secondary">Client Portal · {clientName}</span>
      )}
    </div>
  </header>
);

const SlimFooter: React.FC = () => (
  <footer className="bg-dark-surface py-8 border-t border-accent-primary/10 mt-16">
    <div className="max-w-[900px] mx-auto px-4 md:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
      <span className="font-pixel text-sm gradient-text">
        NOURIN<span className="text-accent-primary">.</span>
      </span>
      <span className="text-text-secondary text-sm">
        &copy; {new Date().getFullYear()} Nourin Ahmed
      </span>
    </div>
  </footer>
);

/** Group consecutive questions that share a section heading. */
function groupBySection(audit: AuditQuestion[]) {
  const groups: { section: string; items: { q: AuditQuestion; number: number }[] }[] = [];
  audit.forEach((q, i) => {
    const section = q.section || '';
    let g = groups[groups.length - 1];
    if (!g || g.section !== section) {
      g = { section, items: [] };
      groups.push(g);
    }
    g.items.push({ q, number: i + 1 });
  });
  return groups;
}

const PortalPage: React.FC = () => {
  const { token } = useParams<{ token: string }>();
  const [portal, setPortal] = useState<Portal | null>(null);
  const [loading, setLoading] = useState(true);
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [subs, setSubs] = useState<PortalSubmission[]>([]);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkLabel, setLinkLabel] = useState('');
  const [saving, setSaving] = useState(false);
  const [linkError, setLinkError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    let active = true;
    (async () => {
      setLoading(true);
      const p = token ? await getPortal(token) : null;
      if (!active) return;
      setPortal(p);
      setChecks(p?.checks ?? {});
      setSubs(p?.submissions ?? []);
      setLoading(false);
    })();
    return () => {
      active = false;
    };
  }, [token]);

  const toggle = (id: string) => {
    if (!token) return;
    const next = !checks[id];
    setChecks((c) => ({ ...c, [id]: next })); // optimistic
    setCheck(token, id, next).catch(() => {
      setChecks((c) => ({ ...c, [id]: !next })); // revert on failure
    });
  };

  const addLink = async () => {
    const url = linkUrl.trim();
    if (!url || !token || saving) return;
    const label = linkLabel.trim() || 'Link';
    const entry: PortalSubmission = { label, url, createdAt: new Date().toISOString() };
    setSaving(true);
    setLinkError('');
    setSubs((s) => [...s, entry]); // optimistic
    try {
      await addSubmission(token, label, url);
      setLinkUrl('');
      setLinkLabel('');
    } catch {
      setSubs((s) => s.filter((x) => x !== entry)); // revert — the save didn't land
      setLinkError("Couldn't save that link. Please check your connection and try again.");
    } finally {
      setSaving(false);
    }
  };

  const sendEmail = () => {
    if (!portal) return;
    const lines = subs.map((s) => `- ${s.label ? s.label + ': ' : ''}${s.url}`).join('\n');
    const subject = `Portal submission — ${portal.clientName}`;
    const body = `Hi Nourin,\n\nHere are my links:\n\n${lines || '(add your links above first)'}\n\n— ${portal.clientName}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-text-secondary">
        <Loader2 className="animate-spin mr-3" size={20} />
        Loading your portal…
      </div>
    );
  }

  if (!portal) {
    return (
      <div className="min-h-screen flex flex-col">
        <SlimHeader />
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="font-pixel text-xl md:text-2xl mb-4 heading-glow">PORTAL NOT FOUND</h1>
            <p className="text-text-secondary">
              This link doesn't match an active portal. Double-check the URL, or reach out at{' '}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent-primary hover:text-accent-secondary">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </div>
        </div>
        <SlimFooter />
      </div>
    );
  }

  const doneCount = portal.audit.filter((q) => checks[q.id]).length;
  const groups = groupBySection(portal.audit);

  return (
    <div className="min-h-screen flex flex-col">
      <SlimHeader clientName={portal.clientName} />

      <main className="flex-1 max-w-[900px] w-full mx-auto px-4 md:px-8 pt-12 pb-8">
        {/* Welcome + preface */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="mb-14">
          <h1 className="font-pixel text-2xl md:text-4xl mb-6 heading-glow">
            Hi {portal.clientName} <span className="align-middle">👋</span>
          </h1>

          {portal.auditIntro ? (
            <div className="text-[15px]">
              <ReactMarkdown components={md}>{portal.auditIntro}</ReactMarkdown>
            </div>
          ) : (
            <>
              <p className="text-text-secondary text-lg mb-8 max-w-xl">
                Welcome to your project space{portal.company ? ` for ${portal.company}` : ''}.
                Everything for our work together lives here.
              </p>
              {portal.nextStep && (
                <div className="bg-dark-surface border border-accent-primary/30 rounded-lg p-5 md:p-6">
                  <div className="font-pixel text-xs text-accent-primary mb-3">▶ YOUR NEXT STEP</div>
                  <p className="text-text-secondary leading-relaxed mb-4">{portal.nextStep}</p>
                  <a
                    href="#audit"
                    className="inline-flex items-center text-sm text-accent-primary hover:text-accent-secondary transition-colors"
                  >
                    Jump to audit <ArrowDown size={15} className="ml-1.5" />
                  </a>
                </div>
              )}
            </>
          )}
        </motion.div>

        {/* Audit questions */}
        <Section id="audit" className="mb-16 scroll-mt-24">
          <div className="flex items-baseline justify-between mb-6 flex-wrap gap-2">
            <h2 className="font-pixel text-sm md:text-lg text-accent-primary">QUESTIONS</h2>
            <span className="font-mono text-sm text-text-secondary">
              {doneCount} / {portal.audit.length} done
            </span>
          </div>

          <div className="space-y-6">
            {groups.map((g, gi) => (
              <div key={gi}>
                {g.section && (
                  <h3 className="font-mono text-xs uppercase tracking-wider text-accent-secondary/90 mb-2">
                    {g.section}
                  </h3>
                )}
                <ul className="space-y-2">
                  {g.items.map(({ q, number }) => {
                    const on = !!checks[q.id];
                    return (
                      <li key={q.id}>
                        <button
                          onClick={() => toggle(q.id)}
                          className={`w-full text-left flex items-start gap-3 rounded-lg border p-4 transition-colors ${
                            on
                              ? 'bg-accent-primary/10 border-accent-primary/40'
                              : 'bg-dark-surface border-accent-primary/10 hover:border-accent-primary/30'
                          }`}
                        >
                          <span className="mt-0.5 text-accent-primary flex-shrink-0">
                            {on ? <Check size={18} /> : <Square size={18} className="opacity-40" />}
                          </span>
                          <span className={`text-sm leading-relaxed ${on ? 'text-text' : 'text-text-secondary'}`}>
                            <span className="font-mono text-text-secondary/60 mr-1.5">{number}.</span>
                            {q.text}
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Files & Links */}
        <Section className="mb-16">
          <h2 className="font-pixel text-sm md:text-lg text-accent-primary mb-6">FILES &amp; LINKS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Shared by Nourin */}
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-3">
                Shared by Nourin
              </div>
              <div className="space-y-3">
                {portal.docs.map((doc, i) => (
                  <div
                    key={i}
                    className="bg-dark-surface border border-accent-primary/10 rounded-lg p-4 flex items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3 min-w-0">
                      <FileText size={18} className="text-accent-primary mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <div className="text-text text-sm font-medium truncate">{doc.label}</div>
                        {doc.note && <div className="text-text-secondary text-xs">{doc.note}</div>}
                      </div>
                    </div>
                    {doc.url ? (
                      <a
                        href={doc.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-sm text-accent-primary hover:text-accent-secondary transition-colors flex-shrink-0"
                      >
                        View →
                      </a>
                    ) : (
                      <span className="text-xs text-text-secondary/60 flex-shrink-0">soon</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Share with Nourin */}
            <div>
              <div className="font-mono text-xs uppercase tracking-wider text-text-secondary mb-3">
                Share with Nourin
              </div>
              <div className="bg-dark-surface border border-accent-primary/10 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Link2 size={16} className="text-accent-primary flex-shrink-0" />
                  <input
                    type="url"
                    value={linkUrl}
                    onChange={(e) => setLinkUrl(e.target.value)}
                    placeholder="Paste a link (Loom, Drive, …)"
                    className="!py-2 !px-3 text-sm flex-1 min-w-0"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={linkLabel}
                    onChange={(e) => setLinkLabel(e.target.value)}
                    placeholder="Label (optional)"
                    className="!py-2 !px-3 text-sm flex-1 min-w-0"
                  />
                  <button
                    onClick={addLink}
                    disabled={saving || !linkUrl.trim()}
                    className="inline-flex items-center gap-1 bg-accent-primary/15 hover:bg-accent-primary/25 text-accent-primary text-sm px-3 py-2 rounded-lg flex-shrink-0 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    <Plus size={15} /> {saving ? 'Saving…' : 'Add'}
                  </button>
                </div>
                {linkError && <p className="text-xs text-accent-primary mt-2">{linkError}</p>}

                {subs.length > 0 && (
                  <ul className="mt-4 space-y-2 border-t border-accent-primary/10 pt-3">
                    {subs.map((s, i) => (
                      <li key={i} className="text-sm text-text-secondary truncate">
                        • {s.label ? <span className="text-text">{s.label}</span> : null}{' '}
                        <a
                          href={s.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-accent-primary hover:text-accent-secondary break-all"
                        >
                          {s.url}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}

                <button
                  onClick={sendEmail}
                  disabled={subs.length === 0}
                  className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-accent-primary hover:bg-accent-secondary text-background font-semibold text-sm px-4 py-2.5 rounded-lg transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send size={15} /> Send to Nourin
                </button>
              </div>
            </div>
          </div>
        </Section>

        {/* Calls */}
        {portal.calls.length > 0 && (
          <Section>
            <h2 className="font-pixel text-sm md:text-lg text-accent-primary mb-6">OUR CALLS</h2>
            <div className="space-y-4">
              {portal.calls.map((call, i) => (
                <div key={i} className="bg-dark-surface border border-accent-primary/10 rounded-lg p-5">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap mb-2">
                    <h3 className="text-text font-semibold">{call.name}</h3>
                    {call.date && (
                      <span className="font-mono text-xs text-text-secondary">{call.date}</span>
                    )}
                  </div>
                  {call.summary && (
                    <p className="text-text-secondary text-sm leading-relaxed mb-3">{call.summary}</p>
                  )}
                  {call.recordingUrl && (
                    <a
                      href={call.recordingUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm text-accent-primary hover:text-accent-secondary transition-colors"
                    >
                      <Play size={14} /> Watch recording
                    </a>
                  )}
                </div>
              ))}
            </div>
          </Section>
        )}
      </main>

      <SlimFooter />
    </div>
  );
};

export default PortalPage;
