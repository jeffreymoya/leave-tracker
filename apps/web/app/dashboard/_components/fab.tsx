'use client'

import { PlusIcon } from '@heroicons/react/24/outline'

export function FloatingActionButton() {
  return (
    <button
      className="fixed bottom-8 right-8 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700"
      aria-label="Create new leave request"
    >
      <PlusIcon className="h-6 w-6" />
    </button>
  )
}
