# Nourin Ahmed Portfolio - Project Structure

## Overview
This is a modern React portfolio website built with TypeScript, Vite, and Tailwind CSS. It features smooth animations, a custom cursor, particle effects, and a fully responsive design with dark/light theme support.

## Technology Stack
- **Framework**: React 18.3.1
- **Build Tool**: Vite 5.4.2
- **Language**: TypeScript 5.5.3
- **Styling**: Tailwind CSS 3.4.1
- **Animation**: Framer Motion 11.0.5
- **Particles**: tsparticles 2.12.0
- **Icons**: Lucide React 0.344.0
- **Linting**: ESLint 9.9.1

## Directory Structure

```
nourin-portfolio/
├── .bolt/                          # Bolt configuration files
│   ├── config.json
│   └── prompt
│
├── .claude/                        # Claude Code configuration
│   └── settings.local.json
│
├── .git/                           # Git repository data
│
├── node_modules/                   # Dependencies (auto-generated)
│
├── public/                         # Static assets
│   ├── cursor.jpg                  # Custom cursor image
│   └── favicon.svg                 # Site favicon
│
├── src/                            # Source code
│   ├── components/                 # React components
│   │   ├── Contact.tsx            # Contact form section
│   │   ├── CustomCursor.tsx       # Custom cursor implementation
│   │   ├── Footer.tsx             # Footer component
│   │   ├── Header.tsx             # Navigation header
│   │   ├── Hero.tsx               # Hero section with particles
│   │   ├── Introduction.tsx       # About/intro section
│   │   ├── Portfolio.tsx          # Projects showcase
│   │   ├── Services.tsx           # Services offered section
│   │   └── TestWayOfCode.tsx      # Test/experimental component
│   │
│   ├── context/                    # React Context providers
│   │   └── ThemeContext.tsx       # Theme (dark/light) management
│   │
│   ├── data/                       # Static data files
│   │   ├── projects.ts            # Project data
│   │   └── services.ts            # Services data
│   │
│   ├── types/                      # TypeScript type definitions
│   │   └── index.ts               # Shared types
│   │
│   ├── App.tsx                     # Main app component
│   ├── index.css                   # Global styles and Tailwind imports
│   ├── main.tsx                    # Application entry point
│   └── vite-env.d.ts              # Vite environment types
│
├── .gitignore                      # Git ignore rules
├── eslint.config.js               # ESLint configuration
├── index.html                      # HTML entry point
├── package.json                    # Dependencies and scripts
├── postcss.config.js              # PostCSS configuration
├── project.md                      # Project documentation
├── PROJECT_STRUCTURE.md           # This file
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript base configuration
├── tsconfig.app.json              # TypeScript app configuration
├── tsconfig.node.json             # TypeScript node configuration
└── vite.config.ts                 # Vite configuration
```

## Key Components

### Layout Components
- **Header**: Navigation bar with theme toggle and section links
- **Hero**: Landing section with animated particle background
- **Footer**: Site footer with social links and copyright

### Content Sections
- **Introduction**: About section with personal bio
- **Portfolio**: Project showcase with filtering and modal views
- **Services**: Services offered with descriptions
- **Contact**: Contact form and information
- **TestWayOfCode**: Experimental/test component

### Utility Components
- **CustomCursor**: Custom cursor implementation for desktop

### Context Providers
- **ThemeContext**: Manages dark/light theme state and persistence

## Data Management

### `/src/data/`
- **projects.ts**: Contains project portfolio data (title, description, images, tech stack, links)
- **services.ts**: Contains services data (offerings, descriptions, features)

### `/src/types/`
- **index.ts**: Shared TypeScript interfaces and types used across components

## Configuration Files

### Build & Development
- **vite.config.ts**: Vite build configuration and plugins
- **tsconfig.json**: TypeScript compiler options (base)
- **tsconfig.app.json**: TypeScript configuration for application code
- **tsconfig.node.json**: TypeScript configuration for Node.js scripts

### Styling
- **tailwind.config.js**: Tailwind CSS customization (colors, fonts, animations)
- **postcss.config.js**: PostCSS plugins configuration
- **index.css**: Global styles and Tailwind directives

### Code Quality
- **eslint.config.js**: ESLint rules and plugins
- **.gitignore**: Files and directories excluded from Git

### Package Management
- **package.json**: Project metadata, dependencies, and scripts

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Features

### Visual Effects
- Particle animations (tsparticles)
- Custom cursor on desktop
- Smooth scroll animations (Framer Motion)
- Intersection Observer for scroll triggers
- Tilt effects on cards

### Functionality
- Dark/light theme toggle with persistence
- Smooth hash-based navigation
- Responsive design (mobile-first)
- Contact form integration
- Project filtering and showcase

### Performance
- Vite for fast HMR and optimized builds
- Code splitting and lazy loading
- Optimized animations with Framer Motion
- Efficient re-renders with React best practices

## Development Notes

### Current State
- Active development on TestWayOfCode component
- Modified settings in .claude/settings.local.json
- Untracked test files and assets for "The Way of Code" feature

### Git Status
- Branch: master
- Modified: .claude/settings.local.json, src/App.tsx
- Untracked: case-study-test.html, nourindev.png, wayofcode*.png files, TestWayOfCode.tsx

### Future Enhancements
- Complete TestWayOfCode integration
- Additional case studies
- Enhanced project filtering
- Blog section
- Analytics integration

## External Dependencies

### Core
- react, react-dom: UI framework
- framer-motion: Animation library
- lucide-react: Icon library
- react-intersection-observer: Scroll detection

### Particles & Effects
- tsparticles, tsparticles-slim: Particle system
- react-particles: React wrapper for tsparticles
- react-tilt: 3D tilt effects

### Development
- @vitejs/plugin-react: Vite React plugin
- typescript-eslint: TypeScript ESLint support
- autoprefixer: CSS vendor prefixing
- tailwindcss: Utility-first CSS framework

## Contact & Deployment

This portfolio is designed to be deployed on modern hosting platforms like:
- Vercel
- Netlify
- GitHub Pages
- Any static hosting service

Build output is generated in the `dist/` directory after running `npm run build`.

---

**Last Updated**: February 8, 2026
**Version**: 0.1.0
**Maintained by**: Nourin Ahmed
