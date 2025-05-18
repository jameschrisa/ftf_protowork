export type TrainingType = 'Security Awareness' | 'Compliance'
export type TrainingCategory = 'Data Protection' | 'InfoSec' | 'Risk Management'
export type TargetAudience = 'Employees' | 'Managers' | 'All'
export type BusinessUnit = 'Finance' | 'Marketing' | 'Corporate' | 'R&D' | 'All'
export type RegulatoryRequirement = 'GDPR' | 'HIPAA' | 'SOC2' | 'Multiple'

export interface Training {
  id: string
  name: string
  type: TrainingType
  category: TrainingCategory
  audience: TargetAudience
  businessUnit: BusinessUnit
  startDate: string
  endDate: string
  completionRate: number
  regulatoryRequirement: RegulatoryRequirement
}

export const trainings: Training[] = [
  {
    id: "TRN-001",
    name: "Annual Security Awareness Training",
    type: "Security Awareness",
    category: "InfoSec",
    audience: "All",
    businessUnit: "All",
    startDate: "2024-01-01",
    endDate: "2024-01-31",
    completionRate: 95,
    regulatoryRequirement: "Multiple",
  },
  {
    id: "TRN-002",
    name: "HIPAA Compliance Fundamentals",
    type: "Compliance",
    category: "Data Protection",
    audience: "Employees",
    businessUnit: "R&D",
    startDate: "2024-02-01",
    endDate: "2024-02-15",
    completionRate: 88,
    regulatoryRequirement: "HIPAA",
  },
  {
    id: "TRN-003",
    name: "Risk Management for Leaders",
    type: "Compliance",
    category: "Risk Management",
    audience: "Managers",
    businessUnit: "Corporate",
    startDate: "2024-02-15",
    endDate: "2024-02-28",
    completionRate: 92,
    regulatoryRequirement: "SOC2",
  },
  {
    id: "TRN-004",
    name: "Data Privacy Essentials",
    type: "Compliance",
    category: "Data Protection",
    audience: "All",
    businessUnit: "Marketing",
    startDate: "2024-03-01",
    endDate: "2024-03-15",
    completionRate: 85,
    regulatoryRequirement: "GDPR",
  },
  {
    id: "TRN-005",
    name: "Financial Data Security",
    type: "Security Awareness",
    category: "InfoSec",
    audience: "Employees",
    businessUnit: "Finance",
    startDate: "2024-03-15",
    endDate: "2024-03-31",
    completionRate: 90,
    regulatoryRequirement: "SOC2",
  },
  {
    id: "TRN-006",
    name: "GDPR Compliance Training",
    type: "Compliance",
    category: "Data Protection",
    audience: "All",
    businessUnit: "All",
    startDate: "2024-04-01",
    endDate: "2024-04-15",
    completionRate: 87,
    regulatoryRequirement: "GDPR",
  },
  {
    id: "TRN-007",
    name: "Cybersecurity Best Practices",
    type: "Security Awareness",
    category: "InfoSec",
    audience: "Employees",
    businessUnit: "R&D",
    startDate: "2024-04-15",
    endDate: "2024-04-30",
    completionRate: 93,
    regulatoryRequirement: "Multiple",
  },
  {
    id: "TRN-008",
    name: "Risk Assessment Workshop",
    type: "Compliance",
    category: "Risk Management",
    audience: "Managers",
    businessUnit: "Corporate",
    startDate: "2024-05-01",
    endDate: "2024-05-15",
    completionRate: 89,
    regulatoryRequirement: "SOC2",
  },
  {
    id: "TRN-009",
    name: "Healthcare Data Privacy",
    type: "Compliance",
    category: "Data Protection",
    audience: "Employees",
    businessUnit: "R&D",
    startDate: "2024-05-15",
    endDate: "2024-05-31",
    completionRate: 91,
    regulatoryRequirement: "HIPAA",
  },
  {
    id: "TRN-010",
    name: "Marketing Data Compliance",
    type: "Compliance",
    category: "Data Protection",
    audience: "All",
    businessUnit: "Marketing",
    startDate: "2024-06-01",
    endDate: "2024-06-15",
    completionRate: 86,
    regulatoryRequirement: "GDPR",
  },
  {
    id: "TRN-011",
    name: "Security Incident Response",
    type: "Security Awareness",
    category: "InfoSec",
    audience: "All",
    businessUnit: "All",
    startDate: "2024-06-15",
    endDate: "2024-06-30",
    completionRate: 94,
    regulatoryRequirement: "Multiple",
  },
  {
    id: "TRN-012",
    name: "Financial Compliance Training",
    type: "Compliance",
    category: "Risk Management",
    audience: "Employees",
    businessUnit: "Finance",
    startDate: "2024-07-01",
    endDate: "2024-07-15",
    completionRate: 88,
    regulatoryRequirement: "SOC2",
  },
]
