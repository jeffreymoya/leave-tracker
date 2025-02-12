import { Inter, Open_Sans } from 'next/font/google'

import Navigation from './_components/navigation'
import { FloatingActionButton } from './dashboard/_components/fab'
import { Providers } from './_components/providers'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: false
})

const openSans = Open_Sans({
  subsets: ['latin'],
  variable: '--font-open-sans',
  weight: ['300', '400', '600'],
  display: 'swap'
})

export const metadata = {
  title: 'Leave Tracker',
  description: 'Track and manage employee leaves efficiently'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${openSans.variable} font-sans antialiased`}>
      <body suppressHydrationWarning className="bg-primary-background bg-gradient-surface min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col">
          <Navigation />
          <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto px-6 py-0">
            <Providers>
              <div className="flex-1 flex flex-col">
                {children}
              </div>
              <div className="flex justify-end mt-8">
                <FloatingActionButton />
              </div>
            </Providers>
          </main>
        </div>
      </body>
    </html>
  )
}
