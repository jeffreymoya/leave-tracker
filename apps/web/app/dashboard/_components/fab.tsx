'use client'

import { PlusIcon } from '@heroicons/react/24/outline'

export function FloatingActionButton() {
  return (
    <button
      className="fixed bottom-8 right-8 p-4 bg-[var(--primary-black)] text-white rounded-full shadow-xl 
                 hover:bg-[#0a0a0a] transition-colors h-14 w-14 focus:ring-2 focus:ring-[var(--primary-orange)] 
                 focus:ring-offset-2"
      data-testid="fab-new-request"
      aria-labelledby="fab-label"
    >
      <PlusIcon className="h-6 w-6" />
      <span id="fab-label" className="sr-only">Create new leave request</span>
      <PlusIcon className="h-6 w-6" />
    </button>
  )
}
