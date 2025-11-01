import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';

const Contact: React.FC = () => {
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
    hidden: { opacity: 0, y: 20 },
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

  const connectText = "LET'S\u00A0CONNECT";

  const socialLinks = [
    { icon: Github, href: '#', label: 'github.com/nourinahmed' },
    { icon: Linkedin, href: '#', label: 'linkedin.com/in/nourinahmed' },
    { icon: Mail, href: 'mailto:nourin.ahmed@example.com', label: 'nourin.ahmed@example.com' }
  ];

  return (
    <section id="contact" className="section relative">
      <div className="absolute inset-0 bg-gradient-radial from-background-violet/20 to-transparent opacity-30"></div>
      <div className="absolute inset-0 circuit-pattern opacity-5"></div>
      
      <div className="container relative">
        <motion.div
          ref={ref}
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-12 text-center"
        >
          <h2 className="font-pixel text-3xl md:text-4xl lg:text-5xl mb-6 heading-glow">
            {connectText.split('').map((letter, i) => (
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
            Interested in automating your business processes? Let's discuss how I can help.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              variants={itemVariants}
              className="bg-dark-surface rounded-lg p-8 border border-accent-primary/10 hover:border-accent-primary/30 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <h3 className="font-pixel text-lg mb-6 text-accent-primary relative">GET IN TOUCH</h3>
              
              <div className="space-y-6 relative">
                {socialLinks.map((link, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center group/link"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                  >
                    <link.icon size={20} className="text-accent-primary mr-4" />
                    <a 
                      href={link.href} 
                      className="text-text-secondary hover:text-accent-primary transition-colors hover-link"
                    >
                      {link.label}
                    </a>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="absolute -bottom-12 -right-12 w-32 h-32 bg-accent-primary/5 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="bg-dark-surface rounded-lg p-8 border border-accent-primary/10 hover:border-accent-primary/30 transition-all duration-300 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <h3 className="font-pixel text-lg mb-6 text-accent-primary relative">SEND A MESSAGE</h3>
              
              <form className="space-y-4 relative">
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full p-3 bg-dark-surface-hover border border-accent-primary/20 rounded-lg focus:border-accent-primary transition-colors"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full p-3 bg-dark-surface-hover border border-accent-primary/20 rounded-lg focus:border-accent-primary transition-colors"
                  />
                </motion.div>
                
                <motion.div
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <textarea 
                    rows={4} 
                    placeholder="Your Message" 
                    className="w-full p-3 bg-dark-surface-hover border border-accent-primary/20 rounded-lg focus:border-accent-primary transition-colors"
                  ></textarea>
                </motion.div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <button 
                    type="submit" 
                    className="w-full md:w-auto group inline-flex items-center justify-center bg-gradient-to-r from-accent-primary to-accent-secondary text-background font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent-primary/20 hover:scale-105"
                  >
                    SEND MESSAGE 
                    <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                </motion.div>
              </form>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-4 text-xs text-text-secondary"
              >
                Average response time: 24 hours
              </motion.div>

              <motion.div
                className="absolute -bottom-12 -left-12 w-32 h-32 bg-accent-secondary/5 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: 2
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;