'use client'

import { useState, Fragment } from 'react'
import type { MouseEvent, ChangeEvent } from 'react'
import { CheckIcon, ChevronUpDownIcon, XMarkIcon, ArchiveBoxIcon } from '@heroicons/react/20/solid'
import { DocumentIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import type { Leave } from '@/types/leaves'

interface AdminLeaveListProps {
  data: Leave[]
}

interface ConfirmDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText: string
  confirmButtonClassName?: string
}

function ConfirmDialog({ isOpen, onClose, onConfirm, title, description, confirmText, confirmButtonClassName }: ConfirmDialogProps) {
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
                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">{description}</p>
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
                    onClick={onConfirm}
                    className={confirmButtonClassName || "inline-flex justify-center rounded-md border border-transparent bg-[var(--accent)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--accent-hover)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2"}
                  >
                    {confirmText}
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

export function AdminLeaveList({ data }: AdminLeaveListProps) {
  const [selectedLeaves, setSelectedLeaves] = useState<Set<string>>(new Set())
  const [sortColumn, setSortColumn] = useState<keyof Leave>('startDate')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [confirmDialog, setConfirmDialog] = useState<{
    isOpen: boolean
    title: string
    description: string
    confirmText: string
    onConfirm: () => void
    confirmButtonClassName?: string
  } | null>(null)

  const handleSelectAll = () => {
    if (selectedLeaves.size === data.length) {
      setSelectedLeaves(new Set())
    } else {
      setSelectedLeaves(new Set(data.map(leave => leave.id)))
    }
  }

  const handleSelectLeave = (e: MouseEvent | ChangeEvent<HTMLInputElement>, leaveId: string) => {
    e.stopPropagation()
    const newSelected = new Set(selectedLeaves)
    if (newSelected.has(leaveId)) {
      newSelected.delete(leaveId)
    } else {
      newSelected.add(leaveId)
    }
    setSelectedLeaves(newSelected)
  }

  const handleRowClick = (leaveId: string) => {
    setExpandedRow(expandedRow === leaveId ? null : leaveId)
  }

  const handleSort = (column: keyof Leave) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const handleDownload = (attachment: { id: string; type: 'document' | 'image'; name: string }) => {
    // Mock download functionality
    const mockFileUrl = `https://mock-server.com/files/${attachment.id}/${attachment.name}`
    
    // Create blob to simulate file download
    const mockContent = `Mock content for ${attachment.name}`
    const blob = new Blob([mockContent], { type: 'application/octet-stream' })
    const url = window.URL.createObjectURL(blob)
    
    const link = document.createElement('a')
    link.href = url
    link.download = attachment.name
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    
    // Cleanup
    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
  }

  const handleApprove = (leaveIds: string[]) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Approve Leave Request',
      description: `Are you sure you want to approve ${leaveIds.length > 1 ? 'these leave requests' : 'this leave request'}?`,
      confirmText: 'Approve',
      confirmButtonClassName: 'inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
      onConfirm: () => {
        // TODO: Implement approve logic
        setConfirmDialog(null)
        setSelectedLeaves(new Set())
      }
    })
  }

  const handleReject = (leaveIds: string[]) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Reject Leave Request',
      description: `Are you sure you want to reject ${leaveIds.length > 1 ? 'these leave requests' : 'this leave request'}?`,
      confirmText: 'Reject',
      confirmButtonClassName: 'inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2',
      onConfirm: () => {
        // TODO: Implement reject logic
        setConfirmDialog(null)
        setSelectedLeaves(new Set())
      }
    })
  }

  const handleMarkAsDeduction = (leaveId: string) => {
    setConfirmDialog({
      isOpen: true,
      title: 'Mark as Deduction',
      description: 'Are you sure you want to mark this leave request as a deduction?',
      confirmText: 'Mark as Deduction',
      onConfirm: () => {
        // TODO: Implement mark as deduction logic
        setConfirmDialog(null)
      }
    })
  }

  const sortedData = [...data].sort((a, b) => {
    const aValue = a[sortColumn]
    const bValue = b[sortColumn]
    const direction = sortDirection === 'asc' ? 1 : -1

    if (aValue < bValue) return -1 * direction
    if (aValue > bValue) return 1 * direction
    return 0
  })

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div id="action-buttons" className="mb-6 flex gap-2">
        <button
          type="button"
          className={`w-28 inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium ring-1 ring-inset transition-colors ${
            selectedLeaves.size === 0
              ? 'bg-white text-gray-700 ring-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:ring-orange-100'
              : 'bg-gray-50 text-gray-700 ring-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:ring-orange-100'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={selectedLeaves.size === 0}
          onClick={() => handleApprove(Array.from(selectedLeaves))}
        >
          <CheckIcon className="h-3.5 w-3.5" />
          Approve
        </button>
        <button
          type="button"
          className={`w-28 inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium ring-1 ring-inset transition-colors ${
            selectedLeaves.size === 0
              ? 'bg-white text-gray-700 ring-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:ring-orange-100'
              : 'bg-gray-50 text-gray-700 ring-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:ring-orange-100'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={selectedLeaves.size === 0}
          onClick={() => handleReject(Array.from(selectedLeaves))}
        >
          <XMarkIcon className="h-3.5 w-3.5" />
          Reject
        </button>
        <button
          type="button"
          className={`w-28 inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium ring-1 ring-inset transition-colors ${
            selectedLeaves.size === 0
              ? 'bg-white text-gray-700 ring-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:ring-orange-100'
              : 'bg-gray-50 text-gray-700 ring-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:ring-orange-100'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={selectedLeaves.size === 0}
        >
          <ArchiveBoxIcon className="h-3.5 w-3.5" />
          Archive
        </button>
      </div>
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="relative w-12 px-7 sm:w-12 sm:px-6">
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={selectedLeaves.size === data.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th
                    scope="col"
                    className="w-32 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort('type')}
                  >
                    <div className="group inline-flex">
                      Type
                      <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="w-32 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort('status')}
                  >
                    <div className="group inline-flex">
                      Status
                      <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="w-32 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort('startDate')}
                  >
                    <div className="group inline-flex">
                      Start Date
                      <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="w-32 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort('endDate')}
                  >
                    <div className="group inline-flex">
                      End Date
                      <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="w-48 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Employee
                  </th>
                  <th scope="col" className="w-96 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Reason
                  </th>
                  <th scope="col" className="w-48 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Supporting Documents
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedData.map((leave) => (
                  <Fragment key={leave.id}>
                    <tr 
                      className={`${selectedLeaves.has(leave.id) ? 'bg-gray-50' : 'hover:bg-gray-50'} cursor-pointer transition-colors`}
                      onClick={() => handleRowClick(leave.id)}
                    >
                      <td className="relative px-7 sm:w-12 sm:px-6" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                          checked={selectedLeaves.has(leave.id)}
                          onChange={(e) => handleSelectLeave(e, leave.id)}
                        />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{leave.type}</td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm">
                        <span
                          className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                            leave.status === 'Approved'
                              ? 'bg-green-100 text-green-800'
                              : leave.status === 'Rejected'
                              ? 'bg-red-100 text-red-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {leave.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(leave.startDate).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {new Date(leave.endDate).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{leave.userId}</td>
                      <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">{leave.reason}</td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {!leave.attachments?.length ? (
                          <XMarkIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
                        ) : (
                          <div className="flex items-center gap-2 overflow-x-auto">
                            {leave.attachments.map(attachment => (
                              <button
                                key={attachment.id}
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDownload(attachment)
                                }}
                                className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 hover:bg-blue-100 transition-colors whitespace-nowrap"
                              >
                                <DocumentIcon className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                                {attachment.name}
                              </button>
                            ))}
                          </div>
                        )}
                      </td>
                    </tr>
                    {expandedRow === leave.id && (
                      <tr className="bg-orange-50/50">
                        <td colSpan={8} className="px-4 py-3">
                          <div className="space-y-3">
                            <dl className="grid grid-cols-4 gap-x-4 gap-y-1 text-sm">
                              <div className="col-span-1">
                                <dt className="font-medium text-gray-900 mb-0.5">Leave Type</dt>
                                <dd className="text-gray-500">{leave.type}</dd>
                              </div>
                              <div className="col-span-1">
                                <dt className="font-medium text-gray-900 mb-0.5">Department</dt>
                                <dd className="text-gray-500">{leave.department || 'Engineering'}</dd>
                              </div>
                              <div className="col-span-1">
                                <dt className="font-medium text-gray-900 mb-0.5">Team</dt>
                                <dd className="text-gray-500">{leave.team || 'Frontend'}</dd>
                              </div>
                              <div className="col-span-1">
                                <dt className="font-medium text-gray-900 mb-0.5">Leave Balance</dt>
                                <dd className="flex items-center gap-2">
                                  <span className={`rounded px-1.5 py-0.5 font-medium ${
                                    (leave.leaveBalance?.available ?? 0) > 0 
                                      ? 'bg-green-100 text-green-700'
                                      : 'bg-orange-100 text-orange-700'
                                  }`}>
                                    {leave.leaveBalance?.available ?? 0} days
                                  </span>
                                  <span className="text-gray-500 text-xs">
                                    ({leave.leaveBalance?.taken ?? 0} taken • {leave.leaveBalance?.pending ?? 0} pending)
                                  </span>
                                </dd>
                              </div>
                              <div className="col-span-4">
                                <dt className="font-medium text-gray-900 mb-0.5">Reason</dt>
                                <dd className="text-gray-500 whitespace-pre-wrap">{leave.reason}</dd>
                              </div>
                            </dl>
                            <div className="flex justify-end gap-2">
                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-200 hover:bg-green-50 hover:text-green-600 hover:ring-green-100 transition-colors"
                                onClick={() => handleApprove([leave.id])}
                              >
                                <CheckIcon className="h-3.5 w-3.5" />
                                Approve
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-200 hover:bg-red-50 hover:text-red-600 hover:ring-red-100 transition-colors"
                                onClick={() => handleReject([leave.id])}
                              >
                                <XMarkIcon className="h-3.5 w-3.5" />
                                Reject
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:ring-orange-100 transition-colors"
                              >
                                <ArchiveBoxIcon className="h-3.5 w-3.5" />
                                Archive
                              </button>
                              <button
                                type="button"
                                className="inline-flex items-center gap-1.5 rounded-md bg-white px-2.5 py-1.5 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:ring-orange-100 transition-colors"
                              >
                                Send Email
                              </button>
                              {(leave.leaveBalance?.available ?? 0) === 0 && (
                                <button
                                  type="button"
                                  className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
                                  onClick={() => handleMarkAsDeduction(leave.id)}
                                >
                                  Mark as Deduction
                                </button>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {confirmDialog && (
        <ConfirmDialog
          isOpen={confirmDialog.isOpen}
          onClose={() => setConfirmDialog(null)}
          title={confirmDialog.title}
          description={confirmDialog.description}
          confirmText={confirmDialog.confirmText}
          onConfirm={confirmDialog.onConfirm}
          confirmButtonClassName={confirmDialog.confirmButtonClassName}
        />
      )}
    </div>
  )
} 