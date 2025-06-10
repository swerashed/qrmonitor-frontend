import { Activity, ArrowUpRight, QrCode, Scan, Users } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DashboardStats } from "@/components/dashboard-stats"
import { RecentActivity } from "@/components/recent-activity"
import { ActivityChart } from "@/components/charts/activity-chart"
import { DeviceBreakdownChart } from "@/components/charts/device-breakdown-chart"
import { LocationMapChart } from "@/components/charts/location-map-chart"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <DashboardStats
          title="Total QR Codes"
          value="24"
          description="+2 from last week"
          icon={<QrCode className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardStats
          title="Total Scans"
          value="1,284"
          description="+12% from last month"
          icon={<Scan className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardStats
          title="Unique Visitors"
          value="892"
          description="+5% from last month"
          icon={<Users className="h-4 w-4 text-muted-foreground" />}
        />
        <DashboardStats
          title="Scans (Last 7 days)"
          value="324"
          description="+18% from previous week"
          icon={<Activity className="h-4 w-4 text-muted-foreground" />}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <ActivityChart />
        </div>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest QR code scans</CardDescription>
          </CardHeader>
          <CardContent>
            <RecentActivity />
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
              <div className="flex items-center">
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Product Landing Page</span>
                    <span className="text-sm text-muted-foreground">423 scans</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[80%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Event Registration</span>
                    <span className="text-sm text-muted-foreground">352 scans</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[65%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="w-full space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Promotional Offer</span>
                    <span className="text-sm text-muted-foreground">289 scans</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted">
                    <div className="h-2 w-[45%] rounded-full bg-primary"></div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Device Breakdown</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <DeviceBreakdownChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Scan Locations</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <LocationMapChart />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
