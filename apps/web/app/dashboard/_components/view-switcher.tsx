'use client'

interface ViewSwitcherProps {
  view: 'list' | 'calendar'
  onViewChange: (view: 'list' | 'calendar') => void
}

export function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps) {
  return (
    <div>
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8" aria-label="View">
          <button
            onClick={() => onViewChange('list')}
            className={`${
              view === 'list'
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Card View
          </button>
          <button
            onClick={() => onViewChange('calendar')}
            className={`${
              view === 'calendar'
                ? 'border-[var(--accent)] text-[var(--accent)]'
                : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
            } whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium`}
          >
            Calendar View
          </button>
        </nav>
      </div>
    </div>
  )
} 