import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function SingleQRLoading() {
  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <Skeleton className="h-6 w-1/3" /> {/* Title */}
        <div className="flex gap-2">
          <Skeleton className="h-10 w-32" /> {/* Download Button */}
          <Skeleton className="h-10 w-20" /> {/* Delete Button */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* QR Code + Redirect URL Section */}
        <Card className="space-y-4 p-6">
          <Skeleton className="h-6 w-1/2" /> {/* Section Title */}
          <Skeleton className="h-48 w-48 mx-auto" /> {/* QR Image */}
          <Skeleton className="h-4 w-full" /> {/* Redirect Label */}
          <Skeleton className="h-10 w-full" /> {/* Redirect Input */}
          <div className="flex justify-between">

            <div className="flex flex-col w-1/2 gap-2">
              <Skeleton className="h-4 w-1/3" /> {/* Toggle text */}
              <Skeleton className="h-4 w-1/3" /> {/* Toggle text */}
            </div>
            <Skeleton className="h-6 w-12" /> {/* Toggle switch */}
          </div>
        </Card>

        {/* Analytics Overview + Charts */}
        <Card className="lg:col-span-2 space-y-6 p-6">
          <Skeleton className="h-10 w-80" /> {/* Title */}
          <Skeleton className="h-6 w-1/2" /> {/* Subtitle */}

          {/* Tabs  */}
          <div className="flex gap-3">

            <Skeleton className="h-8 w-20" /> {/*tab */}
            <Skeleton className="h-8 w-20" /> {/*tab */}
            <Skeleton className="h-8 w-20" /> {/*tab */}
            <Skeleton className="h-8 w-20" /> {/*tab */}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Skeleton className="h-40 w-full" /> {/* Total Scans */}
            <Skeleton className="h-40 w-full" /> {/* Unique Visitors */}
          </div>

          <Skeleton className="h-64 w-full" /> {/* Scans Over Time Chart */}
          <Skeleton className="h-64 w-full" /> {/* Time of Day Chart */}
        </Card>
      </div>
    </div>
  );
}
