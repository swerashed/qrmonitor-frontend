"use client";
import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { format } from "date-fns";
import { ArrowLeft, Download, Edit2, Globe, Trash2, ExternalLink, Calendar, MousePointer2, User, Activity } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import QRCodeStyling from "qr-code-styling";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { getSingleQRCode, deleteQrCode } from "@/services/QRCodeServices";
import { EditQRCodeModal } from "@/components/edit-qr-code-modal";
import { DeleteQRCodeConfirmationModal } from "@/components/delete-qr-confirmation-modal";
import { toast } from "sonner";
import { handleQRDownload } from "@/helpers/handleQRDownload";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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

  const qrCode = response?.data?.qrCode;
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
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
      return await deleteQrCode(id);
    },
    onSuccess: (response) => {
      if (response.success) {
        toast.success("QR Code deleted successfully");
        router.push("/dashboard/qr-codes");
      } else {
        toast.error(response.message || "Failed to delete QR Code");
      }
    },
    onError: (err: any) => {
      toast.error("Delete failed!", {
        description: err.message || "An unexpected error occurred",
      });
    }
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

  const scansByLocation = response?.data?.scanByLocation || [];


  const handleDownload = (extension: "png" | "svg" = "png") => {
    if (qrCode) {
      handleQRDownload(qrCode.settings, qrCode.name || "qr-code", extension);
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="rounded-lg">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleDownload("png")}>
                Download PNG
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload("svg")}>
                Download SVG
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="destructive" size="sm" className="rounded-lg shadow-sm" onClick={() => setIsDeleteModalOpen(true)}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[350px_1fr]">
        {/* Left Sidebar - QR Preview & Links */}
        <div className="space-y-6">
          <Card className="overflow-hidden border-none shadow-md bg-primary/10 sticky top-6">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-lg">Final QR Code</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 pt-2">
              <div className="group relative bg-white p-[40px] rounded-2xl shadow-xl transition-all hover:scale-[1.02]">
                <div ref={qrRef} className="flex items-center justify-center" />
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

        {/* Right Content - Basic Stats & Bridge */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">Quick Overview</h2>
              <p className="text-sm text-muted-foreground">Snapshot of this QR code's performance</p>
            </div>
            <Button asChild className="rounded-full shadow-lg shadow-primary/20">
              <a href={`/dashboard/analytics/${qrCodeId}`}>
                <Activity className="mr-2 h-4 w-4" />
                View Full Analytics
              </a>
            </Button>
          </div>

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
                <p className="text-xs text-muted-foreground mt-2 border-t pt-2 border-primary/10">
                  Updated <span className="font-medium text-foreground">{qrCode?.updatedAt ? format(new Date(qrCode.updatedAt), "HH:mm a") : "Recently"}</span>
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Unique Users</CardTitle>
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

          <Card className="border-dashed border-2 bg-muted/20">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Activity className="h-12 w-12 text-muted-foreground/30 mb-4" />
              <h3 className="text-lg font-bold mb-2">Detailed Insights Available</h3>
              <p className="text-sm text-muted-foreground max-w-md mb-6">
                Deep-dive into scan patterns, geographic heatmaps, and device distribution in the dedicated analytics view.
              </p>
              <Button variant="outline" asChild className="rounded-full">
                <a href={`/dashboard/analytics/${qrCodeId}`}>
                  Go to Analytics Dashboard
                </a>
              </Button>
            </CardContent>
          </Card>
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

      <DeleteQRCodeConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          deleteMutation.mutate(qrCode.id)
          setIsDeleteModalOpen(false)
        }}
        qrName={qrCode.name}
      />
    </div >
  );
}
