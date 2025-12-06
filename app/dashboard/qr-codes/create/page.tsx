"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import { ArrowLeft, Download, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { QRCodeCustomizer } from "@/components/qr-code-customizer"
import ClientQR from "@/components/qr-code-creator"
import { DEFAULT_QR_OPTIONS } from "@/lib/qr-code-defaults"
import { CreateQRCode } from "@/services/QRCodeServices"
import { useMutation } from "@tanstack/react-query"
import { toast } from "sonner"
import QRCodeStyling from "qr-code-styling"

export default function CreateQRCodePage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const [description, setDescription] = useState("")
    const [qrCodeId, setQrCodeId] = useState<string | null>(null)
    const [trackingEnabled, setTrackingEnabled] = useState(true)
    const [qrCodeOptions, setQrCodeOptions] = useState(DEFAULT_QR_OPTIONS)

    const { mutate, isPending } = useMutation({
        mutationFn: CreateQRCode,
        onSuccess: () => {
            toast.success("QR Code created successfully!", {
                description: "Your QR code has been created and is ready to use.",
            })
            router.push("/dashboard/qr-codes")
        },
        onError: (error: any) => {
            toast.error("Failed to create QR Code", {
                description: error?.message || "Something went wrong. Please try again.",
            })
        },
    })

    const handleUrlChange = (newUrl: string) => {
        setUrl(newUrl)
        if (newUrl) {
            const newId = uuidv4()
            const scanUrl = `${process.env.NEXT_PUBLIC_FRONTEND_URL}/scan/${newId}`
            setQrCodeId(newId)
            setQrCodeOptions((prev) => ({
                ...prev,
                data: scanUrl,
            }))
        } else {
            setQrCodeId(null)
            setQrCodeOptions((prev) => ({
                ...prev,
                data: "",
            }))
        }
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!qrCodeId) {
            toast.error("Invalid QR Code", {
                description: "Please enter a valid URL to generate a QR code.",
            })
            return
        }

        const data = {
            id: qrCodeId,
            name,
            description,
            targetUrl: url,
            trackingEnabled,
            settings: qrCodeOptions,
        }

        mutate(data)
    }

    const handleDownload = () => {
        if (!url) {
            toast.error("Cannot download", {
                description: "Please enter a URL first.",
            })
            return
        }

        const qrCode = new QRCodeStyling(qrCodeOptions)
        qrCode.download({
            extension: "png",
            name: name || "qr-code",
        })
    }

    return (
        <div className="flex flex-col gap-6 p-4 md:p-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => router.push("/dashboard/qr-codes")}
                >
                    <ArrowLeft className="h-5 w-5" />
                </Button>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Create QR Code</h1>
                    <p className="text-muted-foreground">
                        Customize your QR code with advanced styling options
                    </p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 lg:grid-cols-2">
                    {/* Left Column - Form and Customization */}
                    <div className="space-y-6 lg:pr-6">
                        {/* Basic Information */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Basic Information</CardTitle>
                                <CardDescription>
                                    Enter the details for your QR code
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">QR Code Name *</Label>
                                    <Input
                                        id="name"
                                        placeholder="e.g., Product Landing Page"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="url">Redirect URL *</Label>
                                    <Input
                                        id="url"
                                        type="url"
                                        placeholder="https://example.com"
                                        value={url}
                                        onChange={(e) => handleUrlChange(e.target.value)}
                                        required
                                    />
                                    <p className="text-xs text-muted-foreground">
                                        The URL where users will be redirected when they scan the QR code
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="e.g., Campaign for product X"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={3}
                                    />
                                </div>

                                <div className="flex items-center justify-between pt-2">
                                    <div className="space-y-0.5">
                                        <Label htmlFor="tracking">Enable Tracking</Label>
                                        <div className="text-sm text-muted-foreground">
                                            Collect analytics data when this QR code is scanned
                                        </div>
                                    </div>
                                    <Switch
                                        id="tracking"
                                        checked={trackingEnabled}
                                        onCheckedChange={setTrackingEnabled}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        {/* Customization Options */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Customization</CardTitle>
                                <CardDescription>
                                    Personalize the appearance of your QR code
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <QRCodeCustomizer
                                    options={qrCodeOptions}
                                    onChange={setQrCodeOptions}
                                />
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column - Preview (Fixed Position) */}
                    <div className="hidden lg:block">
                        <div className="fixed top-24 right-8 w-[calc(50%-4rem)] max-w-xl">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Preview</CardTitle>
                                    <CardDescription>
                                        Live preview of your QR code
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-8 bg-muted/30">
                                        {url ? (
                                            <div className="flex flex-col items-center gap-4">
                                                <ClientQR
                                                    width={qrCodeOptions.width}
                                                    height={qrCodeOptions.height}
                                                    qrCodeOption={qrCodeOptions}
                                                />
                                                <div className="text-center">
                                                    <p className="text-sm font-medium">{name || "Untitled QR Code"}</p>
                                                    <p className="text-xs text-muted-foreground truncate max-w-[300px]">
                                                        {url}
                                                    </p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center text-muted-foreground">
                                                <div className="mx-auto h-32 w-32 rounded-lg bg-muted flex items-center justify-center mb-4">
                                                    <p className="text-sm">No Preview</p>
                                                </div>
                                                <p className="text-sm">Enter a URL to generate preview</p>
                                            </div>
                                        )}
                                    </div>

                                    {url && (
                                        <div className="space-y-3">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full"
                                                onClick={handleDownload}
                                            >
                                                <Download className="mr-2 h-4 w-4" />
                                                Download Preview
                                            </Button>

                                            <div className="text-xs text-muted-foreground space-y-1 p-3 bg-muted/50 rounded-lg">
                                                <p className="font-medium">Scan URL:</p>
                                                <p className="font-mono break-all">
                                                    {qrCodeOptions.data}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Mobile Preview - Shows at bottom on small screens */}
                    <div className="lg:hidden">
                        <Card>
                            <CardHeader>
                                <CardTitle>Preview</CardTitle>
                                <CardDescription>
                                    Live preview of your QR code
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-8 bg-muted/30">
                                    {url ? (
                                        <div className="flex flex-col items-center gap-4">
                                            <ClientQR
                                                width={qrCodeOptions.width}
                                                height={qrCodeOptions.height}
                                                qrCodeOption={qrCodeOptions}
                                            />
                                            <div className="text-center">
                                                <p className="text-sm font-medium">{name || "Untitled QR Code"}</p>
                                                <p className="text-xs text-muted-foreground truncate max-w-[300px]">
                                                    {url}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-center text-muted-foreground">
                                            <div className="mx-auto h-32 w-32 rounded-lg bg-muted flex items-center justify-center mb-4">
                                                <p className="text-sm">No Preview</p>
                                            </div>
                                            <p className="text-sm">Enter a URL to generate preview</p>
                                        </div>
                                    )}
                                </div>

                                {url && (
                                    <div className="space-y-3">
                                        <Button
                                            type="button"
                                            variant="outline"
                                            className="w-full"
                                            onClick={handleDownload}
                                        >
                                            <Download className="mr-2 h-4 w-4" />
                                            Download Preview
                                        </Button>

                                        <div className="text-xs text-muted-foreground space-y-1 p-3 bg-muted/50 rounded-lg">
                                            <p className="font-medium">Scan URL:</p>
                                            <p className="font-mono break-all">
                                                {qrCodeOptions.data}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 mt-6">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.push("/dashboard/qr-codes")}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending || !url}>
                        <Save className="mr-2 h-4 w-4" />
                        {isPending ? "Creating..." : "Create QR Code"}
                    </Button>
                </div>
            </form>
        </div>
    )
}
