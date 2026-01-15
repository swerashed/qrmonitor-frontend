"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Download, Edit2, Globe, Laptop, Router as RouterIcon, Smartphone, Tablet, Trash2, ExternalLink, Calendar, MousePointer2, User, Activity } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import QRCodeStyling from "qr-code-styling";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ScansOverTimeChart } from "@/components/charts/scans-over-time-chart";
import { DeviceBreakdownChart } from "@/components/charts/device-breakdown-chart";
import { LocationMapChart } from "@/components/charts/location-map-chart";
import { TimeOfDayChart } from "@/components/charts/time-of-day-chart";
import { Label } from "@/components/ui/label";
import { getSingleQRCode } from "@/services/QRCodeServices";
import { EditQRCodeModal } from "@/components/edit-qr-code-modal";
import { toast } from "sonner";

export default function DashboardQRDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const qrCodeId = params.id as string;
  const queryClient = useQueryClient();
  const qrRef = useRef<HTMLDivElement>(null);

  const { data: response, isLoading, error } = useQuery({
    queryKey: ['getSingleQRCode', qrCodeId],
    queryFn: () => getSingleQRCode(qrCodeId),
  });

  const qrCode = response?.data;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [qrCodeInstance, setQrCodeInstance] = useState<QRCodeStyling | null>(null);

  // Initialize QR Code
  useEffect(() => {
    if (qrCode?.settings && qrRef.current) {
      const qr = new QRCodeStyling({
        ...qrCode.settings,
        width: 200,
        height: 200,
      });
      setQrCodeInstance(qr);
      qrRef.current.innerHTML = '';
      qr.append(qrRef.current);
    }
  }, [qrCode?.settings]);

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      // Implement delete API call here
      toast.error("Delete functionality not yet implemented");
    },
    onSuccess: () => {
      toast.success("QR Code deleted successfully");
      router.push("/dashboard/qr-codes");
    },
  });

  const refetch = () => {
    queryClient.invalidateQueries({ queryKey: ['getSingleQRCode', qrCodeId] });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Loading QR Code details...</p>
        </div>
      </div>
    );
  }

  if (error || !qrCode) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">QR Code Not Found</h2>
          <p className="text-muted-foreground mb-4">
            The QR code you're looking for doesn't exist or has been deleted.
          </p>
          <Button asChild>
            <a href="/dashboard/qr-codes">Back to QR Codes</a>
          </Button>
        </div>
      </div>
    );
  }

  const scansByDevice = qrCode?.scansByDevice || [];
  const scansByLocation = qrCode?.scansByLocation || [];
  const scansOverDay = qrCode?.scansOverDay || [];
  const scansOverTime = qrCode?.scansOverTime || [];
  const recentScans = qrCode?.recentScans || [];

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "desktop":
        return <Laptop className="h-4 w-4" />;
      case "tablet":
        return <Tablet className="h-4 w-4" />;
      default:
        return <RouterIcon className="h-4 w-4" />;
    }
  };

  const handleDownload = () => {
    if (qrCodeInstance) {
      qrCodeInstance.download({ name: qrCode.name || "qr-code", extension: "png" });
    }
  }

  return (
    <div className="flex flex-col gap-6 p-4 md:p-8 w-full">
      {/* Header Section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-card p-6 rounded-xl border border-border shadow-sm">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full" asChild>
            <a href="/dashboard/qr-codes">
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </a>
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{qrCode?.name}</h1>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <Calendar className="h-3.5 w-3.5" />
              <span>Created on {qrCode?.createdAt ? format(new Date(qrCode.createdAt), "MMMM d, yyyy") : "Unknown date"}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={() => setIsEditModalOpen(true)} variant="outline" size="sm" className="rounded-lg">
            <Edit2 className="mr-2 h-4 w-4" />
            Edit QR
          </Button>
          <Button onClick={handleDownload} variant="outline" size="sm" className="rounded-lg">
            <Download className="mr-2 h-4 w-4" />
            Download
          </Button>
          <Button variant="destructive" size="sm" className="rounded-lg shadow-sm" onClick={() => deleteMutation.mutate(qrCode.id)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr] xl:grid-cols-[350px_1fr]">
        {/* Left Sidebar - QR Preview & Links */}
        <div className="space-y-6">
          <Card className="overflow-hidden border-none shadow-md bg-gradient-to-b from-primary/5 to-card sticky top-6">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">Final QR Code</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 pt-2">
              <div className="group relative bg-white p-4 rounded-2xl shadow-xl transition-all hover:scale-[1.02]">
                <div ref={qrRef} className="flex items-center justify-center" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/5 transition-all rounded-2xl pointer-events-none" />
              </div>

              <div className="w-full space-y-4">
                <div className="p-4 rounded-lg bg-muted/50 border border-border/50">
                  <Label className="text-xs uppercase tracking-wider text-muted-foreground mb-2 block">Redirect URL</Label>
                  <a
                    href={qrCode.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-primary font-medium hover:underline break-all group"
                  >
                    <span className="line-clamp-1">{qrCode.targetUrl}</span>
                    <ExternalLink className="h-3.5 w-3.5 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </a>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50 border border-border/50">
                  <div className="space-y-0.5">
                    <Label className="text-xs uppercase tracking-wider text-muted-foreground block">Tracking Status</Label>
                    <span className={cn(
                      "text-sm font-medium",
                      qrCode.trackingEnabled ? "text-green-500" : "text-yellow-500"
                    )}>
                      {qrCode.trackingEnabled ? "Active" : "Disabled"}
                    </span>
                  </div>
                  <div className={cn(
                    "h-2.5 w-2.5 rounded-full animate-pulse",
                    qrCode.trackingEnabled ? "bg-green-500" : "bg-yellow-500"
                  )} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Content - Analytics */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Analytics Deep-Dive</h2>
              <p className="text-sm text-muted-foreground">Comprehensive performance tracking for this QR</p>
            </div>
          </div>

          {/* Top Stats - 3 Big Cards */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-primary/5 border-primary/20 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-primary">Total Scans</CardTitle>
                  <MousePointer2 className="h-4 w-4 text-primary opacity-70" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-extrabold tracking-tight">{(qrCode?.totalScans || 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-2 border-t pt-2 border-primary/10">
                  Last scan recorded on <span className="font-medium text-foreground">{qrCode?.updatedAt ? format(new Date(qrCode.updatedAt), "MMM d, h:mm a") : "No scans yet"}</span>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40 shadow-sm transition-all hover:shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Unique Users</CardTitle>
                  <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400 opacity-70" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-extrabold tracking-tight">{(qrCode?.uniqueScans || 0).toLocaleString()}</div>
                <p className="text-xs text-muted-foreground mt-2 border-t pt-2 border-emerald-500/10">
                  {qrCode?.uniqueScans && qrCode?.totalScans
                    ? <span className="font-bold text-emerald-600 dark:text-emerald-400">{Math.round((qrCode.uniqueScans / qrCode.totalScans) * 100)}%</span>
                    : "--"} conversion rate from reach
                </p>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/40 shadow-sm transition-all hover:shadow-md sm:col-span-2 lg:col-span-1">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-semibold text-blue-600 dark:text-blue-400">Geographic Reach</CardTitle>
                  <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400 opacity-70" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-extrabold tracking-tight">{scansByLocation?.length || 0}</div>
                <p className="text-xs text-muted-foreground mt-2 border-t pt-2 border-blue-500/10">
                  Active scans coming from <span className="font-medium text-foreground">{scansByLocation?.length || 0} countries</span>
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Activity Chart - Large Span */}
          <Card className="bg-card border shadow-sm overflow-hidden">
            <CardHeader className="border-b bg-muted/30">
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg font-bold">30-Day Activity</CardTitle>
                  <CardDescription>Daily scan volume for the past month</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-primary" />
                  <span className="text-xs font-medium">Scans</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[400px] pt-6">
              <ScansOverTimeChart data={scansOverDay} />
            </CardContent>
          </Card>

          {/* Peak Hours Chart */}
          <Card className="bg-card border shadow-sm">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-lg font-bold">Peak Scanner Hours</CardTitle>
              <CardDescription>Most active times of the day (Scans per hour)</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px] pt-6">
              <TimeOfDayChart data={scansOverTime} />
            </CardContent>
          </Card>

          {/* Device & Location Split */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="bg-card border shadow-sm">
              <CardHeader className="border-b">
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>Platforms used to access this QR code</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {scansByDevice?.length > 0 ? (
                  <div className="space-y-8">
                    <div className="flex justify-center h-[250px]">
                      <DeviceBreakdownChart data={scansByDevice} />
                    </div>
                    <div className="grid gap-3">
                      {scansByDevice.map((item) => (
                        <div key={item.device} className="bg-muted/30 border rounded-xl p-4 transition-all hover:bg-muted/50">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-3">
                              <div className="p-2 rounded-lg bg-background border text-primary shadow-sm">
                                {getDeviceIcon(item.device)}
                              </div>
                              <span className="font-bold capitalize text-sm">{item.device}</span>
                            </div>
                            <span className="text-xs font-black text-primary">{item.count} SCANS</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
                            <div
                              className="h-full rounded-full bg-primary transition-all duration-1000"
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                          <div className="mt-2 text-right">
                            <span className="text-[10px] uppercase font-bold text-muted-foreground">{item.percentage}% of total</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <EmptyAnalyticsState />
                )}
              </CardContent>
            </Card>

            <Card className="bg-card border shadow-sm">
              <CardHeader className="border-b">
                <CardTitle>Geographic Locations</CardTitle>
                <CardDescription>Countries and regions where this code was scanned</CardDescription>
              </CardHeader>
              <CardContent className="pt-6">
                {scansByLocation?.length > 0 ? (
                  <div className="space-y-8">
                    <div className="h-[250px] aspect-video rounded-xl overflow-hidden border bg-muted/20">
                      <LocationMapChart data={scansByLocation} />
                    </div>
                    <div className="grid gap-3">
                      {scansByLocation.slice(0, 5).map((item) => (
                        <div key={item.country} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors border bg-muted/10">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 rounded-full bg-blue-50 dark:bg-blue-950/20 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50">
                              <Globe className="h-4 w-4" />
                            </div>
                            <span className="font-semibold text-sm">{item.country}</span>
                          </div>
                          <div className="text-right">
                            <div className="font-black text-sm">{item.count}</div>
                            <div className="text-[10px] font-bold text-muted-foreground">{item.percentage}%</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <EmptyAnalyticsState />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Scan Logs Section */}
          <div className="pt-6">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20 shadow-sm shadow-primary/5">
                <Activity className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tight">Recent Activity Logs</h3>
                <p className="text-sm text-muted-foreground">Real-time scan feed with detailed metadata</p>
              </div>
            </div>

            {recentScans?.length > 0 ? (
              <div className="grid gap-4">
                {recentScans.map((scan) => (
                  <div key={scan.id} className="flex items-center gap-4 rounded-2xl border bg-card p-4 transition-all hover:shadow-lg hover:border-primary/30 group">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/5 text-primary border border-primary/10 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-inner">
                      {scan.device === "mobile" ? (
                        <Smartphone className="h-5 w-5" />
                      ) : scan.device === "desktop" ? (
                        <Laptop className="h-5 w-5" />
                      ) : (
                        <Tablet className="h-5 w-5" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold truncate text-sm md:text-base">{scan.location || "Unknown Location"}</div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(scan.timestamp), "MMM d, yyyy • h:mm a")}
                      </div>
                    </div>
                    <div className={cn(
                      "px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm",
                      scan.device === "mobile"
                        ? "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/50"
                        : scan.device === "desktop"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/50"
                          : "bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-900/50",
                    )}>
                      {scan.device}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyAnalyticsState />
            )}
          </div>
        </div>
      </div>

      <EditQRCodeModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        qrCode={{
          id: qrCode.id,
          name: qrCode.name,
          targetUrl: qrCode.targetUrl,
          trackingEnabled: qrCode.trackingEnabled
        }}
        onSuccess={refetch}
      />
    </div>
  );
}

function EmptyAnalyticsState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center mb-4">
        <RouterIcon className="h-10 w-10 text-muted-foreground opacity-20" />
      </div>
      <h3 className="text-lg font-semibold">No data yet</h3>
      <p className="text-sm text-muted-foreground max-w-[250px]">
        Share your QR code to start collecting scan analytics and insights.
      </p>
    </div>
  );
}
