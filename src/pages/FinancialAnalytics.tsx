import { FinancialPieCharts } from "../components/financial/financial-pie-charts"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { BarChart3, DollarSign } from "lucide-react"
import { topCustomers } from "../data/financial/dashboard-data"

export default function FinancialAnalyticsPage() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <DollarSign className="h-8 w-8 text-blue-700" strokeWidth={1.5} />
          <h1 className="text-3xl font-bold tracking-tight">Financial Analytics</h1>
        </div>
      </div>

      {/* Charts */}
      <FinancialPieCharts />

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle>Top Customer Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="py-3 text-left font-medium">Customer</th>
                  <th className="py-3 text-left font-medium">Total Spend</th>
                  <th className="py-3 text-left font-medium">Orders</th>
                  <th className="py-3 text-left font-medium">Last Order</th>
                  <th className="py-3 text-left font-medium">Status</th>
                  <th className="py-3 text-left font-medium">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((customer) => (
                  <tr key={customer.id} className="border-b">
                    <td className="py-3">{customer.name}</td>
                    <td className="py-3">${customer.totalSpend.toLocaleString()}</td>
                    <td className="py-3">{customer.orderCount}</td>
                    <td className="py-3">{customer.lastOrderDate}</td>
                    <td className="py-3 capitalize">{customer.status}</td>
                    <td className="py-3 capitalize">{customer.riskLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
