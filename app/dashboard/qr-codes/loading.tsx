import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function QRCodeDashboardLoading() {
  return (
    <div className="animate-pulse space-y-4 px-6 py-4">
      {/* Header skeleton */}
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <div className="h-8 w-40 bg-muted rounded"></div>
          <div className="h-6 w-80 bg-muted rounded"></div>
        </div>
        <div className="h-10 w-32 bg-muted rounded"></div>
      </div>

      <Card className="p-6">
        {/* Search bar + Filter */}
        <div className="flex items-center justify-between gap-4">
          <div className="search flex gap-2">
            <div className="h-10 w-80 bg-muted rounded" />
            <div className="h-10 w-10 bg-muted rounded" />
          </div>
          <div className="h-10 w-20 bg-muted rounded" />
        </div>

        {/* Table headers */}
        <div className="flex justify-between mt-4 px-2 text-sm text-muted border-b pb-4">
          <div className="h-5 w-16 bg-muted rounded"></div>
          <div className="h-5 w-32 bg-muted rounded"></div>
          <div className="h-5 w-24 bg-muted rounded"></div>
          <div className="h-5 w-20 bg-muted rounded"></div>
          <div className="h-5 w-20 bg-muted rounded"></div>
          <div className="h-5 w-16 bg-muted rounded"></div>
          <div className="h-5 w-8 bg-muted rounded"></div>
        </div>

        {/* Table rows */}
        {Array.from({ length: 7 }).map((_, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between px-4 py-8 border border-muted"
          >
            <div className="h-6 w-6 bg-muted rounded" />
            <div className="h-5 w-32 bg-muted rounded" />
            <div className="h-5 w-48 bg-muted rounded" />
            <div className="h-5 w-12 bg-muted rounded" />
            <div className="h-5 w-24 bg-muted rounded" />
            <div className="h-5 w-24 bg-muted rounded" />
            <div className="h-5 w-5 bg-muted rounded" />
          </div>
        ))}
      </Card>

    </div>
  );
}
