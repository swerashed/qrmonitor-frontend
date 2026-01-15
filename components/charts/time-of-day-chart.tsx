"use client"

import { Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ChartTooltip } from "@/components/ui/chart"


export function TimeOfDayChart({ data }: any) {
  const renderLegend = () => (
    <div className="mt-4 flex justify-center text-xs text-muted-foreground uppercase">
      <div className="flex items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-primary inline-block" />
        <span>Scans On Last 24 Hours</span>
      </div>
    </div>
  )
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 20,
          }}
        >
          <XAxis
            dataKey="hour"
            tickFormatter={(value) => value}
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
                const hourStr = payload[0].payload.hour
                const [h, m] = hourStr.split(':')
                const hourNum = parseInt(h)
                const formattedHour = `${hourNum > 12 ? hourNum - 12 : (hourNum === 0 ? 12 : hourNum)}:${m} ${hourNum >= 12 ? "PM" : "AM"}`

                return (
                  <ChartTooltip className="border-primary/10 bg-background">
                    <div className="flex flex-col gap-2">
                      <p className="text-xs text-muted-foreground">{formattedHour}</p>
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
          <Line type="monotone" dataKey="scans" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />

          <Legend content={renderLegend} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
