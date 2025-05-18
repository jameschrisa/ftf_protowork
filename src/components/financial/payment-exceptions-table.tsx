import { PaymentException, exceptionStatusColors, exceptionTypeColors, exceptionSeverityColors } from "../../data/payment-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

interface PaymentExceptionsTableProps {
  data: PaymentException[]
}

export function PaymentExceptionsTable({ data }: PaymentExceptionsTableProps) {
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
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${exceptionTypeColors[record.type]}`}>
                {record.type.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
            </TableCell>
            <TableCell>
              <span className={exceptionSeverityColors[record.severity]}>
                {record.severity.charAt(0).toUpperCase() + record.severity.slice(1)}
              </span>
            </TableCell>
            <TableCell>{record.description}</TableCell>
            <TableCell>
              <span className={exceptionStatusColors[record.status]}>
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
