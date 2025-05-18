import { RadialChartCard } from "../compliance/radial-chart-card"
import { FinancialLineChartCard } from "./financial-line-chart-card"
import { financialPerformanceData, budgetAccuracyData, cashFlowTrendsData } from "./financial-monitoring-data"

export function FinancialMonitoringCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <RadialChartCard
        title="Financial Performance"
        description="Key financial performance indicators and metrics"
        data={financialPerformanceData}
        trend={{ value: 3, direction: "up" }}
        valueLabel="Performance"
        showSelector={true}
      />
      <RadialChartCard
        title="Budget Accuracy"
        description="Budget forecast accuracy and variance metrics"
        data={budgetAccuracyData}
        trend={{ value: 2, direction: "up" }}
        valueLabel="Accuracy"
        showSelector={true}
      />
      <FinancialLineChartCard
        title="Cash Flow Trends"
        description="Monthly revenue, expenses, and profit trends"
        data={cashFlowTrendsData}
        trend={{ value: 5, direction: "up" }}
        customDataKeys={["revenue", "expenses", "profit"]}
        customColors={["#4ade80", "#f87171", "#60a5fa"]}
      />
    </div>
  )
}
