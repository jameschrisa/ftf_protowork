import { MaintenanceRecord, maintenanceStatusColors, maintenanceTypeColors, maintenanceImpactColors } from "../../data/maintenance-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

interface MaintenanceTableProps {
  data: MaintenanceRecord[]
}

export function MaintenanceTable({ data }: MaintenanceTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Component</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Technician</TableHead>
          <TableHead>Duration (hrs)</TableHead>
          <TableHead>Impact</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((record) => (
          <TableRow key={record.id}>
            <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${maintenanceTypeColors[record.type]}`}>
                {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
              </span>
            </TableCell>
            <TableCell>{record.component}</TableCell>
            <TableCell>{record.description}</TableCell>
            <TableCell>
              <span className={maintenanceStatusColors[record.status]}>
                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
              </span>
            </TableCell>
            <TableCell>{record.technician}</TableCell>
            <TableCell>{record.duration}</TableCell>
            <TableCell>
              <span className={maintenanceImpactColors[record.impact]}>
                {record.impact.charAt(0).toUpperCase() + record.impact.slice(1)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
