'use client'

import { Fragment } from 'react'

import type { Leave } from '@/types/leaves'

import { ActionButtons } from './action-buttons'
import { ConfirmDialog } from './confirm-dialog'
import { ExpandedRow } from './expanded-row'
import { LeaveRow } from './leave-row'
import { TableHeader } from './table-header'

import type { ConfirmDialogConfig } from './admin-leave-list.utils'

interface LeaveListLayoutProps {
  data: Leave[]
  sortColumn: keyof Leave
  sortDirection: 'asc' | 'desc'
  selectedLeaves: Set<string>
  expandedRow: string | null
  confirmDialog: ConfirmDialogConfig | null
  onSelectAll: () => void
  onSelectLeave: (e: React.MouseEvent | React.ChangeEvent<HTMLInputElement>, leaveId: string) => void
  onRowClick: (leaveId: string) => void
  onSort: (column: keyof Leave) => void
  onApprove: (leaveIds: string[]) => void
  onReject: (leaveIds: string[]) => void
  onMarkAsDeduction: (leaveId: string) => void
  onCloseConfirmDialog: () => void
}

export function LeaveListLayout({
  data,
  sortColumn,
  sortDirection,
  selectedLeaves,
  expandedRow,
  confirmDialog,
  onSelectAll,
  onSelectLeave,
  onRowClick,
  onSort,
  onApprove,
  onReject,
  onMarkAsDeduction,
  onCloseConfirmDialog,
}: LeaveListLayoutProps) {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <ActionButtons
        selectedCount={selectedLeaves.size}
        onApprove={() => onApprove(Array.from(selectedLeaves))}
        onReject={() => onReject(Array.from(selectedLeaves))}
      />
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <TableHeader
                selectedCount={selectedLeaves.size}
                totalCount={data.length}
                onSelectAll={onSelectAll}
                onSort={onSort}
              />
              <tbody className="divide-y divide-gray-200">
                {data.map((leave) => (
                  <Fragment key={leave.id}>
                    <LeaveRow
                      leave={leave}
                      isSelected={selectedLeaves.has(leave.id)}
                      isExpanded={expandedRow === leave.id}
                      onSelect={(e) => onSelectLeave(e, leave.id)}
                      onClick={() => onRowClick(leave.id)}
                    />
                    {expandedRow === leave.id && (
                      <ExpandedRow
                        leave={leave}
                        onApprove={() => onApprove([leave.id])}
                        onReject={() => onReject([leave.id])}
                        onMarkAsDeduction={() => onMarkAsDeduction(leave.id)}
                      />
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
          onClose={onCloseConfirmDialog}
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