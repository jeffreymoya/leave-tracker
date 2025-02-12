const { themeColors } = require('./src/styles/theme/tokens')

module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': themeColors.cssVariables['--primary-orange'],
        'primary-black': themeColors.cssVariables['--primary-black']
      },
      fontFamily: {
        sans: ['var(--font-open-sans)', 'var(--font-inter)', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    function({ addVariant }) {
      addVariant('hocus', ['&:hover', '&:focus'])
    }
  ]
}
