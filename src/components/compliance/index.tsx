import { RadialChartCard } from "./radial-chart-card"
import { LineChartCard } from "./line-chart-card"
import { flareEfficiencyData, operationalData, emissionsData } from "./data"

export function FlareMonitoringCharts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <RadialChartCard
        title="Flare Efficiency"
        description="Overall flare system efficiency metrics"
        data={flareEfficiencyData}
        trend={{ value: 2, direction: "up" }}
        valueLabel="Efficiency"
        showSelector={true}
      />
      <RadialChartCard
        title="Operational Reliability"
        description="System reliability and performance metrics"
        data={operationalData}
        trend={{ value: 1, direction: "up" }}
        valueLabel="Reliability"
        showSelector={true}
      />
      <LineChartCard
        title="Emissions Monitoring"
        description="Monthly emissions by type (CO2, NOx, VOC)"
        data={emissionsData}
        trend={{ value: 8, direction: "down" }}
      />
    </div>
  )
}
