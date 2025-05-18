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
import { ERPSystem } from "../../data/erp-systems-data"

interface ERPSystemsTableProps {
  data: ERPSystem[]
}

interface Column {
  id: keyof ERPSystem
  label: string
  isVisible: boolean
}

const statusColors = {
  'active': "text-green-500",
  'maintenance': "text-yellow-500",
  'offline': "text-red-500"
}

export function ERPSystemsTable({ data }: ERPSystemsTableProps) {
  const [columns, setColumns] = useState<Column[]>([
    { id: "name", label: "System Name", isVisible: true },
    { id: "type", label: "Type", isVisible: true },
    { id: "status", label: "Status", isVisible: true },
    { id: "lastUpdate", label: "Last Update", isVisible: true },
    { id: "userCount", label: "User Count", isVisible: true },
    { id: "dataSize", label: "Data Size", isVisible: true },
    { id: "owner", label: "Owner", isVisible: true },
    { id: "description", label: "Description", isVisible: false },
  ])

  const toggleColumn = (columnId: keyof ERPSystem, checked: boolean) => {
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
            placeholder="Filter ERP systems..."
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
            {data.map((system) => (
              <TableRow key={system.id}>
                {columns
                  .filter((column) => column.isVisible)
                  .map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'status' ? (
                        <span className={statusColors[system.status]}>
                          {system.status.charAt(0).toUpperCase() + system.status.slice(1)}
                        </span>
                      ) : column.id === 'lastUpdate' ? (
                        formatDate(system.lastUpdate)
                      ) : (
                        system[column.id]
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
