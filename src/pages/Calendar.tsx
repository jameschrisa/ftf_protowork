import { useState, useRef } from "react"
import { format, isSameDay } from "date-fns"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { CalendarIcon, DollarSign } from "lucide-react"
import { cn } from "../lib/utils"

// FullCalendar imports
import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"
import interactionPlugin from "@fullcalendar/interaction"
import timeGridPlugin from "@fullcalendar/timegrid"

// Define financial event types
type EventType = "audit" | "close" | "tax" | "budget" | "meeting" | "reconciliation"

// Define financial event interface
interface FinancialEvent {
  id: string
  title: string
  date: Date
  type: EventType
  description: string
}

// Generate mock financial events
const generateFinancialEvents = (): FinancialEvent[] => {
  const today = new Date()
  const currentYear = today.getFullYear()
  
  // Helper function to create a safe date
  const createDate = (year: number, month: number, day: number): Date => {
    const date = new Date(year, month, day)
    return isNaN(date.getTime()) ? today : date
  }
  
  const events: FinancialEvent[] = [
    // Quarterly financial closes
    {
      id: "close-q1",
      title: "Q1 Financial Close",
      date: createDate(currentYear, 2, 15), // March 15
      type: "close",
      description: "End of Q1 financial close process. All departments must submit final reports by EOD."
    },
    {
      id: "close-q2",
      title: "Q2 Financial Close",
      date: createDate(currentYear, 5, 15), // June 15
      type: "close",
      description: "End of Q2 financial close process. All departments must submit final reports by EOD."
    },
    {
      id: "close-q3",
      title: "Q3 Financial Close",
      date: createDate(currentYear, 8, 15), // September 15
      type: "close",
      description: "End of Q3 financial close process. All departments must submit final reports by EOD."
    },
    {
      id: "close-q4",
      title: "Q4 Financial Close",
      date: createDate(currentYear, 11, 15), // December 15
      type: "close",
      description: "End of Q4 financial close process. All departments must submit final reports by EOD."
    },
    
    // Audits
    {
      id: "audit-internal-q1",
      title: "Q1 Internal Audit",
      date: createDate(currentYear, 3, 10), // April 10
      type: "audit",
      description: "Internal audit of Q1 financial statements and processes."
    },
    {
      id: "audit-internal-q3",
      title: "Q3 Internal Audit",
      date: createDate(currentYear, 9, 10), // October 10
      type: "audit",
      description: "Internal audit of Q3 financial statements and processes."
    },
    {
      id: "audit-external",
      title: "Annual External Audit",
      date: createDate(currentYear, 1, 15), // February 15
      type: "audit",
      description: "Annual external audit conducted by Ernst & Young."
    },
    
    // Tax deadlines
    {
      id: "tax-quarterly-1",
      title: "Quarterly Tax Filing",
      date: createDate(currentYear, 3, 15), // April 15
      type: "tax",
      description: "Deadline for Q1 estimated tax payments."
    },
    {
      id: "tax-quarterly-2",
      title: "Quarterly Tax Filing",
      date: createDate(currentYear, 6, 15), // July 15
      type: "tax",
      description: "Deadline for Q2 estimated tax payments."
    },
    {
      id: "tax-quarterly-3",
      title: "Quarterly Tax Filing",
      date: createDate(currentYear, 9, 15), // October 15
      type: "tax",
      description: "Deadline for Q3 estimated tax payments."
    },
    {
      id: "tax-annual",
      title: "Annual Tax Return",
      date: createDate(currentYear, 3, 15), // April 15
      type: "tax",
      description: "Deadline for filing annual corporate tax return."
    },
    
    // Budget planning
    {
      id: "budget-planning",
      title: "Annual Budget Planning",
      date: createDate(currentYear, 10, 1), // November 1
      type: "budget",
      description: "Start of annual budget planning process for next fiscal year."
    },
    {
      id: "budget-approval",
      title: "Budget Approval Meeting",
      date: createDate(currentYear, 11, 10), // December 10
      type: "meeting",
      description: "Executive meeting to approve next year's budget."
    },
    
    // Monthly reconciliations
    {
      id: "reconciliation-jan",
      title: "Monthly Reconciliation",
      date: createDate(currentYear, 0, 5), // January 5
      type: "reconciliation",
      description: "Monthly account reconciliation for previous month."
    },
    {
      id: "reconciliation-feb",
      title: "Monthly Reconciliation",
      date: createDate(currentYear, 1, 5), // February 5
      type: "reconciliation",
      description: "Monthly account reconciliation for previous month."
    },
    {
      id: "reconciliation-mar",
      title: "Monthly Reconciliation",
      date: createDate(currentYear, 2, 5), // March 5
      type: "reconciliation",
      description: "Monthly account reconciliation for previous month."
    },
    
    // Shareholder meetings
    {
      id: "shareholder-q2",
      title: "Quarterly Shareholder Meeting",
      date: createDate(currentYear, 5, 20), // June 20
      type: "meeting",
      description: "Quarterly meeting with shareholders to discuss financial performance."
    },
    {
      id: "shareholder-q4",
      title: "Annual Shareholder Meeting",
      date: createDate(currentYear, 11, 20), // December 20
      type: "meeting",
      description: "Annual meeting with shareholders to discuss yearly performance and future outlook."
    }
  ]
  
  // Add some events near today for testing
  try {
    events.push({
      id: "near-today-1",
      title: "Financial Review Meeting",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 2),
      type: "meeting",
      description: "Review meeting with finance team to discuss current month performance."
    })
    
    events.push({
      id: "near-today-2",
      title: "Expense Report Deadline",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 2),
      type: "reconciliation",
      description: "Deadline for submitting expense reports for current month."
    })
    
    events.push({
      id: "today-event",
      title: "Budget Adjustment Meeting",
      date: new Date(today.getFullYear(), today.getMonth(), today.getDate()),
      type: "budget",
      description: "Mid-year budget adjustment meeting with department heads."
    })
  } catch (error) {
    console.error("Error adding relative date events:", error)
  }
  
  return events
}

// Convert financial events to FullCalendar events
const convertToFullCalendarEvents = (events: FinancialEvent[]) => {
  return events.map(event => ({
    id: event.id,
    title: event.title,
    start: event.date,
    allDay: true,
    extendedProps: {
      type: event.type,
      description: event.description
    },
    backgroundColor: getEventColor(event.type),
    borderColor: getEventColor(event.type)
  }))
}

// Get color based on event type
const getEventColor = (type: EventType): string => {
  switch (type) {
    case "audit":
      return "#ef4444" // red-500
    case "close":
      return "#3b82f6" // blue-500
    case "tax":
      return "#eab308" // yellow-500
    case "budget":
      return "#22c55e" // green-500
    case "meeting":
      return "#a855f7" // purple-500
    case "reconciliation":
      return "#f97316" // orange-500
    default:
      return "#6b7280" // gray-500
  }
}

// Get badge color based on event type
const getEventBadgeColor = (type: EventType) => {
  switch (type) {
    case "audit":
      return "bg-red-500 hover:bg-red-600"
    case "close":
      return "bg-blue-500 hover:bg-blue-600"
    case "tax":
      return "bg-yellow-500 hover:bg-yellow-600 text-black"
    case "budget":
      return "bg-green-500 hover:bg-green-600"
    case "meeting":
      return "bg-purple-500 hover:bg-purple-600"
    case "reconciliation":
      return "bg-orange-500 hover:bg-orange-600"
    default:
      return "bg-gray-500 hover:bg-gray-600"
  }
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [selectedEvent, setSelectedEvent] = useState<FinancialEvent | null>(null)
  const calendarRef = useRef<any>(null)
  
  // Generate financial events
  const financialEvents = generateFinancialEvents()
  
  // Get events for a specific date
  const getEventsForDate = (date: Date) => {
    return financialEvents.filter(event => isSameDay(event.date, date))
  }
  
  // Handle date click
  const handleDateClick = (info: any) => {
    const clickedDate = new Date(info.date)
    setSelectedDate(clickedDate)
    
    const events = getEventsForDate(clickedDate)
    if (events.length > 0) {
      setSelectedEvent(events[0])
    } else {
      setSelectedEvent(null)
    }
  }
  
  // Handle event click
  const handleEventClick = (info: any) => {
    const eventId = info.event.id
    const event = financialEvents.find(e => e.id === eventId)
    if (event) {
      setSelectedEvent(event)
      setSelectedDate(event.date)
    }
  }
  
  // Handle view change
  const handleViewChange = (view: any) => {
    // When view changes, make sure we're still showing the correct selected date
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi()
      const currentDate = calendarApi.getDate()
      setSelectedDate(new Date(currentDate))
    }
  }
  
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <DollarSign className="h-8 w-8 text-blue-700" strokeWidth={1.5} />
        <h1 className="text-3xl font-bold">Financial Calendar</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              Financial Events Calendar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[600px]">
              <FullCalendar
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek'
                }}
                events={convertToFullCalendarEvents(financialEvents)}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                datesSet={handleViewChange}
                height="100%"
                dayMaxEvents={3}
                eventTimeFormat={{
                  hour: 'numeric',
                  minute: '2-digit',
                  meridiem: 'short'
                }}
                themeSystem="standard"
                fixedWeekCount={false}
                navLinks={true}
                editable={false}
                selectable={true}
                selectMirror={true}
                dayMaxEventRows={true}
                nowIndicator={true}
                businessHours={{
                  daysOfWeek: [1, 2, 3, 4, 5], // Monday - Friday
                  startTime: '09:00',
                  endTime: '17:00',
                }}
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Event details */}
        <Card>
          <CardHeader>
            <CardTitle>Events for {format(selectedDate, "MMMM d, yyyy")}</CardTitle>
          </CardHeader>
          <CardContent>
            {getEventsForDate(selectedDate).length > 0 ? (
              <div className="space-y-4">
                {getEventsForDate(selectedDate).map((event) => (
                  <div 
                    key={event.id} 
                    className={cn(
                      "p-4 rounded-md border cursor-pointer transition-colors",
                      selectedEvent?.id === event.id ? "border-primary bg-primary/5" : "hover:bg-accent"
                    )}
                    onClick={() => setSelectedEvent(event)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium">{event.title}</h3>
                      <Badge className={getEventBadgeColor(event.type)}>
                        {event.type.charAt(0).toUpperCase() + event.type.slice(1)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{event.description}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-[200px] text-center">
                <CalendarIcon className="h-10 w-10 text-muted-foreground mb-2" />
                <p className="text-muted-foreground">No financial events scheduled for this date.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
      
      {/* Legend */}
      <Card>
        <CardHeader>
          <CardTitle>Event Types</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-blue-500" />
              <span>Financial Close</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span>Audit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <span>Tax Deadline</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span>Budget Planning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-purple-500" />
              <span>Meeting</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-orange-500" />
              <span>Reconciliation</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
