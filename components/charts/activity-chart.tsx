"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartTooltip } from "@/components/ui/chart"

// Sample data for the last 30 days
const generateActivityData = () => {
  const data = []
  const now = new Date()

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now)
    date.setDate(date.getDate() - i)

    // Generate random scan count with some patterns
    let scans = Math.floor(Math.random() * 30) + 20

    // Add some patterns - weekends have more scans
    if (date.getDay() === 0 || date.getDay() === 6) {
      scans += Math.floor(Math.random() * 20) + 10
    }

    // Add a trend - increasing over time
    scans += Math.floor(i / 3)

    data.push({
      date: date.toISOString().split("T")[0],
      scans,
    })
  }

  return data
}

const activityData = generateActivityData()

export function ActivityChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scan Activity</CardTitle>
        <CardDescription>Scan activity over the last 30 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={activityData}
              margin={{
                top: 5,
                right: 10,
                left: 10,
                bottom: 0,
              }}
            >
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
              <Line
                type="monotone"
                dataKey="scans"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                activeDot={{
                  r: 6,
                  style: { fill: "hsl(var(--primary))", opacity: 0.8 },
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
