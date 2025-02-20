import type { LeaveType, LeaveStatus } from '@/types/leaves'

export interface FilterState {
  type: LeaveType[]
  status: LeaveStatus[]
  team: string[]
  department: string[]
  hasDocuments: boolean | undefined
  cutoff: string[]
  dateRange: {
    start: string | undefined
    end: string | undefined
  }
  leaveBalance: string | undefined
}

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface FilterSection {
  id: keyof FilterState
  name: string
  options: FilterOption[]
}

export const teams = ['Engineering', 'Marketing', 'Sales', 'Support']
export const departments = ['Technology', 'Operations', 'Finance', 'HR']
export const cutoffs = ['1st-15th', '16th-EOM']

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function getDefaultDates() {
  const defaultEndDate = new Date().toISOString().split('T')[0]
  const defaultStartDate = new Date(new Date().setMonth(new Date().getMonth() - 2))
    .toISOString()
    .split('T')[0]
  return { defaultStartDate, defaultEndDate }
}

export function isArrayFilter(key: keyof FilterState): boolean {
  return !['hasDocuments', 'dateRange', 'leaveBalance'].includes(key)
}

export function getFilterLength(filter: FilterState[keyof FilterState]): number {
  if (Array.isArray(filter)) {
    return filter.length
  }
  if (typeof filter === 'object' && filter !== null && 'start' in filter) {
    return filter.start || filter.end ? 1 : 0
  }
  return filter ? 1 : 0
}

export function hasFilterValue(filter: FilterState[keyof FilterState], value: string): boolean {
  if (Array.isArray(filter)) {
    return filter.some(item => item === value)
  }
  if (typeof filter === 'boolean') {
    return value === filter.toString()
  }
  if (typeof filter === 'string') {
    return filter === value
  }
  return false
}

export function getFilterSections(typeCounts: Record<LeaveType, number>, statusCounts: Record<LeaveStatus, number>): FilterSection[] {
  return [
    {
      id: 'type',
      name: 'Leave Type',
      options: Object.entries(typeCounts).map(([type, count]) => ({
        value: type,
        label: type,
        count
      }))
    },
    {
      id: 'status',
      name: 'Status',
      options: Object.entries(statusCounts).map(([status, count]) => ({
        value: status,
        label: status,
        count
      }))
    },
    {
      id: 'team',
      name: 'Team',
      options: teams.map(team => ({
        value: team,
        label: team
      }))
    },
    {
      id: 'department',
      name: 'Department',
      options: departments.map(dept => ({
        value: dept,
        label: dept
      }))
    },
    {
      id: 'cutoff',
      name: 'Cutoff',
      options: cutoffs.map(cutoff => ({
        value: cutoff,
        label: cutoff
      }))
    }
  ]
}

export function convertToApiFilters(filters: FilterState, excludeKey?: keyof FilterState) {
  const apiFilters: Partial<{
    type?: LeaveType
    status?: LeaveStatus
    team?: string
    department?: string
    hasDocuments?: boolean
    cutoff?: string
    dateRange?: { start?: string; end?: string }
    leaveBalance?: string
  }> = {}

  Object.entries(filters).forEach(([key, value]) => {
    if (key !== excludeKey) {
      const k = key as keyof typeof apiFilters
      if (Array.isArray(value) && value.length > 0) {
        apiFilters[k] = value[0] as any
      } else if (!Array.isArray(value) && value !== undefined) {
        apiFilters[k] = value as any
      }
    }
  })

  return apiFilters
}

export function getUpdatedFilters(
  key: keyof FilterState,
  value: string | boolean | { start?: string; end?: string },
  currentFilters: FilterState
): FilterState {
  const newFilters = { ...currentFilters }

  switch (key) {
    case 'hasDocuments':
      newFilters.hasDocuments = value as boolean
      break
    case 'leaveBalance':
      newFilters.leaveBalance = value as string
      break
    case 'dateRange':
      newFilters.dateRange = {
        start: (value as { start?: string; end?: string }).start || newFilters.dateRange.start,
        end: (value as { start?: string; end?: string }).end || newFilters.dateRange.end
      }
      break
    default:
      const values = newFilters[key] as string[]
      const stringValue = value as string
      const index = values.indexOf(stringValue)
      if (index > -1) {
        values.splice(index, 1)
      } else {
        values.push(stringValue)
      }
  }

  return newFilters
}

export function getClearedFilters(filterKey: keyof FilterState, currentFilters: FilterState): FilterState {
  const newFilters = { ...currentFilters }

  switch (filterKey) {
    case 'hasDocuments':
    case 'leaveBalance':
      newFilters[filterKey] = undefined
      break
    case 'dateRange':
      newFilters.dateRange = { start: undefined, end: undefined }
      break
    default:
      newFilters[filterKey] = []
  }

  return newFilters
} 