import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface LineChartCardProps {
  title: string
  description?: string
  data: Array<{
    name: string
    co2: number
    nox: number
    voc: number
  }>
  trend?: {
    value: number
    direction: "up" | "down"
  }
}

export function LineChartCard({ title, description, data, trend }: LineChartCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{title}</CardTitle>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          {trend && (
            <div className="flex items-center gap-1">
              {trend.direction === "up" ? (
                <ArrowUpIcon className="w-4 h-4 text-green-500" />
              ) : (
                <ArrowDownIcon className="w-4 h-4 text-red-500" />
              )}
              <span className={trend.direction === "up" ? "text-green-500" : "text-red-500"}>
                {trend.value}%
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="co2"
                name="CO2"
                stroke="hsl(var(--chart-1))"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="nox"
                name="NOx"
                stroke="hsl(var(--chart-2))"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="voc"
                name="VOC"
                stroke="hsl(var(--chart-3))"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
