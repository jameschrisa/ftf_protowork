import { useState } from "react"
import { Search } from "lucide-react"
import { ClientProfile } from "../../data/client-profiles-data"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

interface ClientSearchDialogProps {
  clients: ClientProfile[]
  onClientSelect: (client: ClientProfile) => void
}

export function ClientSearchDialog({ clients, onClientSelect }: ClientSearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [open, setOpen] = useState(false)

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleClientSelect = (client: ClientProfile) => {
    onClientSelect(client)
    setOpen(false)
    setSearchQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Search className="h-4 w-4" />
          Search Clients
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search Clients</DialogTitle>
          <DialogDescription>
            Search for a client to view their profile
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2 py-4">
          <div className="grid flex-1 gap-2">
            <Input
              placeholder="Search by client name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <div className="max-h-60 overflow-y-auto">
              {filteredClients.length > 0 ? (
                <ul className="divide-y">
                  {filteredClients.map((client) => (
                    <li
                      key={client.id}
                      className="py-2 px-3 hover:bg-muted cursor-pointer rounded-md"
                      onClick={() => handleClientSelect(client)}
                    >
                      <div className="font-medium">{client.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {client.type} • Risk Level: {client.riskLevel}
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-center py-4 text-muted-foreground">
                  No clients found
                </div>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
