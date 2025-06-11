"use client";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import {
  ArrowLeft,
  Download,
  Edit2,
  Globe,
  Laptop,
  QrCode,
  Save,
  Smartphone,
  Tablet,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { ScansOverTimeChart } from "@/components/charts/scans-over-time-chart";
import { DeviceBreakdownChart } from "@/components/charts/device-breakdown-chart";
import { LocationMapChart } from "@/components/charts/location-map-chart";
import { TimeOfDayChart } from "@/components/charts/time-of-day-chart";
import { useParams } from "next/navigation";
import { deleteQrCode, editQRCode, GetSingleQRCode } from "@/services/QRCodeServices";
import ClientQR from "@/components/qr-code-creator";
import QRCodeStyling from "qr-code-styling";
import { handleQRDownload } from "@/helpers/handleQRDownload";
import { toast } from "sonner";

// Define types
interface QRCodeData {
  id: string;
  name: string;
  description?: string;
  targetUrl: string;
  totalScans: number;
  uniqueScans: number;
  lastScans: string | Date;
  createdAt: string | Date;
  trackingEnabled: boolean;
  settings: any
}

interface ScanByDevice {
  device: string;
  count: number;
  percentage: number;
}

interface ScanByLocation {
  country: string;
  count: number;
  percentage: number;
}

interface RecentScan {
  id: string;
  location: string;
  device: string;
  timestamp: string | Date;
}
interface ScanOverTime {
  scans: number;
  hour: string | Date;
}
interface ScanOverDay {
  scans: number;
  date: string | Date;
}

export default function QrCodeDetailsPage() {
  const params = useParams();
  const { id } = params as { id: string };

  const [isEditing, setIsEditing] = useState(false);
  const [url, setUrl] = useState<string>("");
  const [trackingEnabled, setTrackingEnabled] = useState<boolean>(true);
  const [qrCode, setQrCode] = useState<QRCodeData | null>(null);
  const [scansByDevice, setScansByDevice] = useState<ScanByDevice[]>([]);
  const [scansByLocation, setScansByLocation] = useState<ScanByLocation[]>([]);
  const [recentScans, setRecentScans] = useState<RecentScan[]>([]);
  const [scansOverTime, setScansOverTime] = useState<ScanOverTime[]>([]);
  const [scansOverDay, setScansOverDay] = useState<ScanOverDay[]>([]);

  useEffect(() => {
    const fetchQRCode = async () => {
      const response = await GetSingleQRCode(id);

      if (response.success && response.data) {
        const data = response.data.data;

        // Set main QR Code data
        const qr = data.qrCode;
        setQrCode(qr);
        setUrl(qr.targetUrl);
        setTrackingEnabled(qr.trackingEnabled);

        // Process scans by device
        const devices = data.scansByDevice.map((item: any) => ({
          device: item.deviceType || "Unknown",
          count: item._count._all,
          percentage: 0,
        }));
        
        const totalDevices = devices.reduce(
          (sum: number, d: any) => sum + d.count,
          0
        );
        devices.forEach((d: any) => {
          d.percentage = Math.round((d.count / totalDevices) * 100);
        });
        setScansByDevice(devices);

        // Process scans by location
        const locations = data.scansByLocation.map((item: any) => ({
          country: item.region || "Other",
          count: item._count._all,
          percentage: 0,
        }));
        const totalLocations = locations.reduce(
          (sum: number, l: any) => sum + l.count,
          0
        );
        locations.forEach((l: any) => {
          l.percentage = Math.round((l.count / totalLocations) * 100);
        });
        locations.sort((a: any, b: any) => b.count - a.count).splice(5);
        setScansByLocation(locations);

        // Process recent scans
        const scans = data.recentScans.map((scan: any) => ({
          id: scan.id,
          location: scan.city && scan.region ? `${scan.city}, ${scan.region}` : scan.country || "Unknown",
          device: scan.deviceType?.toLowerCase() || "unknown",
          timestamp: scan.timestamp,
        }));
        setRecentScans(scans);

        setScansOverTime(data.scansOverTime)
        setScansOverDay(data.scansOverDay)
      }
    };
    fetchQRCode();
  }, [id]);



  const handleSave = async () => {
    if (!qrCode) return;

    const payload = {
      id: qrCode.id,
      targetUrl: url,
      trackingEnabled,
    };

    const response = await editQRCode(payload);
    console.log("update response", response)
    // if (response.success) {
    //   alert("QR Code updated successfully");
    //   setIsEditing(false);
    // } else {
    //   alert("Failed to update QR Code");
    // }
  };


  const handleDeleteQr = async (id:string) => {
    try {
      const response = await deleteQrCode(id)
      if (response.success) {
        toast("Delete successful", {
          description: "Your QR code has been created successfully.",
        })


      } else {
        toast("Delete failed!", {
          description: "Failed to delete your QR code!",
        })
      }
    } catch (err) {
      toast("Delete failed!", {
        description: "Failed to delete your QR code!",
      })
    }
  }

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

  if (!qrCode) {
    return <div>Loading...</div>;
  }

  const handleDownload = () => {
    handleQRDownload(qrCode.settings, 1000, 1000)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" asChild>
            <a href="/dashboard/qr-codes">
              <ArrowLeft className="h-4 w-4" />
              <span className="sr-only">Back</span>
            </a>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">{qrCode?.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={()=>{
            handleDownload()
          }} variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Download QR
          </Button>
          <Button variant="destructive" size="sm" onClick={()=>{
            handleDeleteQr(qrCode?.id)
          }}>
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
            <div  className="flex h-48 w-48 items-center justify-center rounded-md border overflow-hidden">
               <ClientQR width={192} height={192} qrCodeOption={qrCode?.settings}/>
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
                      <div className="text-2xl font-bold">{qrCode?.totalScans.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        {/* Last scanned {format(qrCode?.lastScanned, "MMMM d, yyyy")} */}
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{qrCode?.uniqueScans.toLocaleString()}</div>
                      <p className="text-xs text-muted-foreground">
                        {Math.round((qrCode?.uniqueScans / qrCode?.totalScans) * 100)}% of total scans
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Scans Over Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ScansOverTimeChart data={scansOverDay} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Time of Day</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <TimeOfDayChart data={scansOverTime}  />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="devices">
                <Card>
                  <CardContent className="p-4">
                    <div className="grid gap-8 md:grid-cols-2">
                      <div className="space-y-4">
                        {scansByDevice?.map((item) => (
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
                      <div className="flex items-center justify-center">
                        <DeviceBreakdownChart  data={scansByDevice}/>
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
                        {scansByLocation?.map((item) => (
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
                        <LocationMapChart  data={scansByLocation}/>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="scans">
                <Card>
                  <CardContent className="p-4">
                    <div className="space-y-4">
                      {recentScans?.map((scan) => (
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
  );
}
