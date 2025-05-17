"use client"

import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ChartTooltip } from "@/components/ui/chart"

const topQrCodesData = [
  { name: "Product Landing", scans: 423 },
  { name: "Event Registration", scans: 352 },
  { name: "Promotional Offer", scans: 289 },
  { name: "Contact Info", scans: 187 },
  { name: "Digital Menu", scans: 156 },
]

export function TopQrCodesChart() {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={topQrCodesData}
          layout="vertical"
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
          <YAxis
            type="category"
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            width={100}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltip className="border-primary/10 bg-background">
                    <div className="flex flex-col gap-2">
                      <p className="text-sm font-medium">{payload[0].payload.name}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <p className="text-sm">{payload[0].value} scans</p>
                      </div>
                    </div>
                  </ChartTooltip>
                )
              }

              return null
            }}
          />
          <Bar dataKey="scans" fill="hsl(var(--primary))" radius={[4, 4, 4, 4]} barSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}
