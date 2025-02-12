import 'react-big-calendar/lib/css/react-big-calendar.css'

import { render, screen } from '@testing-library/react'

import { LeaveCalendar } from '@/app/dashboard/_components/leaves/calendar'
import type { Leave } from '@/types/leaves'

interface MockEvent {
  title: string
}

interface MockCalendarProps {
  events: MockEvent[]
  'aria-label'?: string
}

// Mock react-big-calendar
jest.mock('react-big-calendar', () => ({
  Calendar: ({ events, 'aria-label': ariaLabel }: MockCalendarProps) => (
    <div aria-label={ariaLabel}>
      {events.map((event) => (
        <div key={event.title}>{event.title}</div>
      ))}
    </div>
  ),
  dateFnsLocalizer: () => ({})
}))

const mockLeaves: Leave[] = [
  {
    id: '1',
    startDate: '2024-03-20',
    endDate: '2024-03-25',
    type: 'Vacation',
    status: 'Pending',
    userId: 'user-1'
  }
]

describe('LeaveCalendar', () => {
  it('renders calendar with leave events', () => {
    render(<LeaveCalendar data={mockLeaves} />)
    expect(screen.getByLabelText('Leave calendar')).toBeInTheDocument()
    expect(screen.getByText('Vacation - Pending')).toBeInTheDocument()
  })
})
