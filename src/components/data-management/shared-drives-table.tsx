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
import { SharedDrive } from "../../data/shared-drives-data"

interface SharedDrivesTableProps {
  data: SharedDrive[]
}

interface Column {
  id: keyof SharedDrive
  label: string
  isVisible: boolean
}

const permissionColors = {
  'read-only': "text-blue-500",
  'read-write': "text-green-500",
  'full-access': "text-purple-500"
}

export function SharedDrivesTable({ data }: SharedDrivesTableProps) {
  const [columns, setColumns] = useState<Column[]>([
    { id: "name", label: "Folder Name", isVisible: true },
    { id: "owner", label: "Owner", isVisible: true },
    { id: "fileCount", label: "Files", isVisible: true },
    { id: "size", label: "Size", isVisible: true },
    { id: "permissions", label: "Permissions", isVisible: true },
    { id: "lastAccessed", label: "Last Accessed", isVisible: true },
    { id: "path", label: "Path", isVisible: true },
    { id: "description", label: "Description", isVisible: false },
  ])

  const toggleColumn = (columnId: keyof SharedDrive, checked: boolean) => {
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

  const formatPermission = (permission: string) => {
    return permission.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ')
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Filter shared drives..."
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
            {data.map((drive) => (
              <TableRow key={drive.id}>
                {columns
                  .filter((column) => column.isVisible)
                  .map((column) => (
                    <TableCell key={column.id}>
                      {column.id === 'permissions' ? (
                        <span className={permissionColors[drive.permissions]}>
                          {formatPermission(drive.permissions)}
                        </span>
                      ) : column.id === 'lastAccessed' ? (
                        formatDate(drive.lastAccessed)
                      ) : (
                        drive[column.id]
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
