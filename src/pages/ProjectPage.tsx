import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle } from 'lucide-react';
import { projects } from '../data/projects';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

const ProjectPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((p) => p.slug === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-pixel text-2xl mb-4">PROJECT NOT FOUND</h1>
          <Link to="/#portfolio" className="text-accent-primary hover:text-accent-secondary transition-colors">
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <article className="min-h-screen pt-28 pb-20">
      <div className="max-w-[800px] mx-auto px-4 md:px-8">
        {/* Back Link */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <Link
            to="/#portfolio"
            className="inline-flex items-center text-text-secondary hover:text-accent-primary transition-colors mb-10 group"
          >
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Link>
        </motion.div>

        {/* Header */}
        <motion.header
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mb-12"
        >
          <div className="mb-4">
            <span className="text-xs uppercase tracking-wider text-accent-primary bg-accent-primary/10 py-1 px-3 rounded-full">
              {project.category}
            </span>
          </div>
          <h1 className="font-pixel text-3xl md:text-4xl lg:text-5xl mb-4 heading-glow">
            {project.title}
          </h1>
          <p className="text-lg md:text-xl text-text-secondary">
            {project.subtitle}
          </p>
        </motion.header>

        {/* Feature Video */}
        {project.videoUrl && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeIn}
            className="mb-16"
          >
            <div className="rounded-lg overflow-hidden border border-accent-primary/10" style={{ aspectRatio: '16/9' }}>
              <iframe
                src={project.videoUrl}
                title={`${project.title} demo`}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </motion.section>
        )}

        {/* What It Does */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeIn}
          className="mb-14"
        >
          <h2 className="font-pixel text-lg mb-4 text-accent-primary">WHAT IT DOES</h2>
          <p className="text-text-secondary leading-relaxed">{project.overview}</p>
        </motion.section>

        {/* The Problem */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeIn}
          className="mb-14"
        >
          <h2 className="font-pixel text-lg mb-4 text-accent-primary">THE PROBLEM</h2>
          <p className="text-text-secondary leading-relaxed">{project.challenge}</p>
        </motion.section>

        {/* The Solution */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeIn}
          className="mb-14"
        >
          <h2 className="font-pixel text-lg mb-4 text-accent-primary">THE SOLUTION</h2>
          <p className="text-text-secondary leading-relaxed">{project.solution}</p>
        </motion.section>

        {/* Tech Stack */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeIn}
          className="mb-14"
        >
          <h2 className="font-pixel text-lg mb-4 text-accent-primary">TECH STACK</h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="font-mono text-sm bg-dark-surface border border-accent-primary/20 text-text-secondary px-3 py-1.5 rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Key Features */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeIn}
          className="mb-14"
        >
          <h2 className="font-pixel text-lg mb-6 text-accent-primary">KEY FEATURES</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {project.features.map((feature) => (
              <div
                key={feature.title}
                className="bg-dark-surface border border-accent-primary/10 rounded-lg p-5"
              >
                <h3 className="font-semibold text-text mb-2">{feature.title}</h3>
                <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Results */}
        {project.results && project.results.length > 0 && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeIn}
            className="mb-14"
          >
            <h2 className="font-pixel text-lg mb-4 text-accent-primary">RESULTS</h2>
            <ul className="space-y-3">
              {project.results.map((result, i) => (
                <li key={i} className="flex items-start text-text-secondary">
                  <span className="text-accent-primary mr-3 mt-1.5 w-1.5 h-1.5 bg-accent-primary rounded-full flex-shrink-0" />
                  {result}
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        {/* Testimonial */}
        {project.testimonial && (
          <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeIn}
            className="mb-14"
          >
            <h2 className="font-pixel text-lg mb-6 text-accent-primary">CLIENT FEEDBACK</h2>
            <div className="bg-dark-surface border border-accent-primary/10 rounded-lg p-6 md:p-8 relative">
              <div className="absolute top-4 right-4 text-accent-primary/20">
                <MessageCircle size={32} />
              </div>
              {project.testimonial.image ? (
                <img
                  src={project.testimonial.image}
                  alt={`Testimonial from ${project.testimonial.name || 'client'}`}
                  className="w-full rounded-md"
                />
              ) : project.testimonial.text ? (
                <div>
                  <blockquote className="text-text-secondary leading-relaxed italic text-lg mb-4">
                    "{project.testimonial.text}"
                  </blockquote>
                  {(project.testimonial.name || project.testimonial.role) && (
                    <div className="text-sm">
                      {project.testimonial.name && (
                        <span className="text-text font-medium">{project.testimonial.name}</span>
                      )}
                      {project.testimonial.role && (
                        <span className="text-text-secondary"> - {project.testimonial.role}</span>
                      )}
                    </div>
                  )}
                </div>
              ) : null}
            </div>
          </motion.section>
        )}

        {/* CTA */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={fadeIn}
          className="text-center pt-8 pb-4"
        >
          <h2 className="font-pixel text-xl md:text-2xl mb-4 heading-glow">
            WANT SOMETHING LIKE THIS?
          </h2>
          <p className="text-text-secondary mb-8 max-w-md mx-auto">
            Let's talk about what you're building and how I can help make it work.
          </p>
          <Link
            to="/#contact"
            className="inline-block bg-accent-primary hover:bg-accent-secondary text-background font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            LET'S TALK
          </Link>
        </motion.section>
      </div>
    </article>
  );
};

export default ProjectPage;
