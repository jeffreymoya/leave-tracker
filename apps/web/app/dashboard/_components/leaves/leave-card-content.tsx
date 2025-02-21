import { CalendarDaysIcon, UserIcon, DocumentTextIcon, ClockIcon } from '@heroicons/react/24/outline'
import { formatDistanceToNow, differenceInDays } from 'date-fns'

interface LeaveCardContentProps {
  startDate: string
  endDate: string
  userId: string
  reason?: string
}

export function LeaveCardContent({ startDate, endDate, userId, reason }: LeaveCardContentProps) {
  const start = new Date(startDate)
  const end = new Date(endDate)
  const durationDays = differenceInDays(end, start) + 1 // +1 to include both start and end days

  return (
    <div className="px-4 py-2 sm:px-6">
      <div className="grid grid-cols-2 gap-2">
        {/* Left Column */}
        <div className="space-y-3">
          {/* Filed Date */}
          <div className="flex items-start gap-3">
            <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 p-1.5">
              <CalendarDaysIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                Filed {formatDistanceToNow(start, { addSuffix: true })}
              </p>
              <p className="text-xs text-gray-500">
                {start.toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-start gap-3">
            <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 p-1.5">
              <ClockIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-900">
                Duration of {durationDays} day{durationDays > 1 ? 's' : ''}
              </p>
              <p className="text-xs text-gray-500">
                {start.toLocaleDateString()} - {end.toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-3">
          {/* Supervisor Section */}
          <div className="flex items-start gap-3">
            <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 p-1.5">
              <UserIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Supervisor:</span> <span className="text-sm text-gray-900">{userId}</span>
            </p>
          </div>

          {/* Add empty spacer to match left column height when reason exists */}
          {reason && <div className="h-[15px]"/>}

          {/* Reason Section */}
          {reason && (
            <div className="flex items-start gap-3">
              <div className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-gray-100 p-1.5">
                <DocumentTextIcon className="h-4 w-4 text-gray-400" aria-hidden="true" />
              </div>
              <p className="text-sm text-gray-600">
                <span className="font-medium">Reason:</span> <span className="text-sm text-gray-900">{reason}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 