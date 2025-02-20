'use client'

import { useState } from 'react'
import type { Leave } from '@/types/leaves'
import { LeaveListLayout } from './admin-leave-list/leave-list-layout'
import { sortLeaves } from './admin-leave-list/admin-leave-list.utils'
import type { ConfirmDialogConfig } from './admin-leave-list/admin-leave-list.utils'

interface AdminLeaveListProps {
  data: Leave[]
}

export function AdminLeaveList({ data }: AdminLeaveListProps) {
  const [selectedLeaves, setSelectedLeaves] = useState<Set<string>>(new Set())
  const [sortColumn, setSortColumn] = useState<keyof Leave>('startDate')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
  const [expandedRow, setExpandedRow] = useState<string | null>(null)
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogConfig | null>(null)

  const handleSelectAll = () => {
    if (selectedLeaves.size === data.length) {
      setSelectedLeaves(new Set())
    } else {
      setSelectedLeaves(new Set(data.map(leave => leave.id)))
    }
  }

  const handleSelectLeave = (e: React.MouseEvent | React.ChangeEvent<HTMLInputElement>, leaveId: string) => {
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

  const sortedData = sortLeaves(data, sortColumn, sortDirection)

  return (
    <LeaveListLayout
      data={sortedData}
      sortColumn={sortColumn}
      sortDirection={sortDirection}
      selectedLeaves={selectedLeaves}
      expandedRow={expandedRow}
      confirmDialog={confirmDialog}
      onSelectAll={handleSelectAll}
      onSelectLeave={handleSelectLeave}
      onRowClick={handleRowClick}
      onSort={handleSort}
      onApprove={handleApprove}
      onReject={handleReject}
      onMarkAsDeduction={handleMarkAsDeduction}
      onCloseConfirmDialog={() => setConfirmDialog(null)}
    />
  )
} 