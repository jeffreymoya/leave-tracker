import { useQuery } from '@tanstack/react-query'
import type { Leave } from '@/types/leaves'

export const getLeaves = async (): Promise<Leave[]> => {
  // Mock API call
  return Array.from({ length: 5 }, (_, i) => ({
    id: `${i}`,
    startDate: new Date(Date.now() + i * 86400000),
    endDate: new Date(Date.now() + (i + 1) * 86400000),
    type: ['Vacation', 'Sick', 'Personal'][i % 3],
    status: ['Pending', 'Approved', 'Rejected'][i % 3]
  }))
}

export const useLeavesQuery = () => useQuery({
  queryKey: ['leaves'],
  queryFn: getLeaves
})
