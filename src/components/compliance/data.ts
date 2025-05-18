export interface ChartDataItem {
  name: string
  value: number
  fill: string
}

export interface LineChartDataItem {
  name: string
  co2: number
  nox: number
  voc: number
}

export const flareEfficiencyData: ChartDataItem[] = [
  {
    name: "Combustion",
    value: 98,
    fill: "hsl(var(--chart-1))",
  },
  {
    name: "Destruction",
    value: 95,
    fill: "hsl(var(--chart-2))",
  },
  {
    name: "Heat Recovery",
    value: 92,
    fill: "hsl(var(--chart-3))",
  },
  {
    name: "Gas Recovery",
    value: 94,
    fill: "hsl(var(--chart-4))",
  },
  {
    name: "Steam Quality",
    value: 96,
    fill: "hsl(var(--chart-5))",
  },
]

export const operationalData: ChartDataItem[] = [
  {
    name: "System Uptime",
    value: 99,
    fill: "hsl(var(--chart-1))",
  },
  {
    name: "Pilot Reliability",
    value: 98,
    fill: "hsl(var(--chart-2))",
  },
  {
    name: "Flow Control",
    value: 95,
    fill: "hsl(var(--chart-3))",
  },
  {
    name: "Ignition System",
    value: 97,
    fill: "hsl(var(--chart-4))",
  },
  {
    name: "Pressure Control",
    value: 96,
    fill: "hsl(var(--chart-5))",
  },
]

export const emissionsData: LineChartDataItem[] = [
  {
    name: "Jan",
    co2: 120,
    nox: 45,
    voc: 15,
  },
  {
    name: "Feb",
    co2: 115,
    nox: 42,
    voc: 14,
  },
  {
    name: "Mar",
    co2: 125,
    nox: 48,
    voc: 16,
  },
  {
    name: "Apr",
    co2: 118,
    nox: 44,
    voc: 13,
  },
  {
    name: "May",
    co2: 112,
    nox: 40,
    voc: 12,
  },
  {
    name: "Jun",
    co2: 110,
    nox: 38,
    voc: 11,
  },
]
