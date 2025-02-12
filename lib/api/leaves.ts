import type { Leave } from '../../types/leaves'

const sampleAttachments = [
  [
    { id: 'att-1', type: 'document', name: 'medical-certificate.pdf' },
    { id: 'att-2', type: 'image', name: 'prescription.jpg' }
  ],
  [
    { id: 'att-3', type: 'document', name: 'flight-ticket.pdf' }
  ]
]

export async function getLeaves(): Promise<Leave[]> {
  return Array.from({ length: 5 }, (_, i) => ({
    id: `leave-${i + 1}`,
    startDate: '2024-03-20',
    endDate: '2024-03-25',
    type: 'Vacation' as const,
    status: 'Pending' as const,
    userId: 'user-1',
    reason: `Sample leave request ${i + 1}`,
    // Add attachments to some leaves
    attachments: i < 2 ? sampleAttachments[i] : undefined
  }))
} 