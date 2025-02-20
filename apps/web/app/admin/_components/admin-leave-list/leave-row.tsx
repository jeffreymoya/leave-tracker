import { XMarkIcon, DocumentIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

import type { Leave } from '@/types/leaves'

import { handleDownload } from './admin-leave-list.utils'

interface LeaveRowProps {
  leave: Leave
  isSelected: boolean
  _isExpanded: boolean
  onSelect: (e: React.MouseEvent | React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
}

export function LeaveRow({ leave, isSelected, _isExpanded, onSelect, onClick }: LeaveRowProps) {
  return (
    <motion.div
      layout="position"
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 20,
        mass: 0.5
      }}
      className={`flex items-center px-4 py-3 border-b ${
        isSelected ? 'bg-gray-50' : 'hover:bg-gray-50'
      } cursor-pointer transition-colors`}
      onClick={onClick}
    >
      <div className="flex items-center w-12 pr-2 min-w-[48px]" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          checked={isSelected}
          onChange={onSelect}
        />
      </div>

      <div className="flex-1 grid grid-cols-7 gap-4 items-center">
        <div className="text-sm text-gray-500">{leave.type}</div>
        
        <div>
          <span
            className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
              leave.status === 'Approved'
                ? 'bg-green-100 text-green-800'
                : leave.status === 'Rejected'
                ? 'bg-red-100 text-red-800'
                : 'bg-yellow-100 text-yellow-800'
            }`}
          >
            {leave.status}
          </span>
        </div>
        
        <div className="text-sm text-gray-500">
          {new Date(leave.startDate).toLocaleDateString()}
        </div>
        
        <div className="text-sm text-gray-500">
          {new Date(leave.endDate).toLocaleDateString()}
        </div>
        
        <div className="text-sm text-gray-500">{leave.userId}</div>
        <div className="text-sm text-gray-500 truncate">{leave.reason}</div>
        
        <div className="text-sm text-gray-500">
          {!leave.attachments?.length ? (
            <XMarkIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
          ) : (
            <div className="flex items-center gap-2">
              {leave.attachments.map(attachment => (
                <button
                  key={attachment.id}
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDownload(attachment)
                  }}
                  className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 hover:bg-blue-100 transition-colors"
                >
                  <DocumentIcon className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                  {attachment.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
} 