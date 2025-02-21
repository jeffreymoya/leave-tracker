'use client'

import { PlusIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import { cn } from '@/lib/utils'

import { CreateLeaveModal } from './leaves/create-leave-modal'

export function FloatingActionButton({ className }: { className?: string }) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div>
      <button
        className={cn(
          'fixed bottom-6 right-6 lg:right-[calc(50vw-40rem+1.5rem)] z-50 transition-transform hover:scale-110 active:scale-95 bg-[--accent] hover:bg-[--accent-hover] text-white shadow-[0_4px_14px_rgba(237,107,6,0.3)] !rounded-full flex items-center justify-center h-14 w-14 md:h-16 md:w-16',
          className
        )}
        data-testid="fab-new-request"
        aria-label="Create new leave request"
        onClick={() => setIsModalOpen(true)}
      >
        <PlusIcon className="h-6 w-6 md:h-8 md:w-8" />
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-3 py-1.5 rounded text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg before:content-[''] before:absolute before:top-full before:left-1/2 before:-translate-x-1/2 before:border-8 before:border-transparent before:border-t-white">
          Create new leave request
        </span>
      </button>

      <CreateLeaveModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
