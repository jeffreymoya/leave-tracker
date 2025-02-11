export type LeaveStatus = 'Pending' | 'Approved' | 'Rejected'
export type LeaveType = 'Vacation' | 'Sick' | 'Personal'

export interface Leave {
  id: string
  type: LeaveType
  status: LeaveStatus
  startDate: string
  endDate: string
}
