export const themeColors = {
  primary: {
    orange: '#ec6c1a',
    black: '#1a1a1a'
  },
  cssVariables: {
    '--primary-orange': '#ec6c1a',
    '--primary-black': '#1a1a1a',
    '--font-inter': '"Inter var", -apple-system, BlinkMacSystemFont, sans-serif'
  }
} as const

export type ThemeColors = typeof themeColors
