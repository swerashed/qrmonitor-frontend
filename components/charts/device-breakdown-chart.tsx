"use client"

import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { ChartTooltip } from "@/components/ui/chart"
import { useEffect, useState } from "react"

interface DeviceData {
  device: string
  count: number
  percentage: number
}

export function DeviceBreakdownChart({ data }: { data: DeviceData[] }) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    if (!Array.isArray(data) || data.length === 0) return

    // Define color palette
    const colors = {
      mobile: "hsl(var(--primary))",
      desktop: "hsl(var(--secondary))",
      tablet: "hsl(var(--accent))",
    }

    // Map incoming data to chart format
    const mappedData = data.map((item, index) => ({
      name: item.device,
      value: item.count,
      percentage: item.percentage,
      color: colors[item.device.toLowerCase() as keyof typeof colors] || "hsl(var(--muted))",
    }))

    setChartData(mappedData)
  }, [data])

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-[200px] w-full flex items-center justify-center text-sm text-muted-foreground">
        No device data available
      </div>
    )
  }

  const renderLegend = (props: any) => {
    const { payload } = props
    return (
      <div className="mt-6 flex justify-center gap-4 flex-wrap text-xs text-muted-foreground uppercase">
        {payload.map((entry: any, index: number) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full inline-block"
              style={{ backgroundColor: entry.color }}
            />
            <span>{entry.value}</span>
          </div>
        ))}
      </div>
    )
  }
  return (
    <div className="h-full w-full">
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

          <Legend
            content={renderLegend}
          />


        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}