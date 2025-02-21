import { format } from 'date-fns'
import { enUS } from 'date-fns/locale'
import type { ToolbarProps } from 'react-big-calendar'
import type { CalendarEvent } from './calendar-section'

export function CalendarToolbar(toolbar: ToolbarProps<CalendarEvent>) {
  return (
    <div className="flex justify-center mb-4 px-2">
      <div className="flex items-center gap-3">
        <button
          className="px-3 py-1.5 text-sm text-[var(--text-primary)] hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => toolbar.onNavigate('PREV')}
        >
          &larr;
        </button>
        <div className="px-4 py-1.5 bg-gray-50 rounded-lg text-[var(--text-primary)] font-medium">
          {format(toolbar.date, 'MMMM yyyy', { locale: enUS })}
        </div>
        <button
          className="px-3 py-1.5 text-sm text-[var(--text-primary)] hover:bg-gray-100 rounded-lg transition-colors"
          onClick={() => toolbar.onNavigate('NEXT')}
        >
          &rarr;
        </button>
      </div>
    </div>
  )
} 