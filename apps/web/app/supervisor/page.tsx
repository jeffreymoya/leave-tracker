'use client'

import { useState } from 'react'
import { useLeavesQuery } from '@/lib/api/leaves'
import type { Leave } from '@/types/leaves'
import { CalendarSection } from './_components/calendar-section'
import { LeavesTable } from './_components/leaves-table'

export default function SupervisorPage() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const { data: leaves = [] } = useLeavesQuery()

  const calendarEvents = leaves.map(leave => ({
    title: `${leave.userId} - ${leave.type}`,
    start: new Date(leave.startDate),
    end: new Date(leave.endDate),
    allDay: true,
    type: leave.type
  }))

  return (
    <div className="px-4 sm:px-6 lg:px-8 space-y-8">
      <CalendarSection
        events={calendarEvents}
        currentDate={currentDate}
        onDateChange={setCurrentDate}
      />
      <LeavesTable leaves={leaves} />
    </div>
  )
} 