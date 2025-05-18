// Financial metrics data for the dashboard

export interface FinancialMetric {
  title: string;
  value: string | number;
  description: string;
  icon: string;
  iconColor: string;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}

export const kpis: FinancialMetric[] = [
  {
    title: "Days Sales Outstanding",
    value: "42.3",
    description: "Trending 2.1 days vs prior month",
    icon: "Clock",
    iconColor: "text-blue-500",
    trend: {
      value: 2.1,
      direction: 'down'
    }
  },
  {
    title: "AR Aging Distribution",
    value: "45,200",
    description: "90+ bucket increase 1.2 % points",
    icon: "BarChart2",
    iconColor: "text-purple-500",
    trend: {
      value: 1.2,
      direction: 'up'
    }
  },
  {
    title: "Collection Effectiveness Index",
    value: "99.2%",
    description: "Average across all sites",
    icon: "TrendingUp",
    iconColor: "text-green-500",
    trend: {
      value: 0.8,
      direction: 'up'
    }
  },
  {
    title: "High Risk Receivables",
    value: "124",
    description: "Last 30 days",
    icon: "AlertTriangle",
    iconColor: "text-yellow-500",
    trend: {
      value: 5,
      direction: 'down'
    }
  },
  {
    title: "Cash Flow Forecast",
    value: "28.5%",
    description: "Year over year improvement",
    icon: "DollarSign",
    iconColor: "text-emerald-500",
    trend: {
      value: 3.2,
      direction: 'up'
    }
  },
  {
    title: "Working Capital Impact",
    value: "0.42",
    description: "Tons CO2e/MMSCF",
    icon: "Activity",
    iconColor: "text-indigo-500",
    trend: {
      value: 0.05,
      direction: 'down'
    }
  },
  {
    title: "Top Customer Concentration",
    value: "98.9%",
    description: "Regulatory requirements met",
    icon: "Users",
    iconColor: "text-teal-500",
    trend: {
      value: 1.1,
      direction: 'up'
    }
  },
  {
    title: "Exception Alert Summary",
    value: "2,450",
    description: "Hours between failures",
    icon: "AlertCircle",
    iconColor: "text-cyan-500",
    trend: {
      value: 120,
      direction: 'down'
    }
  }
];

// Sales data for charts
export interface SalesData {
  month: string;
  revenue: number;
  orders: number;
  returns: number;
}

export const salesData: SalesData[] = [
  { month: "Jan", revenue: 45000, orders: 120, returns: 5 },
  { month: "Feb", revenue: 52000, orders: 140, returns: 8 },
  { month: "Mar", revenue: 49000, orders: 130, returns: 7 },
  { month: "Apr", revenue: 63000, orders: 150, returns: 6 },
  { month: "May", revenue: 59000, orders: 145, returns: 9 },
  { month: "Jun", revenue: 68000, orders: 160, returns: 8 }
];

// Accounts receivable aging data
export interface ARAgingData {
  category: string;
  value: number;
  fill: string;
}

export const arAgingData: ARAgingData[] = [
  { category: "Current", value: 65, fill: "hsl(var(--chart-1))" },
  { category: "1-30 Days", value: 20, fill: "hsl(var(--chart-2))" },
  { category: "31-60 Days", value: 8, fill: "hsl(var(--chart-3))" },
  { category: "61-90 Days", value: 4, fill: "hsl(var(--chart-4))" },
  { category: "90+ Days", value: 3, fill: "hsl(var(--chart-5))" }
];

// Customer data
export interface CustomerData {
  id: string;
  name: string;
  totalSpend: number;
  orderCount: number;
  lastOrderDate: string;
  creditScore: number;
  status: 'active' | 'inactive' | 'pending';
  riskLevel: 'low' | 'medium' | 'high';
}

export const topCustomers: CustomerData[] = [
  {
    id: "C001",
    name: "Acme Corporation",
    totalSpend: 250000,
    orderCount: 45,
    lastOrderDate: "2024-05-10",
    creditScore: 85,
    status: "active",
    riskLevel: "low"
  },
  {
    id: "C002",
    name: "Globex Industries",
    totalSpend: 180000,
    orderCount: 32,
    lastOrderDate: "2024-05-08",
    creditScore: 78,
    status: "active",
    riskLevel: "low"
  },
  {
    id: "C003",
    name: "Wayne Enterprises",
    totalSpend: 320000,
    orderCount: 56,
    lastOrderDate: "2024-05-12",
    creditScore: 92,
    status: "active",
    riskLevel: "low"
  },
  {
    id: "C004",
    name: "Stark Industries",
    totalSpend: 420000,
    orderCount: 68,
    lastOrderDate: "2024-05-15",
    creditScore: 95,
    status: "active",
    riskLevel: "low"
  },
  {
    id: "C005",
    name: "Umbrella Corporation",
    totalSpend: 150000,
    orderCount: 28,
    lastOrderDate: "2024-04-30",
    creditScore: 65,
    status: "active",
    riskLevel: "medium"
  },
  {
    id: "C006",
    name: "Cyberdyne Systems",
    totalSpend: 90000,
    orderCount: 15,
    lastOrderDate: "2024-04-22",
    creditScore: 58,
    status: "inactive",
    riskLevel: "high"
  }
];

// Payment processing data
export interface PaymentData {
  id: string;
  customer: string;
  amount: number;
  date: string;
  method: 'credit' | 'wire' | 'check' | 'ach';
  status: 'completed' | 'pending' | 'failed';
  reference: string;
}

export const recentPayments: PaymentData[] = [
  {
    id: "P001",
    customer: "Acme Corporation",
    amount: 12500,
    date: "2024-05-15",
    method: "wire",
    status: "completed",
    reference: "INV-2024-0125"
  },
  {
    id: "P002",
    customer: "Globex Industries",
    amount: 8750,
    date: "2024-05-14",
    method: "ach",
    status: "completed",
    reference: "INV-2024-0118"
  },
  {
    id: "P003",
    customer: "Wayne Enterprises",
    amount: 15000,
    date: "2024-05-13",
    method: "credit",
    status: "completed",
    reference: "INV-2024-0132"
  },
  {
    id: "P004",
    customer: "Stark Industries",
    amount: 22500,
    date: "2024-05-12",
    method: "wire",
    status: "completed",
    reference: "INV-2024-0145"
  },
  {
    id: "P005",
    customer: "Umbrella Corporation",
    amount: 7500,
    date: "2024-05-10",
    method: "check",
    status: "pending",
    reference: "INV-2024-0112"
  },
  {
    id: "P006",
    customer: "Cyberdyne Systems",
    amount: 4500,
    date: "2024-05-08",
    method: "ach",
    status: "failed",
    reference: "INV-2024-0098"
  }
];

// Exception data
export interface ExceptionData {
  id: string;
  type: 'invoice' | 'payment' | 'credit' | 'customer';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
  dateCreated: string;
  assignedTo: string;
}

export const exceptions: ExceptionData[] = [
  {
    id: "E001",
    type: "invoice",
    severity: "high",
    description: "Invoice amount discrepancy with purchase order",
    status: "open",
    dateCreated: "2024-05-15",
    assignedTo: "Sarah Johnson"
  },
  {
    id: "E002",
    type: "payment",
    severity: "critical",
    description: "Payment applied to wrong customer account",
    status: "in-progress",
    dateCreated: "2024-05-14",
    assignedTo: "Michael Chen"
  },
  {
    id: "E003",
    type: "credit",
    severity: "medium",
    description: "Credit memo pending approval for over 7 days",
    status: "open",
    dateCreated: "2024-05-12",
    assignedTo: "David Wilson"
  },
  {
    id: "E004",
    type: "customer",
    severity: "high",
    description: "Customer exceeded credit limit by 15%",
    status: "in-progress",
    dateCreated: "2024-05-10",
    assignedTo: "Lisa Anderson"
  },
  {
    id: "E005",
    type: "invoice",
    severity: "low",
    description: "Missing tax ID on customer record",
    status: "resolved",
    dateCreated: "2024-05-08",
    assignedTo: "Robert Chen"
  },
  {
    id: "E006",
    type: "payment",
    severity: "medium",
    description: "Duplicate payment received for invoice",
    status: "open",
    dateCreated: "2024-05-07",
    assignedTo: "Maria Garcia"
  }
];

// Status and severity color mappings
export const statusColors = {
  completed: "text-green-500",
  pending: "text-yellow-500",
  failed: "text-red-500",
  open: "text-red-500",
  "in-progress": "text-blue-500",
  resolved: "text-green-500",
  active: "text-green-500",
  inactive: "text-gray-500"
};

export const severityColors = {
  critical: "text-red-600 font-bold",
  high: "text-red-500",
  medium: "text-yellow-500",
  low: "text-green-500"
};

export const typeColors = {
  invoice: "bg-blue-100 text-blue-800",
  payment: "bg-green-100 text-green-800",
  credit: "bg-purple-100 text-purple-800",
  customer: "bg-orange-100 text-orange-800"
};

export const riskLevelColors = {
  low: "text-green-500",
  medium: "text-yellow-500",
  high: "text-red-500"
};

export const paymentMethodColors = {
  credit: "bg-blue-100 text-blue-800",
  wire: "bg-purple-100 text-purple-800",
  check: "bg-yellow-100 text-yellow-800",
  ach: "bg-green-100 text-green-800"
};
