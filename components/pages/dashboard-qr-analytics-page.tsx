"use client";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Activity, MousePointer2, User, Globe, Smartphone, Laptop, Tablet, Router as RouterIcon, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { ScansOverTimeChart } from "@/components/charts/scans-over-time-chart";
import { DeviceBreakdownChart } from "@/components/charts/device-breakdown-chart";
import { LocationMapChart } from "@/components/charts/location-map-chart";
import { TimeOfDayChart } from "@/components/charts/time-of-day-chart";
import { getSingleQRCode } from "@/services/QRCodeServices";

export default function DashboardQRAnalyticsPage() {
    const params = useParams();
    const router = useRouter();
    const qrCodeId = (params.id || params.slug) as string;

    const { data: response, isLoading, error } = useQuery({
        queryKey: ['getSingleQRCode', qrCodeId],
        queryFn: () => getSingleQRCode(qrCodeId),
    });

    const qrCode = response?.data?.qrCode;
    const scansByDevice = response?.data?.scanByDevice || [];
    const scansByLocation = response?.data?.scanByLocation || [];
    const scansOverDay = response?.data?.scanActivity || [];
    const scansOverTime = response?.data?.scansOverTime || [];
    const recentScans = response?.data?.recentScans || [];

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

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center gap-4">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                    <p className="text-sm text-muted-foreground">Loading Analytics...</p>
                </div>
            </div>
        );
    }

    if (error || !qrCode) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <h2 className="text-2xl font-bold mb-2">Data Not Found</h2>
                    <Button onClick={() => router.back()}>Go Back</Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8 mx-auto w-full">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between mb-4">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 bg-muted/50 hover:bg-muted" onClick={() => router.back()}>
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">{qrCode.name} Analytics</h1>
                        <p className="text-muted-foreground text-sm">Standalone performance data for this dynamic QR code</p>
                    </div>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-card border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <MousePointer2 className="h-4 w-4 text-primary" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{(response?.data?.totalScans || 0).toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">Ready to track new scans</p>
                    </CardContent>
                </Card>

                <Card className="bg-card border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-blue-500/10 flex items-center justify-center">
                            <User className="h-4 w-4 text-blue-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{(qrCode?.uniqueScans || 0).toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground mt-1">Direct individual reach</p>
                    </CardContent>
                </Card>

                <Card className="bg-card border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Locations</CardTitle>
                        <div className="h-8 w-8 rounded-full bg-orange-500/10 flex items-center justify-center">
                            <Globe className="h-4 w-4 text-orange-500" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">{scansByLocation?.length || 0}</div>
                        <p className="text-xs text-muted-foreground mt-1">Global geographic spread</p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Charts */}
            <div className="grid gap-6 grid-cols-1 lg:grid-cols-7">
                <Card className="lg:col-span-4 bg-card border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="border-b pb-4">
                        <CardTitle className="text-lg">30-Day Activity</CardTitle>
                        <CardDescription className="text-xs">Scan activity trends over the last month</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[350px] pt-6">
                        <ScansOverTimeChart data={scansOverDay} />
                    </CardContent>
                </Card>

                <Card className="lg:col-span-3 bg-card border shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="border-b pb-4">
                        <CardTitle className="text-lg">Peak Scanner Hours</CardTitle>
                        <CardDescription className="text-xs">Hourly distribution of scans</CardDescription>
                    </CardHeader>
                    <CardContent className="h-[300px] pt-6">
                        <TimeOfDayChart data={scansOverTime} />
                    </CardContent>
                </Card>
            </div>

            {/* Distribution Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-card border shadow-sm overflow-hidden">
                    <CardHeader className="border-b pb-4">
                        <CardTitle className="text-lg">Device Breakdown</CardTitle>
                        <CardDescription className="text-xs">Hardware distribution of your scanners</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="h-[250px] w-full">
                                <DeviceBreakdownChart data={scansByDevice} />
                            </div>
                            <div className="space-y-4">
                                {scansByDevice.map((item: any) => (
                                    <div key={item.device} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted/50">
                                                    {getDeviceIcon(item.device)}
                                                </div>
                                                <span className="text-sm font-semibold capitalize">{item.device}</span>
                                            </div>
                                            <span className="text-xs font-bold text-muted-foreground">{item.count} scans</span>
                                        </div>
                                        <div className="h-1.5 w-full rounded-full bg-muted/50 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-primary"
                                                style={{ width: `${(item.count / (response?.data?.totalScans || 1)) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border shadow-sm overflow-hidden">
                    <CardHeader className="border-b pb-4">
                        <CardTitle className="text-lg">Geographic Breakdown</CardTitle>
                        <CardDescription className="text-xs">Top performing countries and regions</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            <div className="h-[250px] w-full">
                                <LocationMapChart data={scansByLocation} />
                            </div>
                            <div className="space-y-4">
                                {scansByLocation.slice(0, 5).map((item: any) => (
                                    <div key={item.country} className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-semibold">{item.country || "Unknown"}</span>
                                            <span className="text-xs font-bold text-muted-foreground">{item.count} scans</span>
                                        </div>
                                        <div className="h-1.5 w-full rounded-full bg-muted/50 overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-primary"
                                                style={{ width: `${(item.count / (response?.data?.totalScans || 1)) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Logs */}
            <Card className="bg-card border shadow-sm">
                <CardHeader className="border-b bg-muted/30">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                            <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                            <CardTitle className="text-lg">Recent activity Feed</CardTitle>
                            <CardDescription className="text-[10px] uppercase font-bold tracking-widest mt-0.5">Real-time scan logs</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid gap-3">
                        {recentScans.length > 0 ? (
                            recentScans.map((scan: any) => (
                                <div key={scan.id} className="flex items-center justify-between p-3 rounded-xl border bg-muted/5 transition-colors hover:bg-muted/10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-background border shadow-sm">
                                            {getDeviceIcon(scan.device)}
                                        </div>
                                        <div>
                                            <div className="font-bold text-sm tracking-tight">{scan.location || "Unknown Location"}</div>
                                            <div className="text-[10px] text-muted-foreground font-medium flex items-center gap-1 mt-0.5">
                                                <Calendar className="h-3 w-3" />
                                                {format(new Date(scan.timestamp), "MMM d, yyyy • h:mm a")}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-[10px] font-bold uppercase py-1 px-2 rounded-lg bg-primary/5 text-primary-foreground/70 border border-primary/10 bg-primary/10">
                                        {scan.device || "Unknown"}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="flex flex-col items-center justify-center py-10 opacity-30 text-center">
                                <Activity className="h-8 w-8 mb-2" />
                                <p className="text-xs font-bold uppercase tracking-widest">No activity feed yet</p>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
