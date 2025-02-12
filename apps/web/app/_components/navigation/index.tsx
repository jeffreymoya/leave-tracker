'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import ProfileDropdown from './profile-dropdown'

export default function Navigation() {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith('/admin')

  return (
    <nav className="relative bg-[var(--primary)] shadow-md z-50">
      <div className="container h-20 flex items-center justify-between">
        <Link 
          id="header-logo"
          href="/" 
          className="font-sans font-light text-[var(--accent)] text-4xl hover:text-[var(--accent-hover)] 
                     transition-colors flex-shrink-0 focus:outline-none focus:ring-2 
                     focus:ring-[var(--accent)] focus:ring-offset-2 rounded-lg px-2"
        >
          SYNPH Leave Tracker
        </Link>
        
        {!isAdminRoute && (
          <div id="header-nav" className="hidden md:flex items-center gap-8 flex-grow justify-end mr-10">
            <Link 
              href="/team" 
              className="nav-link text-white/90 hover:text-white font-medium focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2 rounded-lg px-4 py-2 bg-[var(--primary-dark)] hover:bg-[var(--primary-darker)] border border-white/20"
            >
              Team Schedule
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  )
}
