import { EmailMessage, statusColors } from "../../data/communication-data"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { formatDistanceToNow } from "date-fns"

interface EmailTableProps {
  data: EmailMessage[]
}

export function EmailTable({ data }: EmailTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Sender</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Request</TableHead>
          <TableHead>Response</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((message) => (
          <TableRow key={message.id}>
            <TableCell className="font-medium">{message.sender}</TableCell>
            <TableCell>{message.subject}</TableCell>
            <TableCell className="max-w-[250px] truncate" title={message.content}>
              {message.content}
            </TableCell>
            <TableCell className="max-w-[250px] truncate" title={message.aiResponse}>
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
