import { DocumentIcon, PaperClipIcon, PencilSquareIcon, XMarkIcon } from '@heroicons/react/24/outline'

import type { Leave } from '@/types/leaves'

import { handleDownload } from './leave-list.utils'

interface LeaveCardFooterProps {
  attachments?: Leave['attachments']
  onEdit: () => void
  onDelete: () => void
  status: Leave['status']
}

export function LeaveCardFooter({ attachments, onEdit, onDelete, status }: LeaveCardFooterProps) {
  const renderAttachments = () => {
    if (!attachments || attachments.length === 0) {
      return <div className="w-7" /> // Spacer for consistent layout
    }

    return attachments.map(attachment => (
      <button
        key={attachment.id}
        className="group relative flex items-center gap-1 hover:z-10"
        onClick={() => handleDownload(attachment)}
        title={attachment.name}
      >
        {attachment.type === 'document' ? (
          <div className="flex items-center bg-white rounded-full px-3 py-1.5 transition-all duration-200 
              hover:-translate-y-0.5 shadow-sm hover:shadow-md border border-gray-200 hover:border-blue-200">
            <DocumentIcon className="h-5 w-5 text-gray-600" />
            <span className="hidden md:inline ml-2 text-sm text-gray-600 font-medium">
              {attachment.name}
            </span>
          </div>
        ) : (
          <div className="h-8 w-8 rounded-lg bg-white shadow-sm hover:shadow-md border border-gray-200 
              p-1.5 transition-all duration-200 hover:-translate-y-0.5">
            <PaperClipIcon className="h-full w-full text-gray-600 hover:scale-110 transition-transform" />
          </div>
        )}
      </button>
    ))
  }

  return (
    <div className="mt-2 pt-1.5 flex items-center justify-between">
      <div className="flex gap-2">
        {renderAttachments()}
      </div>
      {status === 'Pending' && (
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-gray-600 hover:text-blue-600 
              bg-white shadow-sm hover:shadow-md border border-gray-200 hover:border-blue-200 
              transition-all duration-200 hover:-translate-y-0.5"
            onClick={onEdit}
            aria-label="Edit leave request"
          >
            <PencilSquareIcon className="h-5 w-5" />
            <span className="hidden md:inline text-sm font-medium">Edit</span>
          </button>
          <button
            className="flex items-center gap-1 rounded-full px-3 py-1.5 text-gray-600 hover:text-red-600 
              bg-white shadow-sm hover:shadow-md border border-gray-200 hover:border-red-200 
              transition-all duration-200 hover:-translate-y-0.5"
            onClick={onDelete}
            aria-label="Cancel leave request"
          >
            <XMarkIcon className="h-5 w-5" />
            <span className="hidden md:inline text-sm font-medium">Cancel</span>
          </button>
        </div>
      )}
    </div>
  )
} 