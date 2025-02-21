export function DateQuickOptions({
  type,
  quickOptions,
  startDate,
  endDate,
  onSelect
}: {
  type: string
  quickOptions: Record<string, Array<{ label: string; duration: number }>>
  startDate: string
  endDate: string
  onSelect: (option: { label: string; duration: number }) => void
}) {
  const getDatesForOption = (option: { label: string; duration: number }) => {
    const today = new Date()
    let start = new Date()
    let end = new Date()

    if (type === 'Vacation') {
      if (option.label === 'Rest of week') {
        const dayOfWeek = today.getDay()
        const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 6
        end.setDate(today.getDate() + daysUntilFriday)
      } else {
        start.setDate(today.getDate() + (7 - today.getDay()))
        end.setDate(start.getDate() + 4)
      }
    } else {
      start.setDate(today.getDate() + option.duration)
      const additionalDays = option.label.includes('Days') 
        ? parseInt(option.label.split(' ')[0]) - 1
        : 0
      end.setDate(start.getDate() + additionalDays)
    }

    return {
      start: start.toISOString().split('T')[0],
      end: end.toISOString().split('T')[0]
    }
  }

  return (
    <div className="col-span-2 space-y-2">
      <div className="flex flex-wrap gap-2">
        {quickOptions[type].map((option) => {
          const dates = getDatesForOption(option)
          const isSelected = startDate === dates.start && endDate === dates.end
          
          return (
            <button
              key={option.label}
              type="button"
              onClick={() => onSelect(option)}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all
                ${
                  isSelected
                    ? 'bg-[var(--accent)] text-white ring-2 ring-[var(--accent)] ring-offset-2 shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                }`}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </div>
  )
} 