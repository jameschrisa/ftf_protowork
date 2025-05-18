"use client"

import * as React from "react"
import { Cell, PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"
import { TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { ChartDataItem } from "./data"

interface RadialChartCardProps {
  title: string
  description: string
  data: ChartDataItem[]
  trend: { value: number; direction: "up" | "down" }
  valueLabel: string
  showSelector?: boolean
}

export function RadialChartCard({
  title,
  description,
  data,
  trend,
  valueLabel,
  showSelector = false,
}: RadialChartCardProps) {
  const [activeItem, setActiveItem] = React.useState(data[0].name)
  const activeData = React.useMemo(
    () => data.find((item) => item.name === activeItem) || data[0],
    [data, activeItem]
  )

  // Create chart data with background
  const chartData = React.useMemo(() => [
    {
      name: "background",
      value: 100,
      fill: "hsl(var(--muted))",
    },
    {
      name: showSelector ? activeData.name : data[0].name,
      value: showSelector ? activeData.value : data[0].value,
      fill: showSelector ? activeData.fill : data[0].fill,
    }
  ], [activeData, data, showSelector])

  const getTrendMessage = (direction: "up" | "down", value: number, metric: string) => {
    if (metric.toLowerCase().includes("efficiency") || metric.toLowerCase().includes("reliability")) {
      return direction === "up" 
        ? `Performance improved by ${value}% this month` 
        : `Performance decreased by ${value}% this month`
    }
    return direction === "up" 
      ? `Increased by ${value}% this month` 
      : `Decreased by ${value}% this month`
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {showSelector && (
          <div className="pt-2">
            <Select value={activeItem} onValueChange={setActiveItem}>
              <SelectTrigger className="h-8 w-full">
                <SelectValue placeholder="Select metric" />
              </SelectTrigger>
              <SelectContent>
                {data.map((item) => (
                  <SelectItem key={item.name} value={item.name}>
                    <div className="flex items-center gap-2">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: item.fill }}
                      />
                      <span>{item.name}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <div className="relative mx-auto w-full h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <RadialBarChart
              innerRadius="65%"
              outerRadius="85%"
              data={chartData}
              startAngle={90}
              endAngle={-270}
              barSize={40}
            >
              <PolarAngleAxis
                type="number"
                domain={[0, 100]}
                angleAxisId={0}
                tick={false}
              />
              <RadialBar
                background={false}
                dataKey="value"
                cornerRadius={30}
              >
                {chartData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={entry.fill}
                  />
                ))}
              </RadialBar>
            </RadialBarChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold">
              {showSelector ? activeData.value : data[0].value}%
            </span>
            <span className="text-sm text-muted-foreground">
              {valueLabel}
            </span>
          </div>
        </div>
      </CardContent>
      <div className="border-t">
        <div className="px-4 py-3">
          <div className="flex items-center gap-2 font-medium leading-none">
            {trend.direction === "up" ? (
              <>
                {getTrendMessage("up", trend.value, showSelector ? activeData.name : data[0].name)}{" "}
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </>
            ) : (
              <>
                {getTrendMessage("down", trend.value, showSelector ? activeData.name : data[0].name)}{" "}
                <TrendingDown className="h-4 w-4 text-red-500" />
              </>
            )}
          </div>
          <div className="mt-1 text-sm leading-none text-muted-foreground">
            {showSelector ? (
              <>Current metric: {activeData.name}</>
            ) : (
              <>30-day performance trend</>
            )}
          </div>
        </div>
      </div>
    </Card>
  )
}
