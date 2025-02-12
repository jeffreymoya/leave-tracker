'use client'

import { useState } from 'react'
import { CheckIcon, ChevronUpDownIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { DocumentIcon } from '@heroicons/react/24/outline'
import type { Leave } from '@/types/leaves'

interface AdminLeaveListProps {
  data: Leave[]
}

export function AdminLeaveList({ data }: AdminLeaveListProps) {
  const [selectedLeaves, setSelectedLeaves] = useState<Set<string>>(new Set())
  const [sortColumn, setSortColumn] = useState<keyof Leave>('startDate')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const handleSelectAll = () => {
    if (selectedLeaves.size === data.length) {
      setSelectedLeaves(new Set())
    } else {
      setSelectedLeaves(new Set(data.map(leave => leave.id)))
    }
  }

  const handleSelectLeave = (leaveId: string) => {
    const newSelected = new Set(selectedLeaves)
    if (newSelected.has(leaveId)) {
      newSelected.delete(leaveId)
    } else {
      newSelected.add(leaveId)
    }
    setSelectedLeaves(newSelected)
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
      {selectedLeaves.size > 0 && (
        <div className="mb-4 flex gap-2">
          <button
            type="button"
            className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500"
          >
            Approve Selected
          </button>
          <button
            type="button"
            className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500"
          >
            Reject Selected
          </button>
          <button
            type="button"
            className="rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500"
          >
            Archive Selected
          </button>
        </div>
      )}
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="relative px-7 sm:w-12 sm:px-6">
                    <input
                      type="checkbox"
                      className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      checked={selectedLeaves.size === data.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
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
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
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
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
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
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
                    onClick={() => handleSort('endDate')}
                  >
                    <div className="group inline-flex">
                      End Date
                      <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
                        <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    </div>
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Employee
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Reason
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Supporting Documents
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {sortedData.map((leave) => (
                  <tr key={leave.id} className={selectedLeaves.has(leave.id) ? 'bg-gray-50' : undefined}>
                    <td className="relative px-7 sm:w-12 sm:px-6">
                      <input
                        type="checkbox"
                        className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        checked={selectedLeaves.has(leave.id)}
                        onChange={() => handleSelectLeave(leave.id)}
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
                              onClick={() => handleDownload(attachment)}
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
} 