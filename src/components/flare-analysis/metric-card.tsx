import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { LucideIcon } from "lucide-react"
import { RadialChart } from "../ui/radial-chart"

interface MetricCardProps {
  title: string
  value: number
  unit: string
  icon: LucideIcon
  showRadial?: boolean
  minValue?: number
  maxValue?: number
  color?: string
}

export function MetricCard({ 
  title, 
  value, 
  unit, 
  icon: Icon,
  showRadial = false,
  minValue = 0,
  maxValue = 100,
  color
}: MetricCardProps) {
  return (
    <Card className={showRadial ? "min-h-[400px]" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
          {showRadial && (
            <div className="text-xs text-muted-foreground">
              Range: {minValue} - {maxValue} {unit}
            </div>
          )}
        </div>
        <div className="h-4 w-4 text-muted-foreground">
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        {showRadial ? (
          <div className="flex flex-col items-center justify-center h-[350px]">
            <RadialChart
              value={value}
              min={minValue}
              max={maxValue}
              label={unit}
              color={color}
              className="w-full h-full"
            />
          </div>
        ) : (
          <div className="flex flex-col">
            <div className="text-2xl font-bold">{value.toFixed(1)}</div>
            <div className="text-xs text-muted-foreground mt-1">{unit}</div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
