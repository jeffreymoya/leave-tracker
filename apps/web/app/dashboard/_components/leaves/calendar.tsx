'use client'

import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { enUS } from 'date-fns/locale'
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
      className="bg-white rounded-lg border p-4"
      toolbar={false}
    />
  )
}
