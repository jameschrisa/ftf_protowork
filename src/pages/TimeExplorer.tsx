import { FinancialMonitoringCharts } from "../components/financial/financial-monitoring-charts"
import { PaymentTable } from "../components/financial/payment-table"
import { PaymentExceptionsTable } from "../components/financial/payment-exceptions-table"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { paymentRecords, paymentExceptions } from "../data/payment-data"
import { CreditCard } from "lucide-react"
import { useState } from "react"
import { FinancialAnalystPilotCard } from "../components/ui/financial-analyst-pilot-card"

export default function TimeExplorerPage() {
  const [activeView, setActiveView] = useState<'payments' | 'exceptions'>('payments')

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <CreditCard className="h-8 w-8" />
          <h1 className="text-3xl font-bold tracking-tight">Payment Processing</h1>
        </div>
      </div>

      {/* Financial Analyst Pilot */}
      <FinancialAnalystPilotCard />

      {/* Charts */}
      <FinancialMonitoringCharts />

      {/* Tabs Section */}
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0">
          <div className="flex flex-row items-center justify-between px-6 py-5">
            <div className="grid gap-1">
              <CardTitle>Payment Management</CardTitle>
              <p className="text-sm text-muted-foreground">
                Monitor payment activities and financial exceptions
              </p>
            </div>
          </div>
          <div className="flex">
            <button
              data-active={activeView === 'payments'}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveView('payments')}
            >
              <span className="text-base font-semibold">
                Payment Log
              </span>
              <span className="text-sm text-muted-foreground">
                Track processed and pending payments
              </span>
            </button>
            <button
              data-active={activeView === 'exceptions'}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-l px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveView('exceptions')}
            >
              <span className="text-base font-semibold">
                Payment Exceptions
              </span>
              <span className="text-sm text-muted-foreground">
                Monitor and resolve payment exceptions
              </span>
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {activeView === 'payments' ? (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Payment Activities</h3>
              <PaymentTable data={paymentRecords} />
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Exception Reports</h3>
              <PaymentExceptionsTable data={paymentExceptions} />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
