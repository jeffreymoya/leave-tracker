'use client'

import type { Leave } from '@/types/leaves'
import { LeaveCard } from './leave-card'

interface LeaveListProps {
  leaves: Leave[]
  onEdit: (leave: Leave) => void
  onDelete: (leave: Leave) => void
}

export function LeaveList({ leaves, onEdit, onDelete }: LeaveListProps) {
  return (
    <div className="space-y-4">
      {leaves.map((leave) => (
        <LeaveCard
          key={leave.id}
          leave={leave}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}
