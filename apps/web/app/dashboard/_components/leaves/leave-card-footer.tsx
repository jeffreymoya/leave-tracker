import { DocumentIcon, PaperClipIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import type { Leave } from '@/types/leaves'
import { handleDownload } from './leave-list.utils'

interface LeaveCardFooterProps {
  attachments?: Leave['attachments']
  onEdit: () => void
  onDelete: () => void
}

export function LeaveCardFooter({ attachments, onEdit, onDelete }: LeaveCardFooterProps) {
  const renderAttachments = () => {
    if (!attachments || attachments.length === 0) {
      return <div className="w-7" /> // Spacer for consistent layout
    }

    return attachments.map(attachment => (
      <button
        key={attachment.id}
        className="group relative inline-flex items-center gap-1 hover:z-10"
        onClick={() => handleDownload(attachment)}
        title={attachment.name}
      >
        {attachment.type === 'document' ? (
          <DocumentIcon className="h-7 w-7 rounded-lg border-2 border-white bg-gray-50 p-1 text-gray-600 shadow-sm transition-all group-hover:scale-110" />
        ) : (
          <PaperClipIcon className="h-7 w-7 rounded-lg border-2 border-white bg-gray-50 p-1 text-gray-600 shadow-sm transition-all group-hover:scale-110" />
        )}
      </button>
    ))
  }

  return (
    <div className="mt-2 pt-1.5 border-t border-gray-100 flex items-center justify-between">
      <div className="flex -space-x-2">
        {renderAttachments()}
      </div>
      <div className="flex gap-2">
        <button
          className="rounded-full p-1 text-gray-500 hover:bg-blue-50 hover:text-blue-600 transition-all"
          onClick={onEdit}
          aria-label="Edit leave request"
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>
        <button
          className="rounded-full p-1 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-all"
          onClick={onDelete}
          aria-label="Delete leave request"
        >
          <TrashIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
} 