import { TrendsChart } from "../trends/trends-chart"
import { kpis } from "../../data/financial/dashboard-data"

export function DSOChart() {
  // Get the current DSO value from KPIs
  const currentDSO = parseFloat(kpis.find(kpi => kpi.title === "Days Sales Outstanding")?.value as string) || 42.3
  
  // Generate historical DSO data with some variation
  const generateDSOData = () => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"]
    const baseValue = currentDSO
    
    return months.map((month, i) => {
      // Create some variation in the historical data
      // More recent months should trend toward the current value
      const monthProgress = i / 5 // 0 to 1 over the 6 months
      const randomVariation = (Math.random() - 0.5) * 5 // -2.5 to 2.5 days variation
      
      // Earlier months have higher DSO that gradually improves
      const trendFactor = (1 - monthProgress) * 8 // Higher values for earlier months
      
      const value = baseValue + trendFactor + randomVariation
      return {
        name: month,
        value: Math.round(value * 10) / 10 // Round to 1 decimal place
      }
    })
  }

  const chartData = generateDSOData()

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-medium">Days Sales Outstanding (DSO)</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Average number of days to collect payment after a sale
        </p>
      </div>
      
      <TrendsChart 
        data={chartData} 
        title="DSO"
        dataKey="value"
        stroke="hsl(24, 96%, 53%)" // Orange
        yAxisLabel="Days"
        numberFormat=".1f"
        xAxisLabel="Month"
      />
    </div>
  )
}
