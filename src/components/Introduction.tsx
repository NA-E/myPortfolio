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
              I'm a passionate <span className="gradient-text font-semibold">Automation Engineer</span> with expertise 
              in creating efficient workflows and integrating business systems. 
              My goal is to help companies streamline their operations and eliminate repetitive tasks.
            </motion.p>
            
            <motion.p
              className="text-base text-text-secondary leading-relaxed"
              variants={introVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 0.9 }}
            >
              With over 5 years of experience in process automation and workflow optimization, 
              I specialize in developing N8N workflows that connect disparate systems and automate 
              complex business processes. My solutions have helped companies save thousands of hours 
              and significantly reduce operational costs.
            </motion.p>
            
            <motion.div
              variants={introVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              transition={{ delay: 1 }}
              className="flex flex-wrap gap-2 sm:gap-3"
            >
              {["N8N", "API Integration", "ETL", "JavaScript", "Webhooks", "Database", "REST API", "CRM"].map((skill, index) => (
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
                  <h3 className="font-pixel text-accent-primary text-sm sm:text-base mb-2 sm:mb-3">AUTOMATION PHILOSOPHY</h3>
                  <p className="text-text-secondary text-base leading-relaxed">
                    I believe that automation should be intuitive, reliable, and transparent. 
                    Every workflow I build is designed with error handling, monitoring, and scalability in mind.
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
                    I start by understanding your business processes in depth, identifying bottlenecks 
                    and opportunities for automation. Then I design, implement, and refine workflows to 
                    achieve maximum efficiency.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="mr-4 mt-2">
                  <div className="h-3 w-3 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary"></div>
                </div>
                <div>
                  <h3 className="font-pixel text-accent-primary text-sm sm:text-base mb-2 sm:mb-3">RESULTS DELIVERED</h3>
                  <p className="text-text-secondary text-base leading-relaxed">
                    My automation solutions typically reduce manual processing time by 70-95%, 
                    with an average ROI of 300% within the first year of implementation.
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