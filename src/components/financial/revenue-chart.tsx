import { TrendsChart } from "../trends/trends-chart"
import { salesData } from "../../data/financial/dashboard-data"

export function RevenueChart() {
  // Transform the sales data to the format expected by TrendsChart
  const chartData = salesData.map(item => ({
    name: item.month,
    value: item.revenue
  }))

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Monthly Revenue</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Revenue trends over the past 6 months
        </p>
      </div>
      
      <TrendsChart 
        data={chartData} 
        title="Revenue"
        dataKey="value"
        stroke="hsl(143, 71%, 45%)" // Green
        yAxisLabel="$"
        numberFormat="$,.0f"
        xAxisLabel="Month"
      />
    </div>
  )
}
