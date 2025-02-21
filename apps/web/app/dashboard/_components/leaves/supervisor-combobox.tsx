'use client'

import { Combobox } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

export function SupervisorCombobox({
  supervisors,
  selected,
  onSelect
}: {
  supervisors: string[]
  selected: string
  onSelect: (value: string) => void
}) {
  const [query, setQuery] = useState('')

  const filteredSupervisors = query === ''
    ? supervisors
    : supervisors.filter((supervisor) =>
        supervisor.toLowerCase().includes(query.toLowerCase())
      )

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Supervisor
      </label>
      <Combobox value={selected} onChange={onSelect}>
        <div className="relative">
          <div className="relative w-full">
            <Combobox.Input
              className="w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--accent)] focus:ring-[var(--accent)]"
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(supervisor: string) => supervisor}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <UserIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredSupervisors.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredSupervisors.map((person) => (
                <Combobox.Option
                  key={person}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-[var(--accent)] text-white' : 'text-gray-900'
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                        {person}
                      </span>
                      {selected && (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-[var(--accent)]'
                          }`}
                        >
                          <UserIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      )}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  )
} 