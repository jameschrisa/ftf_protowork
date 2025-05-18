export interface SharedDrive {
  id: string
  name: string
  owner: string
  fileCount: number
  size: string
  permissions: 'read-only' | 'read-write' | 'full-access'
  lastAccessed: string
  path: string
  description: string
}

export const sharedDrives: SharedDrive[] = [
  {
    id: "drive001",
    name: "Finance Department",
    owner: "Finance Team",
    fileCount: 3250,
    size: "1.2 TB",
    permissions: "read-write",
    lastAccessed: "2024-05-17T11:30:00",
    path: "/shared/finance",
    description: "Financial reports, statements, and analysis documents"
  },
  {
    id: "drive002",
    name: "Accounting Archives",
    owner: "Accounting Team",
    fileCount: 8750,
    size: "3.5 TB",
    permissions: "read-only",
    lastAccessed: "2024-05-16T15:45:00",
    path: "/shared/accounting/archives",
    description: "Historical accounting records and audit documentation"
  },
  {
    id: "drive003",
    name: "Financial Planning",
    owner: "FP&A Team",
    fileCount: 1850,
    size: "750 GB",
    permissions: "read-write",
    lastAccessed: "2024-05-17T09:20:00",
    path: "/shared/planning",
    description: "Budgets, forecasts, and financial planning documents"
  },
  {
    id: "drive004",
    name: "Tax Documentation",
    owner: "Tax Department",
    fileCount: 4200,
    size: "1.8 TB",
    permissions: "read-only",
    lastAccessed: "2024-05-15T14:10:00",
    path: "/shared/tax",
    description: "Tax filings, documentation, and compliance records"
  },
  {
    id: "drive005",
    name: "Treasury Management",
    owner: "Treasury Team",
    fileCount: 980,
    size: "450 GB",
    permissions: "read-write",
    lastAccessed: "2024-05-17T10:15:00",
    path: "/shared/treasury",
    description: "Cash management and investment documentation"
  },
  {
    id: "drive006",
    name: "Audit Committee",
    owner: "Audit Team",
    fileCount: 1250,
    size: "680 GB",
    permissions: "full-access",
    lastAccessed: "2024-05-16T16:30:00",
    path: "/shared/audit",
    description: "Internal and external audit documentation and findings"
  },
  {
    id: "drive007",
    name: "Financial Policies",
    owner: "CFO Office",
    fileCount: 320,
    size: "180 GB",
    permissions: "read-only",
    lastAccessed: "2024-05-17T08:45:00",
    path: "/shared/policies/finance",
    description: "Financial policies, procedures, and guidelines"
  },
  {
    id: "drive008",
    name: "Executive Reports",
    owner: "Executive Team",
    fileCount: 450,
    size: "250 GB",
    permissions: "read-only",
    lastAccessed: "2024-05-17T11:00:00",
    path: "/shared/executive/finance",
    description: "Financial reports and presentations for executive leadership"
  }
]
