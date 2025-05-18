import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { ClientProfile } from "../../data/client-profiles-data"

interface ClientProfilesTableProps {
  data: ClientProfile[]
}

const riskLevelColors = {
  high: "text-red-500",
  medium: "text-yellow-500",
  low: "text-green-500"
}

const statusColors = {
  'active': "text-green-500",
  'review-needed': "text-yellow-500",
  'inactive': "text-red-500"
}

export function ClientProfilesTable({ data }: ClientProfilesTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Client Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Risk Level</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Last Review</TableHead>
          <TableHead>Next Review</TableHead>
          <TableHead>Account Manager</TableHead>
          <TableHead>Notes</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((profile) => (
          <TableRow key={profile.id}>
            <TableCell className="font-medium">{profile.name}</TableCell>
            <TableCell>{profile.type}</TableCell>
            <TableCell>
              <span className={riskLevelColors[profile.riskLevel]}>
                {profile.riskLevel.charAt(0).toUpperCase() + profile.riskLevel.slice(1)}
              </span>
            </TableCell>
            <TableCell>
              <span className={statusColors[profile.status]}>
                {profile.status.split('-').map(word => 
                  word.charAt(0).toUpperCase() + word.slice(1)
                ).join(' ')}
              </span>
            </TableCell>
            <TableCell>{new Date(profile.lastReview).toLocaleDateString()}</TableCell>
            <TableCell>{new Date(profile.nextReview).toLocaleDateString()}</TableCell>
            <TableCell>{profile.accountManager}</TableCell>
            <TableCell>{profile.notes}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
