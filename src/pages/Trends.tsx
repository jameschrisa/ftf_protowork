import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { TrendsChart } from "../components/trends/trends-chart"
import { TrendingUp } from "lucide-react"

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

// Generate trend data with a realistic pattern over months
const generateVolumeData = () => {
  const baseValue = 30000 // Middle of range
  const amplitude = 20000 // Range to vary by
  
  return MONTHS.map((month, i) => {
    const monthProgress = i / 11 // 0 to 1 over the year
    const seasonalFactor = Math.sin(2 * Math.PI * monthProgress) // Seasonal variation
    const trend = seasonalFactor * (amplitude * 0.4)
    const noise = (Math.random() - 0.5) * (amplitude * 0.1)
    
    // Ensure value stays within 10,000-50,000 range
    const value = Math.max(10000, Math.min(50000, baseValue + trend + noise))
    return {
      name: month,
      value: Math.round(value)
    }
  })
}

const optimalRange = { min: 85, max: 95 } // Optimal recovery range

const generateRecoveryData = () => {
  const baseValue = 90 // Target value in the middle of optimal range
  
  return MONTHS.map((month, i) => {
    const monthProgress = i / 11
    const seasonalFactor = Math.sin(2 * Math.PI * monthProgress)
    const trend = seasonalFactor * 5 // Smaller variation to stay within optimal range
    const noise = (Math.random() - 0.5) * 2 // Reduced noise
    
    // Ensure value stays within 0-100% with focus on optimal range
    const value = Math.max(0, Math.min(100, baseValue + trend + noise))
    return {
      name: month,
      value: Math.round(value * 10) / 10
    }
  })
}

const volumeData = generateVolumeData()
const recoveryData = generateRecoveryData()

export default function Trends() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Trends</h2>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col gap-1">
              <div>Total Flare Gas Volume</div>
              <div className="text-sm font-normal text-muted-foreground">
                Aggregated volume for 10 small flare stacks (10,000 - 50,000 SCM/year)
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TrendsChart 
              data={volumeData} 
              title="Volume"
              dataKey="value"
              stroke="hsl(24, 96%, 53%)" // Orange
              yAxisLabel="SCM/year"
              numberFormat=",.0f"
              xAxisLabel="Month"
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex flex-col gap-1">
              <div>Gas Recovery Performance</div>
              <div className="text-sm font-normal text-muted-foreground">
                Optimal recovery range: {optimalRange.min}-{optimalRange.max}% (Industry standard for efficient flare operation)
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <TrendsChart 
              data={recoveryData} 
              title="Recovery"
              dataKey="value"
              stroke="hsl(143, 71%, 45%)" // Green
              yAxisLabel="%"
              numberFormat=".1f"
              xAxisLabel="Month"
              minDomain={0}
              maxDomain={100}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
