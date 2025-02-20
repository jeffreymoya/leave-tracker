'use client'

import { useState } from 'react'
import type { Leave } from '@/types/leaves'

import { LeaveCalendar } from './leaves/calendar'
import { DeleteLeaveModal } from './leaves/delete-leave-modal'
import { EditLeaveModal } from './leaves/edit-leave-modal'
import { LeaveList } from './leaves/list'
import { LoadingSkeleton } from './loading-skeleton'

interface DashboardContentProps {
  isLoading: boolean
  view: 'list' | 'calendar'
  data: Leave[]
}

export function DashboardContent({ isLoading, view, data }: DashboardContentProps) {
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)
  const [selectedLeave, setSelectedLeave] = useState<Leave | null>(null)

  if (isLoading) {
    return <LoadingSkeleton />
  }

  const handleEdit = (leave: Leave) => {
    setSelectedLeave(leave)
    setEditModalOpen(true)
  }

  const handleDelete = (leave: Leave) => {
    setSelectedLeave(leave)
    setDeleteModalOpen(true)
  }

  const handleSaveEdit = (updatedLeave: Leave) => {
    // TODO: Implement save functionality
    console.log('Save updated leave:', updatedLeave)
  }

  const handleConfirmDelete = (leaveId: string) => {
    // TODO: Implement delete functionality
    console.log('Delete leave:', leaveId)
  }

  return (
    <>
      {view === 'list' ? (
        <LeaveList
          leaves={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      ) : (
        <LeaveCalendar data={data} />
      )}

      {selectedLeave && (
        <>
          <EditLeaveModal
            isOpen={editModalOpen}
            onClose={() => setEditModalOpen(false)}
            leave={selectedLeave}
            onSave={handleSaveEdit}
          />
          <DeleteLeaveModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            leave={selectedLeave}
            onConfirm={handleConfirmDelete}
          />
        </>
      )}
    </>
  )
} 