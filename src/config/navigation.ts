import {
  BarChart3,
  AlertTriangle,
  Settings,
  FileText,
  Home,
  TrendingUp,
  ClipboardCheck,
  Calendar,
  Users,
  HelpCircle,
  Mail,
  Clock,
  FileSpreadsheet,
  Shield,
  Database,
  MessagesSquare,
} from "lucide-react"

export const navigation = [
  {
    id: "overview",
    name: "Overview",
    href: "/",
    icon: Home,
  },
  {
    id: "action-tasks",
    name: "Action & Tasks",
    href: "/action-tasks",
    icon: ClipboardCheck,
  },
  {
    id: "financial-analytics",
    name: "Financial Analytics",
    href: "/financial-analytics",
    icon: BarChart3,
  },
  {
    id: "client-profiles",
    name: "Client Profiles",
    href: "/client-profiles",
    icon: Users,
  },
  {
    id: "time-explorer",
    name: "Time Explorer",
    href: "/time-explorer",
    icon: Clock,
  },
  {
    id: "sops-policies",
    name: "SOPs & Policies",
    href: "/sops-policies",
    icon: Shield,
  },
  {
    id: "data-management",
    name: "Data Management",
    href: "/data-management",
    icon: Database,
  },
  {
    id: "communications",
    name: "Communications",
    href: "/communications",
    icon: MessagesSquare,
  },
  {
    id: "trends",
    name: "Trends",
    href: "/trends",
    icon: TrendingUp,
  },
  {
    id: "documentation",
    name: "Documentation",
    href: "/documentation",
    icon: FileText,
  },
  {
    id: "settings",
    name: "Settings",
    href: "/settings",
    icon: Settings,
  },
]

export const footerNavigation = [
  {
    id: "support",
    name: "Support",
    href: "#",
    icon: HelpCircle,
  },
  {
    id: "contact",
    name: "Contact",
    href: "#",
    icon: Mail,
  },
]

export type NavigationItem = typeof navigation[0]
export type FooterNavigationItem = typeof footerNavigation[0]
