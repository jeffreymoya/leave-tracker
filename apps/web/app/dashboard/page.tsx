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
        <div className="border-b border-gray-200">
          <div className="flex flex-col gap-4">
            <nav className="-mb-px flex space-x-8" aria-label="View">
              <button
                onClick={() => setView('list')}
                className={`${
                  view === 'list'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium`}
              >
                List View
              </button>
              <button
                onClick={() => setView('calendar')}
                className={`${
                  view === 'calendar'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                } whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium`}
              >
                Calendar View
              </button>
            </nav>

            <div id="filters" className="flex items-center gap-4 pb-4">
              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    onClick={(e) => {
                      const menu = document.getElementById('type-menu')
                      menu?.classList.toggle('hidden')
                    }}
                  >
                    <span>Type</span>
                    {filters.type && (
                      <>
                        <span className="ml-1.5 text-sm text-gray-600">: {filters.type}</span>
                      </>
                    )}
                    <svg className="ml-2 h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div id="type-menu" className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none hidden">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setFilters(prev => ({ ...prev, type: undefined }))
                        document.getElementById('type-menu')?.classList.add('hidden')
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${!filters.type ? 'font-medium text-gray-900' : 'text-gray-500'}`}
                    >
                      All Types
                    </button>
                    {['Vacation', 'Sick', 'Personal'].map((type) => (
                      <button
                        key={type}
                        onClick={() => {
                          setFilters(prev => ({ ...prev, type: type as LeaveType }))
                          document.getElementById('type-menu')?.classList.add('hidden')
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left ${filters.type === type ? 'font-medium text-gray-900' : 'text-gray-500'}`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative inline-block text-left">
                <div>
                  <button
                    type="button"
                    className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
                    onClick={(e) => {
                      const menu = document.getElementById('status-menu')
                      menu?.classList.toggle('hidden')
                    }}
                  >
                    <span>Status</span>
                    {filters.status && (
                      <>
                        <span className="ml-1.5 text-sm text-gray-600">: {filters.status}</span>
                      </>
                    )}
                    <svg className="ml-2 h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
                <div id="status-menu" className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none hidden">
                  <div className="py-1">
                    <button
                      onClick={() => {
                        setFilters(prev => ({ ...prev, status: undefined }))
                        document.getElementById('status-menu')?.classList.add('hidden')
                      }}
                      className={`block px-4 py-2 text-sm w-full text-left ${!filters.status ? 'font-medium text-gray-900' : 'text-gray-500'}`}
                    >
                      All Status
                    </button>
                    {['Pending', 'Approved', 'Rejected'].map((status) => (
                      <button
                        key={status}
                        onClick={() => {
                          setFilters(prev => ({ ...prev, status: status as LeaveStatus }))
                          document.getElementById('status-menu')?.classList.add('hidden')
                        }}
                        className={`block px-4 py-2 text-sm w-full text-left ${filters.status === status ? 'font-medium text-gray-900' : 'text-gray-500'}`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>
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
