import { PaymentRecord, paymentStatusColors, paymentTypeColors, paymentImpactColors } from "../../data/payment-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"

interface PaymentTableProps {
  data: PaymentRecord[]
}

export function PaymentTable({ data }: PaymentTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Recipient</TableHead>
          <TableHead>Reference</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Processor</TableHead>
          <TableHead>Impact</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((record) => (
          <TableRow key={record.id}>
            <TableCell>{new Date(record.date).toLocaleDateString()}</TableCell>
            <TableCell>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${paymentTypeColors[record.type]}`}>
                {record.type.charAt(0).toUpperCase() + record.type.slice(1)}
              </span>
            </TableCell>
            <TableCell>${record.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</TableCell>
            <TableCell>{record.recipient}</TableCell>
            <TableCell>{record.reference}</TableCell>
            <TableCell>
              <span className={paymentStatusColors[record.status]}>
                {record.status.charAt(0).toUpperCase() + record.status.slice(1)}
              </span>
            </TableCell>
            <TableCell>{record.processor}</TableCell>
            <TableCell>
              <span className={paymentImpactColors[record.impact]}>
                {record.impact.charAt(0).toUpperCase() + record.impact.slice(1)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
