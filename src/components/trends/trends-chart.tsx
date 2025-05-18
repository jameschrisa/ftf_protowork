import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { format } from "d3-format"

interface TrendsChartProps {
  data: {
    name: string
    value: number
  }[]
  title: string
  dataKey: string
  stroke?: string
  yAxisLabel?: string
  xAxisLabel?: string
  numberFormat?: string
  minDomain?: number
  maxDomain?: number
}

export function TrendsChart({ 
  data, 
  title, 
  dataKey, 
  stroke = "hsl(var(--primary))",
  yAxisLabel,
  xAxisLabel = "Time Period",
  numberFormat = ",.0f",
  minDomain,
  maxDomain
}: TrendsChartProps) {
  const minValue = minDomain ?? Math.min(...data.map(d => d.value))
  const maxValue = maxDomain ?? Math.max(...data.map(d => d.value))
  const formatter = format(numberFormat)

  const formatValue = (value: any): string => {
    if (typeof value === 'number') {
      return formatter(value)
    }
    return '0'
  }

  return (
    <div className="w-full h-[500px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 30,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="name"
            stroke="hsl(var(--foreground))"
            fontSize={12}
            tickLine={true}
            axisLine={true}
            dy={10}
            angle={-45}
            textAnchor="end"
            height={60}
            label={{ 
              value: xAxisLabel, 
              position: "bottom",
              offset: 20,
              fill: "hsl(var(--foreground))"
            }}
          />
          <YAxis
            stroke="hsl(var(--foreground))"
            fontSize={12}
            tickLine={true}
            axisLine={true}
            dx={-10}
            domain={[minValue, maxValue]}
            tickFormatter={formatValue}
            label={{ 
              value: yAxisLabel, 
              angle: -90, 
              position: "insideLeft",
              offset: 10,
              fill: "hsl(var(--foreground))"
            }}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="rounded-lg border bg-background p-2 shadow-sm">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex flex-col">
                        <span className="text-[0.70rem] uppercase text-muted-foreground">
                          {title}
                        </span>
                        <span className="font-bold text-foreground">
                          {formatValue(payload[0].value)} {yAxisLabel}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {payload[0].payload.name}
                        </span>
                      </div>
                    </div>
                  </div>
                )
              }
              return null
            }}
          />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={stroke}
            strokeWidth={2}
            dot={{ stroke: stroke, strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}
