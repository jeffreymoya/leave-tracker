'use client'

import { Dialog, Transition } from '@headlessui/react'
import { CalendarDaysIcon, DocumentTextIcon, UserIcon } from '@heroicons/react/24/outline'
import { Fragment, useState, useEffect } from 'react'
import { Combobox } from '@headlessui/react'
import type { Leave, LeaveType } from '@/types/leaves'

interface EditLeaveModalProps {
  isOpen: boolean
  onClose: () => void
  leave: Leave
  onSave: (updatedLeave: Leave) => void
}

export function EditLeaveModal({ isOpen, onClose, leave, onSave }: EditLeaveModalProps) {
  const [type, setType] = useState<LeaveType>(leave.type)
  const [startDate, setStartDate] = useState(leave.startDate)
  const [endDate, setEndDate] = useState(leave.endDate)
  const [reason, setReason] = useState(leave.reason || '')
  const [attachments, setAttachments] = useState<File[]>([])

  useEffect(() => {
    setType(leave.type)
    setStartDate(leave.startDate)
    setEndDate(leave.endDate)
    setReason(leave.reason || '')
  }, [leave])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...leave,
      type,
      startDate,
      endDate,
      reason: reason || undefined
    })
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
                  Edit Leave Request
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
                    {leave.attachments && leave.attachments.length > 0 && (
                      <div className="mb-2 flex gap-2">
                        {leave.attachments.map(attachment => (
                          <span
                            key={attachment.id}
                            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-gray-100 text-sm text-gray-700"
                          >
                            {attachment.name}
                          </span>
                        ))}
                      </div>
                    )}
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
                      Save Changes
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