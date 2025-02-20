import { ChevronUpDownIcon } from '@heroicons/react/20/solid'
import type { Leave } from '@/types/leaves'

interface TableHeaderProps {
  selectedCount: number
  totalCount: number
  onSelectAll: () => void
  onSort: (column: keyof Leave) => void
}

export function TableHeader({ selectedCount, totalCount, onSelectAll, onSort }: TableHeaderProps) {
  const sortableHeader = (column: keyof Leave, label: string) => (
    <th
      scope="col"
      className="w-32 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
      onClick={() => onSort(column)}
    >
      <div className="group inline-flex">
        {label}
        <span className="ml-2 flex-none rounded text-gray-400 group-hover:visible group-focus:visible">
          <ChevronUpDownIcon className="h-5 w-5" aria-hidden="true" />
        </span>
      </div>
    </th>
  )

  return (
    <thead>
      <tr>
        <th scope="col" className="relative w-12 px-7 sm:w-12 sm:px-6">
          <input
            type="checkbox"
            className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
            checked={selectedCount === totalCount}
            onChange={onSelectAll}
          />
        </th>
        {sortableHeader('type', 'Type')}
        {sortableHeader('status', 'Status')}
        {sortableHeader('startDate', 'Start Date')}
        {sortableHeader('endDate', 'End Date')}
        <th scope="col" className="w-48 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Employee
        </th>
        <th scope="col" className="w-96 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Reason
        </th>
        <th scope="col" className="w-48 px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
          Supporting Documents
        </th>
      </tr>
    </thead>
  )
} 