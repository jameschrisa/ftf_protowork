import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "../ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts"
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react"

interface LineChartCardProps {
  title: string
  description?: string
  data: Array<{
    name: string
    revenue: number
    expenses: number
    profit: number
  }>
  trend?: {
    value: number
    direction: "up" | "down"
  }
  customDataKeys?: string[]
  customColors?: string[]
}

export function FinancialLineChartCard({ 
  title, 
  description, 
  data, 
  trend,
  customDataKeys = ["revenue", "expenses", "profit"],
  customColors = ["hsl(var(--chart-1))", "hsl(var(--chart-2))", "hsl(var(--chart-3))"]
}: LineChartCardProps) {
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
              <Tooltip formatter={(value) => `$${Number(value).toLocaleString()}`} />
              <Legend />
              <Line
                type="monotone"
                dataKey={customDataKeys[0]}
                name="Revenue"
                stroke={customColors[0]}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey={customDataKeys[1]}
                name="Expenses"
                stroke={customColors[1]}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey={customDataKeys[2]}
                name="Profit"
                stroke={customColors[2]}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
