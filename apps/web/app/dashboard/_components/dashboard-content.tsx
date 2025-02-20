'use client'

import type { Leave } from '@/types/leaves'

import { LeaveCalendar } from './leaves/calendar'
import { LeaveList } from './leaves/list'
import { LoadingSkeleton } from './loading-skeleton'

interface DashboardContentProps {
  isLoading: boolean
  view: 'list' | 'calendar'
  data: Leave[]
}

export function DashboardContent({ isLoading, view, data }: DashboardContentProps) {
  if (isLoading) {
    return <LoadingSkeleton />
  }

  const handleEdit = (leave: Leave) => {
    // TODO: Implement edit functionality
    console.log('Edit leave:', leave)
  }

  const handleDelete = (leave: Leave) => {
    // TODO: Implement delete functionality
    console.log('Delete leave:', leave)
  }

  return view === 'list' ? (
    <LeaveList
      leaves={data}
      onEdit={handleEdit}
      onDelete={handleDelete}
    />
  ) : (
    <LeaveCalendar data={data} />
  )
} 