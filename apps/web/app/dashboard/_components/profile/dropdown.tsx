'use client'

import { UserCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export function ProfileDropdown() {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="p-1 rounded-full hover:bg-gray-100"
        aria-haspopup="true"
        aria-expanded={open}
      >
        <UserCircleIcon className="h-8 w-8 text-gray-600" />
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border"
          role="menu"
        >
          <div className="p-2 space-y-1">
            <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md">
              Profile
            </button>
            <button className="w-full text-left px-3 py-2 hover:bg-gray-50 rounded-md">
              Settings
            </button>
            <button className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 rounded-md">
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
