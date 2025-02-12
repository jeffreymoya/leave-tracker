'use client'

import { useState } from 'react'

import { FloatingActionButton } from '@/app/dashboard/_components/fab'
import { Filters } from '@/app/dashboard/_components/filters'
import { LeaveList, LeaveCalendar } from '@/app/dashboard/_components/leaves'
import { ProfileDropdown } from '@/app/dashboard/_components/profile'
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

  return (
    <div className="py-6">
      <div className="flex flex-col gap-6">
        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-4">
            <button className="px-4 py-1.5 border rounded bg-gray-100">List</button>
            <button className="px-4 py-1.5 border rounded hover:bg-gray-50">Calendar</button>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Leave Type</span>
            <select className="border rounded px-2 py-1.5 text-sm bg-white">
              <option>All Types</option>
              <option>Vacation</option>
              <option>Sick</option>
              <option>Personal</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Leave Status</span>
            <select className="border rounded px-2 py-1.5 text-sm bg-white">
              <option>All Status</option>
              <option>Pending</option>
              <option>Approved</option>
              <option>Rejected</option>
            </select>
          </div>
        </div>

        {/* Leave List */}
        <div className="flex flex-col gap-3">
          <LeaveItem
            type="Sick"
            dates="1/5/2025 to 1/11/2025"
            status="Approved"
          />
          <LeaveItem
            type="Vacation"
            dates="1/12/2025 to 1/18/2025"
            status="Approved"
          />
          <LeaveItem
            type="Sick"
            dates="1/15/2025 to 1/17/2025"
            status="Pending"
          />
          <LeaveItem
            type="Vacation"
            dates="1/25/2025 to 1/29/2025"
            status="Approved"
          />
        </div>
      </div>
    </div>
  )
}

function LeaveItem({ type, dates, status }: { type: string; dates: string; status: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="font-medium">{type}</div>
      <div className="text-gray-600">{dates}</div>
      <div className={`
        ${status === 'Approved' ? 'text-green-600' : ''}
        ${status === 'Pending' ? 'text-yellow-600' : ''}
        ${status === 'Rejected' ? 'text-red-600' : ''}
      `}>
        {status}
      </div>
    </div>
  )
}
