import { Inter } from 'next/font/google'
import { Navigation } from './_components/navigation'
import { Providers } from './_components/providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export const metadata = {
  title: 'Leave Tracker',
  description: 'Track and manage employee leaves efficiently'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body suppressHydrationWarning className="bg-theme-background bg-surface-gradient">
        <Navigation />
        <main className="min-h-[calc(100vh-4rem)] pt-16 container-width max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  )
}
