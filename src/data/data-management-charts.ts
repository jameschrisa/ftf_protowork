export interface PieChartData {
  name: string
  value: number
  count: number
  fill: string
  description: string
}

export const storageDistributionData: PieChartData[] = [
  {
    name: "Colocation",
    value: 15,
    count: 150,
    fill: "#4CAF50",
    description: "Data stored in a third-party data center"
  },
  {
    name: "Managed Hosting",
    value: 10,
    count: 100,
    fill: "#2196F3",
    description: "Data stored in a managed hosting environment"
  },
  {
    name: "Private Cloud",
    value: 20,
    count: 200,
    fill: "#9C27B0",
    description: "Dedicated cloud infrastructure for a single organization"
  },
  {
    name: "Community Cloud",
    value: 5,
    count: 50,
    fill: "#FF9800",
    description: "Shared cloud infrastructure for specific industries or organizations"
  },
  {
    name: "Public Cloud",
    value: 25,
    count: 250,
    fill: "#F44336",
    description: "Shared cloud infrastructure for general use (e.g., AWS, Azure)"
  },
  {
    name: "Edge Computing",
    value: 5,
    count: 50,
    fill: "#607D8B",
    description: "Data stored and processed at the edge of the network (e.g., IoT devices)"
  },
  {
    name: "Multicloud",
    value: 15,
    count: 150,
    fill: "#795548",
    description: "Data distributed across multiple cloud providers"
  },
  {
    name: "On-Premise Cloud",
    value: 5,
    count: 50,
    fill: "#673AB7",
    description: "Cloud infrastructure hosted on-premises"
  }
]

export const dataClassificationData: PieChartData[] = [
  {
    name: "Sensitive",
    value: 30,
    count: 300,
    fill: "#F44336",
    description: "Sensitive data (e.g., PII, PHI, financial)"
  },
  {
    name: "Confidential",
    value: 40,
    count: 400,
    fill: "#FF9800",
    description: "Confidential data (e.g., business secrets)"
  },
  {
    name: "Public",
    value: 20,
    count: 200,
    fill: "#4CAF50",
    description: "Publicly accessible data"
  },
  {
    name: "Unknown",
    value: 10,
    count: 100,
    fill: "#9E9E9E",
    description: "Unclassified data"
  }
]

export const dataResidencyData: PieChartData[] = [
  {
    name: "Local",
    value: 40,
    count: 400,
    fill: "#2196F3",
    description: "Data stored locally"
  },
  {
    name: "Regional",
    value: 35,
    count: 350,
    fill: "#4CAF50",
    description: "Data stored regionally"
  },
  {
    name: "Global",
    value: 25,
    count: 250,
    fill: "#9C27B0",
    description: "Data stored globally"
  }
]
