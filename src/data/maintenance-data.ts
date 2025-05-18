export interface MaintenanceRecord {
  id: string
  date: string
  type: 'scheduled' | 'emergency' | 'preventive'
  component: string
  description: string
  status: 'completed' | 'pending' | 'in-progress'
  technician: string
  duration: number // in hours
  impact: 'none' | 'low' | 'medium' | 'high'
}

export const maintenanceData: MaintenanceRecord[] = [
  {
    id: "m001",
    date: "2024-02-15",
    type: "scheduled",
    component: "Pilot System",
    description: "Quarterly pilot flame monitoring system calibration",
    status: "completed",
    technician: "John Smith",
    duration: 4,
    impact: "low"
  },
  {
    id: "m002",
    date: "2024-02-18",
    type: "preventive",
    component: "Steam Injection",
    description: "Steam injection system maintenance and nozzle inspection",
    status: "completed",
    technician: "Maria Garcia",
    duration: 6,
    impact: "medium"
  },
  {
    id: "m003",
    date: "2024-02-20",
    type: "emergency",
    component: "Pressure Sensor",
    description: "Emergency repair of malfunctioning pressure sensor",
    status: "completed",
    technician: "Robert Chen",
    duration: 2,
    impact: "high"
  },
  {
    id: "m004",
    date: "2024-03-01",
    type: "scheduled",
    component: "Knockout Drum",
    description: "Scheduled inspection and cleaning of knockout drum",
    status: "pending",
    technician: "Sarah Johnson",
    duration: 8,
    impact: "medium"
  },
  {
    id: "m005",
    date: "2024-03-05",
    type: "preventive",
    component: "Flow Meter",
    description: "Calibration and verification of flow measurement system",
    status: "in-progress",
    technician: "David Wilson",
    duration: 3,
    impact: "low"
  },
  {
    id: "m006",
    date: "2024-03-10",
    type: "scheduled",
    component: "Ignition System",
    description: "Regular maintenance of flare ignition system",
    status: "pending",
    technician: "Lisa Anderson",
    duration: 5,
    impact: "medium"
  }
]

export const maintenanceStatusColors = {
  completed: "text-green-500",
  pending: "text-yellow-500",
  "in-progress": "text-blue-500"
}

export const maintenanceTypeColors = {
  scheduled: "bg-blue-100 text-blue-800",
  emergency: "bg-red-100 text-red-800",
  preventive: "bg-green-100 text-green-800"
}

export const maintenanceImpactColors = {
  none: "text-gray-500",
  low: "text-green-500",
  medium: "text-yellow-500",
  high: "text-red-500"
}
