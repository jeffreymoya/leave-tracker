import { CheckIcon, XMarkIcon, ArchiveBoxIcon } from '@heroicons/react/20/solid'

interface ActionButtonsProps {
  selectedCount: number
  onApprove: () => void
  onReject: () => void
}

export function ActionButtons({ selectedCount, onApprove, onReject }: ActionButtonsProps) {
  const buttonClassName = `w-28 inline-flex items-center justify-center gap-1.5 rounded-md px-2.5 py-1.5 text-sm font-medium ring-1 ring-inset transition-colors ${
    selectedCount === 0
      ? 'bg-white text-gray-700 ring-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:ring-orange-100'
      : 'bg-gray-50 text-gray-700 ring-gray-200 hover:bg-orange-50 hover:text-orange-600 hover:ring-orange-100'
  } disabled:opacity-50 disabled:cursor-not-allowed`

  return (
    <div className="mb-6 flex gap-2">
      <button
        type="button"
        className={buttonClassName}
        disabled={selectedCount === 0}
        onClick={onApprove}
      >
        <CheckIcon className="h-3.5 w-3.5" />
        Approve
      </button>
      <button
        type="button"
        className={buttonClassName}
        disabled={selectedCount === 0}
        onClick={onReject}
      >
        <XMarkIcon className="h-3.5 w-3.5" />
        Reject
      </button>
      <button
        type="button"
        className={buttonClassName}
        disabled={selectedCount === 0}
      >
        <ArchiveBoxIcon className="h-3.5 w-3.5" />
        Archive
      </button>
    </div>
  )
} 