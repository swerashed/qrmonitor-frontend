"use client"

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

import { ChartTooltip } from "@/components/ui/chart"

const locationData = [
  { name: "United States", value: 44, color: "hsl(var(--primary))" },
  { name: "United Kingdom", value: 18, color: "hsl(var(--primary) / 0.8)" },
  { name: "Canada", value: 13, color: "hsl(var(--primary) / 0.6)" },
  { name: "Germany", value: 10, color: "hsl(var(--primary) / 0.4)" },
  { name: "Other", value: 15, color: "hsl(var(--primary) / 0.2)" },
]

export function LocationMapChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={locationData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={2} dataKey="value">
            {locationData.map((entry, index) => (
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
