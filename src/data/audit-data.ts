export type AuditType = 'Internal' | 'External'
export type AuditFrequency = 'Quarterly' | 'Annually'
export type AuditStatus = 'In Progress' | 'Completed'

export interface Audit {
  id: string
  name: string
  type: AuditType
  startDate: string
  endDate: string
  frequency: AuditFrequency
  status: AuditStatus
  nextAuditDate: string
  score: number
  auditor: string
}

export const audits: Audit[] = [
  {
    id: "AUD-001",
    name: "SOC2 Type II Audit",
    type: "External",
    startDate: "2024-01-15",
    endDate: "2024-02-15",
    frequency: "Annually",
    status: "Completed",
    nextAuditDate: "2025-01-15",
    score: 92,
    auditor: "John Smith (Deloitte)",
  },
  {
    id: "AUD-002",
    name: "Internal Security Review",
    type: "Internal",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    frequency: "Quarterly",
    status: "Completed",
    nextAuditDate: "2024-06-01",
    score: 88,
    auditor: "Sarah Johnson",
  },
  {
    id: "AUD-003",
    name: "ISO 27001 Certification",
    type: "External",
    startDate: "2024-04-01",
    endDate: "2024-05-15",
    frequency: "Annually",
    status: "In Progress",
    nextAuditDate: "2025-04-01",
    score: 85,
    auditor: "Michael Chen (BSI)",
  },
  {
    id: "AUD-004",
    name: "HIPAA Compliance Audit",
    type: "External",
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    frequency: "Annually",
    status: "Completed",
    nextAuditDate: "2025-02-01",
    score: 95,
    auditor: "Emma Davis (KPMG)",
  },
  {
    id: "AUD-005",
    name: "Q1 Security Assessment",
    type: "Internal",
    startDate: "2024-03-20",
    endDate: "2024-03-31",
    frequency: "Quarterly",
    status: "Completed",
    nextAuditDate: "2024-06-20",
    score: 90,
    auditor: "David Wilson",
  },
]
