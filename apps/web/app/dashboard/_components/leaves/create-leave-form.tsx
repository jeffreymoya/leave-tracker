'use client'

import { useState, useEffect } from 'react'
import type { LeaveType } from '@/types/leaves'
import { SupervisorCombobox } from './supervisor-combobox'
import { LeaveTypeSelector } from './leave-type-selector'
import { DateQuickOptions } from './date-quick-options'
import { DateRangeInputs } from './date-range-inputs'
import { FormFooter } from './form-footer'

const mockSupervisors = [
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

const leaveTypeOptions: LeaveType[] = ['Sick', 'Vacation', 'Emergency']
const QUICK_OPTIONS = {
  'Vacation': [
    { label: 'Rest of week', duration: 0 },
    { label: 'Next Week', duration: 0 }
  ],
  'Sick': [
    { label: 'Today', duration: 0 },
    { label: 'Tomorrow', duration: 1 },
    { label: '2 Days', duration: 1 },
    { label: '3 Days', duration: 2 }
  ],
  'Emergency': [
    { label: 'Today', duration: 0 },
    { label: 'Tomorrow', duration: 1 },
    { label: '2 Days', duration: 1 },
    { label: '3 Days', duration: 2 }
  ]
} as const

export function CreateLeaveForm({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState<LeaveType>('Vacation')
  const [startDate, setStartDate] = useState(() => new Date().toISOString().split('T')[0])
  const [endDate, setEndDate] = useState(() => {
    const date = new Date()
    date.setDate(date.getDate() + 3)
    return date.toISOString().split('T')[0]
  })
  const [reason, setReason] = useState('')
  const [_attachments, setAttachments] = useState<File[]>([])
  const [supervisor, setSupervisor] = useState('Miguel Ramos')

  const handleQuickDateSelect = (option: typeof QUICK_OPTIONS[LeaveType][number]) => {
    const today = new Date()
    let start = new Date()
    let end = new Date()

    if (type === 'Vacation') {
      if (option.label === 'Rest of week') {
        const dayOfWeek = today.getDay()
        const daysUntilFriday = dayOfWeek <= 5 ? 5 - dayOfWeek : 6
        end.setDate(today.getDate() + daysUntilFriday)
      } else {
        start.setDate(today.getDate() + (7 - today.getDay()))
        end.setDate(start.getDate() + 4)
      }
    } else {
      start.setDate(today.getDate() + option.duration)
      const additionalDays = option.label.includes('Days') 
        ? parseInt(option.label.split(' ')[0]) - 1
        : 0
      end.setDate(start.getDate() + additionalDays)
    }

    setStartDate(start.toISOString().split('T')[0])
    setEndDate(end.toISOString().split('T')[0])
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    onClose()
  }

  useEffect(() => {
    handleQuickDateSelect(QUICK_OPTIONS[type][0])
  }, [type])

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <LeaveTypeSelector 
        options={leaveTypeOptions} 
        selected={type} 
        onSelect={setType} 
      />

      <DateQuickOptions
        type={type}
        quickOptions={QUICK_OPTIONS}
        startDate={startDate}
        endDate={endDate}
        onSelect={handleQuickDateSelect}
      />

      <DateRangeInputs
        startDate={startDate}
        endDate={endDate}
        onStartChange={setStartDate}
        onEndChange={setEndDate}
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Reason
        </label>
        <textarea
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          rows={3}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-[var(--accent)] focus:ring-[var(--accent)]"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Attachments
        </label>
        <input
          type="file"
          multiple
          onChange={(e) => setAttachments(Array.from(e.target.files || []))}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-[var(--accent)] file:text-white hover:file:bg-[var(--accent-hover)]"
        />
      </div>

      <SupervisorCombobox
        supervisors={mockSupervisors}
        selected={supervisor}
        onSelect={setSupervisor}
      />

      <FormFooter onClose={onClose} />
    </form>
  )
} 