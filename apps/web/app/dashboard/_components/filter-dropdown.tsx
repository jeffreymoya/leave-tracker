'use client'

interface FilterDropdownProps {
  label: string
  value?: string
  options: string[]
  onChange: (value?: string) => void
}

export function FilterDropdown({ label, value, options, onChange }: FilterDropdownProps) {
  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="group inline-flex items-center justify-center text-sm font-medium text-gray-700 hover:text-gray-900"
          onClick={(e) => {
            const menu = document.getElementById(`${label.toLowerCase()}-menu`)
            menu?.classList.toggle('hidden')
          }}
        >
          <span>{label}</span>
          {value && (
            <span className="ml-1.5 text-sm text-gray-600">: {value}</span>
          )}
          <svg className="ml-2 h-5 w-5 flex-none text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
      <div id={`${label.toLowerCase()}-menu`} className="absolute left-0 z-10 mt-2 w-40 origin-top-left rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none hidden">
        <div className="py-1">
          <button
            onClick={() => {
              onChange(undefined)
              document.getElementById(`${label.toLowerCase()}-menu`)?.classList.add('hidden')
            }}
            className={`block px-4 py-2 text-sm w-full text-left ${!value ? 'font-medium text-gray-900' : 'text-gray-500'}`}
          >
            All {label}s
          </button>
          {options.map((option) => (
            <button
              key={option}
              onClick={() => {
                onChange(option)
                document.getElementById(`${label.toLowerCase()}-menu`)?.classList.add('hidden')
              }}
              className={`block px-4 py-2 text-sm w-full text-left ${value === option ? 'font-medium text-gray-900' : 'text-gray-500'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
} 