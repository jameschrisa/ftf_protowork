import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "../../lib/utils"
import { Button } from "./button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./popover"

interface ComboboxProps {
  items: { id: string; name: string; location: string }[]
  placeholder?: string
  emptyText?: string
  value?: string
  onValueChange?: (value: string) => void
  className?: string
}

export function Combobox({ 
  items, 
  placeholder = "Select an item...", 
  emptyText = "No items found.",
  value,
  onValueChange,
  className
}: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")

  const selectedItem = items.find(item => item.id === value)

  const filteredItems = React.useMemo(() => {
    if (!searchQuery) return items
    const query = searchQuery.toLowerCase()
    return items.filter(item => 
      item.id.toLowerCase().includes(query) || 
      item.name.toLowerCase().includes(query) ||
      item.location.toLowerCase().includes(query)
    )
  }, [items, searchQuery])

  const handleSelect = (itemId: string) => {
    onValueChange?.(itemId)
    setOpen(false)
    setSearchQuery("")
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn("w-[300px] justify-between font-normal", className)}
        >
          {selectedItem ? `${selectedItem.id} - ${selectedItem.name}` : placeholder}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0" align="start">
        <div className="flex flex-col">
          <input
            className="flex h-9 w-full rounded-md bg-transparent py-3 px-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-0"
            placeholder="Search flares..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="max-h-[300px] overflow-auto">
            {filteredItems.length === 0 ? (
              <div className="py-6 text-center text-sm">{emptyText}</div>
            ) : (
              filteredItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={cn(
                    "relative flex cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none hover:bg-accent hover:text-accent-foreground",
                    value === item.id && "bg-accent text-accent-foreground"
                  )}
                >
                  <div className="min-w-[16px] mr-2">
                    {value === item.id && <Check className="h-4 w-4" />}
                  </div>
                  <div className="flex flex-col">
                    <div>{item.id} - {item.name}</div>
                    <div className="text-xs text-muted-foreground">{item.location}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
