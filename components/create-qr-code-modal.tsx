"use client"
import type React from "react"
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid'
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
import { CreateQRCode } from "@/services/QRCodeServices"
import ClientQR from "./qr-code-creator"
import { CreateQrCodeModalProps } from "@/interfaces"



export function CreateQrCodeModal({ open, onOpenChange }: CreateQrCodeModalProps) {
  const [name, setName] = useState("")
  const [url, setUrl] = useState("")
  const [description, setDescription] = useState("")
  const [qrCodeId, setQrCodeId] = useState<string | null>(null)
  const [trackingEnabled, setTrackingEnabled] = useState(true)
  const [qrCodeOption, setQRCodeOption] = useState({ "type": "canvas", "shape": "square", width: 300, height: 300, "data": "", "margin": 5, "qrOptions": { "typeNumber": "0", "mode": "Byte", "errorCorrectionLevel": "Q" }, "imageOptions": { "saveAsBlob": true, "hideBackgroundDots": false, "imageSize": 0, "margin": 0 }, "dotsOptions": { "type": "dots", "color": "#000000", "roundSize": true, "gradient": null }, "backgroundOptions": { "round": 0, "color": "#ffffff" }, "image": "", "dotsOptionsHelper": { "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#6a1a4c", "color2": "#6a1a4c", "rotation": "0" } }, "cornersSquareOptions": { "type": "", "color": "#000000" }, "cornersSquareOptionsHelper": { "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#000000", "color2": "#000000", "rotation": "0" } }, "cornersDotOptions": { "type": "", "color": "#000000" }, "cornersDotOptionsHelper": { "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#000000", "color2": "#000000", "rotation": "0" } }, "backgroundOptionsHelper": { "colorType": { "single": true, "gradient": false }, "gradient": { "linear": true, "radial": false, "color1": "#ffffff", "color2": "#ffffff", "rotation": "0" } } })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!qrCodeId) {
      console.error("No QR code ID generated")
      return
    }

    const data = {
      id: qrCodeId,
      name,
      description,
      targetUrl: url,
      trackingEnabled,
      settings: qrCodeOption
    }

    try {
      const qrCodeCreateResponse = await CreateQRCode(data)
      // Reset form
      setName("")
      setUrl("")
      setDescription("")
      setQrCodeId(null)
      setTrackingEnabled(true)
      onOpenChange(false)
    } catch (error) {
      console.error("Failed to create QR code", error)
    }
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
              <Label htmlFor="description">QR Code Description</Label>
              <Input
                id="description"
                placeholder="e.g., Campaign for product X"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
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
                onChange={(e) => {
                  const newId = uuidv4()
                  const scanUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/scan/${newId}`

                  setUrl(e.target.value)
                  setQrCodeId(newId)
                  setQRCodeOption((prev) => ({
                    ...prev,
                    data: scanUrl
                  }))
                }}
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
                    <ClientQR width={160} height={160} qrCodeOption={qrCodeOption} />

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