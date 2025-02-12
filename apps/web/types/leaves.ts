export type LeaveType = 'Vacation' | 'Sick' | 'Personal'

export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected'

export interface Leave {
  id: string
  type: LeaveType
  status: LeaveStatus
  startDate: string
  endDate: string
  reason?: string
  userId: string
  department?: string
  team?: string
  leaveBalance?: {
    available: number
    taken: number
    pending: number
  }
  attachments?: {
    id: string
    type: 'document' | 'image'
    name: string
  }[]
}
