# Nourin Ahmed - Automation Engineer Portfolio

A modern, responsive portfolio website showcasing automation engineering expertise and services. Built with React, TypeScript, and Tailwind CSS, featuring smooth animations, particle effects, and a cyberpunk-inspired design aesthetic.

## 🚀 Features

### Design & User Experience
- **Cyberpunk Theme**: Dark theme with neon pink/cyan accent colors and retro pixel fonts
- **Responsive Design**: Fully responsive across all device sizes (mobile, tablet, desktop)
- **Custom Cursor**: Custom cursor image with hover effects
- **Smooth Animations**: Framer Motion animations with scroll-triggered reveals
- **Particle Effects**: Interactive particle background using react-particles
- **3D Tilt Effects**: Interactive card tilting using react-tilt
- **Theme Toggle**: Light/dark theme switching with persistent storage

### Sections
1. **Hero Section**: Eye-catching introduction with animated text and floating elements
2. **About/Introduction**: Personal introduction with skills showcase
3. **Portfolio**: Grid of automation projects with hover effects and categories
4. **Services**: Three main service offerings with detailed descriptions
5. **Contact**: Contact form and social media links
6. **Footer**: Navigation links and copyright information

### Interactive Elements
- **Smooth Scrolling**: Anchor-based navigation with offset for fixed header
- **Hover Effects**: Card animations, button transitions, and link underlines
- **Form Validation**: Contact form with proper input styling
- **Mobile Menu**: Collapsible navigation for mobile devices
- **Intersection Observer**: Scroll-triggered animations using react-intersection-observer

## 🛠️ Tech Stack

### Frontend Framework
- **React 18.3.1** - Modern React with hooks and functional components
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server

### Styling & UI
- **Tailwind CSS 3.4.1** - Utility-first CSS framework
- **Custom CSS Variables** - Theme system with CSS custom properties
- **Google Fonts** - Inter (body text) and Press Start 2P (headings)

### Animations & Effects
- **Framer Motion 11.0.5** - Advanced animations and transitions
- **React Particles 2.12.2** - Interactive particle background effects
- **React Tilt 1.0.2** - 3D tilt effects for cards
- **React Intersection Observer 9.8.1** - Scroll-triggered animations

### Icons & Assets
- **Lucide React 0.344.0** - Modern icon library
- **Pexels Images** - Stock photography for project showcases
- **Custom Cursor** - Custom cursor image (cursor.jpg)

### Development Tools
- **ESLint** - Code linting and formatting
- **TypeScript ESLint** - TypeScript-specific linting rules
- **PostCSS & Autoprefixer** - CSS processing and vendor prefixes

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header with mobile menu
│   ├── Hero.tsx        # Main hero section with particles
│   ├── Introduction.tsx # About section
│   ├── Portfolio.tsx   # Projects showcase
│   ├── Services.tsx    # Services offered
│   ├── Contact.tsx     # Contact form and info
│   ├── Footer.tsx      # Site footer
│   └── CustomCursor.tsx # Custom cursor component (unused)
├── context/            # React context providers
│   └── ThemeContext.tsx # Theme management
├── data/               # Static data
│   ├── projects.ts     # Portfolio projects data
│   └── services.ts     # Services data
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces
├── App.tsx             # Main app component
├── main.tsx           # React app entry point
└── index.css          # Global styles and Tailwind imports

public/
├── cursor.jpg         # Custom cursor image
├── favicon.svg        # Site favicon
└── index.html         # HTML template
```

## 🚀 Getting Started

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. **Clone or download the project files**
   ```bash
   # If using git
   git clone <repository-url>
   cd nourin-ahmed-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173`
   - The site will automatically reload when you make changes

### Build for Production

1. **Create production build**
   ```bash
   npm run build
   ```

2. **Preview production build**
   ```bash
   npm run preview
   ```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.

## 🎨 Customization

### Theme Colors
Edit the CSS variables in `src/index.css`:
```css
:root {
  --accent-primary: #FF6EC7;    /* Pink accent */
  --accent-secondary: #4DEEEA;  /* Cyan accent */
  --background: #0A0A0A;        /* Dark background */
  --text: #FFFFFF;              /* Text color */
}
```

### Content Updates
- **Projects**: Edit `src/data/projects.ts`
- **Services**: Edit `src/data/services.ts`
- **Personal Info**: Update text in component files
- **Images**: Replace images in `public/` folder

### Fonts
- **Pixel Font**: Press Start 2P (for headings)
- **Body Font**: Inter (for body text)
- Update in `index.html` and `tailwind.config.js`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

This site is deployed from **Netlify** (via the GitHub `NA-E` account). Build config lives in `netlify.toml` (`npm run build` → `dist`, plus the SPA redirect).

### Environment Variables
Set these in Netlify → Site configuration → Environment variables (required for the client portal):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY` (Supabase publishable key)

Never add the Supabase `service_role` key to Netlify — it stays local (used only by `npm run new-portal`).

## 📄 License

This project is for portfolio purposes. Feel free to use as inspiration for your own projects.

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome!

---

**Built with ❤️ by Nourin Ahmed**