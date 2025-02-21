'use client'

import { Dialog, Transition  } from '@headlessui/react'
import { Fragment, useState, useEffect } from 'react'

import type { Leave, LeaveType } from '@/types/leaves'
import { CreateLeaveForm } from './create-leave-form'

interface EditLeaveModalProps {
  isOpen: boolean
  onClose: () => void
  leave: Leave
  onSave: (updatedLeave: Leave) => void
}

export function EditLeaveModal({ isOpen, onClose, leave, onSave }: EditLeaveModalProps) {
  const handleFormSubmit = (data: any) => {
    onSave({
      ...leave,
      ...data
    })
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
        >
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
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
            >
              <div style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}>
                <Dialog.Panel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-2xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900 mb-4"
                  >
                    Edit Leave Request
                  </Dialog.Title>
                  
                  <CreateLeaveForm 
                    onClose={onClose}
                    initialType={leave.type}
                    initialStartDate={leave.startDate}
                    initialEndDate={leave.endDate}
                    initialReason={leave.reason || ''}
                    isEdit={true}
                    onSubmit={handleFormSubmit}
                  />
                </Dialog.Panel>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
} 