import { CalendarDaysIcon, UserIcon, DocumentTextIcon } from '@heroicons/react/24/outline'

interface LeaveCardContentProps {
  startDate: string
  endDate: string
  userId: string
  reason?: string
}

export function LeaveCardContent({ startDate, endDate, userId, reason }: LeaveCardContentProps) {
  return (
    <div className="px-4 py-1.5 sm:px-6">
      <div className="space-y-1.5">
        <div className="flex items-start gap-2">
          <CalendarDaysIcon className="h-4 w-4 text-[var(--text-secondary)] flex-shrink-0" aria-hidden="true" />
          <p className="text-sm font-medium text-[var(--text-primary)]">
            {new Date(startDate).toLocaleDateString()} to{' '}
            {new Date(endDate).toLocaleDateString()}
          </p>
        </div>
        
        <div className="flex items-start gap-2">
          <UserIcon className="h-4 w-4 text-[var(--text-secondary)] mt-0.5 flex-shrink-0" aria-hidden="true" />
          <p className="text-sm text-[var(--text-primary)] line-clamp-2">
            Supervisor: {userId}
          </p>
        </div>
        
        {reason && (
          <div className="flex items-start gap-2">
            <DocumentTextIcon className="h-4 w-4 text-[var(--text-secondary)] mt-0.5 flex-shrink-0" aria-hidden="true" />
            <p className="text-sm text-[var(--text-primary)] line-clamp-2">
              {reason}
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 