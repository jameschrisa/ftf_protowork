import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

interface EquipmentStatus {
  id: string
  name: string
  status: 'operational' | 'maintenance' | 'fault'
  lastInspection: string
  nextInspection: string
  condition: 'good' | 'fair' | 'poor'
  notes: string
}

const equipmentData: EquipmentStatus[] = [
  {
    id: "eq001",
    name: "Main Flare Tip",
    status: "operational",
    lastInspection: "2024-02-15",
    nextInspection: "2024-05-15",
    condition: "good",
    notes: "Regular wear within acceptable limits"
  },
  {
    id: "eq002",
    name: "Pilot System",
    status: "operational",
    lastInspection: "2024-02-10",
    nextInspection: "2024-05-10",
    condition: "good",
    notes: "All pilots functioning normally"
  },
  {
    id: "eq003",
    name: "Knockout Drum",
    status: "maintenance",
    lastInspection: "2024-02-20",
    nextInspection: "2024-05-20",
    condition: "fair",
    notes: "Scheduled cleaning in progress"
  },
  {
    id: "eq004",
    name: "Steam Injection System",
    status: "operational",
    lastInspection: "2024-02-01",
    nextInspection: "2024-05-01",
    condition: "good",
    notes: "Operating at optimal pressure"
  },
  {
    id: "eq005",
    name: "Molecular Seal",
    status: "fault",
    lastInspection: "2024-02-25",
    nextInspection: "2024-05-25",
    condition: "poor",
    notes: "Requires immediate attention"
  },
  {
    id: "eq006",
    name: "Ignition System",
    status: "operational",
    lastInspection: "2024-02-05",
    nextInspection: "2024-05-05",
    condition: "fair",
    notes: "Regular maintenance recommended"
  }
]

const statusColors = {
  operational: "text-green-500",
  maintenance: "text-yellow-500",
  fault: "text-red-500"
}

const conditionColors = {
  good: "text-green-500",
  fair: "text-yellow-500",
  poor: "text-red-500"
}

export function EquipmentStatusTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Equipment</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Inspection</TableHead>
          <TableHead>Next Inspection</TableHead>
          <TableHead>Condition</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {equipmentData.map((equipment) => (
          <TableRow key={equipment.id}>
            <TableCell className="font-medium">{equipment.name}</TableCell>
            <TableCell>
              <span className={statusColors[equipment.status]}>
                {equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}
              </span>
            </TableCell>
            <TableCell>{new Date(equipment.lastInspection).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(equipment.nextInspection).toLocaleDateString()}</TableCell>
            <TableCell>
              <span className={conditionColors[equipment.condition]}>
                {equipment.condition.charAt(0).toUpperCase() + equipment.condition.slice(1)}
              </span>
            </TableCell>
            <TableCell>{equipment.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
