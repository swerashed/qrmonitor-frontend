import { BarChart3, Filter, Globe, Laptop, Smartphone, Tablet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityChart } from "@/components/charts/activity-chart"
import { DeviceBreakdownChart } from "@/components/charts/device-breakdown-chart"
import { LocationMapChart } from "@/components/charts/location-map-chart"
import { TopQrCodesChart } from "@/components/charts/top-qr-codes-chart"
import { BrowserChart } from "@/components/charts/browser-chart"
import { getDashboardAnalytics } from "@/services/QRCodeServices"
import { getDeviceIcon } from "@/hooks/getDeviceIcon"

export default async function AnalyticsPage() {
  const analyticsDataRow = await getDashboardAnalytics()
  const data = analyticsDataRow?.data

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive analytics for all your QR codes</p>
        </div>
        <div className="hidden flex-col gap-2 sm:flex-row sm:items-center">

          <Select>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All QR Codes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All QR Codes</SelectItem>
              <SelectItem value="product">Product Landing Page</SelectItem>
              <SelectItem value="event">Event Registration</SelectItem>
              <SelectItem value="promo">Promotional Offer</SelectItem>
              <SelectItem value="contact">Contact Information</SelectItem>
              <SelectItem value="menu">Digital Menu</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
        </div>
      </div>
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="devices">Devices</TabsTrigger>
          <TabsTrigger value="locations">Locations</TabsTrigger>
          <TabsTrigger value="qrcodes">QR Codes</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.totalScans?.count}</div>
                <p className="text-xs text-muted-foreground">{`${data?.totalScans?.diffPercentage}% from last month`}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                <Smartphone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.uniqueVisitors?.count}</div>
                <p className="text-xs text-muted-foreground">{`${data?.uniqueVisitors?.diffPercentage}% from last month`}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Last 24 Hours</CardTitle>
                <Smartphone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{data?.last24HrScans?.count}</div>
                <p className="text-xs text-muted-foreground">{`${data?.last24HrScans?.diffPercentage}% of total scans`}</p>
              </CardContent>
            </Card>

          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <ActivityChart data={data?.scanActivity} />
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
                <CardDescription>Countries with the most scans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Array.isArray(data?.topCountries) && data.topCountries.length > 0 ? (
                    data.topCountries.map((item: any) => (
                      <div key={item.country} className="flex items-center">
                        <div className="w-full space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.country}</span>
                            <span className="text-sm text-muted-foreground">{item.count} scans</span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="h-full min-h-40 w-full flex items-center justify-center text-sm text-muted-foreground">
                      No country data available
                    </div>
                  )}
                </div>

              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="devices" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Device Breakdown</CardTitle>
                <CardDescription>Distribution of scans by device type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <DeviceBreakdownChart data={data?.scanByDevice} />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Device Stats</CardTitle>
                <CardDescription>Detailed breakdown by device</CardDescription>
              </CardHeader>
              <CardContent>
                {Array.isArray(data?.scanByDevice) && data.scanByDevice.length > 0 ? (
                  <div className="space-y-4">
                    {data.scanByDevice.map((item: any) => (
                      <div key={item.device} className="flex items-center">
                        <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          {getDeviceIcon(item.device)}
                        </div>
                        <div className="w-full space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.device}</span>
                            <span className="text-sm text-muted-foreground">
                              {item.count} scans ({item.percentage}%)
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[150px] w-full flex items-center justify-center text-sm text-muted-foreground">
                    No device data available
                  </div>
                )}
              </CardContent>

            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Browser Distribution</CardTitle>
              <CardDescription>Breakdown of scans by browser</CardDescription>
            </CardHeader>
            <CardContent>
              {Array.isArray(data?.browserDistribution) && data.browserDistribution.length > 0 ? (
                <BrowserChart data={data.browserDistribution} />
              ) : (
                <div className="h-[200px] w-full flex items-center justify-center text-sm text-muted-foreground">
                  No browser data available
                </div>
              )}
            </CardContent>

          </Card>
        </TabsContent>
        <TabsContent value="locations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Global Scan Map</CardTitle>
              <CardDescription>Geographic distribution of QR code scans</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="h-[400px] w-full max-w-3xl">
                <LocationMapChart data={data?.scanByLocation} />
              </div>
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Top Countries</CardTitle>
                <CardDescription>Countries with the most scans</CardDescription>
              </CardHeader>
              <CardContent>
                {Array.isArray(data?.topCountries) && data.topCountries.length > 0 ? (
                  <div className="space-y-4">
                    {data.topCountries.map((item: any) => (
                      <div key={item.country} className="flex items-center">
                        <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <div className="w-full space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.country}</span>
                            <span className="text-sm text-muted-foreground">
                              {item.count} scans ({item.percentage}%)
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[150px] w-full flex items-center justify-center text-sm text-muted-foreground">
                    No country data available
                  </div>
                )}
              </CardContent>

            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Cities</CardTitle>
                <CardDescription>Cities with the most scans</CardDescription>
              </CardHeader>
              <CardContent>
                {Array.isArray(data?.topCities) && data.topCities.length > 0 ? (
                  <div className="space-y-4">
                    {data.topCities.map((item: any) => (
                      <div key={item.city} className="flex items-center">
                        <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <Globe className="h-4 w-4 text-primary" />
                        </div>
                        <div className="w-full space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.city}</span>
                            <span className="text-sm text-muted-foreground">
                              {item.count} scans ({item.percentage}%)
                            </span>
                          </div>
                          <div className="h-2 w-full rounded-full bg-muted">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-[150px] w-full flex items-center justify-center text-sm text-muted-foreground">
                    No city data available
                  </div>
                )}
              </CardContent>

            </Card>
          </div>
        </TabsContent>
        <TabsContent value="qrcodes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing QR Codes</CardTitle>
              <CardDescription>QR codes with the most scans</CardDescription>
            </CardHeader>
            <CardContent>
              {Array.isArray(data?.topQRCodes) && data.topQRCodes.length > 0 ? (
                <TopQrCodesChart data={data.topQRCodes} />
              ) : (
                <div className="h-[200px] w-full flex items-center justify-center text-sm text-muted-foreground">
                  No QR code data available
                </div>
              )}
            </CardContent>

          </Card>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {data?.topQRCodes?.map((qr: any, index: any) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{qr.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{qr.totalScans.toLocaleString()}</div>
                  <div className="mt-4 h-1 w-full rounded-full bg-muted">
                    <div className="h-1 rounded-full bg-primary" style={{ width: `${(qr.totalScans / 423) * 100}%` }}></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
