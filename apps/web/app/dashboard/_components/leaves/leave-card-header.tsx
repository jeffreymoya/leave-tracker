import type { Leave } from '@/types/leaves'
import { getLeaveTypeIcon } from './leave-list.utils'

interface LeaveCardHeaderProps {
  type: Leave['type']
  status: Leave['status']
}

export function LeaveCardHeader({ type, status }: LeaveCardHeaderProps) {
  return (
    <div className="px-4 py-3 sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-start min-w-0 gap-2">
          <div className="flex-shrink-0">
            {getLeaveTypeIcon(type)}
          </div>
          <h3 className="text-base font-semibold text-[var(--text-primary)] truncate">
            {type}
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              status === 'Approved'
                ? 'bg-green-100 text-green-800'
                : status === 'Rejected'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {status}
          </span>
        </div>
      </div>
    </div>
  )
} 