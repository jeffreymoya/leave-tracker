'use client'

import { useState, useEffect, useRef } from 'react'
import { BellIcon, CheckCircleIcon } from '@heroicons/react/24/outline'

export function NotificationsDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [unreadCount] = useState(3) // Replace with actual data later
  const [notifications] = useState([
    { id: 1, title: 'New Leave Request', message: 'John submitted a vacation request', timestamp: '2h ago', read: false },
    { id: 2, title: 'Approval Needed', message: '3 pending requests need your review', timestamp: '5h ago', read: false },
    { id: 3, title: 'Policy Update', message: 'Updated time-off policy published', timestamp: '1d ago', read: true },
  ])
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const markAllAsRead = () => {
    // Implement mark all as read logic
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] relative"
      >
        <BellIcon className="h-6 w-6 text-white" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gray-50 rounded-t-lg">
            <h3 className="font-semibold text-gray-700 text-sm mb-0">NOTIFICATIONS</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllAsRead}
                className="text-[var(--accent)] hover:text-[var(--accent-hover)] text-xs font-semibold flex items-center gap-1"
              >
                <CheckCircleIcon className="h-4 w-4" />
                Mark all as read
              </button>
            </div>
          </div>
          
          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border-b border-gray-100 last:border-0 ${!notification.read ? 'bg-blue-50' : ''}`}
              >
                <div className="text-sm font-medium text-gray-700">{notification.title}</div>
                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                <div className="text-xs text-gray-400 mt-2">{notification.timestamp}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 