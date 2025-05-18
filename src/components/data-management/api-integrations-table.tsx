import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { ChevronDown, MoreHorizontal } from "lucide-react"
import { APIIntegration } from "../../data/api-integration-data"

interface APIIntegrationsTableProps {
  data: APIIntegration[]
}

interface Column {
  id: keyof APIIntegration
  label: string
  isVisible: boolean
}

const statusColors = {
  'active': "text-green-500",
  'degraded': "text-yellow-500",
  'offline': "text-red-500"
}

const typeColors = {
  'internal': "text-blue-500",
  'third-party': "text-purple-500"
}

export function APIIntegrationsTable({ data }: APIIntegrationsTableProps) {
  const [columns, setColumns] = useState<Column[]>([
    { id: "name", label: "API Name", isVisible: true },
    { id: "provider", label: "Provider", isVisible: true },
    { id: "type", label: "Type", isVisible: true },
    { id: "status", label: "Status", isVisible: true },
    { id: "callVolume", label: "Call Volume", isVisible: true },
    { id: "errorRate", label: "Error Rate (%)", isVisible: true },
    { id: "responseTime", label: "Response Time (ms)", isVisible: true },
    { id: "lastChecked", label: "Last Checked", isVisible: true },
    { id: "description", label: "Description", isVisible: false },
  ])

  const toggleColumn = (columnId: keyof APIIntegration, checked: boolean) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, isVisible: checked } : col
      )
    )
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filter API integrations..."
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {columns.map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                checked={column.isVisible}
                onCheckedChange={(checked: boolean) => toggleColumn(column.id, checked)}
              >
                {column.label}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {columns
                .filter((column) => column.isVisible)
                .map((column) => (
                  <TableHead key={column.id}>{column.label}</TableHead>
                ))}
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((api) => (
              <TableRow key={api.id}>
                {columns
                  .filter((column) => column.isVisible)
                  .map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'status' ? (
                        <span className={statusColors[api.status]}>
                          {api.status.charAt(0).toUpperCase() + api.status.slice(1)}
                        </span>
                      ) : column.id === 'type' ? (
                        <span className={typeColors[api.type]}>
                          {api.type === 'third-party' ? 'Third-Party' : 'Internal'}
                        </span>
                      ) : column.id === 'lastChecked' ? (
                        formatDate(api.lastChecked)
                      ) : column.id === 'errorRate' ? (
                        `${api.errorRate.toFixed(1)}%`
                      ) : (
                        api[column.id]
                      )}
                    </TableCell>
                  ))}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
