'use client'

import { UserCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

export function ProfileDropdown({ _open }: { _open: boolean }) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-colors duration-200 focus:outline-none"
      >
        <UserCircleIcon className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 divide-y divide-gray-100">
          <div className="px-1 py-1">
            <Link
              href="/profile"
              className="text-gray-700 hover:bg-[var(--accent)] hover:text-white group flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors duration-200"
            >
              Profile Settings
            </Link>
          </div>

          <div className="px-1 py-1">
            <button
              onClick={() => {/* Add logout handler */}}
              className="text-red-600 hover:bg-red-500 hover:text-white group flex w-full items-center rounded-md px-3 py-2 text-sm transition-colors duration-200"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
