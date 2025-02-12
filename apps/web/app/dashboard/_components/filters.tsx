'use client'

import type { LeaveType, LeaveStatus } from '@/types/leaves'

interface FiltersProps {
  view: 'list' | 'calendar'
  onViewChange: (view: 'list' | 'calendar') => void
  onFilterChange: (filters: {
    type?: LeaveType
    status?: LeaveStatus
    dateRange?: { start?: string; end?: string }
  }) => void
}

export function Filters({ view, onViewChange, onFilterChange }: FiltersProps) {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2">
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50"
          onClick={() => onViewChange('list')}
        >
          List
        </button>
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50"
          onClick={() => onViewChange('calendar')}
        >
          Calendar
        </button>
      </div>
    </div>
  )
}
