import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const links = ['Overview', 'Expertise', 'Workflows', 'Solutions'];
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/' + href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        const headerHeight = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-dark-surface py-8 md:py-12 border-t border-accent-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center space-y-6 md:space-y-0 md:flex-row md:justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="font-pixel text-sm md:text-base gradient-text">
              NOURIN<span className="text-accent-primary">.</span>
            </span>
          </motion.div>
          
          <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-text-secondary text-sm"
          >
            <ul className="flex flex-wrap justify-center gap-4 md:gap-6">
              {links.map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => handleNavClick(e, `#${link.toLowerCase()}`)}
                    className="hover:text-accent-primary transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
              <li className="w-full text-center md:w-auto">
                <a
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')}
                  className="hover:text-accent-primary transition-colors"
                >
                  Connect
                </a>
              </li>
            </ul>
          </motion.nav>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-text-secondary text-sm text-center md:text-right"
          >
            &copy; {new Date().getFullYear()} Nourin Ahmed. All rights reserved.
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;