import { IncidentRecord, incidentStatusColors, incidentTypeColors, incidentSeverityColors } from "../../data/incidents-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

interface IncidentsTableProps {
  data: IncidentRecord[]
}

export function IncidentsTable({ data }: IncidentsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Severity</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Duration (min)</TableHead>
          <TableHead>Impact</TableHead>
          <TableHead>Resolution</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((record) => (
          <TableRow key={record.id}>
            <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${incidentTypeColors[record.type]}`}>
                {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
              </span>
            </TableCell>
            <TableCell>
              <span className={incidentSeverityColors[record.severity]}>
                {record.severity.charAt(0).toUpperCase() + record.severity.slice(1)}
              </span>
            </TableCell>
            <TableCell>{record.description}</TableCell>
            <TableCell>
              <span className={incidentStatusColors[record.status]}>
                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
              </span>
            </TableCell>
            <TableCell>{record.duration}</TableCell>
            <TableCell>{record.impact}</TableCell>
            <TableCell>
              {record.resolution || 'Pending'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
