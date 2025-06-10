"use client"

import type React from "react"

import { useState } from "react"
import { QrCode } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

interface CreateQrCodeModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateQrCodeModal({ open, onOpenChange }: CreateQrCodeModalProps) {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [trackingEnabled, setTrackingEnabled] = useState(true)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically save the QR code to your backend
    // toast({
    //   title: "QR Code Created",
    //   description: `Successfully created QR code: ${name}`,
    // })

    // Reset form and close modal
    setName("")
    setUrl("")
    setTrackingEnabled(true)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New QR Code</DialogTitle>
            <DialogDescription>Create a dynamic QR code that you can edit and track.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">QR Code Name</Label>
              <Input
                id="name"
                placeholder="e.g., Product Landing Page"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="url">Redirect URL</Label>
              <Input
                id="url"
                type="url"
                placeholder="https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="tracking">Enable Tracking</Label>
                <div className="text-sm text-muted-foreground">Collect analytics data when this QR code is scanned</div>
              </div>
              <Switch id="tracking" checked={trackingEnabled} onCheckedChange={setTrackingEnabled} />
            </div>
            <div className="flex flex-col items-center justify-center rounded-md border border-dashed p-4">
              <div className="flex h-40 w-40 items-center justify-center rounded-md bg-muted">
                {url ? (
                  <div className="flex flex-col items-center gap-2">
                    <QrCode className="h-24 w-24" />
                    <span className="text-xs text-muted-foreground">QR Preview</span>
                  </div>
                ) : (
                  <div className="text-center text-sm text-muted-foreground">
                    <p>Enter a URL to</p>
                    <p>generate preview</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Create QR Code</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
