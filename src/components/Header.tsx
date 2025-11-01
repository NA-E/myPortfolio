import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuVariants = {
    closed: { 
      opacity: 0,
      x: "100%",
      transition: { 
        duration: 0.2 
      }
    },
    open: { 
      opacity: 1,
      x: 0,
      transition: { 
        duration: 0.3 
      }
    }
  };

  const links = [
    { name: "OVERVIEW", href: "#home" },
    { name: "EXPERTISE", href: "#about" },
    { name: "WORKFLOWS", href: "#portfolio" },
    { name: "SOLUTIONS", href: "#services" },
    { name: "CONNECT", href: "#contact" }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/80 backdrop-blur-md py-3 border-b border-accent-primary/10' 
          : 'py-4 md:py-6'
      }`}
    >
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <a href="#home" className="font-pixel text-sm md:text-base">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="gradient-text"
          >
            NOURIN<span className="text-accent-primary">.</span>
          </motion.span>
        </a>
        
        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 hover:text-accent-primary transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {links.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="font-medium text-sm hover:text-accent-primary transition-colors hover-link"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * i }}
              >
                {link.name}
              </motion.a>
            ))}
          </nav>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-accent-primary p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <motion.div 
        className="fixed top-0 right-0 h-screen w-[250px] bg-dark-surface md:hidden z-50 pt-20 px-8 border-l border-accent-primary/10"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="flex flex-col space-y-6">
          {links.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="font-medium text-lg hover:text-accent-primary transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </div>
      </motion.div>
      
      {/* Overlay for mobile menu */}
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm md:hidden z-40"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;