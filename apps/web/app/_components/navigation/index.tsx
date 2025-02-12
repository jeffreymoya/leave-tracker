import Link from 'next/link'

export function Navigation() {
  return (
    <nav className="w-full bg-[var(--background)] border-b border-gray-100">
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
            <Link href="/profile" className="nav-link">
              Profile
            </Link>
            <button className="btn-primary">
              New Leave
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 