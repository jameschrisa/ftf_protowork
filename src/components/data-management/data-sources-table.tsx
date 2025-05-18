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

interface DataSource {
  id: string
  name: string
  type: string
  status: string
  lastSync: string
  records: number
}

const dataSources: DataSource[] = [
  {
    id: "1",
    name: "Production Database",
    type: "PostgreSQL",
    status: "Active",
    lastSync: "2023-10-15",
    records: 150000,
  },
  {
    id: "2",
    name: "Backup Server",
    type: "MySQL",
    status: "Active",
    lastSync: "2023-10-14",
    records: 120000,
  },
]

interface Column {
  id: keyof DataSource
  label: string
  isVisible: boolean
}

export default function DataSourcesTable() {
  const [columns, setColumns] = useState<Column[]>([
    { id: "name", label: "Name", isVisible: true },
    { id: "type", label: "Type", isVisible: true },
    { id: "status", label: "Status", isVisible: true },
    { id: "lastSync", label: "Last Sync", isVisible: true },
    { id: "records", label: "Records", isVisible: true },
  ])

  const toggleColumn = (columnId: keyof DataSource, checked: boolean) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId ? { ...col, isVisible: checked } : col
      )
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filter data sources..."
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
            {dataSources.map((source) => (
              <TableRow key={source.id}>
                {columns
                  .filter((column) => column.isVisible)
                  .map((column) => (
                    <TableCell key={column.id}>
                      {source[column.id]}
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
