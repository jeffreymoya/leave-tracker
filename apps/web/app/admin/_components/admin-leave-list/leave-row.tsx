import { XMarkIcon, DocumentIcon } from '@heroicons/react/24/outline'
import type { Leave } from '@/types/leaves'
import { handleDownload } from './admin-leave-list.utils'

interface LeaveRowProps {
  leave: Leave
  isSelected: boolean
  isExpanded: boolean
  onSelect: (e: React.MouseEvent | React.ChangeEvent<HTMLInputElement>) => void
  onClick: () => void
}

export function LeaveRow({ leave, isSelected, isExpanded, onSelect, onClick }: LeaveRowProps) {
  return (
    <tr 
      className={`${isSelected ? 'bg-gray-50' : 'hover:bg-gray-50'} cursor-pointer transition-colors`}
      onClick={onClick}
    >
      <td className="relative px-7 sm:w-12 sm:px-6" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          className="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          checked={isSelected}
          onChange={onSelect}
        />
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{leave.type}</td>
      <td className="whitespace-nowrap px-3 py-4 text-sm">
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
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {new Date(leave.startDate).toLocaleDateString()}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
        {new Date(leave.endDate).toLocaleDateString()}
      </td>
      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{leave.userId}</td>
      <td className="px-3 py-4 text-sm text-gray-500 max-w-xs truncate">{leave.reason}</td>
      <td className="px-3 py-4 text-sm text-gray-500">
        {!leave.attachments?.length ? (
          <XMarkIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
        ) : (
          <div className="flex items-center gap-2 overflow-x-auto">
            {leave.attachments.map(attachment => (
              <button
                key={attachment.id}
                onClick={(e) => {
                  e.stopPropagation()
                  handleDownload(attachment)
                }}
                className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20 hover:bg-blue-100 transition-colors whitespace-nowrap"
              >
                <DocumentIcon className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
                {attachment.name}
              </button>
            ))}
          </div>
        )}
      </td>
    </tr>
  )
} 