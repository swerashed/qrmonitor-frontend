"use client"

import { useState } from "react"
import { format } from "date-fns"
import { BarChart3, CalendarIcon, Filter, Globe, Laptop, Smartphone, Tablet } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityChart } from "@/components/charts/activity-chart"
import { DeviceBreakdownChart } from "@/components/charts/device-breakdown-chart"
import { LocationMapChart } from "@/components/charts/location-map-chart"
import { TopQrCodesChart } from "@/components/charts/top-qr-codes-chart"
import { BrowserChart } from "@/components/charts/browser-chart"

export default function AnalyticsPage() {
  const [date, setDate] = useState<Date>()

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Comprehensive analytics for all your QR codes</p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal sm:w-[240px]">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,284</div>
                <p className="text-xs text-muted-foreground">+12% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                <Smartphone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">892</div>
                <p className="text-xs text-muted-foreground">+5% from last month</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Mobile Scans</CardTitle>
                <Smartphone className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">745</div>
                <p className="text-xs text-muted-foreground">58% of total scans</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Desktop Scans</CardTitle>
                <Laptop className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">398</div>
                <p className="text-xs text-muted-foreground">31% of total scans</p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="lg:col-span-4">
              <CardHeader>
                <CardTitle>Scans Over Time</CardTitle>
                <CardDescription>Daily scan activity for the selected period</CardDescription>
              </CardHeader>
              <CardContent>
                <ActivityChart />
              </CardContent>
            </Card>
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Top Locations</CardTitle>
                <CardDescription>Countries with the most scans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { country: "United States", count: 487, percentage: 38 },
                    { country: "United Kingdom", count: 184, percentage: 14 },
                    { country: "Canada", count: 143, percentage: 11 },
                    { country: "Germany", count: 98, percentage: 8 },
                    { country: "France", count: 76, percentage: 6 },
                  ].map((item) => (
                    <div key={item.country} className="flex items-center">
                      <div className="w-full space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.country}</span>
                          <span className="text-sm text-muted-foreground">{item.count} scans</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
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
                  <DeviceBreakdownChart />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Device Stats</CardTitle>
                <CardDescription>Detailed breakdown by device</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { device: "Mobile", icon: Smartphone, count: 745, percentage: 58 },
                    { device: "Desktop", icon: Laptop, count: 398, percentage: 31 },
                    { device: "Tablet", icon: Tablet, count: 141, percentage: 11 },
                  ].map((item) => (
                    <div key={item.device} className="flex items-center">
                      <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                        <item.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div className="w-full space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{item.device}</span>
                          <span className="text-sm text-muted-foreground">
                            {item.count} scans ({item.percentage}%)
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Browser Distribution</CardTitle>
              <CardDescription>Breakdown of scans by browser</CardDescription>
            </CardHeader>
            <CardContent>
              <BrowserChart />
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
                <LocationMapChart />
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
                <div className="space-y-4">
                  {[
                    { country: "United States", count: 487, percentage: 38 },
                    { country: "United Kingdom", count: 184, percentage: 14 },
                    { country: "Canada", count: 143, percentage: 11 },
                    { country: "Germany", count: 98, percentage: 8 },
                    { country: "France", count: 76, percentage: 6 },
                    { country: "Australia", count: 65, percentage: 5 },
                    { country: "Japan", count: 54, percentage: 4 },
                    { country: "Other", count: 177, percentage: 14 },
                  ].map((item) => (
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
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Top Cities</CardTitle>
                <CardDescription>Cities with the most scans</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { city: "New York", count: 124, percentage: 10 },
                    { city: "London", count: 98, percentage: 8 },
                    { city: "Toronto", count: 76, percentage: 6 },
                    { city: "Berlin", count: 65, percentage: 5 },
                    { city: "Paris", count: 54, percentage: 4 },
                    { city: "Sydney", count: 43, percentage: 3 },
                    { city: "Tokyo", count: 38, percentage: 3 },
                    { city: "Other", count: 786, percentage: 61 },
                  ].map((item) => (
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
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${item.percentage}%` }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
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
              <TopQrCodesChart />
            </CardContent>
          </Card>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "Product Landing Page", scans: 423, growth: "+12%" },
              { name: "Event Registration", scans: 352, growth: "+8%" },
              { name: "Promotional Offer", scans: 289, growth: "+15%" },
              { name: "Contact Information", scans: 187, growth: "+5%" },
              { name: "Digital Menu", scans: 156, growth: "+3%" },
              { name: "Social Media Links", scans: 124, growth: "+7%" },
            ].map((qr, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">{qr.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{qr.scans.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">{qr.growth} from last month</p>
                  <div className="mt-4 h-1 w-full rounded-full bg-muted">
                    <div className="h-1 rounded-full bg-primary" style={{ width: `${(qr.scans / 423) * 100}%` }}></div>
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
