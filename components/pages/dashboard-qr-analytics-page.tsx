"use client";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Activity, MousePointer2, User, Globe, Smartphone, Laptop, Tablet, Router as RouterIcon, Calendar } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
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
        <div className="flex flex-col gap-6 p-4 md:p-8 w-full">
            <div className="flex items-center gap-4 mb-4">
                <Button variant="ghost" size="icon" className="rounded-full" onClick={() => router.back()}>
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-black tracking-tight">{qrCode.name} Analytics</h1>
                    <p className="text-muted-foreground">Standalone performance data and scan logs</p>
                </div>
            </div>

            {/* Top Stats */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="bg-primary/5 border-primary/20 shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-semibold text-primary">Total Scans</CardTitle>
                            <MousePointer2 className="h-4 w-4 text-primary opacity-70" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold tracking-tight">{(response?.data?.totalScans || 0).toLocaleString()}</div>
                    </CardContent>
                </Card>

                <Card className="bg-emerald-50 dark:bg-emerald-950/20 border-emerald-100 dark:border-emerald-900/40 shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">Unique Users</CardTitle>
                            <User className="h-4 w-4 text-emerald-600 dark:text-emerald-400 opacity-70" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold tracking-tight">{(qrCode?.uniqueScans || 0).toLocaleString()}</div>
                    </CardContent>
                </Card>

                <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-100 dark:border-blue-900/40 shadow-sm">
                    <CardHeader className="pb-2">
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-sm font-semibold text-blue-600 dark:text-blue-400">Locations</CardTitle>
                            <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400 opacity-70" />
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="text-4xl font-extrabold tracking-tight">{scansByLocation?.length || 0}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Charts */}
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                <Card className="bg-card border shadow-sm">
                    <CardHeader className="border-b bg-muted/30">
                        <CardTitle className="text-lg font-bold">30-Day Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[400px] pt-6">
                        <ScansOverTimeChart data={scansOverDay} />
                    </CardContent>
                </Card>

                <Card className="bg-card border shadow-sm">
                    <CardHeader className="pb-4 border-b">
                        <CardTitle className="text-lg font-bold">Peak Scanner Hours</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px] pt-6">
                        <TimeOfDayChart data={scansOverTime} />
                    </CardContent>
                </Card>
            </div>

            {/* Distribution Grid */}
            <div className="grid gap-6 lg:grid-cols-2">
                <Card className="bg-card border shadow-sm">
                    <CardHeader className="border-b">
                        <CardTitle>Device Distribution</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="h-[250px]">
                                <DeviceBreakdownChart data={scansByDevice} />
                            </div>
                            <div className="grid gap-2">
                                {scansByDevice.map((item: any) => (
                                    <div key={item.device} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border">
                                        <div className="flex items-center gap-2">
                                            {getDeviceIcon(item.device)}
                                            <span className="text-sm font-medium capitalize">{item.device}</span>
                                        </div>
                                        <span className="text-xs font-bold">{item.count} scans</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-card border shadow-sm">
                    <CardHeader className="border-b">
                        <CardTitle>Geographic Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-6">
                        <div className="space-y-4">
                            <div className="h-[250px]">
                                <LocationMapChart data={scansByLocation} />
                            </div>
                            <div className="grid gap-2">
                                {scansByLocation.slice(0, 5).map((item: any) => (
                                    <div key={item.country} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 border">
                                        <span className="text-sm font-medium">{item.country}</span>
                                        <span className="text-xs font-bold">{item.count} scans</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Recent Activity Logs */}
            <Card className="bg-card border shadow-sm">
                <CardHeader className="border-b bg-primary/5">
                    <div className="flex items-center gap-2">
                        <Activity className="h-5 w-5 text-primary" />
                        <CardTitle className="text-lg font-bold">Recent Activity Feed</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="pt-6">
                    <div className="grid gap-3">
                        {recentScans.map((scan: any) => (
                            <div key={scan.id} className="flex items-center justify-between p-4 rounded-xl border bg-muted/10">
                                <div className="flex items-center gap-4">
                                    <div className="p-2 rounded-lg bg-background border">
                                        {getDeviceIcon(scan.device)}
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">{scan.location || "Unknown"}</div>
                                        <div className="text-[10px] text-muted-foreground flex items-center gap-1">
                                            <Calendar className="h-3 w-3" />
                                            {format(new Date(scan.timestamp), "MMM d, h:mm a")}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-[10px] font-black uppercase px-2 py-1 rounded bg-primary/10 text-primary border border-primary/20">
                                    {scan.device}
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
