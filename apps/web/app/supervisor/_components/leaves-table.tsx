import type { Leave } from '@/types/leaves'
import { CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { format, formatDistanceToNow } from 'date-fns'

interface LeavesTableProps {
  leaves: Leave[]
}

// Add this function before the component to get the type styles
const getLeaveTypeStyles = (type: string) => {
  switch (type) {
    case 'Vacation':
      return 'bg-blue-50 text-blue-700'
    case 'Sick':
      return 'bg-red-50 text-red-700'
    case 'Emergency':
      return 'bg-orange-50 text-orange-700'
    default:
      return 'bg-gray-50 text-gray-700'
  }
}

export function LeavesTable({ leaves }: LeavesTableProps) {
  return (
    <div className="mx-4 sm:mx-6 lg:mx-8">
      <div className="bg-white shadow ring-1 ring-black ring-opacity-5 rounded-lg overflow-hidden">
        <div className="grid grid-cols-12 gap-2 border-b border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-900">
          <div className="col-span-2">Employee</div>
          <div className="col-span-1">Type</div>
          <div className="col-span-2">Reason</div>
          <div className="col-span-2">Filed</div>
          <div className="col-span-2">Date Range</div>
          <div className="col-span-2">Docs</div>
          <div className="col-span-1">Actions</div>
        </div>

        <div className="divide-y divide-gray-200">
          {leaves.map((leave) => (
            <div key={leave.id} className="grid grid-cols-12 gap-2 items-center px-4 py-3 hover:bg-gray-50">
              <div className="col-span-2 text-sm text-gray-900">{leave.userId}</div>
              <div className={`col-span-1 text-xs font-medium px-2 py-1 rounded-full text-center ${getLeaveTypeStyles(leave.type)}`}>
                {leave.type}
              </div>
              <div className="col-span-2 text-xs text-gray-500 whitespace-normal">{leave.reason}</div>
              <div className="col-span-2 text-xs text-gray-500 whitespace-normal">
                {formatDistanceToNow(new Date(leave.createdAt), { addSuffix: true })}
              </div>
              <div className="col-span-2 text-xs text-gray-500">
                {format(new Date(leave.startDate), 'MMM d')} - {format(new Date(leave.endDate), 'MMM d')}
              </div>
              <div className="col-span-2 text-xs text-gray-500 flex flex-wrap gap-1">
                {leave.attachments?.length ? (
                  leave.attachments.map(attachment => (
                    <button
                      key={attachment.id}
                      onClick={() => console.log('Open attachment', attachment.id)}
                      title={attachment.name}
                      className="inline-flex items-center px-2 py-0.5 rounded-full bg-gray-100 hover:bg-gray-200 text-xs text-gray-600"
                    >
                      {attachment.type === 'document' ? '📄 ' : '🖼️ '}
                      {attachment.name.length > 12 ? `${attachment.name.slice(0, 12)}...` : attachment.name}
                    </button>
                  ))
                ) : (
                  <span className="text-gray-400">None</span>
                )}
              </div>
              <div className="col-span-1 flex gap-1 justify-center">
                <button
                  onClick={() => console.log('Approve', leave.id)}
                  title="Approve"
                  className="btn btn-secondary p-1.5 rounded-full inline-flex items-center justify-center"
                >
                  <CheckIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => console.log('Message', leave.id)}
                  title="Message"
                  className="btn btn-ghost p-1.5 rounded-full inline-flex items-center justify-center"
                >
                  <ChatBubbleLeftIcon className="h-4 w-4" />
                </button>
                <button
                  onClick={() => console.log('Reject', leave.id)}
                  title="Reject"
                  className="btn btn-ghost hover:btn-destructive p-1.5 rounded-full inline-flex items-center justify-center"
                >
                  <XMarkIcon className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 