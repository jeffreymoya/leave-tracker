'use client'

import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import type { LeaveType, LeaveStatus } from '@/types/leaves'
import { useState } from 'react'

interface FiltersProps {
  onFilterChange: (filters: {
    type?: LeaveType
    status?: LeaveStatus
    dateRange?: { start?: string; end?: string }
  }) => void
  typeCounts?: Record<LeaveType, number>
  statusCounts?: Record<LeaveStatus, number>
}

export function Filters({ onFilterChange, typeCounts = { Vacation: 0, Sick: 0, Personal: 0 }, statusCounts = { Pending: 0, Approved: 0, Rejected: 0 } }: FiltersProps) {
  const [selectedType, setSelectedType] = useState<LeaveType | ''>('')
  const [selectedStatus, setSelectedStatus] = useState<LeaveStatus | ''>('')

  const handleTypeChange = (value: LeaveType | '') => {
    setSelectedType(value)
    onFilterChange({ type: value as LeaveType })
  }

  const handleStatusChange = (value: LeaveStatus | '') => {
    setSelectedStatus(value)
    onFilterChange({ status: value as LeaveStatus })
  }

  return (
    <div className="flex flex-wrap gap-4 items-center p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <div id="filters" className="flex gap-4">
        <div className="w-48">
          <Listbox value={selectedType} onChange={handleTypeChange}>
            <div className="relative">
              <Listbox.Button className="relative w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-white border rounded-md hover:bg-gray-50">
                <span className="block truncate">
                  {selectedType ? (
                    <div className="flex justify-between items-center">
                      <span>{selectedType}</span>
                      <span className="ml-2 px-2 py-0.5 text-sm rounded-full bg-orange-100 text-orange-700 mr-5">
                        {typeCounts[selectedType as LeaveType]}
                      </span>
                    </div>
                  ) : (
                    'All Types'
                  )}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 w-full mt-1 overflow-auto text-sm bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Listbox.Option
                  value=""
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 px-4 ${
                      active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                    }`
                  }
                >
                  All Types
                </Listbox.Option>
                {Object.entries(typeCounts).map(([type, count]) => (
                  <Listbox.Option
                    key={type}
                    value={type}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 px-4 ${
                        active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                      }`
                    }
                  >
                    <div className="flex justify-between items-center">
                      <span>{type}</span>
                      <span className="ml-2 px-2 py-0.5 text-sm rounded-full bg-orange-100 text-orange-700">
                        {count}
                      </span>
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>

        <div className="w-48">
          <Listbox value={selectedStatus} onChange={handleStatusChange}>
            <div className="relative">
              <Listbox.Button className="relative w-full px-4 py-2 text-sm font-medium text-left text-gray-700 bg-white border rounded-md hover:bg-gray-50">
                <span className="block truncate">
                  {selectedStatus ? (
                    <div className="flex justify-between items-center">
                      <span>{selectedStatus}</span>
                      <span className="ml-2 px-2 py-0.5 text-sm rounded-full bg-orange-100 text-orange-700 mr-5">
                        {statusCounts[selectedStatus as LeaveStatus]}
                      </span>
                    </div>
                  ) : (
                    'All Status'
                  )}
                </span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2">
                  <ChevronDownIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
                </span>
              </Listbox.Button>
              <Listbox.Options className="absolute z-10 w-full mt-1 overflow-auto text-sm bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Listbox.Option
                  value=""
                  className={({ active }) =>
                    `relative cursor-pointer select-none py-2 px-4 ${
                      active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                    }`
                  }
                >
                  All Status
                </Listbox.Option>
                {Object.entries(statusCounts).map(([status, count]) => (
                  <Listbox.Option
                    key={status}
                    value={status}
                    className={({ active }) =>
                      `relative cursor-pointer select-none py-2 px-4 ${
                        active ? 'bg-orange-100 text-orange-900' : 'text-gray-900'
                      }`
                    }
                  >
                    <div className="flex justify-between items-center">
                      <span>{status}</span>
                      <span className="ml-2 px-2 py-0.5 text-sm rounded-full bg-orange-100 text-orange-700">
                        {count}
                      </span>
                    </div>
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </div>
          </Listbox>
        </div>
      </div>
    </div>
  )
}
