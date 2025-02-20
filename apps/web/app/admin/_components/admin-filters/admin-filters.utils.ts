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
        if (k === 'type') apiFilters[k] = value[0] as LeaveType
        else if (k === 'status') apiFilters[k] = value[0] as LeaveStatus
        else if (k === 'team' || k === 'department' || k === 'cutoff') apiFilters[k] = value[0]
      } else if (!Array.isArray(value) && value !== undefined) {
        if (k === 'hasDocuments') apiFilters[k] = value as boolean
        else if (k === 'dateRange') apiFilters[k] = value as { start?: string; end?: string }
        else if (k === 'leaveBalance') apiFilters[k] = value as string
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
  let newValue: unknown
  
  switch (key) {
    case 'type':
    case 'status':
    case 'team':
    case 'department':
    case 'cutoff': {
      const currentArray = currentFilters[key] as string[]
      newValue = currentArray.includes(value as string)
        ? currentArray.filter(v => v !== value)
        : [...currentArray, value]
      break
    }
    case 'hasDocuments':
    case 'leaveBalance':
      newValue = value
      break
    case 'dateRange':
      newValue = value
      break
    default:
      newValue = value
  }

  return {
    ...currentFilters,
    [key]: newValue
  }
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