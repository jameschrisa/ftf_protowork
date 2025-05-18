import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid,
} from "recharts"

interface SmallLineChartProps {
  data: {
    name: string
    value: number
  }[]
  title: string
  unit: string
}

export function SmallLineChart({ data, title, unit }: SmallLineChartProps) {
  const minValue = Math.min(...data.map(d => d.value))
  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <>
      <div className="w-full h-[120px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 20,
              bottom: 20,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
            <XAxis
              dataKey="name"
              stroke="hsl(var(--foreground))"
              fontSize={10}
              tickLine={true}
              axisLine={true}
              interval="preserveStartEnd"
              tick={{ fontSize: 10 }}
            />
            <YAxis
              stroke="hsl(var(--foreground))"
              fontSize={10}
              tickLine={true}
              axisLine={true}
              domain={[minValue * 0.95, maxValue * 1.05]}
              tick={{ fontSize: 10 }}
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
                            {payload[0].value} {unit}
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
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={1.5}
              dot={{ stroke: "hsl(var(--primary))", strokeWidth: 1, r: 2 }}
              activeDot={{ r: 4, strokeWidth: 1 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex items-center justify-between text-xs text-muted-foreground">
        <div>{data[0].value} {unit}</div>
        <div className="font-medium">{title}</div>
        <div>{data[data.length - 1].value} {unit}</div>
      </div>
    </>
  )
}
