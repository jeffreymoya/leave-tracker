import Link from 'next/link'
import { ProfileDropdown } from './profile-dropdown'

export default function Navigation() {
  return (
    <nav className="w-full bg-gradient-surface backdrop-blur-sm border-b border-gray-100">
      <div className="container-width">
        <div className="flex items-center justify-between h-16">
          <Link 
            href="/" 
            className="text-[var(--primary)] font-semibold hover:text-[var(--accent)] transition-colors"
          >
            Leave Tracker
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="nav-link">
              Dashboard
            </Link>
            <Link href="/leaves" className="nav-link">
              Leaves
            </Link>
            <Link href="/team" className="nav-link">
              Team
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="btn-primary">
              New Leave
            </button>
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </nav>
  )
}
