import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { BusinessContinuityAsset } from "../../data/business-continuity-data"

interface BusinessContinuityTableProps {
  data: BusinessContinuityAsset[]
}

const priorityColors = {
  high: "text-red-500",
  medium: "text-yellow-500",
  low: "text-green-500"
}

const statusColors = {
  'compliant': "text-green-500",
  'review-needed': "text-yellow-500",
  'non-compliant': "text-red-500"
}

export function BusinessContinuityTable({ data }: BusinessContinuityTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Asset/Process</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Assessment</TableHead>
          <TableHead>Next Assessment</TableHead>
          <TableHead>Owner</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((asset) => (
          <TableRow key={asset.id}>
            <TableCell className="font-medium">{asset.name}</TableCell>
            <TableCell>{asset.type}</TableCell>
            <TableCell>
              <span className={priorityColors[asset.priority]}>
                {asset.priority.charAt(0).toUpperCase() + asset.priority.slice(1)}
              </span>
            </TableCell>
            <TableCell>
              <span className={statusColors[asset.status]}>
                {asset.status.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
            </TableCell>
            <TableCell>{new Date(asset.lastAssessment).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(asset.nextAssessment).toLocaleDateString()}</TableCell>
            <TableCell>{asset.owner}</TableCell>
            <TableCell>{asset.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
