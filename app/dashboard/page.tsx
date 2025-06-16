import dynamic from "next/dynamic";
import { Suspense } from "react";
import { Activity, ArrowUpRight, Globe, Laptop, QrCode, Scan, Smartphone, Tablet, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardStats } from "@/components/dashboard-stats"
import { DeviceBreakdownChart } from "@/components/charts/device-breakdown-chart"
import { LocationMapChart } from "@/components/charts/location-map-chart"
import { getDashboardStats } from "@/services/QRCodeServices"
import { formatDate } from "date-fns"
import { cn } from "@/lib/utils"
import { ScansOverTimeChart } from "@/components/charts/scans-over-time-chart"
import Loading from "./loading";

export default async function DashboardPage() {
  const dashboardStatsData = await getDashboardStats()
  const dashboardData = dashboardStatsData.data

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "desktop":
        return <Laptop className="h-4 w-4" />;
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      default:
        return <Globe className="h-4 w-4" />;
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats
          title="Total QR Codes"
          value={dashboardData?.totalQRCodes?.count}
          description={dashboardData?.totalQRCodes?.diff > 1 ? `+${dashboardData?.totalQRCodes?.diff} from last week` : `-${dashboardData?.totalQRCodes?.diff} from last week`}
          icon={<QrCode className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardStats
          title="Total Scans"
          value={dashboardData?.totalScans?.count}
          description={`${dashboardData?.totalScans?.diffPercentage}% from last month`}
          icon={<Scan className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardStats
          title="Unique Visitors"
          value={dashboardData?.uniqueVisitors?.count}
          description={`${dashboardData?.uniqueVisitors?.diffPercentage}% from last month`}
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardStats
          title="Scans (Last 7 days)"
          value={dashboardData?.scansLast7Days?.count}
          description={`${dashboardData?.scansLast7Days?.diffPercentage}% from previous week`}
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <Card  className="h-full">
            <CardHeader>
              <CardTitle>Scan Activity</CardTitle>
              <CardDescription>Scan activity over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="h-full flex justify-center items-center">
              <ScansOverTimeChart data={dashboardData?.scanActivity} />
            </CardContent>
          </Card>
          {/* <Card className="h-full flex justify-center items-center">
            <CardContent>
            </CardContent>
          </Card> */}
          {/* <ActivityChart data={dashboardData?.scanActivity} /> */}
        </div>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest QR code scans</CardDescription>
          </CardHeader>
          <CardContent>
            <CardContent className="p-4">
              <div className="space-y-4">
                {dashboardData.recentScans?.map((scan: any, index: any) => (
                  <div key={index} className="flex items-center gap-4 rounded-md border p-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10">
                      {scan.device === "mobile" ? (
                        <Smartphone className="h-4 w-4 text-primary" />
                      ) : scan.device === "desktop" ? (
                        <Laptop className="h-4 w-4 text-primary" />
                      ) : (
                        <Tablet className="h-4 w-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium">{scan.location}</div>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(scan.timestamp, "MMM d, yyyy 'at' h:mm a")}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          "flex items-center rounded-full px-2 py-1 text-xs font-medium",
                          scan.device === "mobile"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : scan.device === "desktop"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300",
                        )}
                      >
                        {getDeviceIcon(scan.device)}
                        <span className="ml-1 capitalize">{scan.device}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Top QR Codes</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {
                dashboardData?.topQRCodes?.map((topQR: any, index: any) => (
                  <div key={index} className="flex items-center">
                    <div className="w-full space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{topQR?.name}</span>
                        <span className="text-sm text-muted-foreground">{topQR?.totalScans} scans</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-muted">
                        <div className="h-2 w-[80%] rounded-full bg-primary"></div>
                      </div>
                    </div>
                  </div>
                ))
              }
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Device Breakdown</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <DeviceBreakdownChart data={dashboardData?.scanByDevice} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scan Locations</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <LocationMapChart data={dashboardData?.scanByLocation} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
