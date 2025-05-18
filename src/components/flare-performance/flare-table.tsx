import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { FlareRecord } from "../../data/flare-performance-data"

interface FlareTableProps {
  data: FlareRecord[]
}

const statusColors = {
  Online: "text-green-500",
  Offline: "text-red-500",
  Maintenance: "text-yellow-500"
}

export function FlareTable({ data }: FlareTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Flare ID</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Fuel Type</TableHead>
          <TableHead>Capacity (MMBTU)</TableHead>
          <TableHead>Uptime %</TableHead>
          <TableHead>Efficiency Rating</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Emissions (tons CO2e)</TableHead>
          <TableHead>Flow Rate (MSCFD)</TableHead>
          <TableHead>Temperature (°F)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((flare) => (
          <TableRow key={flare.id}>
            <TableCell className="font-medium">{flare.id}</TableCell>
            <TableCell>{flare.location}</TableCell>
            <TableCell>{flare.fuelType}</TableCell>
            <TableCell>{flare.capacity.toFixed(1)}</TableCell>
            <TableCell>{flare.uptimePercentage.toFixed(1)}%</TableCell>
            <TableCell>{flare.efficiencyRating.toFixed(1)}</TableCell>
            <TableCell>
              <span className={statusColors[flare.status]}>
                {flare.status}
              </span>
            </TableCell>
            <TableCell>{flare.emissions.toLocaleString()}</TableCell>
            <TableCell>{flare.flowRate.toFixed(1)}</TableCell>
            <TableCell>{flare.temperature.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
