'use client'

import { LoadingSkeleton } from '@/app/dashboard/_components/loading-skeleton'
import type { Leave } from '@/types/leaves'

import { AdminLeaveList } from './admin-leave-list'

interface AdminContentProps {
  isLoading: boolean
  data: Leave[]
}

export function AdminContent({ isLoading, data }: AdminContentProps) {
  if (isLoading) {
    return <LoadingSkeleton />
  }

  return <AdminLeaveList data={data} />
} 