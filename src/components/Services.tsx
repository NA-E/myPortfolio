import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { services } from '../data/services';
import { Settings, GitBranch, Link, Monitor } from 'lucide-react';
import { Tilt } from 'react-tilt';

const Services: React.FC = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.05,
        duration: 0.4,
      }
    })
  };

  const defaultTiltOptions = {
    reverse: false,
    max: 15,
    perspective: 1000,
    scale: 1,
    speed: 1000,
    transition: true,
    axis: null,
    reset: true,
    easing: "cubic-bezier(.03,.98,.52,.99)",
  };

  const getIcon = (iconName: string) => {
    switch(iconName) {
      case 'Settings':
        return <Settings size={36} className="text-accent-primary" />;
      case 'GitBranch':
        return <GitBranch size={36} className="text-accent-primary" />;
      case 'Link':
        return <Link size={36} className="text-accent-primary" />;
      case 'Monitor':
        return <Monitor size={36} className="text-accent-primary" />;
      default:
        return <Settings size={36} className="text-accent-primary" />;
    }
  };

  const titleText = "WHAT\u00A0I\u00A0DO";

  return (
    <section id="services" className="section relative">
      <div className="absolute inset-0 bg-gradient-radial from-background-violet/20 to-transparent opacity-30"></div>
      <div className="absolute inset-0 geometric-pattern opacity-5"></div>
      
      <div className="container relative">
        <motion.div
          ref={ref}
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <h2 className="font-pixel text-xl sm:text-2xl md:text-4xl lg:text-5xl mb-6 heading-glow">
            {titleText.split('').map((letter, i) => (
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
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            I build AI‑powered internal tools, workflows, and integrations — often picking up where no‑code or vibe‑coding attempts left off.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {services.map((service, index) => (
            <Tilt key={service.id} options={defaultTiltOptions}>
              <motion.div
                variants={itemVariants}
                className="group bg-dark-surface rounded-lg p-8 border border-accent-primary/10 hover:border-accent-primary/30 hover-card relative overflow-hidden h-full tilt-card"
                whileHover={{ scale: 1.02 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <motion.div
                  className="absolute -bottom-32 -right-32 w-64 h-64 bg-accent-primary/5 rounded-full blur-3xl"
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                    delay: index * 1
                  }}
                />
                
                <div className="relative z-10 tilt-card-content">
                  <motion.div 
                    className="mb-6 flex items-center justify-center h-16 w-16 rounded-lg bg-dark-surface-hover border border-accent-primary/20 group-hover:border-accent-primary/40 transition-colors"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.8 }}
                  >
                    {getIcon(service.icon)}
                  </motion.div>
                  
                  <h3 className="font-pixel text-accent-primary text-xs sm:text-sm md:text-lg mb-4 group-hover:heading-glow transition-all duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-text-secondary leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            </Tilt>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Services;