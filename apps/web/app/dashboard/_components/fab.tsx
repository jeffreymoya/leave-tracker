'use client'

import { PlusIcon } from '@heroicons/react/24/outline'

export function FloatingActionButton() {
  return (
    <button
      className="fixed bottom-8 right-8 p-4 bg-primary-black text-white rounded-full shadow-xl 
                 hover:bg-primary-black/90 transition-all duration-200 flex items-center justify-center
                 h-14 w-14"
      aria-label="Create new leave request"
    >
      <PlusIcon className="h-6 w-6" />
    </button>
  )
}
