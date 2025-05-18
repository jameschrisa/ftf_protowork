import { Bell } from "lucide-react"
import { Button } from "./button"
import { toast } from "sonner"

// Financial-specific notifications
const notifications = [
  {
    id: 1,
    title: "Payment Received Alert",
    message: "Payment of $12,500 received from Acme Corporation for invoice INV-2024-0125.",
    time: "2 minutes ago"
  },
  {
    id: 2,
    title: "Credit Limit Warning",
    message: "Globex Industries approaching credit limit. Current utilization: 85% of $200,000 limit.",
    time: "1 hour ago"
  },
  {
    id: 3,
    title: "Invoice Approval Required",
    message: "New invoice #INV-2024-0156 requires approval. Amount: $45,200, Customer: Wayne Enterprises.",
    time: "3 hours ago"
  },
  {
    id: 4,
    title: "Aging Receivable Alert",
    message: "5 invoices have moved to 90+ days aging bucket. Total value: $28,750.",
    time: "5 hours ago"
  }
]

export function NotificationButton() {
  const showNotifications = () => {
    // Show notifications in reverse order (newest first)
    [...notifications].reverse().forEach((notification) => {
      toast(notification.title, {
        description: notification.message,
        duration: 5000,
      })
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-9 w-9 relative"
      onClick={showNotifications}
    >
      <Bell className="h-5 w-5" />
      <span className="absolute top-0 right-0 h-2.5 w-2.5 rounded-full bg-red-500" />
      <span className="sr-only">Show notifications</span>
    </Button>
  )
}
