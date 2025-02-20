import { CheckIcon, XMarkIcon, ArchiveBoxIcon } from '@heroicons/react/20/solid'
import { motion } from 'framer-motion'

import type { Leave } from '@/types/leaves'

interface ExpandedRowProps {
  leave: Leave
  onApprove: () => void
  onReject: () => void
  onMarkAsDeduction: () => void
}

export function ExpandedRow({ leave, onApprove, onReject, onMarkAsDeduction }: ExpandedRowProps) {
  return (
    <motion.div
      layout
      transition={{
        type: "spring", 
        stiffness: 300,
        damping: 25
      }}
      style={{ 
        originY: 0,
        willChange: "transform, opacity" // Optimize for GPU
      }}
      className="bg-gray-50 px-4 py-3 border-b"
    >
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
            className="btn btn-secondary"
            onClick={onApprove}
          >
            <CheckIcon className="h-3.5 w-3.5" />
            Approve
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={onReject}
          >
            <XMarkIcon className="h-3.5 w-3.5" />
            Reject
          </button>
          <button
            type="button"
            className="btn btn-secondary"
          >
            <ArchiveBoxIcon className="h-3.5 w-3.5" />
            Archive
          </button>
          <button
            type="button"
            className="btn btn-secondary"
          >
            Send Email
          </button>
          {(leave.leaveBalance?.available ?? 0) === 0 && (
            <button
              type="button"
              className="btn btn-destructive text-sm"
              onClick={onMarkAsDeduction}
            >
              Mark as Deduction
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
} 