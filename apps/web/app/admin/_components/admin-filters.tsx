'use client'

import { useState } from 'react'

import type { LeaveType, LeaveStatus } from '@/types/leaves'

import {
  type FilterState,
  getDefaultDates,
  getFilterSections,
  getUpdatedFilters,
  getClearedFilters,
  convertToApiFilters
} from './admin-filters/admin-filters.utils'
import { FiltersLayout } from './admin-filters/filters-layout'

interface AdminFiltersProps {
  onFilterChange: (filters: {
    type?: LeaveType
    status?: LeaveStatus
    team?: string
    department?: string
    hasDocuments?: boolean
    cutoff?: string
    dateRange?: { start?: string; end?: string }
    leaveBalance?: string
  }) => void
  typeCounts: Record<LeaveType, number>
  statusCounts: Record<LeaveStatus, number>
}

export function AdminFilters({ onFilterChange, typeCounts, statusCounts }: AdminFiltersProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const { defaultStartDate, defaultEndDate } = getDefaultDates()

  const [filters, setFilters] = useState<FilterState>({
    type: [],
    status: [],
    team: [],
    department: [],
    hasDocuments: undefined,
    cutoff: [],
    dateRange: {
      start: defaultStartDate,
      end: defaultEndDate
    },
    leaveBalance: undefined
  })

  const handleFilterChange = (key: keyof FilterState, value: string | boolean | { start?: string; end?: string }) => {
    const newFilters = getUpdatedFilters(key, value, filters)
    setFilters(newFilters)
    onFilterChange(convertToApiFilters(newFilters))
  }

  const handleClearFilter = (filterKey: keyof FilterState) => {
    const newFilters = getClearedFilters(filterKey, filters)
    setFilters(newFilters)
    onFilterChange(convertToApiFilters(newFilters, filterKey))
  }

  const filterSections = getFilterSections(typeCounts, statusCounts)

  return (
    <FiltersLayout
      filters={filters}
      filterSections={filterSections}
      onFilterChange={handleFilterChange}
      onClearFilter={handleClearFilter}
      onMobileOpen={() => setMobileFiltersOpen(true)}
      mobileFiltersOpen={mobileFiltersOpen}
      onMobileClose={() => setMobileFiltersOpen(false)}
    />
  )
} 