import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { journalEntries } from '../data/journal';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const JournalPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const entry = journalEntries.find((e) => e.slug === slug);
  const currentIndex = journalEntries.findIndex((e) => e.slug === slug);
  const prevEntry = currentIndex < journalEntries.length - 1 ? journalEntries[currentIndex + 1] : null;
  const nextEntry = currentIndex > 0 ? journalEntries[currentIndex - 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!entry) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-pixel text-2xl mb-4">ISSUE NOT FOUND</h1>
          <Link to="/journal" className="text-accent-primary hover:text-accent-secondary transition-colors">
            Back to Journal
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-28 pb-20">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">

        {/* Back link */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn}>
          <Link
            to="/journal"
            className="inline-flex items-center text-text-secondary hover:text-accent-primary transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Journal
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header initial="hidden" animate="visible" variants={fadeIn} className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-5">
            <span className="font-mono text-xs text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded">
              #{String(entry.issue).padStart(3, '0')}
            </span>
            <span className="font-mono text-xs text-text-secondary">{entry.date}</span>
            <span className="font-mono text-xs text-accent-secondary/70 bg-accent-secondary/10 px-2 py-0.5 rounded">
              {entry.project}
            </span>
            {entry.author && (
              <span className="font-mono text-xs text-text-secondary">
                narrated by <span className="text-accent-primary">{entry.author}</span>
              </span>
            )}
          </div>

          <h1 className="font-pixel text-lg sm:text-2xl md:text-3xl mb-4 heading-glow leading-relaxed">
            {entry.title}
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">{entry.subtitle}</p>
        </motion.header>

        {/* TL;DR */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeIn}
          className="mb-14"
        >
          <div className="bg-dark-surface border border-accent-primary/20 rounded-lg p-6">
            <p className="font-mono text-xs text-accent-primary mb-2 uppercase tracking-wider">TL;DR</p>
            <p className="text-text-secondary leading-relaxed">{entry.tldr}</p>
          </div>
        </motion.div>

        {/* Story sections */}
        {entry.sections.map((section, i) => (
          <motion.section
            key={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeIn}
            className="mb-14"
          >
            <h2 className="font-pixel text-xs sm:text-sm md:text-base mb-5 text-accent-primary">
              {section.heading}
            </h2>
            <div className="space-y-4">
              {section.paragraphs.map((para, j) => (
                <p key={j} className="text-text-secondary leading-relaxed">
                  {para}
                </p>
              ))}
            </div>
          </motion.section>
        ))}

        {/* Divider */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeIn}
          className="mb-14"
        >
          <div className="section-divider" />
        </motion.div>

        {/* Recipes */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeIn}
          className="mb-14"
        >
          <div className="mb-6">
            <h2 className="font-pixel text-xs sm:text-sm md:text-base mb-2 text-accent-secondary">
              RECIPES
            </h2>
            <p className="font-mono text-xs text-text-secondary">
              Patterns extracted from this issue. Agent-readable — your Claude can lift these directly.
            </p>
          </div>

          <div className="space-y-6">
            {entry.recipes.map((recipe, i) => (
              <motion.div
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={fadeIn}
                className="bg-dark-surface border border-accent-secondary/20 rounded-lg overflow-hidden"
              >
                {/* Recipe header — terminal chrome */}
                <div className="flex items-center gap-2 px-4 py-3 border-b border-accent-secondary/10 bg-black/20">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                  <span className="font-mono text-xs text-text-secondary ml-2">recipe: {recipe.name}</span>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <span className="font-mono text-xs text-accent-primary uppercase tracking-wider">Problem</span>
                    <p className="text-text-secondary text-sm leading-relaxed mt-1">{recipe.problem}</p>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-accent-secondary uppercase tracking-wider">Solution</span>
                    <p className="text-text-secondary text-sm leading-relaxed mt-1">{recipe.solution}</p>
                  </div>
                  <div>
                    <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">Why it works</span>
                    <p className="text-text-secondary text-sm leading-relaxed mt-1">{recipe.why}</p>
                  </div>
                  {recipe.snippet && (
                    <div>
                      <span className="font-mono text-xs text-text-secondary uppercase tracking-wider">Snippet</span>
                      <pre className="mt-2 font-mono text-xs text-accent-primary/90 bg-black/40 rounded p-4 overflow-x-auto leading-relaxed whitespace-pre-wrap">
                        {recipe.snippet}
                      </pre>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Prev / Next */}
        {(prevEntry || nextEntry) && (
          <motion.nav
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeIn}
            className="border-t border-accent-primary/10 pt-10 flex justify-between gap-4"
          >
            {prevEntry ? (
              <Link
                to={`/journal/${prevEntry.slug}`}
                className="group flex-1 text-left"
              >
                <p className="font-mono text-xs text-text-secondary mb-1">← Previous</p>
                <p className="font-pixel text-xs text-text group-hover:text-accent-primary transition-colors leading-relaxed">
                  {prevEntry.title}
                </p>
              </Link>
            ) : <div className="flex-1" />}

            {nextEntry ? (
              <Link
                to={`/journal/${nextEntry.slug}`}
                className="group flex-1 text-right"
              >
                <p className="font-mono text-xs text-text-secondary mb-1">Next →</p>
                <p className="font-pixel text-xs text-text group-hover:text-accent-primary transition-colors leading-relaxed">
                  {nextEntry.title}
                </p>
              </Link>
            ) : <div className="flex-1" />}
          </motion.nav>
        )}

      </div>
    </article>
  );
};

export default JournalPostPage;
