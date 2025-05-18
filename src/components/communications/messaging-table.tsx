import { AppMessage, statusColors, platformColors } from "../../data/communication-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { formatDistanceToNow } from "date-fns"

interface MessagingTableProps {
  data: AppMessage[]
}

export function MessagingTable({ data }: MessagingTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>User</TableHead>
          <TableHead>Platform</TableHead>
          <TableHead>Channel</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Response</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((message) => (
          <TableRow key={message.id}>
            <TableCell className="font-medium">{message.user}</TableCell>
            <TableCell>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${platformColors[message.platform]}`}>
                {message.platform.charAt(0).toUpperCase() + message.platform.slice(1)}
              </span>
            </TableCell>
            <TableCell>#{message.channel}</TableCell>
            <TableCell className="max-w-[200px] truncate" title={message.content}>
              {message.content}
            </TableCell>
            <TableCell className="max-w-[200px] truncate" title={message.aiResponse}>
              {message.aiResponse || "Awaiting response..."}
            </TableCell>
            <TableCell>
              {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
            </TableCell>
            <TableCell>
              <span className={statusColors[message.status]}>
                {message.status.charAt(0).toUpperCase() + message.status.slice(1)}
              </span>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
