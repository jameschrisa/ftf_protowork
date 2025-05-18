import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Pie, PieChart, ResponsiveContainer, Sector, Tooltip, Label } from "recharts"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { useState, useMemo } from "react"
import { 
  revenueBySegmentData, 
  salesOrderStatusData, 
  customerConcentrationData 
} from "../../data/financial/pie-chart-data"
import { PieSectorDataItem } from "recharts/types/polar/Pie"
import { Props } from "recharts/types/component/Label"

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
              Value: {data.count.toLocaleString()}
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
  viewOptions,
  onViewChange,
  currentView
}: {
  title: string
  description: string
  data: Array<{ name: string; value: number; count: number; fill: string; percentage: number }>
  valueLabel: string
  viewOptions: { value: string; label: string }[]
  onViewChange: (value: string) => void
  currentView: string
}) {
  const [activeItem, setActiveItem] = useState(data[0]?.name || "")

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
          <Select value={currentView} onValueChange={onViewChange}>
            <SelectTrigger className="h-8 w-full">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              {viewOptions.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  className="relative flex items-center px-2 py-1.5"
                >
                  <span className="text-sm">{option.label}</span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
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
                    if (!activeData) return null

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
                          {activeData.count.toLocaleString()} {valueLabel}
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

export function FinancialPieCharts() {
  // Revenue by Segment chart state
  const [revenueView, setRevenueView] = useState<keyof typeof revenueBySegmentData>("productCategory")
  const revenueData = revenueBySegmentData[revenueView]
  const revenueViewOptions = [
    { value: "productCategory", label: "By Product/Service Category" },
    { value: "customerSegment", label: "By Customer Segment" },
    { value: "geographicRegion", label: "By Geographic Region" }
  ]

  // Sales Order Status chart state
  const [orderView, setOrderView] = useState<keyof typeof salesOrderStatusData>("orderStage")
  const orderData = salesOrderStatusData[orderView]
  const orderViewOptions = [
    { value: "orderStage", label: "By Stage" },
    { value: "orderPriority", label: "By Priority" },
    { value: "salesChannel", label: "By Sales Channel" }
  ]

  // Customer Concentration chart state
  const [customerView, setCustomerView] = useState<keyof typeof customerConcentrationData>("topCustomers")
  const customerData = customerConcentrationData[customerView]
  const customerViewOptions = [
    { value: "topCustomers", label: "By Top Customers" },
    { value: "industry", label: "By Industry" },
    { value: "companySize", label: "By Company Size" }
  ]

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <PieChartCard
        title="Revenue by Segment"
        description="Distribution of revenue across different segments"
        data={revenueData}
        valueLabel={revenueView === "productCategory" ? "USD" : "USD"}
        viewOptions={revenueViewOptions}
        onViewChange={(value) => setRevenueView(value as keyof typeof revenueBySegmentData)}
        currentView={revenueView}
      />
      <PieChartCard
        title="Sales Order Status"
        description="Analysis of sales orders by various dimensions"
        data={orderData}
        valueLabel={orderView === "orderPriority" ? "USD" : "orders"}
        viewOptions={orderViewOptions}
        onViewChange={(value) => setOrderView(value as keyof typeof salesOrderStatusData)}
        currentView={orderView}
      />
      <PieChartCard
        title="Customer Concentration"
        description="Distribution of customers and revenue concentration"
        data={customerData}
        valueLabel={customerView === "topCustomers" ? "USD" : "customers"}
        viewOptions={customerViewOptions}
        onViewChange={(value) => setCustomerView(value as keyof typeof customerConcentrationData)}
        currentView={customerView}
      />
    </div>
  )
}
