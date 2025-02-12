import { render, screen, fireEvent } from '@testing-library/react'

import { Filters } from './filters'

describe('Filters', () => {
  const mockViewChange = jest.fn()
  const mockFilterChange = jest.fn()

  beforeEach(() => {
    render(
      <Filters 
        view="list" 
        onViewChange={mockViewChange}
        onFilterChange={mockFilterChange}
      />
    )
  })

  it('renders view toggle buttons', () => {
    expect(screen.getByText('List')).toBeInTheDocument()
    expect(screen.getByText('Calendar')).toBeInTheDocument()
  })

  it('changes active view when clicking buttons', () => {
    const calendarButton = screen.getByText('Calendar')
    fireEvent.click(calendarButton)
    expect(mockViewChange).toHaveBeenCalledWith('calendar')
  })

  it('renders filter controls', () => {
    expect(screen.getByLabelText('All Types')).toBeInTheDocument()
    expect(screen.getByLabelText('All Status')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Start Date')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('End Date')).toBeInTheDocument()
  })

  it('updates filters when changing values', () => {
    const typeSelect = screen.getByLabelText('All Types')
    fireEvent.change(typeSelect, { target: { value: 'Vacation' } })
    expect(mockFilterChange).toHaveBeenCalledWith({
      type: 'Vacation',
      status: '',
      dateRange: { start: '', end: '' }
    })

    const startDateInput = screen.getByPlaceholderText('Start Date')
    fireEvent.change(startDateInput, { target: { value: '2024-01-01' } })
    expect(mockFilterChange).toHaveBeenCalledWith({
      type: '',
      status: '',
      dateRange: { start: '2024-01-01', end: '' }
    })
  })
})
