"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { QrCode, Smartphone, Edit, BarChart3, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function QrLifecycleDemo() {
    const [step, setStep] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [scanCount, setScanCount] = useState(0)

    const steps = [
        {
            title: "Create Your QR Code",
            description: "Generate a dynamic QR code pointing to your destination",
            icon: QrCode,
            color: "from-blue-500 to-cyan-500",
        },
        {
            title: "Share & Print",
            description: "Print on menus, flyers, or share digitally - your QR is ready",
            icon: Smartphone,
            color: "from-purple-500 to-pink-500",
        },
        {
            title: "Track Scans",
            description: "Monitor every scan with real-time analytics",
            icon: BarChart3,
            color: "from-green-500 to-emerald-500",
        },
        {
            title: "Update Destination",
            description: "Change where your QR leads - no reprinting needed!",
            icon: Edit,
            color: "from-orange-500 to-red-500",
        },
        {
            title: "Same QR, New Destination",
            description: "Your QR code stays identical, but now redirects to the new URL",
            icon: RefreshCw,
            color: "from-indigo-500 to-purple-500",
        },
    ]

    useEffect(() => {
        let interval: NodeJS.Timeout
        if (isPlaying) {
            interval = setInterval(() => {
                setStep((prev) => {
                    if (prev === steps.length - 1) {
                        setIsPlaying(false)
                        return prev
                    }
                    if (prev === 2) {
                        setScanCount((c) => c + 1)
                    }
                    return prev + 1
                })
            }, 2500)
        }
        return () => clearInterval(interval)
    }, [isPlaying, steps.length])

    const handlePlay = () => {
        setStep(0)
        setScanCount(0)
        setIsPlaying(true)
    }

    const handleReset = () => {
        setStep(0)
        setScanCount(0)
        setIsPlaying(false)
    }

    return (
        <div className="w-full max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-background to-muted/30 border-2">
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        {steps.map((s, i) => (
                            <div
                                key={i}
                                className={`flex-1 h-2 rounded-full mx-1 transition-all duration-500 ${i <= step ? "bg-primary" : "bg-muted"
                                    }`}
                            />
                        ))}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Create</span>
                        <span>Share</span>
                        <span>Track</span>
                        <span>Update</span>
                        <span>Redirect</span>
                    </div>
                </div>

                {/* Main Animation Area */}
                <div className="relative min-h-[400px] flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={step}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-center space-y-6"
                        >
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                                className={`mx-auto w-24 h-24 rounded-2xl bg-gradient-to-br ${steps[step].color} p-6 shadow-lg`}
                            >
                                {(() => {
                                    const IconComponent = steps[step].icon
                                    return <IconComponent className="w-full h-full text-white" />
                                })()}
                            </motion.div>

                            {/* Title */}
                            <motion.h3
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl font-bold"
                            >
                                {steps[step].title}
                            </motion.h3>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-muted-foreground max-w-md mx-auto"
                            >
                                {steps[step].description}
                            </motion.p>

                            {/* Visual Elements */}
                            <div className="pt-6">
                                {step === 0 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.5, type: "spring" }}
                                        className="inline-block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl"
                                    >
                                        <div className="w-32 h-32 bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-lg flex items-center justify-center">
                                            <QrCode className="w-24 h-24 text-white dark:text-gray-900" />
                                        </div>
                                        <p className="mt-2 text-xs text-center text-muted-foreground">
                                            example.com/menu
                                        </p>
                                    </motion.div>
                                )}

                                {step === 1 && (
                                    <motion.div
                                        initial={{ rotate: -10, scale: 0.8 }}
                                        animate={{ rotate: 0, scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="inline-block"
                                    >
                                        <div className="relative">
                                            <div className="w-48 h-64 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 rounded-lg shadow-2xl p-4">
                                                <div className="bg-white dark:bg-gray-700 rounded p-2 mb-2">
                                                    <QrCode className="w-16 h-16 mx-auto" />
                                                </div>
                                                <div className="space-y-1">
                                                    <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-3/4" />
                                                    <div className="h-2 bg-gray-300 dark:bg-gray-600 rounded w-1/2" />
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 2 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="space-y-4"
                                    >
                                        <div className="inline-flex items-center gap-4 bg-primary/10 px-6 py-4 rounded-lg">
                                            <BarChart3 className="w-8 h-8 text-primary" />
                                            <div className="text-left">
                                                <p className="text-sm text-muted-foreground">Total Scans</p>
                                                <motion.p
                                                    key={scanCount}
                                                    initial={{ scale: 1.5, color: "#10b981" }}
                                                    animate={{ scale: 1, color: "inherit" }}
                                                    className="text-3xl font-bold"
                                                >
                                                    {scanCount}
                                                </motion.p>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 3 && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="space-y-3"
                                    >
                                        <div className="inline-block bg-muted p-4 rounded-lg">
                                            <p className="text-sm text-muted-foreground mb-2">Old URL</p>
                                            <p className="font-mono text-sm line-through">example.com/menu</p>
                                        </div>
                                        <motion.div
                                            initial={{ x: -20 }}
                                            animate={{ x: 0 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <RefreshCw className="w-6 h-6 mx-auto text-primary animate-spin" />
                                        </motion.div>
                                        <div className="inline-block bg-primary/10 p-4 rounded-lg">
                                            <p className="text-sm text-muted-foreground mb-2">New URL</p>
                                            <p className="font-mono text-sm text-primary font-bold">
                                                example.com/new-menu
                                            </p>
                                        </div>
                                    </motion.div>
                                )}

                                {step === 4 && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="space-y-4"
                                    >
                                        <div className="inline-block p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl">
                                            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 rounded-lg flex items-center justify-center">
                                                <QrCode className="w-24 h-24 text-white dark:text-gray-900" />
                                            </div>
                                            <motion.p
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.5 }}
                                                className="mt-2 text-xs text-center text-primary font-bold"
                                            >
                                                → example.com/new-menu
                                            </motion.p>
                                        </div>
                                        <p className="text-sm text-muted-foreground">
                                            Same QR code, new destination! ✨
                                        </p>
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-4 mt-8">
                    <Button
                        onClick={handlePlay}
                        disabled={isPlaying}
                        size="lg"
                        className="min-w-32"
                    >
                        {isPlaying ? "Playing..." : "Play Demo"}
                    </Button>
                    <Button onClick={handleReset} variant="outline" size="lg">
                        Reset
                    </Button>
                </div>

                {/* Step Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                    {steps.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => !isPlaying && setStep(i)}
                            disabled={isPlaying}
                            className={`w-2 h-2 rounded-full transition-all ${i === step ? "bg-primary w-8" : "bg-muted hover:bg-muted-foreground/50"
                                }`}
                            aria-label={`Go to step ${i + 1}`}
                        />
                    ))}
                </div>
            </Card>
        </div>
    )
}
