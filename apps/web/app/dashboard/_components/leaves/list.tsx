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
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
