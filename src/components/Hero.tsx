import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Particles from 'react-particles';
import { loadSlim } from "tsparticles-slim";
import type { Container, Engine } from "tsparticles-engine";

const Hero: React.FC = () => {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(async (container: Container | undefined) => {
    console.log(container);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.8,
      }
    })
  };

  return (
    <section id="home" className="relative min-h-0 lg:min-h-screen flex flex-col justify-center overflow-hidden px-4 pt-28 pb-16 lg:py-0">
      <Particles
        className="particles-container"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: {
            opacity: 0
          },
          fpsLimit: 60,
          particles: {
            color: {
              value: "#FF6EC7"
            },
            links: {
              enable: true,
              color: "#FF6EC7",
              opacity: 0.1
            },
            move: {
              enable: true,
              speed: 0.5
            },
            number: {
              value: 30,
              density: {
                enable: true,
                value_area: 800
              }
            },
            opacity: {
              value: 0.1
            },
            size: {
              value: { min: 1, max: 3 }
            }
          }
        }}
      />
      
      <div className="container mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-7 text-center lg:text-left">
            <motion.p
              className="text-sm md:text-base uppercase tracking-widest mb-4 typing-animation font-semibold text-text-secondary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent-primary to-accent-secondary">AI Product Engineer</span>
            </motion.p>
            
            <motion.h1
              className="font-pixel text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-6 tracking-wide"
              style={{ lineHeight: '1.5', textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(236, 72, 153, 0.15), 0 0 4px rgba(255, 110, 199, 0.3)' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              YOU KNOW IT CAN BE DONE.
              <br className="hidden lg:block" />
              <span className="block lg:inline" style={{ textShadow: '0 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(236, 72, 153, 0.15), 0 0 4px rgba(255, 110, 199, 0.3)' }}>I MAKE IT WORK.</span>
            </motion.h1>
            
            <div className="overflow-hidden">
              <motion.p 
                className="text-sm sm:text-base md:text-lg xl:text-xl leading-relaxed mb-8 text-text-secondary max-w-2xl mx-auto lg:mx-0"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                I design, fix, and scale AI‑driven tools and workflows for teams who outgrew
                no‑code hacks and vibe‑coding experiments.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a 
                href="#portfolio" 
                className="w-full sm:w-auto text-center inline-block bg-gradient-to-r from-accent-primary to-accent-secondary text-background font-medium py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-accent-primary/20 hover:scale-105 glow-on-hover"
              >
                VIEW MY WORK
              </a>
              <a 
                href="#contact"
                className="w-full sm:w-auto text-center inline-block border border-accent-primary text-accent-primary font-medium py-3 px-8 rounded-lg hover:bg-accent-primary hover:text-background transition-all duration-300 hover:scale-105"
              >
                LET'S TALK
              </a>
            </motion.div>
          </div>
          
          <motion.div
            className="lg:col-span-5 relative mt-8 lg:mt-0 flex items-stretch"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            {/* Terminal status card — stretches to match left column height */}
            <div className="relative z-10 bg-[rgba(255,255,255,0.03)] border border-white/10 rounded-lg w-full font-mono text-sm overflow-hidden shadow-lg shadow-black/20 flex flex-col">
              {/* Title bar */}
              <div className="flex items-center bg-[rgba(255,255,255,0.05)] border-b border-white/[0.08] px-3 py-2">
                <div className="flex items-center gap-[8px]">
                  <span className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]"></span>
                  <span className="w-[10px] h-[10px] rounded-full bg-[#ffbd2e]"></span>
                  <span className="w-[10px] h-[10px] rounded-full bg-[#28ca42]"></span>
                </div>
                <span className="flex-1 text-center text-xs text-white/40">nourin@portfolio — bash</span>
              </div>
              {/* Terminal body */}
              <div className="p-5 flex-1 flex flex-col justify-center">
                <p className="text-accent-primary mb-2">$ whoami</p>
                <div className="text-white/15 mb-2 select-none" aria-hidden="true">─────────────────────────</div>
                <div className="space-y-1 text-[#d1d5db]">
                  <p>role: <span className="text-white">ai_product_engineer</span></p>
                  <p>stack: <span className="text-white">python | typescript | n8n</span></p>
                  <p>clients: <span className="text-white">US · CA · EU · MENA</span></p>
                  <p>mode: <span className="text-accent-primary">rescue_failed_projects</span></p>
                  <p>status: <span className="text-green-400">available_for_hire</span></p>
                </div>
                <div className="text-white/15 mt-2 select-none" aria-hidden="true">─────────────────────────</div>
                <p className="mt-2 text-accent-primary">$ <span className="animate-blink">█</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer hidden lg:block"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.5, 
          delay: 1.5, 
          repeat: Infinity, 
          repeatType: "reverse" 
        }}
      >
        <a href="#about">
          <ChevronDown size={24} className="text-accent-primary animate-bounce" />
        </a>
      </motion.div>
    </section>
  );
};

export default Hero;