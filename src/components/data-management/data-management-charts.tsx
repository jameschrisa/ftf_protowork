import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts"

interface DataPoint {
  name: string
  value: number
  color: string
}

const data: DataPoint[] = [
  { name: "Structured Data", value: 65, color: "#3b82f6" },
  { name: "Semi-structured", value: 25, color: "#10b981" },
  { name: "Unstructured", value: 10, color: "#6366f1" },
]

const renderCustomizedLabel = (props: any) => {
  const { value, percent } = props
  return `${value} (${(percent * 100).toFixed(0)}%)`
}

export function DataManagementCharts() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Data Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}
