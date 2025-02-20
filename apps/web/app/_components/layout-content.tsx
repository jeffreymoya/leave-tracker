'use client'

import { usePathname } from 'next/navigation'

import { FloatingActionButton } from '@/app/dashboard/_components/fab'

import Navigation from './navigation'
import { Providers } from './providers'

export function LayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <div className="flex-1 flex flex-col">
      <Navigation />
      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto px-6 py-0">
        <Providers>
          <div className="flex-1 flex flex-col">
            {children}
          </div>
          {!isAdminRoute && (
            <div className="flex justify-end mt-8">
              <FloatingActionButton />
            </div>
          )}
        </Providers>
      </main>
    </div>
  )
} 