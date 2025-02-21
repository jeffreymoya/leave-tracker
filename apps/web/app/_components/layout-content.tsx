'use client'

import Navigation from './navigation'
import { Providers } from './providers'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex-1 flex flex-col">
      <Navigation />
      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto px-6 py-0">
        <Providers>
          <div className="flex-1 flex flex-col relative">
            {children}
          </div>
        </Providers>
      </main>
    </div>
  )
} 