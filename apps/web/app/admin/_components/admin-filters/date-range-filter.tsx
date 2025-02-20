import { XMarkIcon } from '@heroicons/react/24/outline'

import { classNames } from './admin-filters.utils'

import type { FilterState } from './admin-filters.utils'

interface DateRangeFilterProps {
  filters: FilterState
  onFilterChange: (key: keyof FilterState, value: { start?: string; end?: string }) => void
  onClearFilter: (key: keyof FilterState) => void
}

export function DateRangeFilter({ filters, onFilterChange, onClearFilter }: DateRangeFilterProps) {
  return (
    <div className="px-4 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">Date Range</h3>
        {(filters.dateRange.start || filters.dateRange.end) && (
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
            Active
          </span>
        )}
      </div>
      <div className="mt-4 space-y-4">
        <div>
          <label htmlFor="start-date" className="block text-sm text-gray-600 mb-1">
            From
          </label>
          <input
            type="date"
            id="start-date"
            value={filters.dateRange.start || ''}
            max={filters.dateRange.end}
            onChange={(e) =>
              onFilterChange('dateRange', {
                ...filters.dateRange,
                start: e.target.value || undefined
              })
            }
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="end-date" className="block text-sm text-gray-600 mb-1">
            To
          </label>
          <input
            type="date"
            id="end-date"
            value={filters.dateRange.end || ''}
            min={filters.dateRange.start}
            onChange={(e) =>
              onFilterChange('dateRange', {
                ...filters.dateRange,
                end: e.target.value || undefined
              })
            }
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-600 focus:ring-blue-600 sm:text-sm"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              const end = new Date().toISOString().split('T')[0]
              const start = new Date(new Date().setMonth(new Date().getMonth() - 1))
                .toISOString()
                .split('T')[0]
              onFilterChange('dateRange', { start, end })
            }}
            className={classNames(
              "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset transition-colors",
              filters.dateRange.start === new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0] &&
              filters.dateRange.end === new Date().toISOString().split('T')[0]
                ? "bg-blue-100 text-blue-700 ring-blue-600/20"
                : "bg-gray-50 text-gray-600 ring-gray-500/10 hover:bg-gray-100"
            )}
          >
            Last Month
          </button>
          <button
            type="button"
            onClick={() => {
              const end = new Date().toISOString().split('T')[0]
              const start = new Date(new Date().setMonth(new Date().getMonth() - 3))
                .toISOString()
                .split('T')[0]
              onFilterChange('dateRange', { start, end })
            }}
            className={classNames(
              "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset transition-colors",
              filters.dateRange.start === new Date(new Date().setMonth(new Date().getMonth() - 3)).toISOString().split('T')[0] &&
              filters.dateRange.end === new Date().toISOString().split('T')[0]
                ? "bg-blue-100 text-blue-700 ring-blue-600/20"
                : "bg-gray-50 text-gray-600 ring-gray-500/10 hover:bg-gray-100"
            )}
          >
            Last 3 Months
          </button>
          <button
            type="button"
            onClick={() => {
              const end = new Date().toISOString().split('T')[0]
              const start = new Date(new Date().setMonth(new Date().getMonth() - 6))
                .toISOString()
                .split('T')[0]
              onFilterChange('dateRange', { start, end })
            }}
            className={classNames(
              "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset transition-colors",
              filters.dateRange.start === new Date(new Date().setMonth(new Date().getMonth() - 6)).toISOString().split('T')[0] &&
              filters.dateRange.end === new Date().toISOString().split('T')[0]
                ? "bg-blue-100 text-blue-700 ring-blue-600/20"
                : "bg-gray-50 text-gray-600 ring-gray-500/10 hover:bg-gray-100"
            )}
          >
            Last 6 Months
          </button>
        </div>
        {(filters.dateRange.start || filters.dateRange.end) && (
          <button
            type="button"
            onClick={() => onClearFilter('dateRange')}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <XMarkIcon className="h-4 w-4" />
            Clear dates
          </button>
        )}
      </div>
    </div>
  )
} 