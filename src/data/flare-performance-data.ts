export interface FlareRecord {
  id: string
  location: string
  fuelType: 'Natural Gas' | 'Oil' | 'Refinery Gas' | 'Mixed Gas' | 'Process Gas'
  capacity: number
  uptimePercentage: number
  efficiencyRating: number
  status: 'Online' | 'Offline' | 'Maintenance'
  emissions: number
  flowRate: number
  temperature: number
}

// Generate realistic mock data
export const flareData: FlareRecord[] = [
  {
    id: "FL-001",
    location: "North Site, Area 3",
    fuelType: "Natural Gas",
    capacity: 10,
    uptimePercentage: 95.2,
    efficiencyRating: 4.2,
    status: "Online",
    emissions: 500,
    flowRate: 2.5,
    temperature: 1800
  },
  {
    id: "FL-002",
    location: "South Site, Area 1",
    fuelType: "Refinery Gas",
    capacity: 15,
    uptimePercentage: 98.5,
    efficiencyRating: 4.8,
    status: "Online",
    emissions: 450,
    flowRate: 3.2,
    temperature: 1950
  },
  {
    id: "FL-003",
    location: "East Site, Area 2",
    fuelType: "Mixed Gas",
    capacity: 8,
    uptimePercentage: 92.1,
    efficiencyRating: 3.9,
    status: "Maintenance",
    emissions: 380,
    flowRate: 1.8,
    temperature: 1750
  },
  {
    id: "FL-004",
    location: "West Site, Area 4",
    fuelType: "Process Gas",
    capacity: 12,
    uptimePercentage: 97.8,
    efficiencyRating: 4.5,
    status: "Online",
    emissions: 520,
    flowRate: 2.8,
    temperature: 1850
  },
  {
    id: "FL-005",
    location: "North Site, Area 1",
    fuelType: "Natural Gas",
    capacity: 20,
    uptimePercentage: 94.5,
    efficiencyRating: 4.0,
    status: "Online",
    emissions: 600,
    flowRate: 4.0,
    temperature: 1900
  },
  {
    id: "FL-006",
    location: "South Site, Area 3",
    fuelType: "Oil",
    capacity: 18,
    uptimePercentage: 91.8,
    efficiencyRating: 3.7,
    status: "Offline",
    emissions: 480,
    flowRate: 3.5,
    temperature: 1700
  },
  {
    id: "FL-007",
    location: "East Site, Area 1",
    fuelType: "Refinery Gas",
    capacity: 25,
    uptimePercentage: 96.9,
    efficiencyRating: 4.6,
    status: "Online",
    emissions: 550,
    flowRate: 4.5,
    temperature: 2000
  },
  {
    id: "FL-008",
    location: "West Site, Area 2",
    fuelType: "Mixed Gas",
    capacity: 16,
    uptimePercentage: 93.4,
    efficiencyRating: 4.1,
    status: "Online",
    emissions: 420,
    flowRate: 3.0,
    temperature: 1825
  },
  {
    id: "FL-009",
    location: "North Site, Area 4",
    fuelType: "Process Gas",
    capacity: 14,
    uptimePercentage: 90.2,
    efficiencyRating: 3.5,
    status: "Maintenance",
    emissions: 460,
    flowRate: 2.2,
    temperature: 1775
  },
  {
    id: "FL-010",
    location: "South Site, Area 2",
    fuelType: "Natural Gas",
    capacity: 22,
    uptimePercentage: 98.1,
    efficiencyRating: 4.9,
    status: "Online",
    emissions: 580,
    flowRate: 4.2,
    temperature: 1925
  }
]

// Calculate distributions for pie charts
export const statusDistribution = [
  {
    name: "Online",
    value: flareData.filter(f => f.status === 'Online').length,
    fill: "hsl(142, 76%, 36%)" // Green
  },
  {
    name: "Offline",
    value: flareData.filter(f => f.status === 'Offline').length,
    fill: "hsl(346, 87%, 43%)" // Red
  },
  {
    name: "Maintenance",
    value: flareData.filter(f => f.status === 'Maintenance').length,
    fill: "hsl(45, 93%, 47%)" // Yellow
  }
].map(item => ({
  ...item,
  count: item.value,
  percentage: Math.round((item.value / flareData.length) * 100)
}))

export const fuelTypeDistribution = [
  {
    name: "Natural Gas",
    value: flareData.filter(f => f.fuelType === 'Natural Gas').length,
    fill: "hsl(var(--chart-1))"
  },
  {
    name: "Oil",
    value: flareData.filter(f => f.fuelType === 'Oil').length,
    fill: "hsl(var(--chart-2))"
  },
  {
    name: "Refinery Gas",
    value: flareData.filter(f => f.fuelType === 'Refinery Gas').length,
    fill: "hsl(var(--chart-3))"
  },
  {
    name: "Mixed Gas",
    value: flareData.filter(f => f.fuelType === 'Mixed Gas').length,
    fill: "hsl(var(--chart-4))"
  },
  {
    name: "Process Gas",
    value: flareData.filter(f => f.fuelType === 'Process Gas').length,
    fill: "hsl(var(--chart-5))"
  }
].map(item => ({
  ...item,
  count: item.value,
  percentage: Math.round((item.value / flareData.length) * 100)
}))

export const efficiencyDistribution = [
  {
    name: "Rating 5",
    value: flareData.filter(f => Math.floor(f.efficiencyRating) === 5).length,
    fill: "hsl(142, 76%, 36%)" // Green
  },
  {
    name: "Rating 4",
    value: flareData.filter(f => Math.floor(f.efficiencyRating) === 4).length,
    fill: "hsl(142, 76%, 46%)" // Light Green
  },
  {
    name: "Rating 3",
    value: flareData.filter(f => Math.floor(f.efficiencyRating) === 3).length,
    fill: "hsl(45, 93%, 47%)" // Yellow
  },
  {
    name: "Rating 2",
    value: flareData.filter(f => Math.floor(f.efficiencyRating) === 2).length,
    fill: "hsl(45, 93%, 57%)" // Light Orange
  },
  {
    name: "Rating 1",
    value: flareData.filter(f => Math.floor(f.efficiencyRating) === 1).length,
    fill: "hsl(346, 87%, 43%)" // Red
  }
].map(item => ({
  ...item,
  count: item.value,
  percentage: Math.round((item.value / flareData.length) * 100)
}))
