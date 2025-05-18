import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { IncidentRecord } from "../../data/incidents-data"

interface IncidentsLineChartProps {
  data: IncidentRecord[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const date = new Date(label)
    const formattedDate = date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <span className="font-medium">{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-sm text-muted-foreground">
              {payload[0].value} incidents
            </span>
          </div>
        </div>
      </div>
    )
  }
  return null
}

export function IncidentsLineChart({ data }: IncidentsLineChartProps) {
  // Process data to get monthly totals
  const monthlyData = data.reduce((acc: { [key: string]: number }, incident) => {
    const month = incident.date.substring(0, 7) // Get YYYY-MM
    acc[month] = (acc[month] || 0) + 1
    return acc
  }, {})

  // Get last 6 months
  const last6Months = Object.entries(monthlyData)
    .sort(([a], [b]) => a.localeCompare(b)) // Sort by date
    .slice(-6) // Get last 6 months
    .map(([month, count]) => ({
      month,
      total: count
    }))

  // Format date to show month and year
  const formatXAxis = (tickItem: string) => {
    const date = new Date(tickItem)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Total Monthly Incidents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={last6Months}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 20,
              }}
            >
              <XAxis 
                dataKey="month"
                tickFormatter={formatXAxis}
                height={40}
              />
              <YAxis 
                allowDecimals={false}
                width={40}
              />
              <Tooltip 
                content={<CustomTooltip />}
                cursor={{ stroke: 'hsl(var(--muted))' }}
              />
              <Line
                type="monotone"
                dataKey="total"
                stroke="hsl(var(--primary))"
                strokeWidth={2}
                dot={{ r: 4, fill: "hsl(var(--primary))" }}
                activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
