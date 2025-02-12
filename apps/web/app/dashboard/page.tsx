import { LeaveList, LeaveCalendar } from './_components/leaves'
import { ProfileDropdown } from './_components/profile'
import { Filters } from './_components/filters'
import { FloatingActionButton } from './_components/fab'
import { getLeaves } from '@/lib/api/leaves'
import { useLeavesQuery } from '@/lib/api/leaves'
import type { Leave, LeaveType, LeaveStatus } from '@/types/leaves'
'use client'

import { useState } from 'react'

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
  const { data: leaves = [], isLoading } = useLeavesQuery()

  const filteredData = leaves.filter(leave => {
    if (filters.type && leave.type !== filters.type) return false
    if (filters.status && leave.status !== filters.status) return false
    if (filters.dateRange?.start && new Date(leave.startDate) < new Date(filters.dateRange.start)) return false
    if (filters.dateRange?.end && new Date(leave.endDate) > new Date(filters.dateRange.end)) return false
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-end">
          <ProfileDropdown />
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <Filters
          view={view}
          onViewChange={setView}
          onFilterChange={setFilters}
        />

        <section className="mt-6 space-y-4">
          {view === 'list' ? (
            <LeaveList data={filteredData} />
          ) : (
            <LeaveCalendar data={filteredData} />
          )}
        </section>

        <FloatingActionButton />
      </main>
    </div>
  )
}
