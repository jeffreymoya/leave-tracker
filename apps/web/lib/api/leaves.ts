import { useQuery } from '@tanstack/react-query'

import type { Leave, LeaveType, LeaveStatus } from '@/types/leaves'

const leaveTypes: LeaveType[] = ['Vacation', 'Sick', 'Personal']
const leaveStatuses: LeaveStatus[] = ['Pending', 'Approved', 'Rejected']

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export async function getLeaves(): Promise<Leave[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return Array.from({ length: 15 }, (_, i) => {
    const startDate = generateRandomDate(new Date(), new Date(2024, 11, 31))
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 7) + 1)

    return {
      id: `leave-${i + 1}`,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      type: leaveTypes[Math.floor(Math.random() * leaveTypes.length)],
      status: leaveStatuses[Math.floor(Math.random() * leaveStatuses.length)],
      userId: 'user-1',
      reason: `Sample leave request ${i + 1}`
    }
  })
}

export function useLeavesQuery() {
  return useQuery({
    queryKey: ['leaves'],
    queryFn: getLeaves
  })
}
