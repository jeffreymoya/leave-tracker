'use client'

import { format, getDay, parse, startOfWeek } from 'date-fns'
import { enUS } from 'date-fns/locale'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import type { Leave } from '@/types/leaves'

const locales = { 'en-US': enUS }
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

export function LeaveCalendar({ data }: { data: Leave[] }) {
  const events = data.map(leave => ({
    title: `${leave.type} - ${leave.status}`,
    start: new Date(leave.startDate),
    end: new Date(leave.endDate),
    allDay: true
  }))

  return (
    <Calendar
      localizer={localizer}
      events={events}
      className="bg-white rounded-lg border p-4 h-[600px]"
      toolbar={true}
      aria-label="Leave calendar"
    />
  )
}
