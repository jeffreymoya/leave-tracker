'use client'

interface ViewSwitcherProps {
  view: 'list' | 'calendar'
  onViewChange: (view: 'list' | 'calendar') => void
}

export function ViewSwitcher({ view, onViewChange }: ViewSwitcherProps) {
  return (
    <div className="flex gap-2">
      <button
        className={`px-4 py-2 text-sm font-medium rounded-lg
          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
          ${
            view === 'list'
              ? 'bg-[var(--accent)] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        onClick={() => onViewChange('list')}
      >
        Card View
      </button>
      <button
        className={`px-4 py-2 text-sm font-medium rounded-lg
          transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2
          ${
            view === 'calendar'
              ? 'bg-[var(--accent)] text-white'
              : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
          }`}
        onClick={() => onViewChange('calendar')}
      >
        Calendar View
      </button>
    </div>
  )
} 