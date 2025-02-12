'use client'

export function Navigation() {
  return (
    <nav className="bg-white border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-primary-500 text-xl font-bold">Synpulse</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
              Contact
            </a>
            <button className="bg-primary-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary-600">
              EN
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
} 