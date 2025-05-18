export interface IncidentRecord {
  id: string
  flareId: string
  date: string
  type: 'operational' | 'mechanical' | 'control' | 'environmental'
  severity: 'critical' | 'high' | 'medium' | 'low'
  description: string
  status: 'resolved' | 'investigating' | 'mitigated'
  duration: number
  downtimeCause?: 'maintenance' | 'mechanical failure' | 'electrical issue'
  impact: string
  resolution?: string
  reporter: string
  ticketNumber: string
}

// Helper function to generate incident descriptions
const getDescription = (type: string) => {
  const descriptions = {
    operational: [
      "Unexpected flame-out during high wind conditions",
      "Steam flow instability",
      "Multiple pilot failures",
      "Emergency shutdown triggered",
      "Minor flame stability fluctuation"
    ],
    mechanical: [
      "Steam injection system pressure fluctuation",
      "Knockout drum level sensor malfunction",
      "Pilot gas pressure drop",
      "Main flare tip damage",
      "Molecular seal failure"
    ],
    control: [
      "Control system communication failure",
      "Flow meter calibration drift",
      "Temperature sensor deviation",
      "Data logging interruption",
      "Ignition system fault"
    ],
    environmental: [
      "Elevated NOx emissions detected",
      "Smoke visibility exceeds threshold",
      "VOC emissions spike",
      "Heat radiation above normal",
      "Noise level exceedance"
    ]
  }
  return descriptions[type as keyof typeof descriptions][
    Math.floor(Math.random() * descriptions[type as keyof typeof descriptions].length)
  ]
}

const reporters = [
  "John Smith",
  "Emma Wilson",
  "Michael Chen",
  "Sarah Johnson",
  "David Brown",
  "Lisa Anderson",
  "James Taylor",
  "Maria Garcia"
]

// Generate incident data
export const incidentsData: IncidentRecord[] = Array.from({ length: 100 }, (_, index) => {
  const types = ['operational', 'mechanical', 'control', 'environmental']
  const severities = ['critical', 'high', 'medium', 'low']
  const downtimeCauses = ['maintenance', 'mechanical failure', 'electrical issue']
  const statuses = ['resolved', 'investigating', 'mitigated']
  
  const date = new Date(2024, 0, 1)
  date.setDate(date.getDate() - Math.floor(Math.random() * 180)) // Random date within last 6 months

  const type = types[Math.floor(Math.random() * types.length)] as IncidentRecord['type']
  const severity = severities[Math.floor(Math.random() * severities.length)] as IncidentRecord['severity']
  const downtimeCause = downtimeCauses[Math.floor(Math.random() * downtimeCauses.length)] as IncidentRecord['downtimeCause']
  const reporter = reporters[Math.floor(Math.random() * reporters.length)]
  const flareId = `FL-${String(Math.floor(Math.random() * 5) + 1).padStart(2, '0')}`
  const ticketNumber = `INC-${date.getFullYear()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`

  return {
    id: `i${String(index + 1).padStart(3, '0')}`,
    flareId,
    date: date.toISOString().split('T')[0],
    type,
    severity,
    description: getDescription(type),
    status: statuses[Math.floor(Math.random() * statuses.length)] as IncidentRecord['status'],
    duration: Math.floor(Math.random() * 240) + 30, // 30-270 minutes
    downtimeCause,
    impact: severity === 'critical' ? 'Major system impact' :
           severity === 'high' ? 'Significant disruption' :
           severity === 'medium' ? 'Moderate impact' : 'Minor impact',
    resolution: Math.random() > 0.2 ? 'Issue resolved and documented' : undefined,
    reporter,
    ticketNumber
  }
}).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending

export const incidentStatusColors = {
  resolved: "text-green-500",
  investigating: "text-yellow-500",
  mitigated: "text-blue-500"
}

export const incidentTypeColors = {
  operational: "bg-blue-100 text-blue-800",
  mechanical: "bg-orange-100 text-orange-800",
  control: "bg-purple-100 text-purple-800",
  environmental: "bg-green-100 text-green-800"
}

export const incidentSeverityColors = {
  critical: "text-red-600 font-bold",
  high: "text-red-500",
  medium: "text-yellow-500",
  low: "text-green-500"
}

export const categoryColors = {
  operational: "hsl(var(--chart-1))",
  mechanical: "hsl(var(--chart-2))",
  control: "hsl(var(--chart-3))",
  environmental: "hsl(var(--chart-4))"
}
