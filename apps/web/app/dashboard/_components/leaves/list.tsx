'use client'

import {
  CalendarDaysIcon,
  ClockIcon,
  DocumentIcon,
  DocumentTextIcon,
  PaperClipIcon,
  PencilSquareIcon,
  TrashIcon,
  UserIcon,
} from '@heroicons/react/24/outline'
import Link from 'next/link'

import type { Leave } from '@/types/leaves'

function getLeaveTypeIcon(type: Leave['type']) {
  switch (type) {
    case 'Vacation':
      return <CalendarDaysIcon className="h-5 w-5 text-blue-500 flex-shrink-0" aria-hidden="true" />
    case 'Sick':
      return <ClockIcon className="h-5 w-5 text-red-500 flex-shrink-0" aria-hidden="true" />
    case 'Personal':
      return <UserIcon className="h-5 w-5 text-purple-500 flex-shrink-0" aria-hidden="true" />
    default:
      return null
  }
}

const sampleData: Leave[] = [
  {
    id: '1',
    type: 'Vacation',
    status: 'Approved',
    startDate: '2024-02-11',
    endDate: '2024-02-17',
    userId: 'user-1',
    reason: 'Sample leave request 1',
    attachments: [
      { id: '1', type: 'document', name: 'approval.pdf' },
      { id: '2', type: 'image', name: 'ticket.jpg' }
    ]
  },
  {
    id: '2',
    type: 'Sick',
    status: 'Pending',
    startDate: '2024-02-20',
    endDate: '2024-02-21',
    userId: 'user-1',
    reason: 'Not feeling well'
  }
]

export function LeaveList({ data = sampleData }: { data?: Leave[] }) {
  const renderAttachments = (attachments?: Leave['attachments']) => {
    if (!attachments || attachments.length === 0) {
      return <div className="w-7" /> // Spacer for consistent layout
    }

    return attachments.map(attachment => (
      <button
        key={attachment.id}
        className="group relative inline-flex items-center gap-1 hover:z-10"
        onClick={() => {/* Handle attachment click */}}
        title={attachment.name}
      >
        {attachment.type === 'document' ? (
          <DocumentIcon className="h-7 w-7 rounded-lg border-2 border-white bg-gray-50 p-1 text-gray-600 shadow-sm transition-all group-hover:scale-110" />
        ) : (
          <PaperClipIcon className="h-7 w-7 rounded-lg border-2 border-white bg-gray-50 p-1 text-gray-600 shadow-sm transition-all group-hover:scale-110" />
        )}
      </button>
    ))
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map(leave => (
          <div 
            key={leave.id} 
            className="bg-white shadow-sm rounded-lg divide-y divide-gray-200 hover:shadow-lg transition-all duration-200 ring-1 ring-gray-200"
          >
            <div className="px-4 py-3 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-start min-w-0 gap-2">
                  <div className="flex-shrink-0">
                    {getLeaveTypeIcon(leave.type)}
                  </div>
                  <h3 className="text-base font-semibold text-[var(--text-primary)] truncate">
                    {leave.type}
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      leave.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : leave.status === 'Rejected'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}
                  >
                    {leave.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="px-4 py-1.5 sm:px-6">
              <div className="space-y-1.5">
                <div className="flex items-start gap-2">
                  <CalendarDaysIcon className="h-4 w-4 text-[var(--text-secondary)] flex-shrink-0" aria-hidden="true" />
                  <p className="text-sm font-medium text-[var(--text-primary)]">
                    {new Date(leave.startDate).toLocaleDateString()} to{' '}
                    {new Date(leave.endDate).toLocaleDateString()}
                  </p>
                </div>
                
                <div className="flex items-start gap-2">
                  <UserIcon className="h-4 w-4 text-[var(--text-secondary)] mt-0.5 flex-shrink-0" aria-hidden="true" />
                  <p className="text-sm text-[var(--text-primary)] line-clamp-2">
                    Supervisor/Career Advisor: {leave.userId}
                  </p>
                </div>
                
                {leave.reason && (
                  <div className="flex items-start gap-2">
                    <DocumentTextIcon className="h-4 w-4 text-[var(--text-secondary)] mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <p className="text-sm text-[var(--text-primary)] line-clamp-2">
                      {leave.reason}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-2 pt-1.5 border-t border-gray-100 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {renderAttachments(leave.attachments)}
                </div>
                <div className="flex gap-2">
                  <button
                    className="rounded-full p-1 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all"
                    onClick={() => {/* Handle edit */}}
                    aria-label="Edit leave request"
                  >
                    <PencilSquareIcon className="h-5 w-5" />
                  </button>
                  <button
                    className="rounded-full p-1 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
                    onClick={() => {/* Handle delete */}}
                    aria-label="Delete leave request"
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
