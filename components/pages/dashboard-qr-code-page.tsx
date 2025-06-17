"use client"
import {  useEffect, useState } from "react"
import { format } from "date-fns"
import { Download, Edit, Filter, MoreHorizontal, Plus, QrCode, Search, Trash2 } from "lucide-react"
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
import { CreateQrCodeModal } from "@/components/create-qr-code-modal"
import { cn } from "@/lib/utils"
import { deleteQrCode, getAllQRCode } from "@/services/QRCodeServices"
import QRCodeStyling from "qr-code-styling"
import { toast } from "sonner"
import { ErrorBlock } from "../error-block"
import QRCodeDashboardLoading from "@/app/dashboard/qr-codes/loading"
import { useQuery } from "@tanstack/react-query"


export default function DashboardQrCodesPage() {
  const { data, isError, isLoading, error, isSuccess, refetch } = useQuery({
    queryKey: ["getAllQRCode"],
    queryFn: getAllQRCode,
  })

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const [searchQuery, setSearchQuery] = useState("")
  const qrCodes = data?.data || []


  if (isLoading) {
    return <QRCodeDashboardLoading/>
  }
  if (isError) {
    return (
      <ErrorBlock
        message={(error as Error).message}
        retry={() => refetch()}
      />
    )
  }

  const filteredQrCodes = qrCodes?.filter((qr:any) => 
    qr?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
  )

  const handleDownload = (qr:any)=> {
    const qrCode = new QRCodeStyling(qr.settings)
    qrCode.download({
      extension: "png"
    });
  }

  const handleDeleteQr = async (id:string) => {
    try {
      const response = await deleteQrCode(id)
      if(response.success) {
        toast.success("Delete successful", {
          description: "Your QR code has been created successfully.",
        })
        refetch()

      } else {
        toast.error("Delete failed!", {
          description: "Failed to delete your QR code!",
        })
      }
    } catch (err) {
      toast.error("Delete failed!", {
        description: "Failed to delete your QR code!",
      })
    }
  }


return (
    <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">QR Codes</h1>
          <p className="text-muted-foreground">Manage and track your dynamic QR codes</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Create QR Code
        </Button>
      </div>
      <Card>
        <CardHeader className="p-4">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="search"
                placeholder="Search QR codes..."
                className="h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button variant="outline" size="sm" className="h-9 px-3">
                <Search className="h-4 w-4" />
                <span className="sr-only">Search</span>
              </Button>
            </div>
            {/* todo: need to enable this when filter is enable  */}
            <div className="hidden items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" size="sm" className="h-9 gap-1 border-dashed">
                    <Filter className="h-4 w-4" />
                    <span className="hidden sm:inline">Filter</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-4" align="end">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Created Date</h4>
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>QR Code</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>URL</TableHead>
                <TableHead className="text-right">Scans</TableHead>
                <TableHead>Last Scanned</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Tracking</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredQrCodes.length > 0 ? (
                filteredQrCodes.map((qr:any) => (
                  <TableRow key={qr.id}>
                    <TableCell>
                      <div className="flex h-12 w-12 items-center justify-center rounded-md border">
                      <QrCode className="w-8 h-8"/>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">
                      <a href={`/dashboard/qr-codes/${qr.id}`} className="hover:underline">
                        {qr.name}
                      </a>
                    </TableCell>
                    <TableCell className="max-w-[200px] truncate">
                      <a
                        href={qr.targetUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:underline"
                      >
                        {qr.targetUrl}
                      </a>
                    </TableCell>
                    <TableCell className="text-right">{qr.totalScans}</TableCell>
                    <TableCell>{ qr?.lastScans ? format(new Date(qr?.lastScans), "MMM d, yyyy") : "Not yet scanned"}</TableCell>
                    <TableCell>{format(new Date(qr.createdAt), "MMM d, yyyy")}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
                          qr.trackingEnabled
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
                        )}
                      >
                        {qr.trackingEnabled ? "Enabled" : "Disabled"}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu> 
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Actions</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end"  className="bg-background">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem asChild>
                            <a href={`/dashboard/qr-codes/${qr.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </a>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={()=>{
                            handleDownload(qr)
                          }}>
                            <Download className="mr-2 h-4 w-4" />
                            Download
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={()=>{
                            handleDeleteQr(qr.id)
                          }} className="text-destructive focus:text-destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    {searchQuery ? (
                      "No QR codes match your search"
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <p>You have not created any QR codes yet</p>
                        <Button
                          size="sm"
                          onClick={() => setIsCreateModalOpen(true)}
                        >
                          <Plus className="mr-2 h-4 w-4" />
                          Create Your First QR Code
                        </Button>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <CreateQrCodeModal refetch={refetch} open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </div>
  )
}