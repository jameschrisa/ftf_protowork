export interface ChartDataItem {
  name: string
  value: number
  fill: string
}

export interface LineChartDataItem {
  name: string
  revenue: number
  expenses: number
  profit: number
}

export const financialPerformanceData: ChartDataItem[] = [
  {
    name: "Revenue Growth",
    value: 92,
    fill: "hsl(var(--chart-1))",
  },
  {
    name: "Profit Margin",
    value: 88,
    fill: "hsl(var(--chart-2))",
  },
  {
    name: "ROI",
    value: 85,
    fill: "hsl(var(--chart-3))",
  },
  {
    name: "Cost Efficiency",
    value: 90,
    fill: "hsl(var(--chart-4))",
  },
  {
    name: "Market Share",
    value: 82,
    fill: "hsl(var(--chart-5))",
  },
]

export const budgetAccuracyData: ChartDataItem[] = [
  {
    name: "Revenue Forecast",
    value: 95,
    fill: "hsl(var(--chart-1))",
  },
  {
    name: "Expense Forecast",
    value: 92,
    fill: "hsl(var(--chart-2))",
  },
  {
    name: "Capital Expenditure",
    value: 88,
    fill: "hsl(var(--chart-3))",
  },
  {
    name: "Operational Budget",
    value: 94,
    fill: "hsl(var(--chart-4))",
  },
  {
    name: "Cash Flow Forecast",
    value: 90,
    fill: "hsl(var(--chart-5))",
  },
]

export const cashFlowTrendsData: LineChartDataItem[] = [
  {
    name: "Jan",
    revenue: 420000,
    expenses: 350000,
    profit: 70000,
  },
  {
    name: "Feb",
    revenue: 440000,
    expenses: 360000,
    profit: 80000,
  },
  {
    name: "Mar",
    revenue: 480000,
    expenses: 380000,
    profit: 100000,
  },
  {
    name: "Apr",
    revenue: 460000,
    expenses: 370000,
    profit: 90000,
  },
  {
    name: "May",
    revenue: 500000,
    expenses: 390000,
    profit: 110000,
  },
  {
    name: "Jun",
    revenue: 520000,
    expenses: 400000,
    profit: 120000,
  },
]
