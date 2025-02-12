'use client'

import type { Leave } from '@/types/leaves'

export function LeaveList({ data }: { data: Leave[] }) {
  return (
    <div className="card hover:shadow-none">
      <ul role="list" className="divide-y divide-gray-200">
        {data.map(leave => (
          <li key={leave.id} className="py-4 first:pt-0 last:pb-0">
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0 flex-1">
                <h3 className="text-sm font-medium text-[var(--text-primary)] mb-1">
                  {leave.type}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] truncate">
                  {new Date(leave.startDate).toLocaleDateString()} to{' '}
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex-shrink-0">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${
                      leave.status === 'Approved'
                        ? 'bg-green-100 text-green-800'
                        : leave.status === 'Rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                    }`}
                >
                  {leave.status}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
