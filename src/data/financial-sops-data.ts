export interface FinancialSOP {
  id: string
  name: string
  type: string
  priority: 'high' | 'medium' | 'low'
  status: 'current' | 'review-needed' | 'outdated'
  lastUpdate: string
  nextReview: string
  owner: string
  notes: string
}

export const financialSOPs: FinancialSOP[] = [
  {
    id: "sop001",
    name: "Financial Reporting Procedures",
    type: "Accounting",
    priority: "high",
    status: "current",
    lastUpdate: "2024-02-15",
    nextReview: "2024-05-15",
    owner: "Finance Department",
    notes: "Quarterly and annual reporting guidelines"
  },
  {
    id: "sop002",
    name: "Expense Approval Policy",
    type: "Operations",
    priority: "medium",
    status: "current",
    lastUpdate: "2024-02-10",
    nextReview: "2024-05-10",
    owner: "Controller's Office",
    notes: "Approval thresholds and documentation requirements"
  },
  {
    id: "sop003",
    name: "Revenue Recognition Guidelines",
    type: "Accounting",
    priority: "high",
    status: "review-needed",
    lastUpdate: "2024-02-20",
    nextReview: "2024-05-20",
    owner: "Accounting Team",
    notes: "Update needed for new service offerings"
  },
  {
    id: "sop004",
    name: "Internal Audit Procedures",
    type: "Compliance",
    priority: "medium",
    status: "current",
    lastUpdate: "2024-02-01",
    nextReview: "2024-05-01",
    owner: "Audit Committee",
    notes: "Standard audit protocols and schedules"
  },
  {
    id: "sop005",
    name: "Financial Controls Documentation",
    type: "Compliance",
    priority: "high",
    status: "current",
    lastUpdate: "2024-02-25",
    nextReview: "2024-05-25",
    owner: "CFO Office",
    notes: "SOX compliance documentation"
  },
  {
    id: "sop006",
    name: "Cash Management Policy",
    type: "Treasury",
    priority: "medium",
    status: "review-needed",
    lastUpdate: "2024-02-05",
    nextReview: "2024-05-05",
    owner: "Treasury Department",
    notes: "Review needed for international operations"
  }
]
