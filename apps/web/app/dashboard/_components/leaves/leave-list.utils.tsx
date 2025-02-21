import { CalendarDaysIcon, ClockIcon, UserIcon } from '@heroicons/react/24/outline'

import type { Leave } from '@/types/leaves'

export function getLeaveTypeIcon(type: Leave['type']): JSX.Element | null {
  switch (type) {
    case 'Vacation':
      return <CalendarDaysIcon className="h-5 w-5 text-blue-500 flex-shrink-0" aria-hidden="true" />
    case 'Sick':
      return <ClockIcon className="h-5 w-5 text-red-500 flex-shrink-0" aria-hidden="true" />
    case 'Emergency':
      return <UserIcon className="h-5 w-5 text-purple-500 flex-shrink-0" aria-hidden="true" />
    default:
      return null
  }
}

export function handleDownload(attachment: { id: string; type: 'document' | 'image'; name: string }): void {
  // Mock download functionality
  const _mockFileUrl = `https://mock-server.com/files/${attachment.id}/${attachment.name}`
  
  // Create blob to simulate file download
  const mockContent = `Mock content for ${attachment.name}`
  const blob = new Blob([mockContent], { type: 'application/octet-stream' })
  const url = window.URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = attachment.name
  link.style.display = 'none'
  document.body.appendChild(link)
  link.click()
  
  // Cleanup
  document.body.removeChild(link)
  window.URL.revokeObjectURL(url)
} 