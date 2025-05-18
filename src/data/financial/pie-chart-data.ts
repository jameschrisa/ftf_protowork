// Financial pie chart data for Historical Reports page

// Helper function to calculate percentages and counts
const calculatePercentages = (data: any[]) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return data.map(item => ({
    ...item,
    count: item.value,
    percentage: Math.round((item.value / total) * 100)
  }));
};

// Chart 1: Revenue by Segment
// View 1: Revenue by Product/Service Category
export const revenueByProductCategory = calculatePercentages([
  { name: "Software", value: 450000, fill: "hsl(var(--chart-1))" },
  { name: "Consulting", value: 280000, fill: "hsl(var(--chart-2))" },
  { name: "Hardware", value: 180000, fill: "hsl(var(--chart-3))" },
  { name: "Support", value: 120000, fill: "hsl(var(--chart-4))" },
  { name: "Training", value: 70000, fill: "hsl(var(--chart-5))" }
]);

// View 2: Revenue by Customer Segment
export const revenueByCustomerSegment = calculatePercentages([
  { name: "Enterprise", value: 520000, fill: "hsl(var(--chart-1))" },
  { name: "Mid-Market", value: 380000, fill: "hsl(var(--chart-2))" },
  { name: "Small Business", value: 200000, fill: "hsl(var(--chart-3))" }
]);

// View 3: Revenue by Geographic Region
export const revenueByGeographicRegion = calculatePercentages([
  { name: "North America", value: 580000, fill: "hsl(var(--chart-1))" },
  { name: "EMEA", value: 320000, fill: "hsl(var(--chart-2))" },
  { name: "APAC", value: 150000, fill: "hsl(var(--chart-3))" },
  { name: "LATAM", value: 50000, fill: "hsl(var(--chart-4))" }
]);

// Chart 2: Sales Order Status
// View 1: Order Status by Stage
export const orderStatusByStage = calculatePercentages([
  { name: "New", value: 45, fill: "hsl(var(--chart-1))" },
  { name: "In Progress", value: 32, fill: "hsl(var(--chart-2))" },
  { name: "Shipped", value: 68, fill: "hsl(var(--chart-3))" },
  { name: "Cancelled", value: 8, fill: "hsl(var(--chart-4))" }
]);

// View 2: Order Value by Priority
export const orderValueByPriority = calculatePercentages([
  { name: "High", value: 450000, fill: "hsl(346, 87%, 43%)" }, // Red
  { name: "Medium", value: 320000, fill: "hsl(45, 93%, 47%)" }, // Yellow
  { name: "Low", value: 230000, fill: "hsl(142, 76%, 36%)" } // Green
]);

// View 3: Order Distribution by Sales Channel
export const orderDistributionByChannel = calculatePercentages([
  { name: "Direct Sales", value: 85, fill: "hsl(var(--chart-1))" },
  { name: "Partner", value: 45, fill: "hsl(var(--chart-2))" },
  { name: "Online", value: 23, fill: "hsl(var(--chart-3))" }
]);

// Chart 3: Customer Concentration
// View 1: Revenue Concentration by Top Customers
export const revenueByTopCustomers = calculatePercentages([
  { name: "Top 5", value: 450000, fill: "hsl(var(--chart-1))" },
  { name: "Next 15", value: 320000, fill: "hsl(var(--chart-2))" },
  { name: "Remaining", value: 230000, fill: "hsl(var(--chart-3))" }
]);

// View 2: Customer Distribution by Industry
export const customersByIndustry = calculatePercentages([
  { name: "Finance", value: 28, fill: "hsl(var(--chart-1))" },
  { name: "Healthcare", value: 22, fill: "hsl(var(--chart-2))" },
  { name: "Technology", value: 35, fill: "hsl(var(--chart-3))" },
  { name: "Manufacturing", value: 18, fill: "hsl(var(--chart-4))" },
  { name: "Retail", value: 12, fill: "hsl(var(--chart-5))" }
]);

// View 3: Customer Base by Company Size
export const customersByCompanySize = calculatePercentages([
  { name: "Large Enterprise", value: 25, fill: "hsl(var(--chart-1))" },
  { name: "Mid-Sized", value: 42, fill: "hsl(var(--chart-2))" },
  { name: "Small Business", value: 33, fill: "hsl(var(--chart-3))" }
]);

// Group data for each pie chart
export const revenueBySegmentData = {
  productCategory: revenueByProductCategory,
  customerSegment: revenueByCustomerSegment,
  geographicRegion: revenueByGeographicRegion
};

export const salesOrderStatusData = {
  orderStage: orderStatusByStage,
  orderPriority: orderValueByPriority,
  salesChannel: orderDistributionByChannel
};

export const customerConcentrationData = {
  topCustomers: revenueByTopCustomers,
  industry: customersByIndustry,
  companySize: customersByCompanySize
};
