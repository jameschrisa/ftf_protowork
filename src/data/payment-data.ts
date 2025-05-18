export interface PaymentRecord {
  id: string
  date: string
  type: 'invoice' | 'refund' | 'subscription' | 'payroll' | 'tax'
  amount: number
  status: 'pending' | 'processing' | 'completed' | 'failed'
  recipient: string
  accountNumber: string
  reference: string
  processor: string
  impact: 'low' | 'medium' | 'high'
}

export interface PaymentException {
  id: string
  date: string
  type: 'insufficient-funds' | 'authorization-failed' | 'fraud-alert' | 'duplicate-payment' | 'invalid-account'
  severity: 'low' | 'medium' | 'high'
  description: string
  status: 'open' | 'investigating' | 'resolved'
  duration: number
  impact: string
  resolution: string | null
}

export const paymentStatusColors = {
  'pending': "text-yellow-500",
  'processing': "text-blue-500",
  'completed': "text-green-500",
  'failed': "text-red-500"
}

export const paymentTypeColors = {
  'invoice': "bg-blue-100 text-blue-800",
  'refund': "bg-purple-100 text-purple-800",
  'subscription': "bg-green-100 text-green-800",
  'payroll': "bg-orange-100 text-orange-800",
  'tax': "bg-red-100 text-red-800"
}

export const paymentImpactColors = {
  'low': "text-green-500",
  'medium': "text-yellow-500",
  'high': "text-red-500"
}

export const exceptionStatusColors = {
  'open': "text-red-500",
  'investigating': "text-yellow-500",
  'resolved': "text-green-500"
}

export const exceptionTypeColors = {
  'insufficient-funds': "bg-red-100 text-red-800",
  'authorization-failed': "bg-yellow-100 text-yellow-800",
  'fraud-alert': "bg-purple-100 text-purple-800",
  'duplicate-payment': "bg-blue-100 text-blue-800",
  'invalid-account': "bg-orange-100 text-orange-800"
}

export const exceptionSeverityColors = {
  'low': "text-green-500",
  'medium': "text-yellow-500",
  'high': "text-red-500"
}

export const paymentRecords: PaymentRecord[] = [
  {
    id: "pay001",
    date: "2024-05-15",
    type: "invoice",
    amount: 12500.00,
    status: "completed",
    recipient: "Acme Supplies Inc.",
    accountNumber: "ACCT-12345",
    reference: "INV-2024-05-001",
    processor: "Bank Transfer",
    impact: "medium"
  },
  {
    id: "pay002",
    date: "2024-05-16",
    type: "payroll",
    amount: 85000.00,
    status: "completed",
    recipient: "Employee Payroll",
    accountNumber: "PAYROLL-MAY-1",
    reference: "PAY-2024-05-16",
    processor: "ADP",
    impact: "high"
  },
  {
    id: "pay003",
    date: "2024-05-16",
    type: "subscription",
    amount: 1299.99,
    status: "completed",
    recipient: "Cloud Services Co.",
    accountNumber: "CS-99887",
    reference: "SUB-2024-05",
    processor: "Credit Card",
    impact: "low"
  },
  {
    id: "pay004",
    date: "2024-05-17",
    type: "refund",
    amount: 750.00,
    status: "processing",
    recipient: "Customer Refund",
    accountNumber: "CUST-5566",
    reference: "REF-2024-05-004",
    processor: "Payment Gateway",
    impact: "low"
  },
  {
    id: "pay005",
    date: "2024-05-17",
    type: "tax",
    amount: 22450.00,
    status: "pending",
    recipient: "Tax Authority",
    accountNumber: "TAX-2024-Q2",
    reference: "TAX-2024-05-Q2",
    processor: "Bank Transfer",
    impact: "high"
  },
  {
    id: "pay006",
    date: "2024-05-17",
    type: "invoice",
    amount: 4500.00,
    status: "failed",
    recipient: "Office Supplies Ltd.",
    accountNumber: "ACCT-67890",
    reference: "INV-2024-05-006",
    processor: "ACH",
    impact: "medium"
  },
  {
    id: "pay007",
    date: "2024-05-18",
    type: "subscription",
    amount: 499.99,
    status: "pending",
    recipient: "Software License",
    accountNumber: "SL-44332",
    reference: "SUB-2024-05-007",
    processor: "Credit Card",
    impact: "low"
  },
  {
    id: "pay008",
    date: "2024-05-18",
    type: "invoice",
    amount: 8750.00,
    status: "processing",
    recipient: "Marketing Agency",
    accountNumber: "ACCT-24680",
    reference: "INV-2024-05-008",
    processor: "Bank Transfer",
    impact: "medium"
  }
]

export const paymentExceptions: PaymentException[] = [
  {
    id: "exc001",
    date: "2024-05-16",
    type: "insufficient-funds",
    severity: "high",
    description: "Payment to Office Supplies Ltd. failed due to insufficient funds",
    status: "resolved",
    duration: 120,
    impact: "Delayed office supply delivery",
    resolution: "Funds transferred from reserve account"
  },
  {
    id: "exc002",
    date: "2024-05-17",
    type: "fraud-alert",
    severity: "high",
    description: "Suspicious attempt to change vendor payment details",
    status: "investigating",
    duration: 240,
    impact: "Payment on hold pending verification",
    resolution: null
  },
  {
    id: "exc003",
    date: "2024-05-17",
    type: "duplicate-payment",
    severity: "medium",
    description: "Duplicate payment detected for Cloud Services Co. subscription",
    status: "open",
    duration: 60,
    impact: "Overpayment of $1,299.99",
    resolution: null
  },
  {
    id: "exc004",
    date: "2024-05-17",
    type: "authorization-failed",
    severity: "medium",
    description: "Credit card authorization failed for software license renewal",
    status: "resolved",
    duration: 90,
    impact: "Temporary service interruption",
    resolution: "Updated payment method"
  },
  {
    id: "exc005",
    date: "2024-05-18",
    type: "invalid-account",
    severity: "low",
    description: "Invalid account number for customer refund",
    status: "open",
    duration: 30,
    impact: "Delayed refund processing",
    resolution: null
  }
]
