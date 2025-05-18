import { Info } from "lucide-react"
import { Button } from "../ui/button"
import { TabsTrigger } from "../ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { cn } from "../../lib/utils"

interface TabItemProps {
  value: string
  label: string
  info: {
    title: string
    description: string
  }
}

export function TabItem({ value, label, info }: TabItemProps) {
  return (
    <div className="flex items-center gap-1 px-2">
      <TabsTrigger value={value} className="data-[state=active]:bg-primary/10">
        {label}
      </TabsTrigger>
      <Dialog>
        <DialogTrigger asChild>
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "h-6 w-6 rounded-full",
              "hover:bg-primary/10",
              "focus-visible:ring-1 focus-visible:ring-primary"
            )}
          >
            <Info className="h-3 w-3" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{info.title}</DialogTitle>
            <DialogDescription className="whitespace-pre-line">
              {info.description}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}
