import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { FinancialSOP } from "../../data/financial-sops-data"

interface FinancialSOPsTableProps {
  data: FinancialSOP[]
}

const priorityColors = {
  high: "text-red-500",
  medium: "text-yellow-500",
  low: "text-green-500"
}

const statusColors = {
  'current': "text-green-500",
  'review-needed': "text-yellow-500",
  'outdated': "text-red-500"
}

export function FinancialSOPsTable({ data }: FinancialSOPsTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Document Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Update</TableHead>
          <TableHead>Next Review</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((sop) => (
          <TableRow key={sop.id}>
            <TableCell className="font-medium">{sop.name}</TableCell>
            <TableCell>{sop.type}</TableCell>
            <TableCell>
              <span className={priorityColors[sop.priority]}>
                {sop.priority.charAt(0).toUpperCase() + sop.priority.slice(1)}
              </span>
            </TableCell>
            <TableCell>
              <span className={statusColors[sop.status]}>
                {sop.status.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
            </TableCell>
            <TableCell>{new Date(sop.lastUpdate).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(sop.nextReview).toLocaleDateString()}</TableCell>
            <TableCell>{sop.owner}</TableCell>
            <TableCell>{sop.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
