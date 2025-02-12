/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './app/_components/**/*.{js,ts,jsx,tsx}',
    './app/dashboard/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: 'rgba(236, 108, 26, 0.1)',
        secondary: '#000000',
        background: '#f7f7f7'
      },
      backgroundImage: {
        'hero-curve': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23FFFFFF' d='M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E\")",
        'gradient-primary': 'linear-gradient(135deg, rgba(236,108,26,0.1) 0%, rgba(0,0,0,0.9) 100%)',
        'gradient-surface': 'linear-gradient(135deg, rgba(247,247,247,0.1) 0%, rgba(247,247,247,0.95) 100%)'
      }
    }
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        '.btn-primary': {
          '@apply bg-gradient-primary text-secondary px-4 py-2 rounded-lg hover:opacity-90 transition-all shadow-sm': '',
        },
        '.nav-link': {
          '@apply text-gray-700 hover:text-primary transition-colors font-medium': ''
        }
      })
    }
  ]
}
