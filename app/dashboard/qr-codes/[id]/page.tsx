"use client"

import { useState } from "react"
import { format } from "date-fns"
import { ArrowLeft, Download, Edit2, Globe, Laptop, QrCode, Save, Smartphone, Tablet, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"
import { ScansOverTimeChart } from "@/components/charts/scans-over-time-chart"
import { DeviceBreakdownChart } from "@/components/charts/device-breakdown-chart"
import { LocationMapChart } from "@/components/charts/location-map-chart"
import { TimeOfDayChart } from "@/components/charts/time-of-day-chart"

// Sample QR code data
const qrCode = {
  id: "1",
  name: "Product Landing Page",
  url: "https://example.com/product",
  scans: 423,
  uniqueVisitors: 312,
  lastScanned: new Date(2023, 4, 15),
  createdAt: new Date(2023, 3, 10),
  trackingEnabled: true,
  scansByDevice: [
    { device: "Mobile", count: 245, percentage: 58 },
    { device: "Desktop", count: 132, percentage: 31 },
    { device: "Tablet", count: 46, percentage: 11 },
  ],
  scansByLocation: [
    { country: "United States", count: 187, percentage: 44 },
    { country: "United Kingdom", count: 76, percentage: 18 },
    { country: "Canada", count: 54, percentage: 13 },
    { country: "Germany", count: 42, percentage: 10 },
    { country: "Other", count: 64, percentage: 15 },
  ],
  recentScans: [
    {
      id: 1,
      location: "New York, USA",
      device: "mobile",
      timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    },
    {
      id: 2,
      location: "London, UK",
      device: "desktop",
      timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    },
    {
      id: 3,
      location: "Toronto, Canada",
      device: "mobile",
      timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    },
    {
      id: 4,
      location: "Berlin, Germany",
      device: "tablet",
      timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    },
    {
      id: 5,
      location: "Chicago, USA",
      device: "mobile",
      timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    },
  ],
}

export default function QrCodeDetailsPage({ params }: { params: { id: string } }) {
  const [isEditing, setIsEditing] = useState(false)
  const [url, setUrl] = useState(qrCode.url)
  const [trackingEnabled, setTrackingEnabled] = useState(qrCode.trackingEnabled)

  const handleSave = () => {
    // Here you would typically update the QR code in your backend
    // toast({
    //   title: "QR Code Updated",
    //   description: "Your changes have been saved successfully.",
    // })
    setIsEditing(false)
  }

  const handleDelete = () => {
    // Here you would typically delete the QR code from your backend
    // toast({
    //   title: "QR Code Deleted",
    //   description: "The QR code has been deleted successfully.",
    //   variant: "destructive",
    // })
    // Redirect to QR codes list
    window.location.href = "/qr-codes"
  }

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />
      case "desktop":
        return <Laptop className="h-4 w-4" />
      case "tablet":
        return <Tablet className="h-4 w-4" />
      default:
        return <Globe className="h-4 w-4" />
    }
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <a href="/qr-codes">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </a>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{qrCode.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download QR
          </Button>
          <Button variant="destructive" size="sm" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle>QR Code</CardTitle>
            <CardDescription>Created on {format(qrCode.createdAt, "MMMM d, yyyy")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="flex h-48 w-48 items-center justify-center rounded-md border">
              <QrCode className="h-32 w-32" />
            </div>
            <div className="grid w-full gap-4">
              <div className="grid gap-2">
                <Label htmlFor="url">Redirect URL</Label>
                <div className="flex items-center gap-2">
                  <Input id="url" value={url} onChange={(e) => setUrl(e.target.value)} disabled={!isEditing} />
                  {isEditing ? (
                    <Button size="icon" onClick={handleSave}>
                      <Save className="h-4 w-4" />
                      <span className="sr-only">Save</span>
                    </Button>
                  ) : (
                    <Button size="icon" variant="outline" onClick={() => setIsEditing(true)}>
                      <Edit2 className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="tracking">Tracking</Label>
                  <div className="text-sm text-muted-foreground">
                    {trackingEnabled ? "Analytics are being collected" : "Analytics are disabled"}
                  </div>
                </div>
                <Switch id="tracking" checked={trackingEnabled} onCheckedChange={setTrackingEnabled} />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Performance metrics for this QR code</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="devices">Devices</TabsTrigger>
                <TabsTrigger value="locations">Locations</TabsTrigger>
                <TabsTrigger value="scans">Scan Log</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{qrCode.scans.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        Last scanned {format(qrCode.lastScanned, "MMMM d, yyyy")}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{qrCode.uniqueVisitors.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((qrCode.uniqueVisitors / qrCode.scans) * 100)}% of total scans
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Scans Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScansOverTimeChart />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Time of Day</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TimeOfDayChart />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="devices">
                <Card>
                  <CardContent className="p-4">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-4">
                        {qrCode.scansByDevice.map((item) => (
                          <div key={item.device} className="flex items-center">
                            <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                              {item.device === "Mobile" ? (
                                <Smartphone className="h-4 w-4 text-primary" />
                              ) : item.device === "Desktop" ? (
                                <Laptop className="h-4 w-4 text-primary" />
                              ) : (
                                <Tablet className="h-4 w-4 text-primary" />
                              )}
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
                      <div className="flex items-center justify-center">
                        <DeviceBreakdownChart />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="locations">
                <Card>
                  <CardContent className="p-4">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-4">
                        {qrCode.scansByLocation.map((item) => (
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
                      <div className="flex items-center justify-center">
                        <LocationMapChart />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="scans">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {qrCode.recentScans.map((scan) => (
                        <div key={scan.id} className="flex items-center gap-4 rounded-md border p-3">
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
                              {format(scan.timestamp, "MMM d, yyyy 'at' h:mm a")}
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
                </Card>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
