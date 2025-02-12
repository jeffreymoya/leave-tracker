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
    <div className="flex flex-wrap gap-4 items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg
            transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
            ${
              view === 'list'
                ? 'bg-[var(--accent)] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          onClick={() => onViewChange('list')}
        >
          List View
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium rounded-lg
            transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
            ${
              view === 'calendar'
                ? 'bg-[var(--accent)] text-white'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
            }`}
          onClick={() => onViewChange('calendar')}
        >
          Calendar View
        </button>
      </div>

      <div className="flex gap-4">
        <div>
          <label htmlFor="type-select" className="sr-only">Leave Type</label>
          <select
            id="type-select"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50"
            onChange={e => onFilterChange({ type: e.target.value as LeaveType })}
          >
            <option value="">All Types</option>
            <option value="Vacation">Vacation</option>
            <option value="Sick">Sick</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        <div>
          <label htmlFor="status-select" className="sr-only">Leave Status</label>
          <select
            id="status-select"
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50"
            onChange={e => onFilterChange({ status: e.target.value as LeaveStatus })}
          >
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
    </div>
  )
}
