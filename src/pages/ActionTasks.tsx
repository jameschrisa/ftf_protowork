import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table"
import { Badge } from "../components/ui/badge"
import { CheckCircle, ClipboardCheck, Clock, AlertCircle, UserCheck, Bot, RefreshCw } from "lucide-react"
import { cn } from "../lib/utils"

// Sample data for Agent Executed Tasks
const agentExecutedTasks = [
  {
    id: "AET001",
    task: "Daily AR Aging Analysis",
    status: "Completed",
    date: "2025-05-17",
    time: "04:30 AM",
    duration: "3 min",
    findings: "No critical issues detected"
  },
  {
    id: "AET002",
    task: "Cash Flow Forecast Update",
    status: "Completed",
    date: "2025-05-17",
    time: "05:15 AM",
    duration: "5 min",
    findings: "Positive trend detected"
  },
  {
    id: "AET003",
    task: "Collection Effectiveness Index Calculation",
    status: "Completed",
    date: "2025-05-17",
    time: "06:00 AM",
    duration: "4 min",
    findings: "99.2% effectiveness"
  },
  {
    id: "AET004",
    task: "Working Capital Impact Assessment",
    status: "Completed",
    date: "2025-05-17",
    time: "07:30 AM",
    duration: "6 min",
    findings: "0.42 impact score"
  },
  {
    id: "AET005",
    task: "High Risk Receivables Detection",
    status: "Completed",
    date: "2025-05-17",
    time: "08:45 AM",
    duration: "7 min",
    findings: "124 high risk accounts identified"
  },
  {
    id: "AET006",
    task: "Days Sales Outstanding Calculation",
    status: "Completed",
    date: "2025-05-17",
    time: "09:30 AM",
    duration: "2 min",
    findings: "42.3 days, trending 2.1 days vs prior month"
  },
  {
    id: "AET007",
    task: "AR Aging Distribution Analysis",
    status: "Completed",
    date: "2025-05-17",
    time: "10:15 AM",
    duration: "5 min",
    findings: "90+ bucket increase 1.2% points"
  },
  {
    id: "AET008",
    task: "Customer Payment Pattern Analysis",
    status: "Completed",
    date: "2025-05-17",
    time: "11:00 AM",
    duration: "8 min",
    findings: "3 customers with changing patterns"
  },
  {
    id: "AET009",
    task: "Invoice Accuracy Verification",
    status: "Completed",
    date: "2025-05-17",
    time: "12:30 PM",
    duration: "10 min",
    findings: "99.8% accuracy rate"
  },
  {
    id: "AET010",
    task: "Credit Limit Utilization Review",
    status: "In Progress",
    date: "2025-05-17",
    time: "01:45 PM",
    duration: "Running",
    findings: "Analyzing data..."
  }
];

// Sample data for User Assigned Tasks
const userAssignedTasks = [
  {
    id: "UAT001",
    task: "Credit Limit Increase Approval",
    assignedTo: "Finance Manager",
    status: "Pending Approval",
    dueDate: "2025-05-18",
    priority: "High"
  },
  {
    id: "UAT002",
    task: "Customer Payment Terms Review",
    assignedTo: "AR Specialist",
    status: "In Progress",
    dueDate: "2025-05-19",
    priority: "Medium"
  },
  {
    id: "UAT003",
    task: "Bad Debt Write-Off Authorization",
    assignedTo: "Finance Director",
    status: "Pending Approval",
    dueDate: "2025-05-20",
    priority: "High"
  },
  {
    id: "UAT004",
    task: "Monthly Financial Close Review",
    assignedTo: "Controller",
    status: "Not Started",
    dueDate: "2025-05-31",
    priority: "High"
  },
  {
    id: "UAT005",
    task: "Customer Dispute Resolution",
    assignedTo: "AR Specialist",
    status: "In Progress",
    dueDate: "2025-05-18",
    priority: "Medium"
  },
  {
    id: "UAT006",
    task: "Cash Application Manual Review",
    assignedTo: "AR Clerk",
    status: "Completed",
    dueDate: "2025-05-17",
    priority: "Medium"
  },
  {
    id: "UAT007",
    task: "Credit Risk Assessment Update",
    assignedTo: "Credit Manager",
    status: "In Progress",
    dueDate: "2025-05-22",
    priority: "Medium"
  },
  {
    id: "UAT008",
    task: "Collection Strategy Approval",
    assignedTo: "Finance Manager",
    status: "Pending Approval",
    dueDate: "2025-05-19",
    priority: "High"
  },
  {
    id: "UAT009",
    task: "Customer Payment Plan Review",
    assignedTo: "AR Manager",
    status: "Not Started",
    dueDate: "2025-05-23",
    priority: "Low"
  },
  {
    id: "UAT010",
    task: "Quarterly Bad Debt Provision",
    assignedTo: "Controller",
    status: "Not Started",
    dueDate: "2025-06-15",
    priority: "Medium"
  }
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let color = "";
  let icon = null;
  
  switch (status) {
    case "Completed":
      color = "bg-green-500/10 text-green-500 border-green-500/20";
      icon = <CheckCircle className="h-3.5 w-3.5 mr-1" />;
      break;
    case "In Progress":
      color = "bg-blue-500/10 text-blue-500 border-blue-500/20";
      icon = <RefreshCw className="h-3.5 w-3.5 mr-1" />;
      break;
    case "Pending Approval":
      color = "bg-amber-500/10 text-amber-500 border-amber-500/20";
      icon = <Clock className="h-3.5 w-3.5 mr-1" />;
      break;
    case "Not Started":
      color = "bg-slate-500/10 text-slate-500 border-slate-500/20";
      icon = <AlertCircle className="h-3.5 w-3.5 mr-1" />;
      break;
    default:
      color = "bg-slate-500/10 text-slate-500 border-slate-500/20";
  }
  
  return (
    <Badge variant="outline" className={cn("flex items-center", color)}>
      {icon}
      {status}
    </Badge>
  );
};

// Priority badge component
const PriorityBadge = ({ priority }: { priority: string }) => {
  let color = "";
  
  switch (priority) {
    case "High":
      color = "bg-red-500/10 text-red-500 border-red-500/20";
      break;
    case "Medium":
      color = "bg-amber-500/10 text-amber-500 border-amber-500/20";
      break;
    case "Low":
      color = "bg-green-500/10 text-green-500 border-green-500/20";
      break;
    default:
      color = "bg-slate-500/10 text-slate-500 border-slate-500/20";
  }
  
  return (
    <Badge variant="outline" className={cn(color)}>
      {priority}
    </Badge>
  );
};

export default function ActionTasks() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardCheck className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Action & Tasks</h2>
        </div>
      </div>

      <Tabs defaultValue="agent" className="space-y-6">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="agent" className="flex items-center gap-2">
            <Bot className="h-4 w-4" />
            <span>Agent Executed Tasks</span>
          </TabsTrigger>
          <TabsTrigger value="user" className="flex items-center gap-2">
            <UserCheck className="h-4 w-4" />
            <span>User Assigned Tasks</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="agent" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                AI Agent Executed Financial Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Findings</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {agentExecutedTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-mono text-xs">{task.id}</TableCell>
                      <TableCell>{task.task}</TableCell>
                      <TableCell>
                        <StatusBadge status={task.status} />
                      </TableCell>
                      <TableCell>{task.date}</TableCell>
                      <TableCell>{task.time}</TableCell>
                      <TableCell>{task.duration}</TableCell>
                      <TableCell className="max-w-xs truncate">{task.findings}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="user" className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">
                Human User Assigned Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Assigned To</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Priority</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userAssignedTasks.map((task) => (
                    <TableRow key={task.id}>
                      <TableCell className="font-mono text-xs">{task.id}</TableCell>
                      <TableCell>{task.task}</TableCell>
                      <TableCell>{task.assignedTo}</TableCell>
                      <TableCell>
                        <StatusBadge status={task.status} />
                      </TableCell>
                      <TableCell>{task.dueDate}</TableCell>
                      <TableCell>
                        <PriorityBadge priority={task.priority} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
