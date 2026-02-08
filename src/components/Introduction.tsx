import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Introduction: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const introVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.5,
      }
    })
  };

  const textBlockVariants = {
    hidden: { opacity: 0, x: 30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 0.5,
      }
    }
  };

  const nameText = "HI, I'M\u00A0";
  const accentText = "NOURIN";

  return (
    <section id="about" ref={ref} className="section relative">
      <div className="absolute inset-0 bg-gradient-radial from-background-violet/20 to-transparent opacity-30"></div>
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          <motion.div
            variants={introVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6 md:space-y-8"
          >
            <h2 className="font-pixel text-xl sm:text-2xl md:text-3xl lg:text-4xl heading-glow">
              {nameText.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  variants={letterVariants}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={i}
                  className="inline-block"
                >
                  {letter}
                </motion.span>
              ))}
              <span className="heading-glow">
                {accentText.split('').map((letter, i) => (
                  <motion.span
                    key={i + nameText.length}
                    variants={letterVariants}
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    custom={i + nameText.length}
                    className="inline-block"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            </h2>
            
            <motion.p
              className="text-base sm:text-lg leading-relaxed"
              variants={introVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.8 }}
            >
              I'm an <span className="gradient-text font-semibold">AI Product Engineer</span> with a background in
              professional software engineering and an MSc in Artificial Intelligence (research track).
              <br />
              I help teams who've hit the limits of no‑code tools, vibe‑coding experiments, or junior
              implementations turn their ideas into production‑grade internal tools.
            </motion.p>
            
            <motion.ul
              className="text-base text-text-secondary leading-relaxed space-y-2 list-none"
              variants={introVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.9 }}
            >
              <li className="flex items-start gap-2"><span className="text-accent-primary mt-1.5 text-xs">▸</span>Designed and built custom applications and AI‑orchestrated workflows</li>
              <li className="flex items-start gap-2"><span className="text-accent-primary mt-1.5 text-xs">▸</span>Built data pipelines for clients who need more than simple automations</li>
              <li className="flex items-start gap-2"><span className="text-accent-primary mt-1.5 text-xs">▸</span>Combine solid engineering practices with modern AI tools</li>
              <li className="flex items-start gap-2"><span className="text-accent-primary mt-1.5 text-xs">▸</span>Ship systems that stay reliable and maintainable under real‑world usage</li>
            </motion.ul>
            
            <motion.div
              variants={introVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              {["Claude Code", "Lovable", "N8N", "Bolt", "Replit", "AI Automation", "AI Agents", "Workflow Automation"].map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-dark-surface px-3 sm:px-4 py-2 rounded-lg text-sm border border-accent-primary/20 text-text-secondary hover:border-accent-primary/50 hover:text-text transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="bg-dark-surface border border-accent-primary/10 p-6 sm:p-8 rounded-lg shadow-xl mt-8 lg:mt-0"
            variants={textBlockVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
          >
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start">
                <div className="mr-4 mt-2">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"></div>
                </div>
                <div>
                  <h3 className="font-pixel text-accent-primary text-sm sm:text-base mb-2 sm:mb-3">ENGINEERING PHILOSOPHY</h3>
                  <p className="text-text-secondary text-base leading-relaxed">
                    AI‑powered systems should be reliable, testable, and transparent.
                    Every tool I build is designed with proper error handling, monitoring, and a clear path to scale.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-2">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"></div>
                </div>
                <div>
                  <h3 className="font-pixel text-accent-primary text-sm sm:text-base mb-2 sm:mb-3">MY APPROACH</h3>
                  <p className="text-text-secondary text-base leading-relaxed">
                    I start by reviewing what you already have — even if it's a half‑working prototype
                    or a tangled no‑code setup. Then I clarify requirements, redesign the architecture,
                    and rebuild it so it actually works in production.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-2">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"></div>
                </div>
                <div>
                  <h3 className="font-pixel text-accent-primary text-sm sm:text-base mb-2 sm:mb-3">RESCUE & REBUILD</h3>
                  <p className="text-text-secondary text-base leading-relaxed">
                    If you've already tried to build with AI or no‑code and got stuck, I help you
                    untangle what's there and turn it into a solid, production‑ready system.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;