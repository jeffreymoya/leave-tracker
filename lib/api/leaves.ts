import type { Leave } from '@/types/leaves'

export async function getLeaves(): Promise<Leave[]> {
  return Array.from({ length: 5 }, (_, i) => ({
    id: `leave-${i + 1}`,
    startDate: '2024-03-20',
    endDate: '2024-03-25',
    type: 'Vacation' as const,
    status: 'Pending' as const,
    userId: 'user-1'
  }))
} 