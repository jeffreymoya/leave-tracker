'use client'

export function Filters() {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex gap-2">
        <button 
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50"
        >
          List
        </button>
        <button
          className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50"
        >
          Calendar
        </button>
      </div>
    </div>
  )
}
