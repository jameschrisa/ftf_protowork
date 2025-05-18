export interface DataSource {
  id: string
  name: string
  type: "Database" | "Data Warehouse" | "Data Mart" | "Data Lake"
  level: "Sensitive" | "Confidential" | "Public"
  category: "Financial" | "PII" | "Intellectual Property" | "Operational"
  location: "On-Premises" | "Cloud" | "Hybrid"
  encryption: "Encrypted" | "Unencrypted"
}

export const dataSources: DataSource[] = [
  {
    id: "DS001",
    name: "Customer Database",
    type: "Database",
    level: "Sensitive",
    category: "PII",
    location: "On-Premises",
    encryption: "Encrypted"
  },
  {
    id: "DS002",
    name: "Financial Data Warehouse",
    type: "Data Warehouse",
    level: "Confidential",
    category: "Financial",
    location: "Hybrid",
    encryption: "Encrypted"
  },
  {
    id: "DS003",
    name: "Product Analytics",
    type: "Data Mart",
    level: "Public",
    category: "Operational",
    location: "Cloud",
    encryption: "Encrypted"
  },
  {
    id: "DS004",
    name: "Research Data Lake",
    type: "Data Lake",
    level: "Confidential",
    category: "Intellectual Property",
    location: "Cloud",
    encryption: "Encrypted"
  },
  {
    id: "DS005",
    name: "Marketing Analytics",
    type: "Data Mart",
    level: "Public",
    category: "Operational",
    location: "Cloud",
    encryption: "Encrypted"
  },
  {
    id: "DS006",
    name: "HR Database",
    type: "Database",
    level: "Sensitive",
    category: "PII",
    location: "On-Premises",
    encryption: "Encrypted"
  },
  {
    id: "DS007",
    name: "Patent Database",
    type: "Database",
    level: "Confidential",
    category: "Intellectual Property",
    location: "On-Premises",
    encryption: "Encrypted"
  },
  {
    id: "DS008",
    name: "Supply Chain Data",
    type: "Data Warehouse",
    level: "Confidential",
    category: "Operational",
    location: "Hybrid",
    encryption: "Encrypted"
  },
  {
    id: "DS009",
    name: "Sales Analytics Platform",
    type: "Data Mart",
    level: "Confidential",
    category: "Financial",
    location: "Cloud",
    encryption: "Encrypted"
  },
  {
    id: "DS010",
    name: "Customer Feedback System",
    type: "Data Lake",
    level: "Public",
    category: "Operational",
    location: "Cloud",
    encryption: "Encrypted"
  },
  {
    id: "DS011",
    name: "Employee Training Records",
    type: "Database",
    level: "Sensitive",
    category: "PII",
    location: "Hybrid",
    encryption: "Encrypted"
  },
  {
    id: "DS012",
    name: "Vendor Management System",
    type: "Data Warehouse",
    level: "Confidential",
    category: "Operational",
    location: "Cloud",
    encryption: "Encrypted"
  },
  {
    id: "DS013",
    name: "Product Development DB",
    type: "Database",
    level: "Confidential",
    category: "Intellectual Property",
    location: "On-Premises",
    encryption: "Encrypted"
  },
  {
    id: "DS014",
    name: "Market Research Data",
    type: "Data Lake",
    level: "Confidential",
    category: "Operational",
    location: "Cloud",
    encryption: "Encrypted"
  },
  {
    id: "DS015",
    name: "Financial Reporting System",
    type: "Data Warehouse",
    level: "Sensitive",
    category: "Financial",
    location: "On-Premises",
    encryption: "Encrypted"
  },
  {
    id: "DS016",
    name: "Customer Support Analytics",
    type: "Data Mart",
    level: "Public",
    category: "Operational",
    location: "Cloud",
    encryption: "Encrypted"
  },
  {
    id: "DS017",
    name: "Payroll Database",
    type: "Database",
    level: "Sensitive",
    category: "Financial",
    location: "On-Premises",
    encryption: "Encrypted"
  },
  {
    id: "DS018",
    name: "Innovation Projects DB",
    type: "Data Lake",
    level: "Confidential",
    category: "Intellectual Property",
    location: "Hybrid",
    encryption: "Encrypted"
  },
  {
    id: "DS019",
    name: "Legacy Systems Archive",
    type: "Data Warehouse",
    level: "Confidential",
    category: "Operational",
    location: "On-Premises",
    encryption: "Encrypted"
  },
  {
    id: "DS020",
    name: "Compliance Monitoring System",
    type: "Data Mart",
    level: "Sensitive",
    category: "Operational",
    location: "Hybrid",
    encryption: "Encrypted"
  }
]
