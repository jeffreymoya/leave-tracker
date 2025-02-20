import type { Leave } from '@/types/leaves'

export interface ConfirmDialogConfig {
  isOpen: boolean
  title: string
  description: string
  confirmText: string
  onConfirm: () => void
  confirmButtonClassName?: string
}

export function sortLeaves(data: Leave[], sortColumn: keyof Leave, sortDirection: 'asc' | 'desc'): Leave[] {
  return [...data].sort((a, b) => {
    const aValue = a[sortColumn] || ''
    const bValue = b[sortColumn] || ''
    const direction = sortDirection === 'asc' ? 1 : -1

    if (aValue < bValue) return -1 * direction
    if (aValue > bValue) return 1 * direction
    return 0
  })
}

export function handleDownload(attachment: { id: string; type: 'document' | 'image'; name: string }) {
  // Mock download functionality
  const mockFileUrl = `https://mock-server.com/files/${attachment.id}/${attachment.name}`
  
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