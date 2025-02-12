import { useQuery } from '@tanstack/react-query'

import type { Leave, LeaveType, LeaveStatus } from '@/types/leaves'

const leaveTypes: LeaveType[] = ['Vacation', 'Sick', 'Personal']
const leaveStatuses: LeaveStatus[] = ['Pending', 'Approved', 'Rejected']

const generateRandomDate = (start: Date, end: Date) => {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

const sampleAttachments: Array<Array<{ id: string; type: 'document' | 'image'; name: string }>> = [
  [
    { id: 'att-1', type: 'document', name: 'medical-certificate.pdf' },
    { id: 'att-2', type: 'image', name: 'prescription.jpg' }
  ],
  [
    { id: 'att-3', type: 'document', name: 'flight-ticket.pdf' }
  ]
]

const sampleReasons = {
  Vacation: [
    'Annual family trip',
    'Wedding celebration',
    'Beach holiday',
    'City break',
    'Visiting relatives'
  ],
  Sick: [
    'Flu symptoms',
    'Medical appointment',
    'Dental procedure',
    'Recovery from surgery',
    'Not feeling well'
  ],
  Personal: [
    'Moving house',
    'Family emergency',
    'Home repairs',
    'Important appointment',
    'Personal matters'
  ]
}

export async function getLeaves(): Promise<Leave[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  return Array.from({ length: 15 }, (_, i) => {
    const startDate = generateRandomDate(new Date(), new Date(2024, 11, 31))
    const endDate = new Date(startDate)
    endDate.setDate(startDate.getDate() + Math.floor(Math.random() * 7) + 1)

    const type = leaveTypes[Math.floor(Math.random() * leaveTypes.length)]

    return {
      id: `leave-${i + 1}`,
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0],
      type: type,
      status: leaveStatuses[Math.floor(Math.random() * leaveStatuses.length)],
      userId: 'user-1',
      reason: sampleReasons[type][Math.floor(Math.random() * sampleReasons[type].length)],
      attachments: i < 2 ? sampleAttachments[i] : undefined
    }
  })
}

export function useLeavesQuery() {
  return useQuery({
    queryKey: ['leaves'],
    queryFn: getLeaves
  })
}
