"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

import { ChartTooltip } from "@/components/ui/chart"

// Generate sample data for time of day
const generateTimeOfDayData = () => {
  const data = []

  for (let hour = 0; hour < 24; hour++) {
    // Generate a pattern where scans peak in the morning and evening
    let scans = 0

    if (hour >= 7 && hour <= 10) {
      // Morning peak (7am-10am)
      scans = Math.floor(Math.random() * 15) + 25
    } else if (hour >= 12 && hour <= 14) {
      // Lunch peak (12pm-2pm)
      scans = Math.floor(Math.random() * 15) + 20
    } else if (hour >= 17 && hour <= 21) {
      // Evening peak (5pm-9pm)
      scans = Math.floor(Math.random() * 20) + 30
    } else if (hour >= 22 || hour <= 5) {
      // Night (10pm-5am)
      scans = Math.floor(Math.random() * 10) + 5
    } else {
      // Other times
      scans = Math.floor(Math.random() * 15) + 10
    }

    data.push({
      hour: hour,
      scans: scans,
    })
  }

  return data
}

const timeOfDayData = generateTimeOfDayData()

export function TimeOfDayChart() {
  return (
    <div className="h-[200px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={timeOfDayData}
          margin={{
            top: 5,
            right: 10,
            left: 10,
            bottom: 0,
          }}
        >
          <XAxis
            dataKey="hour"
            tickFormatter={(value) => `${value}:00`}
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
                const hour = payload[0].payload.hour
                const formattedHour = `${hour}:00 ${hour >= 12 ? "PM" : "AM"}`

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
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
