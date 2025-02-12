import { render, screen } from '@testing-library/react'
import { LeaveCalendar } from './calendar'
import type { Leave } from '@/types/leaves'

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
