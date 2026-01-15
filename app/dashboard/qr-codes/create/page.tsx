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
import { getBaseUrl } from "@/helpers/getBaseUrl"
import { cn } from "@/lib/utils"

export default function CreateQRCodePage() {
    const router = useRouter()
    const [name, setName] = useState("")
    const [url, setUrl] = useState("")
    const [urlError, setUrlError] = useState("")
    const [description, setDescription] = useState("")
    const [qrCodeId, setQrCodeId] = useState<string | null>(null)
    const [trackingEnabled, setTrackingEnabled] = useState(true)
    const [qrCodeOptions, setQrCodeOptions] = useState(DEFAULT_QR_OPTIONS)

    const validateUrl = (value: string) => {
        if (!value) {
            setUrlError("")
            return false
        }
        // Strict URL Regex: Requires a domain with at least one dot and typical TLD
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/i
        const isValid = urlRegex.test(value)

        if (isValid) {
            setUrlError("")
            return true
        } else {
            setUrlError("Please enter a valid URL (e.g., example.com)")
            return false
        }
    }

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

    const handleUrlChange = async (newUrl: string) => {
        setUrl(newUrl)
        const isValid = validateUrl(newUrl)

        if (isValid) {
            const newId = uuidv4()
            const baseUrl = await getBaseUrl()
            const scanUrl = `${baseUrl}/scan/${newId}`
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

    const handleSubmit = async (e?: React.FormEvent) => {
        e?.preventDefault()

        let finalUrl = url.trim()
        if (finalUrl && !/^https?:\/\//i.test(finalUrl)) {
            finalUrl = `https://${finalUrl}`
        }

        if (!validateUrl(finalUrl)) {
            toast.error("Invalid URL", {
                description: "Please enter a valid URL to generate a QR code.",
            })
            return
        }

        if (!name) {
            toast.error("Name required", {
                description: "Please enter a name for your QR code.",
            })
            return
        }

        const data = {
            id: qrCodeId!,
            name,
            description,
            targetUrl: finalUrl,
            trackingEnabled,
            settings: qrCodeOptions,
        }

        mutate(data)
    }

    const handleDownload = () => {
        let finalUrl = url.trim()
        if (finalUrl && !/^https?:\/\//i.test(finalUrl)) {
            finalUrl = `https://${finalUrl}`
        }

        if (!validateUrl(finalUrl)) {
            toast.error("Cannot download", {
                description: "Please enter a valid URL first.",
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
        <div className="flex flex-col min-h-screen">
            {/* Sticky Header */}
            <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="flex h-16 items-center justify-between px-4 md:px-8  mx-auto">
                    <div className="flex items-center gap-3">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => router.push("/dashboard/qr-codes")}
                            className="rounded-full"
                        >
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div>
                            <h1 className="text-xl font-bold tracking-tight hidden sm:block">Create QR Code</h1>
                            <p className="text-xs text-muted-foreground hidden lg:block">Advanced customization & tracking</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/dashboard/qr-codes")}
                            disabled={isPending}
                            className="h-9 rounded-lg"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => handleSubmit()}
                            disabled={isPending || !url || !!urlError}
                            className="h-9 rounded-lg shadow-sm"
                        >
                            {isPending ? (
                                <span className="flex items-center gap-2">
                                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                                    Creating...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Save className="h-4 w-4" />
                                    Save QR Code
                                </span>
                            )}
                        </Button>
                    </div>
                </div>
            </header>

            <main className="flex-1 mx-auto px-4 py-6 md:py-8 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-12 items-start">
                    {/* Left Column - Form and Customization */}
                    <div className="lg:col-span-8 space-y-8">
                        {/* Basic Information */}
                        <Card className="border-none shadow-sm bg-muted/20">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-lg">Basic Information</CardTitle>
                                <CardDescription>Identify your QR code and set its destination</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="grid gap-6 ">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-sm font-semibold">QR Code Name *</Label>
                                        <Input
                                            id="name"
                                            placeholder="e.g., Summer Campaign 2024"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            required
                                            className="bg-background"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="url" className="text-sm font-semibold">Redirect URL *</Label>
                                            {urlError && <span className="text-[10px] text-destructive font-medium uppercase animate-pulse">{urlError}</span>}
                                        </div>
                                        <Input
                                            id="url"
                                            type="text"
                                            placeholder="https://yourlink.com"
                                            value={url}
                                            onChange={(e) => handleUrlChange(e.target.value)}
                                            required
                                            className={cn("bg-background transition-all", urlError && "border-destructive focus-visible:ring-destructive")}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="description" className="text-sm font-semibold">Internal Notes (Optional)</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="Add some context about where this QR will be used..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        rows={2}
                                        className="bg-background resize-none"
                                    />
                                </div>

                                <div className="flex items-center gap-6 pt-2">
                                    <div className="flex items-center space-x-2 bg-background p-3 rounded-lg border flex-1">
                                        <Switch
                                            id="tracking"
                                            checked={trackingEnabled}
                                            onCheckedChange={setTrackingEnabled}
                                        />
                                        <div className="grid gap-1.5 leading-none">
                                            <Label htmlFor="tracking" className="text-sm font-semibold">Enable Tracking</Label>
                                            <p className="text-xs text-muted-foreground">Log scans, locations, and device types</p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Customization Options */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between px-1">
                                <h2 className="text-lg font-bold">Design Customization</h2>
                            </div>
                            <QRCodeCustomizer
                                options={qrCodeOptions}
                                onChange={setQrCodeOptions}
                            />
                        </div>
                    </div>

                    {/* Right Column - Preview (Sticky) */}
                    <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6 lg:mb-0 mb-10">
                        <Card className="border-none shadow-md overflow-hidden bg-gradient-to-b from-primary/5 to-card">
                            <CardHeader className="text-center pb-2 bg-muted/30 border-b border-background">
                                <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Live Preview</CardTitle>
                            </CardHeader>
                            <CardContent className="pt-8 pb-6 flex flex-col items-center gap-8">
                                <div className="relative group">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/20 to-blue-500/20 rounded-2xl blur-lg transition-all group-hover:blur-xl opacity-70" />
                                    <div className="relative bg-white p-6 rounded-2xl shadow-xl transition-transform hover:scale-[1.02]">
                                        {qrCodeId ? (
                                            <ClientQR
                                                width={200}
                                                height={200}
                                                qrCodeOption={qrCodeOptions}
                                            />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-[200px] w-[200px] text-muted-foreground gap-2">
                                                <div className="h-10 w-10 border-2 border-dashed border-muted-foreground/30 rounded-lg" />
                                                <p className="text-[10px] uppercase font-bold tracking-tighter opacity-50">Waiting for content</p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="w-full space-y-4">
                                    <div className="text-center space-y-1">
                                        <p className="text-lg font-bold truncate max-w-full px-4">{name || "Your QR Name"}</p>
                                        <p className="text-xs text-primary font-medium truncate max-w-full px-8">{url || "Enter URL above"}</p>
                                    </div>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full h-11 rounded-xl shadow-sm border-primary/20 hover:bg-primary/5 hover:text-primary transition-all group"
                                        onClick={handleDownload}
                                        disabled={!url || !!urlError}
                                    >
                                        <Download className="mr-2 h-4 w-4 transition-transform group-hover:translate-y-0.5" />
                                        Download PNG
                                    </Button>

                                    {qrCodeId && (
                                        <div className="p-3.5 rounded-xl bg-muted/40 border border-border/50 space-y-2">
                                            <Label className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground">Generated Bridge URL</Label>
                                            <p className="text-[11px] font-mono break-all leading-relaxed text-foreground opacity-80 line-clamp-2">
                                                {qrCodeOptions.data}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="p-5 rounded-2xl bg-primary/5 border border-primary/10">
                            <div className="flex items-center gap-3 text-primary mb-2">
                                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                <span className="text-xs font-bold uppercase tracking-wider">Pro Tip</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Use high contrast colors for the best readability. Dark dots on a light background scan more reliably across all devices.
                            </p>
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    )
}
