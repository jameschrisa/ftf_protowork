import { Card, CardContent, CardHeader, CardTitle } from "./card"
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts"
import { IncidentRecord } from "../../data/incidents-data"

interface IncidentsTotalChartProps {
  data: IncidentRecord[]
}

export function IncidentsTotalChart({ data }: IncidentsTotalChartProps) {
  // Process data to get monthly totals for the last 6 months
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
                labelFormatter={formatXAxis}
                formatter={(value: number) => [`${value} incidents`, 'Total']}
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
