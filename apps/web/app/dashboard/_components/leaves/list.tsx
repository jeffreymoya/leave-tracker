'use client'

import type { Leave } from '@/types/leaves'
import { motion, AnimatePresence } from 'framer-motion'
import { LeaveCard } from './leave-card'

interface LeaveListProps {
  leaves: Leave[]
  onEdit: (leave: Leave) => void
  onDelete: (leave: Leave) => void
}

export function LeaveList({ leaves, onEdit, onDelete }: LeaveListProps) {
  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 gap-4"
      layout
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <AnimatePresence mode="popLayout">
        {leaves.map((leave) => (
          <motion.div
            key={leave.id}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
          >
            <LeaveCard
              leave={leave}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}
