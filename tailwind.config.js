/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: 'var(--background)',
          violet: 'var(--background-violet)'
        },
        accent: {
          primary: {
            DEFAULT: 'var(--accent-primary)',
            30: 'rgba(255, 110, 199, 0.3)',
            20: 'rgba(255, 110, 199, 0.2)'
          },
          secondary: 'var(--accent-secondary)',
        },
        text: {
          DEFAULT: 'var(--text)',
          secondary: 'var(--text-secondary)'
        },
        'dark-surface': 'var(--dark-surface)',
        'dark-surface-hover': 'var(--dark-surface-hover)'
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        section: '120px',
        'section-mobile': '60px'
      },
      maxWidth: {
        content: '1200px'
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' }
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        glow: {
          '0%, 100%': { filter: 'brightness(100%)' },
          '50%': { filter: 'brightness(150%)' }
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-section': 'linear-gradient(to right, var(--accent-primary), var(--accent-secondary))'
      }
    }
  },
  plugins: []
};