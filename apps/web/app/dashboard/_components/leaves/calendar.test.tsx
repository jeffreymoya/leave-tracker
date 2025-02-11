import { render, screen } from '@testing-library/react'
import { LeaveCalendar } from './calendar'

describe('LeaveCalendar', () => {
  const mockLeaves = [{
    id: '1',
    startDate: '2024-03-25',
    endDate: '2024-03-28',
    type: 'Vacation',
    status: 'Pending'
  }]

  it('renders calendar with events', () => {
    render(<LeaveCalendar data={mockLeaves} />)
    expect(screen.getByLabelText('Leave calendar')).toBeInTheDocument()
    expect(screen.getByText('Vacation - Pending')).toBeInTheDocument()
  })
})
