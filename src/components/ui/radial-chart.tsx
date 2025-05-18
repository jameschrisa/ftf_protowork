import {
  Label,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts"
import { ChartConfig, ChartContainer } from "./chart"

interface RadialChartProps {
  value: number
  min: number
  max: number
  label: string
  className?: string
  color?: string
}

interface PolarViewBox {
  cx: number
  cy: number
  innerRadius: number
  outerRadius: number
  startAngle: number
  endAngle: number
}

export function RadialChart({ value, min, max, label, className, color = "hsl(var(--primary))" }: RadialChartProps) {
  // Calculate percentage
  const percentage = ((value - min) / (max - min)) * 100;
  
  // Create a lighter version of the color for the background
  const getLighterColor = (color: string) => {
    if (color.startsWith('hsl(346')) return 'hsla(346, 77%, 80%, 0.3)' // Lighter red
    if (color.startsWith('hsl(21')) return 'hsla(21, 83%, 80%, 0.3)'   // Lighter orange
    if (color.startsWith('hsl(198')) return 'hsla(198, 93%, 80%, 0.3)' // Lighter blue
    return 'hsla(var(--muted), 0.3)' // Default
  }
  
  const chartData = [
    {
      name: label,
      value: 100,
      fill: getLighterColor(color),
    },
    {
      name: "Value",
      value: percentage,
      fill: color,
    }
  ]

  const chartConfig = {
    [label]: {
      label: label,
      color: color
    }
  } satisfies ChartConfig

  return (
    <ChartContainer config={chartConfig} className={className}>
      <RadialBarChart
        data={chartData}
        startAngle={90}
        endAngle={-270}
        innerRadius="80%"
        outerRadius="100%"
        barSize={30}
        width={300}
        height={300}
      >
        <RadialBar
          dataKey="value"
          cornerRadius={0}
          background={false}
        />
        <PolarRadiusAxis
          tick={false}
          tickLine={false}
          axisLine={false}
        >
          <Label
            content={({ viewBox }) => {
              const polarViewBox = viewBox as unknown as PolarViewBox;
              const { cx, cy } = polarViewBox;

              return (
                <>
                  <text
                    x={cx}
                    y={cy - 10}
                    textAnchor="middle"
                    className="fill-foreground text-4xl font-bold"
                  >
                    {value.toFixed(1)}
                  </text>
                  <text
                    x={cx}
                    y={cy + 20}
                    textAnchor="middle"
                    className="fill-muted-foreground text-sm"
                  >
                    {label}
                  </text>
                </>
              )
            }}
          />
        </PolarRadiusAxis>
      </RadialBarChart>
    </ChartContainer>
  )
}

// Export FlareAnalysisRadial as an alias of RadialChart
export const FlareAnalysisRadial = RadialChart;
