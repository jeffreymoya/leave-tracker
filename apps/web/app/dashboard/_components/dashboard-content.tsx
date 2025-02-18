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

  return view === 'list' ? <LeaveList data={data} /> : <LeaveCalendar data={data} />
} 