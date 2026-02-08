import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { ArrowRight } from 'lucide-react';
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
            AI‑powered tools and workflows I've built for clients — from custom internal apps to production data pipelines, all built to be reliable and maintainable, not just prototypes.
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className="flex flex-col h-full"
            >
              <Tilt options={defaultTiltOptions}>
                <div className="group relative bg-dark-surface rounded-lg overflow-hidden hover-card border border-accent-primary/10 hover:border-accent-primary/30 hover:shadow-lg hover:shadow-accent-primary/10 tilt-card h-full transition-all duration-300">
                  <div className="relative h-48 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-dark-surface/60 via-transparent to-transparent z-10 pointer-events-none"></div>
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
                    />
                  </div>

                  <div className="p-6 flex flex-col flex-grow">
                    <div className="mb-4">
                      <span className="text-xs uppercase tracking-wider text-accent-primary bg-accent-primary/10 py-1 px-3 rounded-full">
                        {project.category}
                      </span>
                    </div>
                    <h3 className="font-pixel text-lg mb-3 text-text group-hover:text-accent-primary transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-text-secondary text-sm mb-6 flex-grow">
                      {project.description}
                    </p>

                    <div className="mt-auto">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="inline-flex items-center text-accent-primary hover:text-accent-secondary transition-colors"
                      >
                        VIEW PROJECT <ArrowRight size={16} className="ml-2" />
                      </Link>
                    </div>
                  </div>
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