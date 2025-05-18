export interface ClientProfile {
  id: string
  name: string
  type: string
  riskLevel: 'high' | 'medium' | 'low'
  status: 'active' | 'review-needed' | 'inactive'
  lastReview: string
  nextReview: string
  accountManager: string
  notes: string
}

export const clientProfiles: ClientProfile[] = [
  {
    id: "cp001",
    name: "Acme Corporation",
    type: "Enterprise",
    riskLevel: "low",
    status: "active",
    lastReview: "2024-02-15",
    nextReview: "2024-05-15",
    accountManager: "Sarah Johnson",
    notes: "Long-term client with stable financials"
  },
  {
    id: "cp002",
    name: "TechNova Solutions",
    type: "Mid-Market",
    riskLevel: "medium",
    status: "active",
    lastReview: "2024-02-10",
    nextReview: "2024-05-10",
    accountManager: "Michael Chen",
    notes: "Growing tech company with increasing capital needs"
  },
  {
    id: "cp003",
    name: "Global Logistics Inc",
    type: "Enterprise",
    riskLevel: "medium",
    status: "review-needed",
    lastReview: "2024-02-20",
    nextReview: "2024-05-20",
    accountManager: "David Wilson",
    notes: "Quarterly financial review upcoming"
  },
  {
    id: "cp004",
    name: "Riverside Healthcare",
    type: "Non-Profit",
    riskLevel: "low",
    status: "active",
    lastReview: "2024-02-01",
    nextReview: "2024-05-01",
    accountManager: "Emma Davis",
    notes: "Stable funding sources and conservative financial management"
  },
  {
    id: "cp005",
    name: "Quantum Innovations",
    type: "Startup",
    riskLevel: "high",
    status: "active",
    lastReview: "2024-02-25",
    nextReview: "2024-05-25",
    accountManager: "James Rodriguez",
    notes: "Recent Series B funding, monitoring cash burn rate"
  },
  {
    id: "cp006",
    name: "Heritage Manufacturing",
    type: "Mid-Market",
    riskLevel: "medium",
    status: "review-needed",
    lastReview: "2024-02-05",
    nextReview: "2024-05-05",
    accountManager: "Olivia Thompson",
    notes: "Supply chain challenges affecting working capital"
  }
]
