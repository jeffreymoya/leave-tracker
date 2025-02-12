import Link from 'next/link'

import ProfileDropdown from './profile-dropdown'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-[var(--primary)] shadow-md z-50">
      <div className="container h-16 flex items-center justify-between">
        <Link 
          href="/" 
          className="text-[var(--accent)] text-2xl font-semibold hover:text-[var(--accent-hover)] 
                     transition-colors flex-shrink-0 focus:outline-none focus:ring-2 
                     focus:ring-[var(--accent)] focus:ring-offset-2 rounded-lg px-2"
        >
          SYNPH Leave Tracker
        </Link>
        
        <div className="hidden md:flex items-center gap-8 flex-grow justify-center">
          <Link 
            href="/dashboard" 
            className="nav-link text-white/90 hover:text-white font-medium"
          >
            Dashboard
          </Link>
          <Link 
            href="/leaves" 
            className="nav-link text-white/90 hover:text-white font-medium"
          >
            Leaves
          </Link>
          <Link 
            href="/team" 
            className="nav-link text-white/90 hover:text-white font-medium"
          >
            Team
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  )
}
