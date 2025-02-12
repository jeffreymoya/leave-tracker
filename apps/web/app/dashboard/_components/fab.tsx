'use client'

import { PlusIcon } from '@heroicons/react/24/outline'

export function FloatingActionButton() {
  return (
    <div className="fixed bottom-6 right-8 lg:right-[calc((100vw-1280px)/2+5rem)] transition-all duration-200">
      <button
        className="p-4 bg-[var(--accent)] text-white rounded-full shadow-lg 
                   hover:bg-[var(--accent-hover)] hover:scale-125 active:scale-95
                   transition-all duration-200 h-14 w-14 
                   flex items-center justify-center group relative
                   focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
        data-testid="fab-new-request"
        aria-label="Create new leave request"
      >
        <PlusIcon className="h-6 w-6" />
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-2 py-1 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Create new leave request
        </span>
      </button>
    </div>
  )
}
