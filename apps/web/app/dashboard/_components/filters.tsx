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
          className={`px-4 py-2 text-sm font-medium ${
            view === 'list'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : 'text-gray-700 bg-white hover:bg-gray-50'
          } border rounded-md`}
          onClick={() => onViewChange('list')}
        >
          List
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium ${
            view === 'calendar'
              ? 'bg-blue-50 text-blue-700 border-blue-200'
              : 'text-gray-700 bg-white hover:bg-gray-50'
          } border rounded-md`}
          onClick={() => onViewChange('calendar')}
        >
          Calendar
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
