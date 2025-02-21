import type { LeaveType } from '@/types/leaves'

export function LeaveTypeSelector({
  options,
  selected,
  onSelect
}: {
  options: LeaveType[]
  selected: LeaveType
  onSelect: (type: LeaveType) => void
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Leave Type
      </label>
      <div className="inline-flex rounded-md shadow-sm" role="group">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onSelect(option)}
            className={`px-4 py-2 text-sm font-medium border ${
              selected === option 
                ? 'bg-[var(--accent)] text-white border-[var(--accent)]'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            } ${option === 'Sick' ? 'rounded-l-lg' : ''} ${
              option === 'Emergency' ? 'rounded-r-lg' : 'border-r-0'
            } focus:z-10 focus:ring-1 focus:ring-[var(--accent)]`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  )
} 