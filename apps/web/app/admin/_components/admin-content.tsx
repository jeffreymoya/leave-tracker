'use client'

import { LeaveList } from '@/app/dashboard/_components/leaves/list'
import { LoadingSkeleton } from '@/app/dashboard/_components/loading-skeleton'
import type { Leave } from '@/types/leaves'

interface AdminContentProps {
  isLoading: boolean
  data: Leave[]
}

export function AdminContent({ isLoading, data }: AdminContentProps) {
  if (isLoading) {
    return <LoadingSkeleton />
  }

  return <LeaveList data={data} />
} 