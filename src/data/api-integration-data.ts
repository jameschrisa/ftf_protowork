export interface APIIntegration {
  id: string
  name: string
  provider: string
  type: 'internal' | 'third-party'
  status: 'active' | 'degraded' | 'offline'
  callVolume: number
  errorRate: number
  responseTime: number
  lastChecked: string
  description: string
}

export const apiIntegrations: APIIntegration[] = [
  {
    id: "api001",
    name: "Payment Gateway API",
    provider: "Stripe",
    type: "third-party",
    status: "active",
    callVolume: 12450,
    errorRate: 0.3,
    responseTime: 180,
    lastChecked: "2024-05-17T10:15:00",
    description: "Payment processing and transaction management"
  },
  {
    id: "api002",
    name: "Banking Data API",
    provider: "Plaid",
    type: "third-party",
    status: "active",
    callVolume: 8320,
    errorRate: 0.5,
    responseTime: 210,
    lastChecked: "2024-05-17T09:30:00",
    description: "Bank account data aggregation and transaction history"
  },
  {
    id: "api003",
    name: "Financial Reporting API",
    provider: "Internal",
    type: "internal",
    status: "active",
    callVolume: 5640,
    errorRate: 0.1,
    responseTime: 90,
    lastChecked: "2024-05-17T11:00:00",
    description: "Internal API for financial reporting and analytics"
  },
  {
    id: "api004",
    name: "Tax Calculation API",
    provider: "Avalara",
    type: "third-party",
    status: "active",
    callVolume: 4280,
    errorRate: 0.2,
    responseTime: 150,
    lastChecked: "2024-05-17T08:45:00",
    description: "Sales tax calculation and compliance"
  },
  {
    id: "api005",
    name: "Currency Exchange API",
    provider: "Open Exchange Rates",
    type: "third-party",
    status: "active",
    callVolume: 3150,
    errorRate: 0.0,
    responseTime: 120,
    lastChecked: "2024-05-17T10:30:00",
    description: "Real-time currency exchange rates"
  },
  {
    id: "api006",
    name: "Customer Data API",
    provider: "Internal",
    type: "internal",
    status: "active",
    callVolume: 7890,
    errorRate: 0.2,
    responseTime: 110,
    lastChecked: "2024-05-17T09:15:00",
    description: "Internal API for customer data management"
  },
  {
    id: "api007",
    name: "Invoice Processing API",
    provider: "Internal",
    type: "internal",
    status: "degraded",
    callVolume: 2340,
    errorRate: 2.8,
    responseTime: 350,
    lastChecked: "2024-05-17T11:30:00",
    description: "Internal API for invoice processing and management"
  },
  {
    id: "api008",
    name: "Market Data API",
    provider: "Bloomberg",
    type: "third-party",
    status: "active",
    callVolume: 1850,
    errorRate: 0.1,
    responseTime: 200,
    lastChecked: "2024-05-17T10:00:00",
    description: "Financial market data and analytics"
  }
]
