"use client"

import { Area, AreaChart, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ChartTooltip } from "@/components/ui/chart"
import { CardContent } from "../ui/card"


export function ScansOverTimeChart({ data }: any) {

  if (!Array.isArray(data) || data.length === 0) {
    return (
      <div className="h-[200px] w-full flex items-center justify-center text-sm text-muted-foreground">
        No data available
      </div>
    )
  }
  

  const renderLegend = () => (
    <div className="mt-4 flex justify-center text-xs text-muted-foreground uppercase">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary inline-block" />
        <span>Scans Over Time</span>
      </div>
    </div>
  )


  return (
    <CardContent className="flex justify-center items-center h-full">
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 20,
          }}
        >
          <defs>
            <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
              <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="date"
            tickFormatter={(value) => {
              const date = new Date(value)
              return `${date.getDate()}/${date.getMonth() + 1}`
            }}
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            tickFormatter={(value) => `${value}`}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                const date = new Date(payload[0].payload.date)
                const formattedDate = date.toLocaleDateString("en-US", {
                  weekday: "short",
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })

                return (
                  <ChartTooltip className="border-primary/10 bg-background">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-muted-foreground">{formattedDate}</p>
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <p className="text-sm font-medium">{payload[0].value} scans</p>
                      </div>
                    </div>
                  </ChartTooltip>
                )
              }

              return null
            }}
          />
          <Area
            type="monotone"
            dataKey="scans"
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorScans)"
          />

          <Legend content={renderLegend} />

        </AreaChart>
      </ResponsiveContainer>
    </div>
    </CardContent>

  )
}
