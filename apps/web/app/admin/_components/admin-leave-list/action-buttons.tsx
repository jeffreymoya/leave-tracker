import { CheckIcon, XMarkIcon, ArchiveBoxIcon } from '@heroicons/react/20/solid'

interface ActionButtonsProps {
  selectedCount: number
  onApprove: () => void
  onReject: () => void
}

export function ActionButtons({ selectedCount, onApprove, onReject }: ActionButtonsProps) {
  const buttonClassName = "btn btn-secondary"

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