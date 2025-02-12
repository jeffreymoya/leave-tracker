'use client'

import { useState } from 'react'

import { DashboardContent } from './_components/dashboard-content'
import { FilterDropdown } from './_components/filter-dropdown'
import { ViewSwitcher } from './_components/view-switcher'
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
        <div className="border-b border-gray-200">
          <div className="flex flex-col gap-4">
            <ViewSwitcher view={view} onViewChange={setView} />

            <div className="flex items-center gap-6 pb-4">
              <FilterDropdown
                label="Type"
                value={filters.type}
                options={['Vacation', 'Sick', 'Personal']}
                onChange={(value) => setFilters(prev => ({ ...prev, type: value as LeaveType | undefined }))}
              />
              <FilterDropdown
                label="Status"
                value={filters.status}
                options={['Pending', 'Approved', 'Rejected']}
                onChange={(value) => setFilters(prev => ({ ...prev, status: value as LeaveStatus | undefined }))}
              />
            </div>
          </div>
        </div>

        <DashboardContent
          isLoading={isLoading}
          view={view}
          data={filteredData}
        />
      </div>
    </div>
  )
}
