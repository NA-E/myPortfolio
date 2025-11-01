import React, { useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Code, Workflow } from 'lucide-react';
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
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden px-4 py-20 md:py-0">
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7 text-center md:text-left">
            <motion.p 
              className="text-sm md:text-base text-text-secondary uppercase tracking-widest mb-4 typing-animation"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Streamlining Business Operations
            </motion.p>
            
            <motion.h1 
              className="font-pixel text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight heading-glow mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              AUTOMATION
              <br className="hidden md:block" />
              <span className="heading-glow block md:inline">ENGINEER</span>
            </motion.h1>
            
            <div className="overflow-hidden">
              <motion.p 
                className="text-sm sm:text-base md:text-lg xl:text-xl leading-relaxed mb-8 text-text-secondary max-w-2xl mx-auto md:mx-0"
                variants={textVariants}
                initial="hidden"
                animate="visible"
                custom={0}
              >
                I design and implement automation solutions that transform manual processes into efficient, 
                error-free workflows — helping businesses save time, reduce costs, and focus on growth.
              </motion.p>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
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
                CONTACT ME
              </a>
            </motion.div>
          </div>
          
          <motion.div 
            className="md:col-span-5 font-pixel relative mt-16 md:mt-0 hidden md:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            <div className="absolute -top-32 -right-32 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-32 -left-32 w-64 h-64 bg-accent-secondary/5 rounded-full blur-3xl"></div>
            
            <motion.div
              className="absolute -right-4 top-1/2 transform -translate-y-1/2"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <div className="w-16 md:w-20 h-16 md:h-20 rounded-full border-2 border-accent-primary/30 flex items-center justify-center">
                <Code className="w-6 md:w-8 h-6 md:h-8 text-accent-primary" />
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -left-4 bottom-0"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                repeatType: "reverse",
                delay: 1
              }}
            >
              <div className="w-12 md:w-16 h-12 md:h-16 rounded-full border-2 border-accent-secondary/30 flex items-center justify-center">
                <Workflow className="w-4 md:w-6 h-4 md:h-6 text-accent-secondary" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer hidden md:block"
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