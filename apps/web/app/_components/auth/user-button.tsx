'use client'

export function UserButton() {
  return (
    <button className="rounded-full w-8 h-8 bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
      <span className="sr-only">User menu</span>
      <svg 
        className="w-5 h-5" 
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
        />
      </svg>
    </button>
  )
} 