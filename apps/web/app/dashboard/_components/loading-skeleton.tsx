import { motion } from 'framer-motion'

export function LoadingSkeleton() {
  return (
    <div className="card">
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="animate-pulse space-y-4"
      >
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      </motion.div>
    </div>
  )
} 