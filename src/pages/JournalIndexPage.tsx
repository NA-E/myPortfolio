import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { journalEntries } from '../data/journal';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const JournalIndexPage: React.FC = () => {
  const sorted = [...journalEntries].sort((a, b) => b.issue - a.issue);

  return (
    <div className="min-h-screen pt-28 pb-20">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">

        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-16"
        >
          <h1 className="font-pixel text-xl sm:text-2xl md:text-4xl mb-4 heading-glow">
            JOURNAL
          </h1>
          <p className="text-text-secondary text-lg leading-relaxed max-w-xl">
            Building in public — what I made, what broke, and the patterns I extracted.
            Each issue is agent-readable: point your Claude at any post URL and it'll extract the recipes directly.
          </p>
        </motion.header>

        {/* Issue list */}
        <div className="space-y-6">
          {sorted.map((entry, i) => (
            <motion.article
              key={entry.slug}
              initial="hidden"
              animate="visible"
              variants={{ ...fadeIn, visible: { ...fadeIn.visible, transition: { duration: 0.5, delay: i * 0.08 } } }}
            >
              <Link
                to={`/journal/${entry.slug}`}
                className="group block bg-dark-surface border border-accent-primary/10 rounded-lg p-6 hover:border-accent-primary/30 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Meta row */}
                    <div className="flex items-center gap-3 mb-3">
                      <span className="font-mono text-xs text-accent-primary bg-accent-primary/10 px-2 py-0.5 rounded">
                        #{String(entry.issue).padStart(3, '0')}
                      </span>
                      <span className="font-mono text-xs text-text-secondary">
                        {entry.date}
                      </span>
                      <span className="font-mono text-xs text-accent-secondary/70 bg-accent-secondary/10 px-2 py-0.5 rounded">
                        {entry.project}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="font-pixel text-sm sm:text-base mb-2 group-hover:text-accent-primary transition-colors leading-relaxed">
                      {entry.title}
                    </h2>

                    {/* Subtitle */}
                    <p className="text-text-secondary text-sm leading-relaxed mb-4">
                      {entry.subtitle}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-mono text-xs text-text-secondary border border-accent-primary/15 px-2 py-0.5 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    size={20}
                    className="text-text-secondary group-hover:text-accent-primary group-hover:translate-x-1 transition-all duration-300 flex-shrink-0 mt-1"
                  />
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ ...fadeIn, visible: { ...fadeIn.visible, transition: { duration: 0.5, delay: 0.4 } } }}
          className="mt-16 pt-8 border-t border-accent-primary/10"
        >
          <p className="font-mono text-xs text-text-secondary leading-relaxed">
            <span className="text-accent-primary">$</span> This journal documents the build. New issues drop when something worth writing about happens — a hard-won fix, a pattern that clicked, a system that finally worked. No schedule. Just signal.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default JournalIndexPage;
