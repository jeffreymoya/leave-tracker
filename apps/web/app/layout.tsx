import { Inter } from 'next/font/google'

import { LayoutContent } from './_components/layout-content'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: false
})

export const metadata = {
  title: 'Leave Tracker',
  description: 'Track and manage employee leaves efficiently'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} font-sans antialiased`}>
      <body suppressHydrationWarning className="bg-primary-background bg-gradient-surface min-h-screen flex flex-col">
        <LayoutContent>
          {children}
        </LayoutContent>
      </body>
    </html>
  )
}
