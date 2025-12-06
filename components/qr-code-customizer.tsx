"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
    DOT_STYLES,
    CORNER_SQUARE_STYLES,
    CORNER_DOT_STYLES,
    ERROR_CORRECTION_LEVELS,
    QR_SHAPES
} from "@/lib/qr-code-defaults"
import { Upload, X } from "lucide-react"
import { Button } from "./ui/button"

interface QRCodeCustomizerProps {
    options: any
    onChange: (options: any) => void
}

export function QRCodeCustomizer({ options, onChange }: QRCodeCustomizerProps) {
    const [imagePreview, setImagePreview] = useState<string>(options.image || "")

    const updateOptions = (path: string[], value: any) => {
        const newOptions = { ...options }
        let current = newOptions

        for (let i = 0; i < path.length - 1; i++) {
            current = current[path[i]]
        }

        current[path[path.length - 1]] = value
        onChange(newOptions)
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                const result = reader.result as string
                setImagePreview(result)
                updateOptions(["image"], result)
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImage = () => {
        setImagePreview("")
        updateOptions(["image"], "")
    }

    return (
        <Tabs defaultValue="style" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="style">Style</TabsTrigger>
                <TabsTrigger value="colors">Colors</TabsTrigger>
                <TabsTrigger value="logo">Logo</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="style" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Dot Style</CardTitle>
                        <CardDescription>Choose the style for QR code dots</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            {DOT_STYLES.map((style) => (
                                <button
                                    key={style.value}
                                    type="button"
                                    onClick={() => updateOptions(["dotsOptions", "type"], style.value)}
                                    className={`p-4 border-2 rounded-lg transition-all hover:border-primary ${options.dotsOptions?.type === style.value
                                        ? "border-primary bg-primary/5"
                                        : "border-border"
                                        }`}
                                >
                                    <div className="text-sm font-medium">{style.label}</div>
                                </button>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Corner Styles</CardTitle>
                        <CardDescription>Customize the corner squares and dots</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Corner Square Style</Label>
                            <Select
                                value={options.cornersSquareOptions?.type === "" ? "none" : options.cornersSquareOptions?.type || "none"}
                                onValueChange={(value) => updateOptions(["cornersSquareOptions", "type"], value === "none" ? "" : value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select style" />
                                </SelectTrigger>
                                <SelectContent className="bg-background">
                                    {CORNER_SQUARE_STYLES.map((style) => (
                                        <SelectItem key={style.value} value={style.value}>
                                            {style.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Corner Dot Style</Label>
                            <Select
                                value={options.cornersDotOptions?.type === "" ? "none" : options.cornersDotOptions?.type || "none"}
                                onValueChange={(value) => updateOptions(["cornersDotOptions", "type"], value === "none" ? "" : value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select style" />
                                </SelectTrigger>
                                <SelectContent className="bg-background">
                                    {CORNER_DOT_STYLES.map((style) => (
                                        <SelectItem key={style.value} value={style.value}>
                                            {style.label}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="colors" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Dot Color</CardTitle>
                        <CardDescription>Set the color for QR code dots</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Input
                                type="color"
                                value={options.dotsOptions?.color || "#000000"}
                                onChange={(e) => updateOptions(["dotsOptions", "color"], e.target.value)}
                                className="w-20 h-10"
                            />
                            <Input
                                type="text"
                                value={options.dotsOptions?.color || "#000000"}
                                onChange={(e) => updateOptions(["dotsOptions", "color"], e.target.value)}
                                placeholder="#000000"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Background Color</CardTitle>
                        <CardDescription>Set the background color or make it transparent</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div className="space-y-0.5">
                                <Label>Transparent Background</Label>
                                <div className="text-sm text-muted-foreground">
                                    Remove background for PNG export
                                </div>
                            </div>
                            <Switch
                                checked={options.backgroundOptions?.color === "transparent"}
                                onCheckedChange={(checked) =>
                                    updateOptions(["backgroundOptions", "color"], checked ? "transparent" : "#ffffff")
                                }
                            />
                        </div>

                        {options.backgroundOptions?.color !== "transparent" && (
                            <div className="flex items-center gap-4">
                                <Input
                                    type="color"
                                    value={options.backgroundOptions?.color || "#ffffff"}
                                    onChange={(e) => updateOptions(["backgroundOptions", "color"], e.target.value)}
                                    className="w-20 h-10"
                                />
                                <Input
                                    type="text"
                                    value={options.backgroundOptions?.color || "#ffffff"}
                                    onChange={(e) => updateOptions(["backgroundOptions", "color"], e.target.value)}
                                    placeholder="#ffffff"
                                />
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Corner Colors</CardTitle>
                        <CardDescription>Customize corner square and dot colors</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Corner Square Color</Label>
                            <div className="flex items-center gap-4">
                                <Input
                                    type="color"
                                    value={options.cornersSquareOptions?.color || "#000000"}
                                    onChange={(e) => updateOptions(["cornersSquareOptions", "color"], e.target.value)}
                                    className="w-20 h-10"
                                />
                                <Input
                                    type="text"
                                    value={options.cornersSquareOptions?.color || "#000000"}
                                    onChange={(e) => updateOptions(["cornersSquareOptions", "color"], e.target.value)}
                                    placeholder="#000000"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Corner Dot Color</Label>
                            <div className="flex items-center gap-4">
                                <Input
                                    type="color"
                                    value={options.cornersDotOptions?.color || "#000000"}
                                    onChange={(e) => updateOptions(["cornersDotOptions", "color"], e.target.value)}
                                    className="w-20 h-10"
                                />
                                <Input
                                    type="text"
                                    value={options.cornersDotOptions?.color || "#000000"}
                                    onChange={(e) => updateOptions(["cornersDotOptions", "color"], e.target.value)}
                                    placeholder="#000000"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="logo" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Logo Image</CardTitle>
                        <CardDescription>Add a logo to the center of your QR code</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {imagePreview ? (
                            <div className="relative">
                                <img
                                    src={imagePreview}
                                    alt="Logo preview"
                                    className="w-32 h-32 object-contain border rounded-lg"
                                />
                                <Button
                                    type="button"
                                    variant="destructive"
                                    size="icon"
                                    className="absolute -top-2 -right-2 h-6 w-6"
                                    onClick={removeImage}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>
                        ) : (
                            <div className="border-2 border-dashed rounded-lg p-8 text-center">
                                <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
                                <div className="mt-4">
                                    <Label htmlFor="logo-upload" className="cursor-pointer">
                                        <span className="text-primary hover:underline">Upload a logo</span>
                                        <Input
                                            id="logo-upload"
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={handleImageUpload}
                                        />
                                    </Label>
                                </div>
                                <p className="text-xs text-muted-foreground mt-2">PNG, JPG, SVG up to 10MB</p>
                            </div>
                        )}

                        {imagePreview && (
                            <>
                                <div className="space-y-2">
                                    <Label>Logo Size: {Math.round((options.imageOptions?.imageSize || 0.4) * 100)}%</Label>
                                    <Slider
                                        value={[(options.imageOptions?.imageSize || 0.4) * 100]}
                                        onValueChange={(value) => updateOptions(["imageOptions", "imageSize"], value[0] / 100)}
                                        min={10}
                                        max={50}
                                        step={1}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Logo Margin: {options.imageOptions?.margin || 0}px</Label>
                                    <Slider
                                        value={[options.imageOptions?.margin || 0]}
                                        onValueChange={(value) => updateOptions(["imageOptions", "margin"], value[0])}
                                        min={0}
                                        max={20}
                                        step={1}
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label>Hide Background Dots</Label>
                                        <div className="text-sm text-muted-foreground">
                                            Remove dots behind the logo
                                        </div>
                                    </div>
                                    <Switch
                                        checked={options.imageOptions?.hideBackgroundDots ?? true}
                                        onCheckedChange={(checked) =>
                                            updateOptions(["imageOptions", "hideBackgroundDots"], checked)
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Margin</CardTitle>
                        <CardDescription>Adjust the margin around your QR code</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <Label>Margin: {options.margin || 10}px</Label>
                            <Slider
                                value={[options.margin || 10]}
                                onValueChange={(value) => updateOptions(["margin"], value[0])}
                                min={0}
                                max={50}
                                step={5}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Error Correction</CardTitle>
                        <CardDescription>Higher levels allow the QR code to be read even if partially damaged</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Select
                            value={options.qrOptions?.errorCorrectionLevel || "Q"}
                            onValueChange={(value) => updateOptions(["qrOptions", "errorCorrectionLevel"], value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select level" />
                            </SelectTrigger>
                            <SelectContent className="bg-background">
                                {ERROR_CORRECTION_LEVELS.map((level) => (
                                    <SelectItem key={level.value} value={level.value}>
                                        <div>
                                            <div className="font-medium">{level.label}</div>
                                            <div className="text-xs text-muted-foreground">{level.description}</div>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Shape</CardTitle>
                        <CardDescription>Choose the overall shape of your QR code</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Select
                            value={options.shape || "square"}
                            onValueChange={(value) => updateOptions(["shape"], value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select shape" />
                            </SelectTrigger>
                            <SelectContent className="bg-background">
                                {QR_SHAPES.map((shape) => (
                                    <SelectItem key={shape.value} value={shape.value}>
                                        {shape.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}
