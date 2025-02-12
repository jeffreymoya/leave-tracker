'use client'

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { AdjustmentsHorizontalIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon } from '@heroicons/react/20/solid'
import type { LeaveType, LeaveStatus } from '@/types/leaves'

interface AdminFiltersProps {
  onFilterChange: (filters: {
    type?: LeaveType
    status?: LeaveStatus
    team?: string
    department?: string
    hasDocuments?: boolean
    cutoff?: string
    dateRange?: { start?: string; end?: string }
  }) => void
  typeCounts: Record<LeaveType, number>
  statusCounts: Record<LeaveStatus, number>
}

const teams = ['Engineering', 'Marketing', 'Sales', 'Support']
const departments = ['Technology', 'Operations', 'Finance', 'HR']
const cutoffs = ['1st-15th', '16th-EOM']

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

interface FilterState {
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
}

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface FilterSection {
  id: keyof FilterState
  name: string
  options: FilterOption[]
}

export function AdminFilters({ onFilterChange, typeCounts, statusCounts }: AdminFiltersProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const defaultEndDate = new Date().toISOString().split('T')[0]
  const defaultStartDate = new Date(new Date().setMonth(new Date().getMonth() - 2)).toISOString().split('T')[0]

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
    }
  })

  const handleFilterChange = (key: keyof FilterState, value: string | boolean | { start?: string; end?: string }) => {
    const newFilters = { ...filters }
    
    if (key === 'hasDocuments' || key === 'dateRange') {
      newFilters[key] = value as any
    } else {
      const values = newFilters[key] as Array<string | LeaveType | LeaveStatus>
      const stringValue = value as string
      const index = values.indexOf(stringValue)
      if (index > -1) {
        values.splice(index, 1)
      } else {
        values.push(stringValue)
      }
    }
    
    setFilters(newFilters)

    // Convert to API format
    const apiFilters: AdminFiltersProps['onFilterChange'] extends (filters: infer T) => any ? T : never = {}
    
    Object.entries(newFilters).forEach(([key, value]) => {
      const k = key as keyof typeof apiFilters
      if (Array.isArray(value) && value.length > 0) {
        apiFilters[k] = value[0] as any
      } else if (!Array.isArray(value)) {
        apiFilters[k] = value as any
      }
    })

    onFilterChange(apiFilters)
  }

  const isArrayFilter = (key: keyof FilterState): boolean => {
    return key !== 'hasDocuments' && key !== 'dateRange'
  }

  const getFilterLength = (filter: FilterState[keyof FilterState]): number => {
    if (Array.isArray(filter)) {
      return filter.length
    }
    if (typeof filter === 'object' && filter !== null && 'start' in filter) {
      return (filter.start || filter.end) ? 1 : 0
    }
    return filter ? 1 : 0
  }

  const hasFilterValue = (filter: FilterState[keyof FilterState], value: string): boolean => {
    if (Array.isArray(filter)) {
      return filter.some(item => item === value)
    }
    if (typeof filter === 'boolean') {
      return value === filter.toString()
    }
    return false
  }

  const filterSections: FilterSection[] = [
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

  const clearFilter = (sectionId: keyof FilterState) => {
    const newFilters = { ...filters }
    if (sectionId === 'dateRange') {
      newFilters.dateRange = { start: undefined, end: undefined }
    } else if (sectionId === 'hasDocuments') {
      newFilters.hasDocuments = undefined
    } else {
      newFilters[sectionId] = []
    }
    setFilters(newFilters)

    // Create API filters with the cleared section undefined
    const apiFilters: Partial<{
      type?: LeaveType
      status?: LeaveStatus
      team?: string
      department?: string
      hasDocuments?: boolean
      cutoff?: string
      dateRange?: { start?: string; end?: string }
    }> = {}
    
    Object.entries(newFilters).forEach(([key, value]) => {
      const k = key as keyof typeof apiFilters
      if (key === sectionId) {
        apiFilters[k] = undefined
      } else if (Array.isArray(value) && value.length > 0) {
        apiFilters[k] = value[0] as any
      } else if (!Array.isArray(value)) {
        apiFilters[k] = value as any
      }
    })

    onFilterChange(apiFilters)
  }

  return (
    <div className="bg-white w-72 rounded-lg shadow-sm border border-gray-200 shrink-0">
      <div>
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <AdjustmentsHorizontalIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
            <span className="text-lg font-medium text-gray-900">Filters</span>
          </div>
          <button
            type="button"
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <span className="sr-only">Open filters</span>
            <AdjustmentsHorizontalIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <form className="hidden lg:block">
          <div className="space-y-2 divide-y divide-gray-200">
            <div className="px-4 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Date Range</h3>
                {(filters.dateRange.start || filters.dateRange.end) && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                    Active
                  </span>
                )}
              </div>
              <div className="mt-4 space-y-4">
                <div>
                  <label htmlFor="start-date" className="block text-sm text-gray-600 mb-1">
                    From
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    value={filters.dateRange.start || ''}
                    max={filters.dateRange.end}
                    onChange={(e) =>
                      handleFilterChange('dateRange', {
                        ...filters.dateRange,
                        start: e.target.value || undefined
                      })
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="end-date" className="block text-sm text-gray-600 mb-1">
                    To
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    value={filters.dateRange.end || ''}
                    min={filters.dateRange.start}
                    onChange={(e) =>
                      handleFilterChange('dateRange', {
                        ...filters.dateRange,
                        end: e.target.value || undefined
                      })
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const end = new Date().toISOString().split('T')[0]
                      const start = new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0]
                      handleFilterChange('dateRange', { start, end })
                    }}
                    className={classNames(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset transition-colors",
                      filters.dateRange.start === new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0] &&
                      filters.dateRange.end === new Date().toISOString().split('T')[0]
                        ? "bg-blue-100 text-blue-700 ring-blue-600/20"
                        : "bg-gray-50 text-gray-600 ring-gray-500/10 hover:bg-gray-100"
                    )}
                  >
                    Last Month
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const end = new Date().toISOString().split('T')[0]
                      const start = new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().split('T')[0]
                      handleFilterChange('dateRange', { start, end })
                    }}
                    className={classNames(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset transition-colors",
                      filters.dateRange.start === new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().split('T')[0] &&
                      filters.dateRange.end === new Date().toISOString().split('T')[0]
                        ? "bg-blue-100 text-blue-700 ring-blue-600/20"
                        : "bg-gray-50 text-gray-600 ring-gray-500/10 hover:bg-gray-100"
                    )}
                  >
                    Last 3 Months
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      const end = new Date().toISOString().split('T')[0]
                      const start = new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().split('T')[0]
                      handleFilterChange('dateRange', { start, end })
                    }}
                    className={classNames(
                      "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset transition-colors",
                      filters.dateRange.start === new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().split('T')[0] &&
                      filters.dateRange.end === new Date().toISOString().split('T')[0]
                        ? "bg-blue-100 text-blue-700 ring-blue-600/20"
                        : "bg-gray-50 text-gray-600 ring-gray-500/10 hover:bg-gray-100"
                    )}
                  >
                    Last 6 Months
                  </button>
                </div>
                {(filters.dateRange.start || filters.dateRange.end) && (
                  <button
                    type="button"
                    onClick={() => clearFilter('dateRange')}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                  >
                    <XMarkIcon className="h-4 w-4" />
                    Clear dates
                  </button>
                )}
              </div>
            </div>

            {filterSections.map((section) => (
              <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-4">
                {({ open }) => (
                  <>
                    <h3 className="-mx-2 -my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-900">{section.name}</span>
                          {getFilterLength(filters[section.id]) > 0 && (
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                              {getFilterLength(filters[section.id])} selected
                            </span>
                          )}
                        </div>
                        <span className="ml-6 flex items-center">
                          <ChevronDownIcon
                            className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                            aria-hidden="true"
                          />
                        </span>
                      </Disclosure.Button>
                    </h3>
                    <Disclosure.Panel className="pt-6">
                      <div className="space-y-4">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center justify-between">
                            <div className="flex items-center">
                              <input
                                id={`filter-${section.id}-${optionIdx}`}
                                name={`${section.id}[]`}
                                defaultValue={option.value}
                                type="checkbox"
                                checked={hasFilterValue(filters[section.id], option.value)}
                                onChange={() => handleFilterChange(section.id, option.value)}
                                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600 hover:text-gray-900"
                              >
                                {option.label}
                              </label>
                            </div>
                            {'count' in option && (
                              <span className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                                {option.count}
                              </span>
                            )}
                          </div>
                        ))}
                        {getFilterLength(filters[section.id]) > 0 && (
                          <button
                            type="button"
                            onClick={() => clearFilter(section.id)}
                            className="mt-4 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            <XMarkIcon className="h-4 w-4" />
                            Clear selection
                          </button>
                        )}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}

            <div className="border-t border-gray-200 px-4 py-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Supporting Documents</h3>
                {filters.hasDocuments !== undefined && (
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
                    Active
                  </span>
                )}
              </div>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="has-documents"
                    name="hasDocuments"
                    type="radio"
                    checked={filters.hasDocuments === true}
                    onChange={() => handleFilterChange('hasDocuments', true)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  <label htmlFor="has-documents" className="ml-3 text-sm text-gray-600 hover:text-gray-900">
                    With documents
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    id="no-documents"
                    name="hasDocuments"
                    type="radio"
                    checked={filters.hasDocuments === false}
                    onChange={() => handleFilterChange('hasDocuments', false)}
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
                  />
                  <label htmlFor="no-documents" className="ml-3 text-sm text-gray-600 hover:text-gray-900">
                    Without documents
                  </label>
                </div>
                {filters.hasDocuments !== undefined && (
                <button
                  type="button"
                    onClick={() => clearFilter('hasDocuments')}
                    className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
                >
                    <XMarkIcon className="h-4 w-4" />
                  Clear selection
                </button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Mobile filter dialog */}
      <Transition.Root show={mobileFiltersOpen} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setMobileFiltersOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <Dialog.Panel className="relative ml-auto flex h-full w-full max-w-xs flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl">
                <div className="flex items-center justify-between px-4">
                  <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setMobileFiltersOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Filters */}
                <form className="mt-4">
                  <div className="divide-y divide-gray-200">
                    {filterSections.map((section) => (
                      <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                        {({ open }) => (
                          <>
                            <h3 className="-mx-2 -my-3 flow-root">
                              <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                                <span className="text-sm font-medium text-gray-900">{section.name}</span>
                                <span className="ml-6 flex items-center">
                                  <ChevronDownIcon
                                    className={classNames(
                                      open ? '-rotate-180' : 'rotate-0',
                                      'h-5 w-5 transform'
                                    )}
                                    aria-hidden="true"
                                  />
                                </span>
                              </Disclosure.Button>
                            </h3>
                            <Disclosure.Panel className="pt-6">
                              <div className="space-y-4">
                                {section.options.map((option, optionIdx) => (
                                  <div key={option.value} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                      <input
                                        id={`filter-mobile-${section.id}-${optionIdx}`}
                                        name={`${section.id}[]`}
                                        defaultValue={option.value}
                                        type="radio"
                                        checked={hasFilterValue(filters[section.id], option.value)}
                                        onChange={() => handleFilterChange(section.id, option.value)}
                                        className="h-4 w-4 rounded border-gray-300 text-[var(--accent)] focus:ring-[var(--accent)]"
                                      />
                                      <label
                                        htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                        className="ml-3 text-sm text-gray-600"
                                      >
                                        {option.label}
                                      </label>
                                    </div>
                                    {'count' in option && (
                                      <span className="ml-2 text-xs text-gray-500">
                                        {option.count}
                                      </span>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </Disclosure.Panel>
                          </>
                        )}
                      </Disclosure>
                    ))}
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  )
} 