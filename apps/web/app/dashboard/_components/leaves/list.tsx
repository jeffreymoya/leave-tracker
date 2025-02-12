'use client'

import type { Leave } from '@/types/leaves'

export function LeaveList({ data }: { data: Leave[] }) {
  return (
    <div className="bg-white rounded-lg border">
      <ul role="list" className="divide-y divide-gray-200">
        {data.map(leave => (
          <li key={leave.id} className="px-4 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">{leave.type}</p>
                <p className="text-sm text-gray-500">
                  {new Date(leave.startDate).toLocaleDateString()} to{' '}
                  {new Date(leave.endDate).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
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
          </li>
        ))}
      </ul>
    </div>
  )
}
