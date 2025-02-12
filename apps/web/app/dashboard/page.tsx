'use client'

import { useState } from 'react'

import { LeaveCalendar } from './_components/leaves/calendar'
import { LeaveList } from './_components/leaves/list'
import { useLeavesQuery } from '@/lib/api/leaves'
import type { LeaveType, LeaveStatus } from '@/types/leaves'

interface FilterState {
  type?: LeaveType
  status?: LeaveStatus
  dateRange?: {
    start?: string
    end?: string
  }
}

export default function DashboardPage() {
  const [view, setView] = useState<'list' | 'calendar'>('list')
  const [filters, setFilters] = useState<FilterState>({})
  const { data: leaves = [], isLoading, error } = useLeavesQuery()

  const filteredData = leaves.filter(leave => {
    if (filters.type && leave.type !== filters.type) return false
    if (filters.status && leave.status !== filters.status) return false
    if (filters.dateRange?.start && new Date(leave.startDate) < new Date(filters.dateRange.start))
      return false
    if (filters.dateRange?.end && new Date(leave.endDate) > new Date(filters.dateRange.end))
      return false
    return true
  })

  if (error) {
    return (
      <div className="flex items-center justify-center h-[50vh]">
        <p className="text-red-600">Failed to load leaves. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="container py-8">
      <div className="flex flex-col gap-8">
        {/* Filters */}
        <div>
          <div className="flex flex-wrap gap-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="View">
                <button
                  onClick={() => setView('list')}
                  className={`${
                    view === 'list'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                >
                  List View
                </button>
                <button
                  onClick={() => setView('calendar')}
                  className={`${
                    view === 'calendar'
                      ? 'border-primary text-primary'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
                >
                  Calendar View
                </button>
              </nav>
            </div>
            
            <div className="flex flex-wrap gap-4">
              <div>
                <label htmlFor="type-select" className="label">Leave Type</label>
                <select
                  id="type-select"
                  className="input"
                  onChange={e => setFilters(prev => ({ ...prev, type: e.target.value as LeaveType }))}
                  value={filters.type || ''}
                >
                  <option value="">All Types</option>
                  <option value="Vacation">Vacation</option>
                  <option value="Sick">Sick</option>
                  <option value="Personal">Personal</option>
                </select>
              </div>

              <div>
                <label htmlFor="status-select" className="label">Status</label>
                <select
                  id="status-select"
                  className="input"
                  onChange={e => setFilters(prev => ({ ...prev, status: e.target.value as LeaveStatus }))}
                  value={filters.status || ''}
                >
                  <option value="">All Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="card">
            <div className="animate-pulse space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ) : view === 'list' ? (
          <LeaveList data={filteredData} />
        ) : (
          <LeaveCalendar data={filteredData} />
        )}
      </div>
    </div>
  )
}
