"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Download, Edit, Filter, MoreHorizontal, Plus, QrCode, Search, Trash2, BarChart3, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { deleteQrCode, getAllQRCode } from "@/services/QRCodeServices"
import QRCodeStyling from "qr-code-styling"
import { toast } from "sonner"
import { ErrorBlock } from "../error-block"
import QRCodeDashboardLoading from "@/app/dashboard/qr-codes/loading"
import { useQuery } from "@tanstack/react-query"
import { EditQRCodeModal } from "@/components/edit-qr-code-modal"
import { DeleteQRCodeConfirmationModal } from "@/components/delete-qr-confirmation-modal"

export default function DashboardQrCodesPage() {
  const router = useRouter()
  const { data, isError, isLoading, error, refetch } = useQuery({
    queryKey: ["getAllQRCode"],
    queryFn: getAllQRCode,
  })

  const [date, setDate] = useState<Date>()
  const [searchQuery, setSearchQuery] = useState("")
  const [editingQr, setEditingQr] = useState<any>(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [qrToDelete, setQrToDelete] = useState<any>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const qrCodes = data?.data || []

  if (isLoading) {
    return <QRCodeDashboardLoading />
  }

  if (isError) {
    return (
      <ErrorBlock
        message={(error as Error).message}
        retry={() => refetch()}
      />
    )
  }

  const filteredQrCodes = qrCodes?.filter((qr: any) =>
    qr?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  )

  const handleDownload = (qr: any) => {
    const qrCode = new QRCodeStyling(qr.settings)
    qrCode.download({
      name: qr.name || "qr-code",
      extension: "png"
    });
  }

  const handleDeleteQr = async (id: string) => {
    try {
      const response = await deleteQrCode(id)
      if (response.success) {
        toast.success("Delete successful")
        refetch()
      } else {
        toast.error(response.message || "Failed to delete your QR code")
      }
    } catch (err: any) {
      toast.error("Delete failed!", {
        description: err.message || "Failed to delete your QR code!",
      })
    }
  }

  const handleEditClick = (qr: any) => {
    setEditingQr(qr)
    setIsEditModalOpen(true)
  }

  return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8  mx-auto w-full">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">QR Codes</h1>
          <p className="text-muted-foreground text-sm">Manage and track your dynamic QR codes</p>
        </div>
        <Button onClick={() => router.push("/dashboard/qr-codes/create")} className="shadow-sm">
          <Plus className="mr-2 h-4 w-4" />
          Create QR Code
        </Button>
      </div>

      <Card className="bg-card border shadow-md overflow-hidden">
        <CardHeader className="p-4 bg-muted/30 border-b">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search QR codes..."
                className="pl-9 h-10 bg-background"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="hidden items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-10 gap-1 border-dashed">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-4" align="end">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none text-sm">Created Date</h4>
                      <div className="pt-1">
                        <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                      </div>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-muted/20">
                <TableRow>
                  <TableHead className="w-[80px]">QR</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden md:table-cell">Target URL</TableHead>
                  <TableHead className="text-center">Scans</TableHead>
                  <TableHead className="hidden lg:table-cell">Created</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredQrCodes.length > 0 ? (
                  filteredQrCodes.map((qr: any) => (
                    <TableRow key={qr.id} className="group hover:bg-muted/40 transition-colors">
                      <TableCell>
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg border bg-background shadow-sm group-hover:border-primary/50 transition-colors">
                          <QrCode className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </TableCell>
                      <TableCell className="font-semibold">
                        <div className="flex flex-col">
                          <a href={`/dashboard/qr-codes/${qr.id}`} className="hover:text-primary transition-colors">
                            {qr.name}
                          </a>
                          <span className="text-[10px] text-muted-foreground md:hidden truncate max-w-[150px]">
                            {qr.targetUrl}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                        <a
                          href={qr.targetUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-muted-foreground hover:text-primary flex items-center gap-1 group/link"
                        >
                          <span className="truncate">{qr.targetUrl}</span>
                          <ExternalLink className="h-3 w-3 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </a>
                      </TableCell>
                      <TableCell className="text-center">
                        <span className="inline-flex items-center justify-center min-w-[32px] px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                          {qr.totalScans}
                        </span>
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-sm text-muted-foreground">
                        {format(new Date(qr.createdAt), "MMM d, yyyy")}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "h-2 w-2 rounded-full",
                            qr.trackingEnabled ? "bg-green-500" : "bg-yellow-500"
                          )} />
                          <span className="text-xs font-medium">
                            {qr.trackingEnabled ? "Active" : "Disabled"}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Actions</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuLabel className="text-xs uppercase tracking-wider text-muted-foreground font-bold">Options</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleEditClick(qr)} className="cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => router.push(`/dashboard/qr-codes/${qr.id}`)} className="cursor-pointer">
                              <BarChart3 className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleDownload(qr)} className="cursor-pointer">
                              <Download className="mr-2 h-4 w-4" />
                              Download PNG
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                              onClick={() => {
                                setQrToDelete(qr)
                                setIsDeleteDialogOpen(true)
                              }}
                              className="text-destructive focus:bg-destructive/10 focus:text-destructive cursor-pointer"
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete QR
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                          <QrCode className="h-6 w-6 text-muted-foreground opacity-50" />
                        </div>
                        <div className="max-w-[200px] mx-auto">
                          <p className="font-semibold">{searchQuery ? "No matches found" : "No QR codes created"}</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            {searchQuery ? "Try searching for something else." : "Start by creating your first dynamic QR code."}
                          </p>
                        </div>
                        {!searchQuery && (
                          <Button
                            size="sm"
                            className="mt-2"
                            onClick={() => router.push("/dashboard/qr-codes/create")}
                          >
                            <Plus className="mr-2 h-4 w-4" />
                            Create QR Code
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {editingQr && (
        <EditQRCodeModal
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false)
            setEditingQr(null)
          }}
          qrCode={editingQr}
          onSuccess={refetch}
        />
      )}

      <DeleteQRCodeConfirmationModal
        isOpen={isDeleteDialogOpen}
        onClose={() => {
          setIsDeleteDialogOpen(false)
          setQrToDelete(null)
        }}
        onConfirm={() => {
          if (qrToDelete) {
            handleDeleteQr(qrToDelete.id)
            setQrToDelete(null)
            setIsDeleteDialogOpen(false)
          }
        }}
        qrName={qrToDelete?.name}
      />
    </div>
  )
}