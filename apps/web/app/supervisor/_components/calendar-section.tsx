import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, dateFnsLocalizer, ToolbarProps } from 'react-big-calendar'
import { leaveTypeColors } from './config'
import { CalendarToolbar } from './calendar-toolbar'
import { useState } from 'react'
import format from 'date-fns/format'
import parse from 'date-fns/parse'
import startOfWeek from 'date-fns/startOfWeek'
import getDay from 'date-fns/getDay'
import { enUS } from 'date-fns/locale'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const locales = { 'en-US': enUS }
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

interface CalendarEvent {
  title: string
  start: Date
  end: Date
  allDay: boolean
  type: string
}

interface CalendarSectionProps {
  events: CalendarEvent[]
  currentDate: Date
  onDateChange: (date: Date) => void
}

export function CalendarSection({ events, currentDate, onDateChange }: CalendarSectionProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <div className="relative">
      {/* Collapse/Expand Button */}
      <motion.div
        layout
        className={`${isExpanded ? 'w-full' : 'w-auto'} mx-4 sm:mx-6 lg:mx-8`}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        <motion.button
          layout
          onClick={() => setIsExpanded(!isExpanded)}
          className={`ct flex items-center gap-2 p-3 rounded-t-lg shadow-lg mt-5 ring-1 ring-black ring-opacity-5 bg-gray-50 ${
            isExpanded
              ? ''
              : ' hover:bg-gray-100 transition-colors rounded-lg'
          }`}
          whileHover={{ scale: isExpanded ? 1 : 1.02 }}
          whileTap={{ scale: isExpanded ? 1 : 0.98 }}
        >
          <span className="ct text-md font-normal text-[var(--text-primary)] whitespace-nowrap">
            Team Calendar
          </span>
          <motion.svg
            className={`w-5 h-5 transform transition-transform ${
              isExpanded ? 'rotate-180' : 'rotate-0'
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </motion.svg>
        </motion.button>
      </motion.div>

      {/* Calendar Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 600 }}
            exit={{ opacity: 0, height: 0 }}
            className="cs bg-white shadow-lg ring-1 ring-black ring-opacity-5 mx-4 sm:mx-6 lg:mx-8"
            style={{ 
              marginTop: '-1px',
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0
            }}
          >
            <div className="sm:p-6">
              <div className="h-[550px]">
                <Calendar<CalendarEvent>
                  localizer={localizer}
                  events={events}
                  date={currentDate}
                  onNavigate={onDateChange}
                  defaultView="month"
                  views={['month']}
                  min={new Date(1972, 0, 1, 8)}
                  max={new Date(1972, 0, 1, 17)}
                  components={{ toolbar: CalendarToolbar }}
                  eventPropGetter={(event) => ({
                    style: {
                      backgroundColor: leaveTypeColors[event.type as keyof typeof leaveTypeColors]?.bg || '#f3f4f6',
                      color: leaveTypeColors[event.type as keyof typeof leaveTypeColors]?.text || '#1f2937',
                      boxShadow: 'none',
                      fontSize: '0.875rem',
                      opacity: 0.9,
                      zIndex: 1
                    }
                  })}
                  className="
                    [&_.rbc-header]:text-gray-500 
                    [&_.rbc-header]:text-sm 
                    [&_.rbc-header]:font-medium
                    [&_.rbc-day-bg+_.rbc-day-bg]:border-l 
                    [&_.rbc-day-bg+_.rbc-day-bg]:border-gray-100
                    [&_.rbc-month-row]:border-b 
                    [&_.rbc-month-row]:border-gray-100
                    [&_.rbc-off-range]:bg-gray-50/30
                    [&_.rbc-today]:bg-[var(--accent)]/5
                    [&_.rbc-event]:transition-colors 
                    [&_.rbc-event]:duration-150
                  "
                  style={{ height: '100%' }}
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 