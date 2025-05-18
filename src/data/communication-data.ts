// Communication data for the Communications page

// Email messages
export interface EmailMessage {
  id: string;
  sender: string;
  recipient: string;
  subject: string;
  content: string;
  timestamp: string;
  aiResponse: string;
  status: 'read' | 'unread' | 'responded';
}

// Text messages
export interface TextMessage {
  id: string;
  sender: string;
  content: string;
  timestamp: string;
  aiResponse: string;
  status: 'read' | 'unread' | 'responded';
}

// Messaging app communications
export interface AppMessage {
  id: string;
  user: string;
  channel: string;
  platform: 'slack' | 'teams' | 'discord';
  content: string;
  timestamp: string;
  aiResponse: string;
  status: 'read' | 'unread' | 'responded';
}

// Status colors for styling
export const statusColors = {
  'read': "text-blue-500",
  'unread': "text-yellow-500",
  'responded': "text-green-500"
};

// Platform colors for styling
export const platformColors = {
  'slack': "bg-purple-100 text-purple-800",
  'teams': "bg-blue-100 text-blue-800",
  'discord': "bg-indigo-100 text-indigo-800"
};

// Sample email messages
export const emailMessages: EmailMessage[] = [
  {
    id: "email001",
    sender: "john.smith@company.com",
    recipient: "financial-ai@company.com",
    subject: "Q2 Financial Report Request",
    content: "Could you please generate the Q2 financial performance report for our department? I need it for the board meeting next week.",
    timestamp: "2024-05-17T09:30:00",
    aiResponse: "I've generated the Q2 financial report for your department. It includes revenue analysis, expense breakdown, and key performance indicators. The report has been attached to this email and also saved to your department's shared drive.",
    status: "responded"
  },
  {
    id: "email002",
    sender: "sarah.johnson@company.com",
    recipient: "financial-ai@company.com",
    subject: "Budget Variance Analysis",
    content: "We're seeing some significant variances in the marketing budget this month. Can you analyze the data and provide insights on what's causing these discrepancies?",
    timestamp: "2024-05-17T11:15:00",
    aiResponse: "I've analyzed the marketing budget variances and found three main factors contributing to the discrepancies: 1) Increased digital ad spend (+15% over budget), 2) Unplanned event sponsorship ($25,000), and 3) Lower than expected print media costs (-10%). I've attached a detailed breakdown with recommendations for budget reallocation.",
    status: "responded"
  },
  {
    id: "email003",
    sender: "michael.chen@company.com",
    recipient: "financial-ai@company.com",
    subject: "Cash Flow Forecast Update",
    content: "With the new client contracts we signed last week, we need to update our cash flow forecast for the next quarter. Can you incorporate this new data and provide an updated forecast?",
    timestamp: "2024-05-17T14:45:00",
    aiResponse: "I've updated the cash flow forecast to include the new client contracts. The revised projection shows a 12% increase in inflows for Q3, with the most significant impact in August and September. The updated forecast has been saved to the financial planning folder and I've attached a summary of the changes.",
    status: "responded"
  },
  {
    id: "email004",
    sender: "lisa.wong@company.com",
    recipient: "financial-ai@company.com",
    subject: "Expense Report Approval",
    content: "I have 15 expense reports waiting for approval in the system. Can you review them against our policy and flag any that need manual review?",
    timestamp: "2024-05-18T08:20:00",
    aiResponse: "I've reviewed all 15 expense reports. 12 of them comply with company policy and have been approved. 3 reports have been flagged for manual review due to: 1) Exceeding meal allowance limits, 2) Missing receipts for transactions over $75, and 3) Potential duplicate submission. Details have been sent to your dashboard.",
    status: "responded"
  },
  {
    id: "email005",
    sender: "david.wilson@company.com",
    recipient: "financial-ai@company.com",
    subject: "Vendor Payment Schedule",
    content: "We need to optimize our vendor payment schedule to improve cash flow. Can you analyze our current payment terms and suggest a more efficient schedule?",
    timestamp: "2024-05-18T10:05:00",
    aiResponse: "",
    status: "unread"
  }
];

// Sample text messages
export const textMessages: TextMessage[] = [
  {
    id: "text001",
    sender: "+1 (555) 123-4567",
    content: "Need the latest DSO metrics for the executive meeting in 30 min. Can you send them ASAP?",
    timestamp: "2024-05-17T08:45:00",
    aiResponse: "Current DSO is 42.3 days, down 2.1 days from last month. Top 5 customers average is 38.7 days. Worst performing segment is small business at 47.5 days. Overall trend is positive with 4.8% improvement QoQ.",
    status: "responded"
  },
  {
    id: "text002",
    sender: "+1 (555) 987-6543",
    content: "What's our current cash position as of this morning?",
    timestamp: "2024-05-17T09:15:00",
    aiResponse: "Cash position as of 9:00 AM: Operating accounts: $4.2M, Money market: $7.5M, Short-term investments: $12.3M. Total liquid assets: $24M. This reflects yesterday's large vendor payment of $1.8M to Acme Corp.",
    status: "responded"
  },
  {
    id: "text003",
    sender: "+1 (555) 456-7890",
    content: "Can you check if we've received the payment from Global Industries yet?",
    timestamp: "2024-05-17T13:30:00",
    aiResponse: "Yes, the payment from Global Industries was received today at 11:42 AM. Amount: $157,350.00, Reference: INV-2024-0892. The payment has been applied to their account and the AR has been updated.",
    status: "responded"
  },
  {
    id: "text004",
    sender: "+1 (555) 789-0123",
    content: "Need a quick summary of outstanding invoices over 60 days",
    timestamp: "2024-05-18T09:20:00",
    aiResponse: "Outstanding invoices >60 days: 23 invoices totaling $342,875. Largest: Acme Corp ($125,000), TechNova ($87,500), Global Logistics ($45,000). 7 invoices have payment plans, 3 are in dispute, 13 in active collection. Detailed report sent to your email.",
    status: "responded"
  },
  {
    id: "text005",
    sender: "+1 (555) 234-5678",
    content: "What's the current budget utilization for the IT department?",
    timestamp: "2024-05-18T11:10:00",
    aiResponse: "",
    status: "unread"
  }
];

// Sample messaging app communications
export const appMessages: AppMessage[] = [
  {
    id: "app001",
    user: "janesmith",
    channel: "finance-team",
    platform: "slack",
    content: "@financial-bot Can you provide a breakdown of the marketing department's Q1 expenses by category?",
    timestamp: "2024-05-17T10:15:00",
    aiResponse: "Here's the breakdown of Marketing's Q1 expenses:\n- Digital Advertising: $125,000 (42%)\n- Events & Sponsorships: $85,000 (28%)\n- Content Production: $45,000 (15%)\n- Agency Fees: $30,000 (10%)\n- Miscellaneous: $15,000 (5%)\nTotal: $300,000\nThis is 5% under their quarterly budget of $315,000.",
    status: "responded"
  },
  {
    id: "app002",
    user: "robertjohnson",
    channel: "executive-team",
    platform: "teams",
    content: "@financial-assistant What's our current runway based on the latest cash flow projections?",
    timestamp: "2024-05-17T11:30:00",
    aiResponse: "Based on the latest cash flow projections updated yesterday:\n- Current burn rate: $1.2M/month\n- Cash reserves: $18.5M\n- Projected runway: 15.4 months\n- Conservative scenario (15% higher burn): 13.4 months\n- Optimistic scenario (10% lower burn): 17.1 months\nThis assumes no additional funding or significant revenue changes.",
    status: "responded"
  },
  {
    id: "app003",
    user: "amandagarcia",
    channel: "accounting",
    platform: "slack",
    content: "@financial-bot Can you help me reconcile the discrepancy in the accounts payable aging report? There's about $45,000 that I can't match to invoices.",
    timestamp: "2024-05-17T14:00:00",
    aiResponse: "I've analyzed the AP aging report and found the discrepancy. The $45,000 difference comes from:\n1. Three duplicate entries for TechSupplies Inc. totaling $27,500\n2. An invoice for $12,500 from Acme Corp that was paid but not marked as such in the system\n3. A credit memo for $5,000 from GlobalServices that wasn't applied\nI've prepared the necessary journal entries to correct these issues and sent them to your email for review.",
    status: "responded"
  },
  {
    id: "app004",
    user: "thomaslee",
    channel: "finance-planning",
    platform: "teams",
    content: "@financial-assistant We need to prepare for the quarterly business review next week. Can you generate a summary of our financial performance against targets?",
    timestamp: "2024-05-18T09:45:00",
    aiResponse: "I've prepared a QBR financial summary comparing actual performance to targets:\n\nRevenue: $12.5M vs $12.0M target (+4.2%)\nGross Margin: 68% vs 65% target (+3 pts)\nOpEx: $7.2M vs $7.0M target (+2.9%)\nEBITDA: $1.3M vs $0.8M target (+62.5%)\nCash Position: $18.5M vs $17.0M target (+8.8%)\n\nKey drivers: Strong performance in enterprise segment (+15% vs target), improved product mix shifting to higher margin offerings, and delayed hiring in G&A.\n\nI've added the detailed analysis to the QBR folder with supporting charts and variance explanations.",
    status: "responded"
  },
  {
    id: "app005",
    user: "sarahwilliams",
    channel: "budget-planning",
    platform: "discord",
    content: "@financial-bot Can you analyze the impact of the new pricing strategy on our projected revenue for the next fiscal year?",
    timestamp: "2024-05-18T11:30:00",
    aiResponse: "",
    status: "unread"
  }
];
