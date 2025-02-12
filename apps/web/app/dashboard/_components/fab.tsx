'use client'

import { PlusIcon } from '@heroicons/react/24/outline'

export function FloatingActionButton() {
  return (
    <div className="relative">
      <button
        className="p-4 bg-[#ff6b00] text-white rounded-full shadow-xl 
                   hover:bg-[#e65100] transition-colors h-14 w-14 flex items-center justify-center
                   focus:ring-2 focus:ring-[#ff6b00] focus:ring-offset-2"
        data-testid="fab-new-request"
        aria-labelledby="fab-label"
      >
        <PlusIcon className="h-6 w-6 text-white" />
        <span id="fab-label" className="sr-only">Create new leave request</span>
      </button>
    </div>
  )
}
