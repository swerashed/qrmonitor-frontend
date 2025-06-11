"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"

interface LocationData {
  country: string
  count: number
}

export function LocationMapChart({ data }: { data: LocationData[] }) {
  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-[200px] w-full flex items-center justify-center text-sm text-muted-foreground">
        No location data available
      </div>
    )
  }

  // Calculate total scans for percentage calculation
  const totalScans = data.reduce((sum, item) => sum + item.count, 0)

  // Map data to Recharts format and generate dynamic colors
  const chartData = data.map((item, index) => {
    const percentage = ((item.count / totalScans) * 100).toFixed(1)
    const opacity = Math.max(0.3, 1 - index * 0.2) // decrease opacity per slice

    return {
      name: item.country,
      value: item.count,
      percentage,
      color: `hsl(var(--primary) / ${opacity.toFixed(2)})`,
    }
  })

  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const percent = parseFloat(payload[0].payload.percentage)
                return (
                  <ChartTooltip className="border-primary/10 bg-background">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-muted-foreground">{payload[0].name}</p>
                      <div className="flex items-center gap-2">
                        <div
                          className="h-2 w-2 rounded-full"
                          style={{ backgroundColor: payload[0].payload.color }}
                        />
                        <p className="text-sm font-medium">
                          {payload[0].value} scan{payload[0].value !== 1 ? 's' : ''} ({percent}%)
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