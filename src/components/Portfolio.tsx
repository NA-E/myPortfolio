import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { projects } from '../data/projects';
import { ExternalLink } from 'lucide-react';
import { Tilt } from 'react-tilt';

const Portfolio: React.FC = () => {
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

  return (
    <section id="portfolio" className="section relative">
      <div className="absolute inset-0 bg-gradient-radial from-background-violet/20 to-transparent opacity-30"></div>
      <div className="container relative">
        <motion.div
          ref={ref}
          variants={titleVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16 text-center"
        >
          <h2 className="font-pixel text-3xl md:text-4xl lg:text-5xl mb-6 heading-glow">
            SELECTED WORK
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explore my portfolio of automation projects that have transformed business processes and workflows.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="flex flex-col h-full"
            >
              <Tilt options={defaultTiltOptions}>
                <div className="group bg-dark-surface rounded-lg overflow-hidden hover-card border border-accent-primary/10 hover:border-accent-primary/30 tilt-card h-full">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent z-10"></div>
                    <div className="absolute inset-0 bg-accent-primary/10 mix-blend-overlay z-10"></div>
                    <motion.img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <span className="text-xs uppercase tracking-wider text-accent-primary bg-accent-primary/10 py-1 px-3 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="font-pixel text-lg mb-3 text-text group-hover:text-accent-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-6 flex-grow">
                      {project.description}
                    </p>
                    
                    <div className="mt-auto">
                      <a 
                        href={project.link} 
                        className="inline-flex items-center text-accent-primary hover:text-accent-secondary transition-colors"
                      >
                        VIEW PROJECT <ExternalLink size={16} className="ml-2" />
                      </a>
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-accent-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </Tilt>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;