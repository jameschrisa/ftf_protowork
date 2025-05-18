"use client"

import * as React from "react"
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

interface BarChartDataItem {
  name: string
  critical: number
  high: number
  medium: number
  low: number
}

interface BarChartCardProps {
  title: string
  description: string
  data: BarChartDataItem[]
  trend: { value: number; direction: "up" | "down" }
  showSelector?: boolean
}

export function BarChartCard({
  title,
  description,
  data,
  trend,
  showSelector = false,
}: BarChartCardProps) {
  const [activeMonth, setActiveMonth] = React.useState(data[0].name)

  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {showSelector && (
          <div className="pt-2">
            <Select value={activeMonth} onValueChange={setActiveMonth}>
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {data.map((item) => (
                  <SelectItem key={item.name} value={item.name}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="h-[300px] w-full pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              data={data} 
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
              barSize={30}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis 
                dataKey="name"
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
                interval={0}
              />
              <YAxis 
                tick={{ fontSize: 12 }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                cursor={false}
                contentStyle={{
                  backgroundColor: "hsl(var(--background))",
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "6px",
                }}
              />
              <Legend 
                verticalAlign="top"
                height={36}
                iconType="circle"
                formatter={(value) => value.charAt(0).toUpperCase() + value.slice(1)}
              />
              <Bar
                name="Critical"
                dataKey="critical"
                stackId="a"
                fill="hsl(var(--critical))"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                name="High"
                dataKey="high"
                stackId="a"
                fill="hsl(var(--high))"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                name="Medium"
                dataKey="medium"
                stackId="a"
                fill="hsl(var(--medium))"
                radius={[0, 0, 0, 0]}
              />
              <Bar
                name="Low"
                dataKey="low"
                stackId="a"
                fill="hsl(var(--low))"
                radius={[0, 0, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
      <div className="flex flex-col gap-2 p-6 pt-0 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          {trend.direction === "up" ? (
            <>
              Findings increased by {trend.value}% this month{" "}
              <TrendingUp className="h-4 w-4 text-red-500" />
            </>
          ) : (
            <>
              Findings decreased by {trend.value}% this month{" "}
              <TrendingDown className="h-4 w-4 text-emerald-500" />
            </>
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing findings by severity level
        </div>
      </div>
    </Card>
  )
}
