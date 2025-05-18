import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Label, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState, useMemo } from "react"
import { maintenanceData } from "../../data/maintenance-data"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import { Props } from "recharts/types/component/Label"

// Calculate maintenance type distribution
const typeData = [
  {
    name: "Scheduled",
    value: maintenanceData.filter(m => m.type === 'scheduled').length,
    fill: "hsl(var(--chart-1))"
  },
  {
    name: "Emergency",
    value: maintenanceData.filter(m => m.type === 'emergency').length,
    fill: "hsl(var(--chart-2))"
  },
  {
    name: "Preventive",
    value: maintenanceData.filter(m => m.type === 'preventive').length,
    fill: "hsl(var(--chart-3))"
  }
].map(item => ({
  ...item,
  count: item.value,
  percentage: Math.round((item.value / maintenanceData.length) * 100)
}))

// Calculate impact distribution
const impactData = [
  {
    name: "High",
    value: maintenanceData.filter(m => m.impact === 'high').length,
    fill: "hsl(var(--critical))"
  },
  {
    name: "Medium",
    value: maintenanceData.filter(m => m.impact === 'medium').length,
    fill: "hsl(var(--high))"
  },
  {
    name: "Low",
    value: maintenanceData.filter(m => m.impact === 'low').length,
    fill: "hsl(var(--medium))"
  },
  {
    name: "None",
    value: maintenanceData.filter(m => m.impact === 'none').length,
    fill: "hsl(var(--low))"
  }
].map(item => ({
  ...item,
  count: item.value,
  percentage: Math.round((item.value / maintenanceData.length) * 100)
}))

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border bg-background p-2 shadow-sm">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: data.fill }}
            />
            <span className="font-medium">{data.name}</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-sm text-muted-foreground">
              Count: {data.count}
            </span>
            <span className="text-sm text-muted-foreground">
              Percentage: {data.percentage}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

function PieChartCard({
  title,
  description,
  data,
  valueLabel,
}: {
  title: string
  description: string
  data: Array<{ name: string; value: number; count: number; fill: string; percentage: number }>
  valueLabel: string
}) {
  const [activeItem, setActiveItem] = useState(data[0].name)

  const activeIndex = useMemo(
    () => data.findIndex((item) => item.name === activeItem),
    [activeItem, data]
  )

  return (
    <Card>
      <CardHeader className="space-y-0 pb-2">
        <div>
          <CardTitle className="text-base font-medium">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <div className="pt-2">
          <Select value={activeItem} onValueChange={setActiveItem}>
            <SelectTrigger className="h-8 w-full">
              <SelectValue placeholder="Select item" />
            </SelectTrigger>
            <SelectContent>
              {data.map((item) => (
                <SelectItem
                  key={item.name}
                  value={item.name}
                  className="relative flex items-center px-2 py-1.5"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: item.fill }}
                    />
                    <span className="text-sm">{item.name}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex flex-1 justify-center pb-0">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={70}
                outerRadius={100}
                stroke="none"
                activeIndex={activeIndex}
                activeShape={({
                  cx,
                  cy,
                  innerRadius,
                  outerRadius = 0,
                  startAngle,
                  endAngle,
                  fill,
                }: PieSectorDataItem) => (
                  <g>
                    <Sector
                      cx={cx}
                      cy={cy}
                      innerRadius={innerRadius}
                      outerRadius={outerRadius + 8}
                      startAngle={startAngle}
                      endAngle={endAngle}
                      fill={fill}
                    />
                    <Sector
                      cx={cx}
                      cy={cy}
                      startAngle={startAngle}
                      endAngle={endAngle}
                      innerRadius={outerRadius + 10}
                      outerRadius={outerRadius + 15}
                      fill={fill}
                    />
                  </g>
                )}
              >
                <Label
                  content={(props: Props) => {
                    if (!props.viewBox) return null
                    const { cx = 0, cy = 0 } = props.viewBox as { cx: number; cy: number }
                    const activeData = data[activeIndex]

                    return (
                      <g>
                        <text
                          x={cx}
                          y={cy - 10}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-foreground font-bold"
                          style={{ fontSize: 24 }}
                        >
                          {activeData.percentage}%
                        </text>
                        <text
                          x={cx}
                          y={cy + 15}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="fill-muted-foreground"
                          style={{ fontSize: 14 }}
                        >
                          {activeData.count} {valueLabel}
                        </text>
                      </g>
                    )
                  }}
                />
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function MaintenanceCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <PieChartCard
        title="Maintenance Type Distribution"
        description="Distribution of maintenance activities by type"
        data={typeData}
        valueLabel="Tasks"
      />
      <PieChartCard
        title="Maintenance Impact Distribution"
        description="Distribution of maintenance by impact level"
        data={impactData}
        valueLabel="Tasks"
      />
    </div>
  )
}
