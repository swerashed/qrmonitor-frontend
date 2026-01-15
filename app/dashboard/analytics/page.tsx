import { BarChart3, Filter, Globe, Smartphone, ArrowUpRight, QrCode, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityChart } from "@/components/charts/activity-chart"
import { DeviceBreakdownChart } from "@/components/charts/device-breakdown-chart"
import { LocationMapChart } from "@/components/charts/location-map-chart"
import { TopQrCodesChart } from "@/components/charts/top-qr-codes-chart"
import { BrowserChart } from "@/components/charts/browser-chart"
import { getDashboardAnalytics, getAllQRCode } from "@/services/QRCodeServices"
import { getDeviceIcon } from "@/hooks/getDeviceIcon"
import Link from "next/link"
import { cn } from "@/lib/utils"

export default async function AnalyticsPage() {
  const [analyticsDataRow, allQrCodesRow] = await Promise.all([
    getDashboardAnalytics(),
    getAllQRCode()
  ])

  const data = analyticsDataRow?.data
  const qrCodes = allQrCodesRow?.data || []

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8 mx-auto w-full">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground text-sm">Comprehensive insights across all your active QR codes</p>
        </div>
        <div className="hidden flex-col gap-2 sm:flex-row sm:items-center">
          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All QR Codes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All QR Codes</SelectItem>
              {qrCodes.map((qr: any) => (
                <SelectItem key={qr.id} value={qr.id}>{qr.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="bg-muted/50 p-1 mb-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="qrcodes">QR Codes List</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-card border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data?.totalScans?.count?.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={data?.totalScans?.diffPercentage >= 0 ? "text-green-500" : "text-red-500"}>
                    {data?.totalScans?.diffPercentage >= 0 ? "+" : ""}{data?.totalScans?.diffPercentage}%
                  </span> from last month
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <Smartphone className="h-4 w-4 text-blue-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data?.uniqueVisitors?.count?.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  <span className={data?.uniqueVisitors?.diffPercentage >= 0 ? "text-green-500" : "text-red-500"}>
                    {data?.uniqueVisitors?.diffPercentage >= 0 ? "+" : ""}{data?.uniqueVisitors?.diffPercentage}%
                  </span> from last month
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last 24 Hours</CardTitle>
                <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-orange-500" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{data?.last24HrScans?.count?.toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  Ready to track new scans
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4 bg-card border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg">Scan Activity</CardTitle>
                <CardDescription>Scan activity over the last 30 days</CardDescription>
              </CardHeader>
              <CardContent className="pt-6 h-[350px]">
                <ActivityChart data={data?.scanActivity} />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3 bg-card border shadow-sm h-full">
              <CardHeader className="border-b pb-4">
                <CardTitle className="text-lg">Top Locations</CardTitle>
                <CardDescription>Most active countries</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="space-y-6">
                  {Array.isArray(data?.topCountries) && data.topCountries.length > 0 ? (
                    data.topCountries.map((item: any) => (
                      <div key={item.country} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold">{item.country}</span>
                          </div>
                          <span className="text-xs font-bold text-muted-foreground">{item.count} scans</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted/50 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-40 w-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                      <Globe className="h-8 w-8 opacity-20" />
                      <p className="text-sm">No location data yet</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="devices" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2 bg-card border shadow-sm">
              <CardHeader className="border-b pb-4">
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Platform distribution of your scanners</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="h-[350px] w-full">
                  <DeviceBreakdownChart data={data?.scanByDevice} />
                </div>
              </CardContent>
            </Card>
            <Card className="bg-card border shadow-sm">
              <CardHeader className="border-b pb-4">
                <CardTitle>Hardware Profile</CardTitle>
                <CardDescription>Detailed device metrics</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {Array.isArray(data?.scanByDevice) && data.scanByDevice.length > 0 ? (
                  <div className="space-y-6">
                    {data.scanByDevice.map((item: any) => (
                      <div key={item.device} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted/50">
                              {getDeviceIcon(item.device)}
                            </div>
                            <span className="font-semibold capitalize">{item.device}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-bold">{item.count}</div>
                            <div className="text-[10px] text-muted-foreground uppercase">{item.percentage}%</div>
                          </div>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted/50 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${item.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[150px] w-full flex items-center justify-center text-sm text-muted-foreground">
                    Hardware data unavailable
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <Card className="bg-card border shadow-sm">
            <CardHeader className="border-b pb-4">
              <CardTitle>Browser Usage</CardTitle>
              <CardDescription>Most popular web browsers used to scan</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 h-[350px]">
              {Array.isArray(data?.browserDistribution) && data.browserDistribution.length > 0 ? (
                <BrowserChart data={data.browserDistribution} />
              ) : (
                <div className="h-full w-full flex items-center justify-center text-sm text-muted-foreground">
                  Browser metrics pending scans
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="locations" className="space-y-6">
          <Card className="bg-card border shadow-sm overflow-hidden">
            <CardHeader className="border-b">
              <CardTitle>Global Distribution</CardTitle>
              <CardDescription>Real-time geographic density map</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="h-[450px] w-full">
                <LocationMapChart data={data?.scanByLocation} />
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card border shadow-sm">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Countries</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {Array.isArray(data?.topCountries) && data.topCountries.length > 0 ? (
                  <div className="space-y-6">
                    {data.topCountries.map((item: any) => (
                      <div key={item.country} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">{item.country}</span>
                          <span className="text-xs text-muted-foreground">{item.count} scans ({item.percentage}%)</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted/50 overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-10">No country data</p>
                )}
              </CardContent>
            </Card>
            <Card className="bg-card border shadow-sm">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Top Cities</CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                {Array.isArray(data?.topCities) && data.topCities.length > 0 ? (
                  <div className="space-y-6">
                    {data.topCities.map((item: any) => (
                      <div key={item.city} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold">{item.city}</span>
                          <span className="text-xs text-muted-foreground">{item.count} scans ({item.percentage}%)</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted/50 overflow-hidden">
                          <div className="h-full rounded-full bg-primary" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center text-muted-foreground py-10">No city data available</p>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="qrcodes" className="space-y-6">
          <div className="grid gap-6">
            <Card className="bg-card border shadow-sm overflow-hidden">
              <CardHeader className="bg-muted/30 border-b flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Performance Overview</CardTitle>
                  <CardDescription>Top performing links and campaigns</CardDescription>
                </div>
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-primary/10">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="pt-6 h-[400px]">
                {Array.isArray(data?.topQRCodes) && data.topQRCodes.length > 0 ? (
                  <TopQrCodesChart data={data.topQRCodes} />
                ) : (
                  <div className="h-full w-full flex flex-col items-center justify-center text-muted-foreground gap-2">
                    <QrCode className="h-8 w-8 opacity-20" />
                    <p>No activity recorded yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {qrCodes.length > 0 ? (
                qrCodes.map((qr: any) => (
                  <Card key={qr.id} className="group bg-card border shadow-sm hover:shadow-md transition-all overflow-hidden">
                    <CardHeader className="pb-3 border-b bg-muted/10">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm font-bold truncate leading-tight">{qr.name}</CardTitle>
                        <div className={cn(
                          "h-2 w-2 rounded-full",
                          qr.trackingEnabled ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : "bg-muted"
                        )} />
                      </div>
                      <CardDescription className="truncate text-[10px] mt-1">{qr.targetUrl}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <div className="flex items-baseline justify-between mb-4">
                        <div className="text-3xl font-extrabold text-primary">{qr.totalScans.toLocaleString()}</div>
                        <div className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Scans</div>
                      </div>
                      <Link href={`/dashboard/analytics/${qr.id}`} className="w-full">
                        <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all flex items-center justify-center gap-2">
                          View Analytics
                          <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <div className="col-span-full h-40 flex items-center justify-center text-muted-foreground">
                  No QR codes found.
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
