import { Navigation } from './_components/navigation'
import { Providers } from './_components/providers'
import './globals.css'

export const metadata = {
  title: 'Leave Tracker',
  description: 'Track and manage employee leaves efficiently'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Navigation />
        <main className="min-h-[calc(100vh-4rem)] pt-16 container-width">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  )
}
