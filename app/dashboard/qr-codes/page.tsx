"use client"

import { useState } from "react"
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

// Sample QR code data
const qrCodes = [
  {
    id: "1",
    name: "Product Landing Page",
    url: "https://example.com/product",
    scans: 423,
    lastScanned: new Date(2023, 4, 15),
    createdAt: new Date(2023, 3, 10),
    trackingEnabled: true,
  },
  {
    id: "2",
    name: "Event Registration",
    url: "https://example.com/event",
    scans: 352,
    lastScanned: new Date(2023, 4, 14),
    createdAt: new Date(2023, 3, 15),
    trackingEnabled: true,
  },
  {
    id: "3",
    name: "Promotional Offer",
    url: "https://example.com/promo",
    scans: 289,
    lastScanned: new Date(2023, 4, 13),
    createdAt: new Date(2023, 3, 20),
    trackingEnabled: true,
  },
  {
    id: "4",
    name: "Contact Information",
    url: "https://example.com/contact",
    scans: 187,
    lastScanned: new Date(2023, 4, 12),
    createdAt: new Date(2023, 3, 25),
    trackingEnabled: false,
  },
  {
    id: "5",
    name: "Digital Menu",
    url: "https://example.com/menu",
    scans: 156,
    lastScanned: new Date(2023, 4, 11),
    createdAt: new Date(2023, 3, 30),
    trackingEnabled: true,
  },
]

export default function QrCodesPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [date, setDate] = useState<Date>()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredQrCodes = qrCodes.filter((qr) => qr.name.toLowerCase().includes(searchQuery.toLowerCase()))

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
            <div className="flex items-center gap-2">
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
              {filteredQrCodes.map((qr) => (
                <TableRow key={qr.id}>
                  <TableCell>
                    <div className="flex h-12 w-12 items-center justify-center rounded-md border">
                      <QrCode className="h-8 w-8 text-muted-foreground" />
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">
                    <a href={`/qr-codes/${qr.id}`} className="hover:underline">
                      {qr.name}
                    </a>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">
                    <a
                      href={qr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:underline"
                    >
                      {qr.url}
                    </a>
                  </TableCell>
                  <TableCell className="text-right">{qr.scans.toLocaleString()}</TableCell>
                  <TableCell>{format(qr.lastScanned, "MMM d, yyyy")}</TableCell>
                  <TableCell>{format(qr.createdAt, "MMM d, yyyy")}</TableCell>
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
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <a href={`/qr-codes/${qr.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </a>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive focus:text-destructive">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <CreateQrCodeModal open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen} />
    </div>
  )
}
