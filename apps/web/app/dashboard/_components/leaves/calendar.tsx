'use client'

import { format, getDay, parse, startOfWeek , enUS } from 'date-fns'
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
    allDay: true,
    resource: leave
  }))

  return (
    <div className="card overflow-hidden p-0">
      <Calendar
        localizer={localizer}
        events={events}
        className="min-h-[600px] p-4"
        toolbar={true}
        aria-label="Leave calendar"
        views={['month', 'week', 'day']}
        defaultView="month"
        popup
        selectable
        eventPropGetter={event => {
          const leave = event.resource as Leave
          return {
            className: `
              ${leave.status === 'Approved' ? 'bg-[var(--accent)] hover:bg-[var(--accent-hover)]' : ''}
              ${leave.status === 'Rejected' ? 'bg-red-500 hover:bg-red-600' : ''}
              ${leave.status === 'Pending' ? 'bg-[var(--primary)] hover:opacity-80' : ''}
              text-white rounded-lg border-none transition-colors duration-200
            `
          }
        }}
      />
    </div>
  )
}
