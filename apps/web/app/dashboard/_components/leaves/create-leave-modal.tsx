'use client'

import { Dialog, Transition , Combobox } from '@headlessui/react'
import { UserIcon } from '@heroicons/react/24/outline'
import { Fragment, useState } from 'react'

import type { LeaveType } from '@/types/leaves'

const mockSupervisors = [
  'Juan dela Cruz',
  'Maria Santos',
  'Jose Reyes',
  'Ana Gonzales',
  'Miguel Ramos',
  'Rosa Mendoza',
  'Pedro Garcia',
  'Carmen Cruz',
  'Antonio Torres',
  'Isabella Lopez'
]

interface CreateLeaveModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateLeaveModal({ isOpen, onClose }: CreateLeaveModalProps) {
  const [type, setType] = useState<LeaveType>('Vacation')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [reason, setReason] = useState('')
  const [_attachments, setAttachments] = useState<File[]>([])
  const [supervisor, setSupervisor] = useState('Miguel Ramos') // Default supervisor
  const [query, setQuery] = useState('')

  const filteredSupervisors = query === ''
    ? mockSupervisors
    : mockSupervisors.filter((supervisor) =>
        supervisor.toLowerCase().includes(query.toLowerCase())
      )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement leave request submission
    onClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Create New Leave Request
                </Dialog.Title>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Leave Type
                    </label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as LeaveType)}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--accent)] focus:ring-[var(--accent)]"
                      required
                    >
                      <option value="Vacation">Vacation</option>
                      <option value="Sick">Sick</option>
                      <option value="Personal">Personal</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supervisor
                    </label>
                    <Combobox value={supervisor} onChange={setSupervisor}>
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
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                          afterLeave={() => setQuery('')}
                        >
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
                        </Transition>
                      </div>
                    </Combobox>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--accent)] focus:ring-[var(--accent)]"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--accent)] focus:ring-[var(--accent)]"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Reason
                    </label>
                    <textarea
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      rows={3}
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--accent)] focus:ring-[var(--accent)]"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Attachments
                    </label>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setAttachments(Array.from(e.target.files || []))}
                      className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[var(--accent)] file:text-white hover:file:bg-[var(--accent-hover)]"
                    />
                  </div>

                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"
                    >
                      Create Request
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 