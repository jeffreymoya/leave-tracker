import { useQuery } from '@tanstack/react-query'

import type { Leave, LeaveType, LeaveStatus } from '@/types/leaves'

const leaveTypes: LeaveType[] = ['Vacation', 'Sick', 'Personal']
const leaveStatuses: LeaveStatus[] = ['Pending', 'Approved', 'Rejected']

const filipinoNames = [
  'Juan dela Cruz',
  'Maria Santos',
  'Jose Reyes',
  'Ana Gonzales',
  'Miguel Ramos',
  'Rosa Mendoza',
  'Pedro Garcia',
  'Carmen Cruz',
  'Antonio Torres',
  'Isabella Lopez'
]

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

export async function getLeaves(filters?: {
  type?: string
  status?: string
  team?: string
  department?: string
  hasDocuments?: boolean
  cutoff?: string
  dateRange?: { start?: string; end?: string }
  leaveBalance?: string
}): Promise<Leave[]> {
  const leaves = Array.from({ length: 15 }, (_, i) => {
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
      userId: filipinoNames[Math.floor(Math.random() * filipinoNames.length)],
      reason: sampleReasons[type][Math.floor(Math.random() * sampleReasons[type].length)],
      attachments: i < 2 ? sampleAttachments[i] : undefined,
      department: 'Engineering',
      team: 'Frontend',
      leaveBalance: {
        available: i < 3 ? 10 : 0,
        taken: 5,
        pending: 0
      },
      leaveDuration: 5
    }
  })

  if (filters?.leaveBalance) {
    return leaves.filter(leave => 
      filters.leaveBalance === 'sufficient' 
        ? leave.leaveBalance.available >= leave.leaveDuration 
        : leave.leaveBalance.available < leave.leaveDuration
    )
  }

  return leaves
}

export function useLeavesQuery() {
  return useQuery({
    queryKey: ['leaves'] as const,
    queryFn: () => getLeaves()
  })
}
