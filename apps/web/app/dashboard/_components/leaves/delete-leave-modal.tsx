'use client'

import { Dialog, Transition } from '@headlessui/react'
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline'
import { Fragment } from 'react'

import type { Leave } from '@/types/leaves'

interface DeleteLeaveModalProps {
  isOpen: boolean
  onClose: () => void
  leave: Leave
  onConfirm: (leaveId: string) => void
}

export function DeleteLeaveModal({ isOpen, onClose, leave, onConfirm }: DeleteLeaveModalProps) {
  const handleDelete = () => {
    onConfirm(leave.id)
    onClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-400"
          enterFrom="opacity-0 backdrop-blur-none"
          enterTo="opacity-100 backdrop-blur-sm"
          leave="ease-in duration-300"
          leaveFrom="opacity-100 backdrop-blur-sm"
          leaveTo="opacity-0 backdrop-blur-none"
          className="fixed inset-0 bg-black/30 backdrop-blur-sm"
        >
          <div className="fixed inset-0" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-400"
              enterFrom="opacity-0 translate-y-4 scale-95"
              enterTo="opacity-100 translate-y-0 scale-100"
              leave="ease-in duration-300"
              leaveFrom="opacity-100 translate-y-0 scale-100"
              leaveTo="opacity-0 translate-y-4 scale-95"
              style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0">
                    <ExclamationTriangleIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                  </div>
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Cancel Leave Request
                  </Dialog.Title>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to cancel this leave request? This action cannot be undone.
                  </p>
                  <div className="mt-2 bg-gray-50 p-4 rounded-lg">
                    <dl className="space-y-2 text-sm">
                      <div>
                        <dt className="font-medium text-gray-900">Type</dt>
                        <dd className="text-gray-700">{leave.type}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Dates</dt>
                        <dd className="text-gray-700">
                          {new Date(leave.startDate).toLocaleDateString()} to{' '}
                          {new Date(leave.endDate).toLocaleDateString()}
                        </dd>
                      </div>
                      {leave.reason && (
                        <div>
                          <dt className="font-medium text-gray-900">Reason</dt>
                          <dd className="text-gray-700">{leave.reason}</dd>
                        </div>
                      )}
                    </dl>
                  </div>
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
                    type="button"
                    onClick={handleDelete}
                    className="btn btn-destructive"
                  >
                    Proceed
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 