import { Skeleton } from "@/components/ui/skeleton"
import React from "react"

const AnalyticsPageLoading = () => {
  return (
    <div className="animate-pulse space-y-6 px-6 py-4">
      {/* Heading */}
      <div className="space-y-2">
        <Skeleton className="h-6 w-48 rounded" />
        <Skeleton className="h-4 w-80 rounded" />
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24 rounded" />
        ))}
      </div>

      {/* Top cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-40 rounded" />
        ))}
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left chart */}
        <Skeleton className="h-96 rounded" />
        {/* Right card */}
        <Skeleton className="h-96 rounded" />
      </div>
    </div>
  )
}

export default AnalyticsPageLoading
