"use client"

import { motion } from "framer-motion"
import { BarChart3, Globe, Smartphone, Clock, TrendingUp, Users } from "lucide-react"
import { Card } from "@/components/ui/card"

export function AnalyticsPreview() {
    const stats = [
        { label: "Total Scans", value: "12,847", icon: BarChart3, color: "text-blue-500" },
        { label: "Countries", value: "43", icon: Globe, color: "text-green-500" },
        { label: "Devices", value: "8,234", icon: Smartphone, color: "text-purple-500" },
    ]

    const recentScans = [
        { time: "2m ago", location: "New York, US", device: "iPhone 14" },
        { time: "5m ago", location: "London, UK", device: "Samsung S23" },
        { time: "8m ago", location: "Tokyo, JP", device: "Pixel 7" },
        { time: "12m ago", location: "Paris, FR", device: "iPhone 13" },
    ]

    return (
        <div className="w-full h-full p-6 space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="p-4 bg-gradient-to-br from-background to-muted/30">
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                    <motion.p
                                        className="text-2xl font-bold"
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                                    >
                                        {stat.value}
                                    </motion.p>
                                </div>
                            </div>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Chart Visualization */}
            <Card className="p-4 bg-gradient-to-br from-background to-muted/30">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <h4 className="text-sm font-semibold">Scan Activity</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">Last 7 days</p>
                </div>
                <div className="flex items-end justify-between h-32 gap-2">
                    {[40, 65, 45, 80, 60, 95, 70].map((height, index) => (
                        <motion.div
                            key={index}
                            className="flex-1 bg-gradient-to-t from-primary to-primary/50 rounded-t"
                            initial={{ height: 0 }}
                            animate={{ height: `${height}%` }}
                            transition={{ delay: index * 0.1 + 0.3, type: "spring", stiffness: 100 }}
                        />
                    ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                </div>
            </Card>

            {/* Recent Activity */}
            <Card className="p-4 bg-gradient-to-br from-background to-muted/30">
                <div className="flex items-center gap-2 mb-3">
                    <Clock className="w-4 h-4 text-primary" />
                    <h4 className="text-sm font-semibold">Recent Scans</h4>
                </div>
                <div className="space-y-2">
                    {recentScans.map((scan, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 + 0.5 }}
                            className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                <div>
                                    <p className="text-xs font-medium">{scan.location}</p>
                                    <p className="text-xs text-muted-foreground">{scan.device}</p>
                                </div>
                            </div>
                            <span className="text-xs text-muted-foreground">{scan.time}</span>
                        </motion.div>
                    ))}
                </div>
            </Card>
        </div>
    )
}
