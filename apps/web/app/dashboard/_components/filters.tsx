'use client'

import { Listbox } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

import type { LeaveType, LeaveStatus } from '@/types/leaves'

interface FiltersProps {
  onFilterChange: (filters: {
    type?: LeaveType
    status?: LeaveStatus
    dateRange?: { start?: string; end?: string }
  }) => void
  typeCounts?: Record<LeaveType, number>
  statusCounts?: Record<LeaveStatus, number>
}

export function Filters({ onFilterChange, typeCounts = { Vacation: 0, Sick: 0, Emergency: 0 }, statusCounts = { Pending: 0, Approved: 0, Rejected: 0 } }: FiltersProps) {
  const [selectedType, setSelectedType] = useState<LeaveType | ''>('')
  const [selectedStatus, setSelectedStatus] = useState<LeaveStatus | ''>('')
  const [selectedYear, setSelectedYear] = useState<'current' | 'previous'>('current')

  const handleTypeChange = (value: LeaveType | '') => {
    setSelectedType(value)
    onFilterChange({ type: value as LeaveType })
  }

  const handleStatusChange = (value: LeaveStatus | '') => {
    setSelectedStatus(value)
    onFilterChange({ status: value as LeaveStatus })
  }

  const handleYearChange = (year: 'current' | 'previous') => {
    setSelectedYear(year)
    // You might want to update the dateRange filter here
    onFilterChange({ dateRange: year === 'current' ? 
      { start: new Date(new Date().getFullYear(), 0, 1).toISOString() } : 
      { start: new Date(new Date().getFullYear() - 1, 0, 1).toISOString() }
    })
  }

  const DropdownFilter = ({ value, options, counts, onChange, placeholder }: {
    value: string
    options: string[]
    counts: Record<string, number>
    onChange: (value: string) => void
    placeholder: string
  }) => (
    <Listbox value={value} onChange={onChange}>
      <div className="relative">
        <Listbox.Button className="w-48 py-2 pl-3 pr-10 text-left text-sm bg-white border border-gray-300 rounded-lg shadow-sm cursor-default focus:border-orange-500 focus:ring-2 focus:ring-orange-500">
          <span className="flex items-center justify-between">
            {value ? (
              <span className="flex items-center gap-2">
                <span className="font-normal">{value}</span>
                <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700">
                  {counts[value]}
                </span>
              </span>
            ) : (
              <span className="text-sm text-gray-500">{placeholder}</span>
            )}
            <ChevronDownIcon className="w-5 h-5 ml-2 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options className="absolute z-10 w-full mt-1 overflow-auto text-sm bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 max-h-60 focus:outline-none">
          <Listbox.Option
            value=""
            className={({ active }) =>
              `px-4 py-2 cursor-pointer ${active ? 'bg-orange-50' : 'text-gray-900'}`
            }
          >
            {placeholder}
          </Listbox.Option>
          {options.map((option) => (
            <Listbox.Option
              key={option}
              value={option}
              className={({ active }) =>
                `px-4 py-2 cursor-pointer ${active ? 'bg-orange-50' : 'text-gray-900'}`
              }
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-700">
                  {counts[option]}
                </span>
              </div>
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </div>
    </Listbox>
  )

  return (
    <div className="flex flex-wrap items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
      <div className="flex gap-3">
        <DropdownFilter
          value={selectedType}
          options={Object.keys(typeCounts)}
          counts={typeCounts}
          onChange={handleTypeChange}
          placeholder="Select Type"
        />
        <DropdownFilter
          value={selectedStatus}
          options={Object.keys(statusCounts)}
          counts={statusCounts}
          onChange={handleStatusChange}
          placeholder="Select Status"
        />
      </div>
      
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
        <button
          onClick={() => handleYearChange('current')}
          className={`px-4 py-2 text-sm font-normal rounded-md ${
            selectedYear === 'current'
              ? 'bg-white text-orange-700 shadow-sm ring-1 ring-gray-200'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Current Year
        </button>
        <button
          onClick={() => handleYearChange('previous')}
          className={`px-4 py-2 text-sm font-normal rounded-md ${
            selectedYear === 'previous'
              ? 'bg-white text-orange-700 shadow-sm ring-1 ring-gray-200'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Previous Year
        </button>
      </div>
    </div>
  )
}
