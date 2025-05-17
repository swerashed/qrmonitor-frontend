"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { ChartTooltip } from "@/components/ui/chart"

const deviceData = [
  { name: "Mobile", value: 58, color: "hsl(var(--primary))" },
  { name: "Desktop", value: 31, color: "hsl(var(--primary) / 0.7)" },
  { name: "Tablet", value: 11, color: "hsl(var(--primary) / 0.4)" },
]

export function DeviceBreakdownChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={deviceData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={2} dataKey="value">
            {deviceData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <ChartTooltip className="border-primary/10 bg-background">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: payload[0].payload.color }} />
                        <p className="text-sm font-medium">
                          {payload[0].name}: {payload[0].value}%
                        </p>
                      </div>
                    </div>
                  </ChartTooltip>
                )
              }

              return null
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
