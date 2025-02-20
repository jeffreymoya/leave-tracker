'use client'

import { Fragment } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import type { Leave } from '@/types/leaves'

import { ActionButtons } from './action-buttons'
import { ConfirmDialog } from './confirm-dialog'
import { ExpandedRow } from './expanded-row'
import { LeaveRow } from './leave-row'
import { TableHeader } from './table-header'

import type { ConfirmDialogConfig } from './admin-leave-list.utils'

interface LeaveListLayoutProps {
  data: Leave[]
  _sortColumn: keyof Leave
  _sortDirection: 'asc' | 'desc'
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
  _sortColumn,
  _sortDirection,
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
            {/* Header */}
            <TableHeader
              selectedCount={selectedLeaves.size}
              totalCount={data.length}
              onSelectAll={onSelectAll}
              onSort={onSort}
            />

            {/* List Container */}
            <div className="bg-white shadow ring-1 ring-black ring-opacity-5 rounded-lg overflow-hidden">
              <AnimatePresence initial={false} mode="sync">
                {data.map((leave) => (
                  <Fragment key={leave.id}>
                    <LeaveRow
                      leave={leave}
                      isSelected={selectedLeaves.has(leave.id)}
                      _isExpanded={expandedRow === leave.id}
                      onSelect={(e) => onSelectLeave(e, leave.id)}
                      onClick={() => onRowClick(leave.id)}
                    />
                    
                    {expandedRow === leave.id && (
                      <motion.div
                        key={`expanded-${leave.id}`}
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{
                          opacity: 1,
                          scaleY: 1,
                          transition: { 
                            duration: 0.3,
                            ease: [0.16, 1, 0.3, 1] // Spring-like curve
                          }
                        }}
                        exit={{
                          opacity: 0,
                          scaleY: 0,
                          transition: {
                            duration: 0.2,
                            ease: "easeIn"
                          }
                        }}
                        style={{ originY: 0 }}
                      >
                        <ExpandedRow
                          leave={leave}
                          onApprove={() => onApprove([leave.id])}
                          onReject={() => onReject([leave.id])}
                          onMarkAsDeduction={() => onMarkAsDeduction(leave.id)}
                        />
                      </motion.div>
                    )}
                  </Fragment>
                ))}
              </AnimatePresence>
            </div>
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