'use client'

import { useState, useMemo } from 'react'

import { useLeavesQuery } from '@/lib/api/leaves'
import type { LeaveType, LeaveStatus } from '@/types/leaves'

import { DashboardContent } from './_components/dashboard-content'
import { Filters } from './_components/filters'
import { ViewSwitcher } from './_components/view-switcher'

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

  const typeCounts = useMemo(() => {
    const counts: Record<LeaveType, number> = { Vacation: 0, Sick: 0, Personal: 0 }
    leaves.forEach(leave => {
      counts[leave.type]++
    })
    return counts
  }, [leaves])

  const statusCounts = useMemo(() => {
    const counts: Record<LeaveStatus, number> = { Pending: 0, Approved: 0, Rejected: 0 }
    leaves.forEach(leave => {
      counts[leave.status]++
    })
    return counts
  }, [leaves])

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
        <div className="flex flex-col gap-4">
          <ViewSwitcher view={view} onViewChange={setView} />
          <Filters
            onFilterChange={setFilters}
            typeCounts={typeCounts}
            statusCounts={statusCounts}
          />
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
