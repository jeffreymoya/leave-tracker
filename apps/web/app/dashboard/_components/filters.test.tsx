import { render, screen, fireEvent } from '@testing-library/react'

import { Filters } from './filters'

describe('Filters', () => {
  const mockViewChange = jest.fn()
  const mockFilterChange = jest.fn()

  beforeEach(() => {
    render(<Filters view="list" onViewChange={mockViewChange} onFilterChange={mockFilterChange} />)
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
    expect(screen.getByLabelText('Leave Type')).toBeInTheDocument()
    expect(screen.getByLabelText('Leave Status')).toBeInTheDocument()
  })

  it('updates filters when changing values', () => {
    const typeSelect = screen.getByLabelText('Leave Type')
    fireEvent.change(typeSelect, { target: { value: 'Vacation' } })
    expect(mockFilterChange).toHaveBeenCalledWith({ type: 'Vacation' })

    const statusSelect = screen.getByLabelText('Leave Status')
    fireEvent.change(statusSelect, { target: { value: 'Pending' } })
    expect(mockFilterChange).toHaveBeenCalledWith({ status: 'Pending' })
  })
})
