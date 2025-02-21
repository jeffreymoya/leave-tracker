'use client'

import { useState, useMemo } from 'react'
import { SunIcon, HeartIcon, UserIcon } from '@heroicons/react/24/outline'

import { useLeavesQuery } from '@/lib/api/leaves'
import type { LeaveType, LeaveStatus } from '@/types/leaves'

import { DashboardContent } from './_components/dashboard-content'
import { Filters } from './_components/filters'

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
    const counts: Record<LeaveType, number> = { Vacation: 0, Sick: 0, Emergency: 0 }
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
        {/* Add Leave Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <SunIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-500">Vacation</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {typeCounts.Vacation} days
                </p>
                <span className="text-sm text-gray-500">Remaining</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-green-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-full">
                <HeartIcon className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-500">Sick Leave</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {typeCounts.Sick} days
                </p>
                <span className="text-sm text-gray-500">Available</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-purple-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-full">
                <UserIcon className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-500">Emergency</p>
                <p className="text-2xl font-semibold text-gray-900">
                  {typeCounts.Emergency} days
                </p>
                <span className="text-sm text-gray-500">Remaining</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {/* <ViewSwitcher view={view} onViewChange={setView} /> */}
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
