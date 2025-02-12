export function Navigation() {
  return (
    <nav className="bg-[#ec6c1a] shadow-sm" aria-label="Main navigation">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <span className="text-2xl font-bold text-white tracking-tight">
              LeaveTracker
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/dashboard" className="text-white hover:text-orange-100 px-3 py-2 text-sm font-medium transition-colors">
              Dashboard
            </Link>
            <Link href="/requests" className="text-white hover:text-orange-100 px-3 py-2 text-sm font-medium transition-colors">
              My Requests
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white"
            aria-label="Open mobile menu"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  )
}
