import Link from 'next/link'

import ProfileDropdown from './profile-dropdown'

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-black z-50">
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-16">
        <Link 
          id="logo"
          href="/" 
          className="text-[#ff6b35] text-2xl font-semibold hover:text-[#ff8659] transition-colors flex-shrink-0 font-[var(--font-open-sans)]"
        >
          SYNPH Leave Tracker
        </Link>
        
        <div id="nav-links" className="hidden md:flex items-center gap-6 flex-grow justify-center">
          <Link href="/dashboard" className="nav-link text-white hover:text-gray-200">
            Dashboard
          </Link>
          <Link href="/leaves" className="nav-link text-white hover:text-gray-200">
            Leaves
          </Link>
          <Link href="/team" className="nav-link text-white hover:text-gray-200">
            Team
          </Link>
        </div>

        <div className="flex items-center gap-4 flex-shrink-0">
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  )
}
