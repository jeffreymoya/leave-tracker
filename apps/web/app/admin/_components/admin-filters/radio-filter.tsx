import { XMarkIcon } from '@heroicons/react/24/outline'

import type { FilterState } from './admin-filters.utils'

interface RadioFilterProps {
  id: keyof FilterState
  name: string
  options: Array<{ value: string; label: string }>
  filters: FilterState
  onFilterChange: (key: keyof FilterState, value: string | boolean) => void
  onClearFilter: (key: keyof FilterState) => void
}

export function RadioFilter({ id, name, options, filters, onFilterChange, onClearFilter }: RadioFilterProps) {
  const value = filters[id]

  return (
    <div className="border-t border-gray-200 px-4 py-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-gray-900">{name}</h3>
        {value !== undefined && (
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600/20">
            Active
          </span>
        )}
      </div>
      <div className="mt-4 space-y-4">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              id={`${id}-${option.value}`}
              name={id}
              type="radio"
              checked={value === (id === 'hasDocuments' ? option.value === 'true' : option.value)}
              onChange={() => onFilterChange(id, id === 'hasDocuments' ? option.value === 'true' : option.value)}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600"
            />
            <label
              htmlFor={`${id}-${option.value}`}
              className="ml-3 text-sm text-gray-600 hover:text-gray-900"
            >
              {option.label}
            </label>
          </div>
        ))}
        {value !== undefined && (
          <button
            type="button"
            onClick={() => onClearFilter(id)}
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700"
          >
            <XMarkIcon className="h-4 w-4" />
            Clear selection
          </button>
        )}
      </div>
    </div>
  )
} 