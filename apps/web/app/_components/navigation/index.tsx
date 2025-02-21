'use client'

import { Open_Sans } from 'next/font/google'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { ProfileDropdown } from './profile-dropdown'
import { NotificationsDropdown } from './notifications-dropdown'

const openSans = Open_Sans({ subsets: ['latin'] })

export default function Navigation() {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <nav className="relative bg-[var(--primary)] shadow-md z-50">
      <div className="max-w-7xl mx-auto h-20 flex items-center justify-between px-6">
        <Link 
          id="header-logo"
          href="/" 
          className={`${openSans.className} font-light text-[var(--accent)] text-4xl hover:text-[var(--accent-hover)] 
                     transition-colors flex-shrink-0 focus:outline-none focus:ring-2 
                     focus:ring-[var(--accent)] focus:ring-offset-2 rounded-lg px-2`}
        >
          SYNPH Leave Tracker
        </Link>
        
        {!isAdminRoute && (
          <div id="header-nav" className="hidden md:flex items-center gap-8 flex-grow justify-end mr-10">
            {/* Removed Team Schedule link */}
          </div>
        )}

        <div className="flex items-center gap-4">
          <NotificationsDropdown />
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  )
}
