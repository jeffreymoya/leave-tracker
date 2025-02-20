import type { Leave } from '@/types/leaves'

import { LeaveCardContent } from './leave-card-content'
import { LeaveCardFooter } from './leave-card-footer'
import { LeaveCardHeader } from './leave-card-header'

interface LeaveCardProps {
  leave: Leave
  onEdit: (leave: Leave) => void
  onDelete: (leave: Leave) => void
}

export function LeaveCard({ leave, onEdit, onDelete }: LeaveCardProps) {
  return (
    <div className="bg-white shadow-sm rounded-lg divide-y divide-gray-200 hover:shadow-lg transition-all duration-200 ring-1 ring-gray-200">
      <LeaveCardHeader type={leave.type} status={leave.status} />
      <LeaveCardContent
        startDate={leave.startDate}
        endDate={leave.endDate}
        userId={leave.userId}
        reason={leave.reason}
      />
      <div className="px-4 py-3 sm:px-6">
        <LeaveCardFooter
          attachments={leave.attachments}
          onEdit={() => onEdit(leave)}
          onDelete={() => onDelete(leave)}
        />
      </div>
    </div>
  )
} 