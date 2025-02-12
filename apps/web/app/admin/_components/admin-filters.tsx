'use client'

import { Fragment, useState } from 'react'
import { Dialog, Disclosure, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
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

export function AdminFilters({ onFilterChange, typeCounts, statusCounts }: AdminFiltersProps) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [filters, setFilters] = useState({
    type: undefined as LeaveType | undefined,
    status: undefined as LeaveStatus | undefined,
    team: undefined as string | undefined,
    department: undefined as string | undefined,
    hasDocuments: undefined as boolean | undefined,
    cutoff: undefined as string | undefined,
    dateRange: {
      start: undefined as string | undefined,
      end: undefined as string | undefined
    }
  })

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const filterSections = [
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

  return (
    <div className="bg-white w-72">
      <div>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-medium text-gray-900">Filters</h2>
          <button
            type="button"
            className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-50"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <span className="sr-only">Open filters</span>
            <FunnelIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>

        <form className="hidden lg:block">
          <div className="space-y-4 divide-y divide-gray-200">
            {filterSections.map((section) => (
              <Disclosure as="div" key={section.id} className="border-t border-gray-200 px-4 py-6">
                {({ open }) => (
                  <>
                    <h3 className="-mx-2 -my-3 flow-root">
                      <Disclosure.Button className="flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
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
                                type="radio"
                                checked={filters[section.id as keyof typeof filters] === option.value}
                                onChange={() => handleFilterChange(section.id, option.value)}
                                className="h-4 w-4 rounded border-gray-300 text-[var(--accent)] focus:ring-[var(--accent)]"
                              />
                              <label
                                htmlFor={`filter-${section.id}-${optionIdx}`}
                                className="ml-3 text-sm text-gray-600"
                              >
                                {option.label}
                              </label>
                            </div>
                            {'count' in option && (
                              <span className="ml-2 text-xs text-gray-500">{option.count}</span>
                            )}
                          </div>
                        ))}
                        {section.id === 'type' && (
                          <button
                            type="button"
                            className="text-sm text-gray-500 hover:text-gray-700 mt-2"
                            onClick={() => handleFilterChange('type', undefined)}
                          >
                            Clear selection
                          </button>
                        )}
                      </div>
                    </Disclosure.Panel>
                  </>
                )}
              </Disclosure>
            ))}

            <div className="border-t border-gray-200 px-4 py-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Supporting Documents</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="has-documents"
                    name="hasDocuments"
                    type="radio"
                    checked={filters.hasDocuments === true}
                    onChange={() => handleFilterChange('hasDocuments', true)}
                    className="h-4 w-4 rounded border-gray-300 text-[var(--accent)] focus:ring-[var(--accent)]"
                  />
                  <label htmlFor="has-documents" className="ml-3 text-sm text-gray-600">
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
                    className="h-4 w-4 rounded border-gray-300 text-[var(--accent)] focus:ring-[var(--accent)]"
                  />
                  <label htmlFor="no-documents" className="ml-3 text-sm text-gray-600">
                    Without documents
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-gray-700"
                  onClick={() => handleFilterChange('hasDocuments', undefined)}
                >
                  Clear selection
                </button>
              </div>
            </div>

            <div className="border-t border-gray-200 px-4 py-6">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Date Range</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="start-date" className="block text-sm text-gray-600 mb-1">
                    Start Date
                  </label>
                  <input
                    type="date"
                    id="start-date"
                    value={filters.dateRange.start || ''}
                    onChange={(e) =>
                      handleFilterChange('dateRange', {
                        ...filters.dateRange,
                        start: e.target.value || undefined
                      })
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--accent)] focus:ring-[var(--accent)] sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="end-date" className="block text-sm text-gray-600 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    id="end-date"
                    value={filters.dateRange.end || ''}
                    onChange={(e) =>
                      handleFilterChange('dateRange', {
                        ...filters.dateRange,
                        end: e.target.value || undefined
                      })
                    }
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--accent)] focus:ring-[var(--accent)] sm:text-sm"
                  />
                </div>
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    handleFilterChange('dateRange', { start: undefined, end: undefined })
                  }
                >
                  Clear dates
                </button>
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
                                <span className="font-medium text-gray-900">{section.name}</span>
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
                                        checked={filters[section.id as keyof typeof filters] === option.value}
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