export interface BusinessContinuityAsset {
  id: string
  name: string
  type: string
  priority: 'high' | 'medium' | 'low'
  status: 'compliant' | 'review-needed' | 'non-compliant'
  lastAssessment: string
  nextAssessment: string
  owner: string
  notes: string
}

export const businessContinuityAssets: BusinessContinuityAsset[] = [
  {
    id: "bca001",
    name: "Flare System Operations",
    type: "Critical Process",
    priority: "high",
    status: "compliant",
    lastAssessment: "2024-02-15",
    nextAssessment: "2024-05-15",
    owner: "Operations Team",
    notes: "Regular compliance monitoring in place"
  },
  {
    id: "bca002",
    name: "Emissions Monitoring",
    type: "Environmental",
    priority: "high",
    status: "compliant",
    lastAssessment: "2024-02-10",
    nextAssessment: "2024-05-10",
    owner: "Environmental Team",
    notes: "Continuous monitoring system operational"
  },
  {
    id: "bca003",
    name: "Safety Systems",
    type: "Safety",
    priority: "high",
    status: "review-needed",
    lastAssessment: "2024-02-20",
    nextAssessment: "2024-05-20",
    owner: "Safety Team",
    notes: "Quarterly review upcoming"
  },
  {
    id: "bca004",
    name: "Maintenance Procedures",
    type: "Operations",
    priority: "medium",
    status: "compliant",
    lastAssessment: "2024-02-01",
    nextAssessment: "2024-05-01",
    owner: "Maintenance Team",
    notes: "Standard procedures documented"
  },
  {
    id: "bca005",
    name: "Emergency Response",
    type: "Safety",
    priority: "high",
    status: "compliant",
    lastAssessment: "2024-02-25",
    nextAssessment: "2024-05-25",
    owner: "Emergency Response Team",
    notes: "Procedures updated and tested"
  },
  {
    id: "bca006",
    name: "Operator Training",
    type: "Training",
    priority: "medium",
    status: "review-needed",
    lastAssessment: "2024-02-05",
    nextAssessment: "2024-05-05",
    owner: "Training Team",
    notes: "Training materials need review"
  }
]
