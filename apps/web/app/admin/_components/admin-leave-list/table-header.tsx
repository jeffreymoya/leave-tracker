import { ChevronUpDownIcon } from '@heroicons/react/20/solid'

import type { Leave } from '@/types/leaves'

interface TableHeaderProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onSort: (column: keyof Leave) => void
}

export function TableHeader({ selectedCount, totalCount, onSelectAll, onSort }: TableHeaderProps) {
  return (
    <div className="flex items-center bg-gray-50 px-4 py-3 text-sm font-medium text-gray-900 rounded-t-lg">
      <div className="flex items-center w-12 pr-2">
        <input
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          checked={selectedCount === totalCount && totalCount > 0}
          onChange={onSelectAll}
        />
      </div>
      
      <div className="flex-1 grid grid-cols-7 gap-4 items-center">
        <button
          onClick={() => onSort('type')}
          className="flex items-center gap-1 hover:text-primary"
        >
          Type
          <ChevronUpDownIcon className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => onSort('status')}
          className="flex items-center gap-1 hover:text-primary"
        >
          Status
          <ChevronUpDownIcon className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => onSort('startDate')}
          className="flex items-center gap-1 hover:text-primary"
        >
          Start Date
          <ChevronUpDownIcon className="h-4 w-4" />
        </button>
        
        <button
          onClick={() => onSort('endDate')}
          className="flex items-center gap-1 hover:text-primary"
        >
          End Date
          <ChevronUpDownIcon className="h-4 w-4" />
        </button>
        
        <span className="hover:text-primary">Employee</span>
        <span className="hover:text-primary">Reason</span>
        <span className="hover:text-primary">Documents</span>
      </div>
    </div>
  )
} 