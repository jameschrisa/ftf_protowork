export interface ERPSystem {
  id: string
  name: string
  type: string
  status: 'active' | 'maintenance' | 'offline'
  lastUpdate: string
  userCount: number
  dataSize: string
  owner: string
  description: string
}

export const erpSystems: ERPSystem[] = [
  {
    id: "erp001",
    name: "SAP Financial Core",
    type: "ERP",
    status: "active",
    lastUpdate: "2024-05-16T14:30:00",
    userCount: 450,
    dataSize: "2.3 TB",
    owner: "Finance Department",
    description: "Primary financial management system for accounting and reporting"
  },
  {
    id: "erp002",
    name: "Oracle NetSuite",
    type: "ERP",
    status: "active",
    lastUpdate: "2024-05-17T09:15:00",
    userCount: 320,
    dataSize: "1.8 TB",
    owner: "Operations",
    description: "Cloud-based ERP for subsidiary operations and reporting"
  },
  {
    id: "erp003",
    name: "Microsoft Dynamics 365",
    type: "CRM/ERP",
    status: "active",
    lastUpdate: "2024-05-16T18:45:00",
    userCount: 275,
    dataSize: "1.2 TB",
    owner: "Sales Department",
    description: "Customer relationship management and sales operations"
  },
  {
    id: "erp004",
    name: "Workday HCM",
    type: "HR System",
    status: "active",
    lastUpdate: "2024-05-15T11:20:00",
    userCount: 180,
    dataSize: "950 GB",
    owner: "HR Department",
    description: "Human capital management and payroll processing"
  },
  {
    id: "erp005",
    name: "Sage Intacct",
    type: "Accounting",
    status: "maintenance",
    lastUpdate: "2024-05-10T16:30:00",
    userCount: 85,
    dataSize: "650 GB",
    owner: "Accounting Team",
    description: "Cloud financial management for smaller business units"
  },
  {
    id: "erp006",
    name: "Coupa Procurement",
    type: "Procurement",
    status: "active",
    lastUpdate: "2024-05-16T10:45:00",
    userCount: 120,
    dataSize: "780 GB",
    owner: "Procurement Team",
    description: "Spend management and procurement automation"
  },
  {
    id: "erp007",
    name: "BlackLine",
    type: "Financial Close",
    status: "active",
    lastUpdate: "2024-05-17T08:30:00",
    userCount: 65,
    dataSize: "420 GB",
    owner: "Accounting Team",
    description: "Financial close and reconciliation management"
  },
  {
    id: "erp008",
    name: "Legacy Financial System",
    type: "Accounting",
    status: "offline",
    lastUpdate: "2024-04-30T09:00:00",
    userCount: 10,
    dataSize: "1.1 TB",
    owner: "IT Department",
    description: "Legacy system maintained for historical data access only"
  }
]
