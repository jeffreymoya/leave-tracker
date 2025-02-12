'use client'

interface ViewSwitcherProps {
  view: 'list' | 'calendar'
  onViewChange: (view: 'list' | 'calendar') => void
}

export function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps) {
  return (
    <nav className="-mb-px flex space-x-8" aria-label="View">
      <button
        onClick={() => onViewChange('list')}
        className={`${
          view === 'list'
            ? 'border-orange-500 text-orange-600'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        } whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium`}
      >
        List View
      </button>
      <button
        onClick={() => onViewChange('calendar')}
        className={`${
          view === 'calendar'
            ? 'border-orange-500 text-orange-600'
            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
        } whitespace-nowrap border-b-2 py-4 px-1 text-base font-medium`}
      >
        Calendar View
      </button>
    </nav>
  )
} 