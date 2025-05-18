import { useState } from "react"
import {
  DollarSign,
  BarChart2,
  Clock,
  AlertTriangle,
  TrendingUp,
  Users,
  Activity,
  AlertCircle
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { kpis } from "../data/financial/dashboard-data"

// Financial dashboard components
import { RevenueChart } from "../components/financial/revenue-chart"
import { DSOChart } from "../components/financial/dso-chart"
import { FinancialAnalystPilotCard } from "../components/ui/financial-analyst-pilot-card"

export default function Home() {
  const [activeView, setActiveView] = useState<'revenue' | 'dso'>('revenue')

  // Map icon names to actual components
  const iconMap = {
    DollarSign: DollarSign,
    BarChart2: BarChart2,
    Clock: Clock,
    AlertTriangle: AlertTriangle,
    TrendingUp: TrendingUp,
    Users: Users,
    Activity: Activity,
    AlertCircle: AlertCircle
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <DollarSign className="h-8 w-8 text-blue-700" strokeWidth={1.5} />
        <h1 className="text-3xl font-bold">Financial Dashboard</h1>
      </div>

      {/* Financial Analyst Pilot */}
      <FinancialAnalystPilotCard />

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const IconComponent = iconMap[kpi.icon as keyof typeof iconMap]
          return (
            <Card key={kpi.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {kpi.title}
                </CardTitle>
                <IconComponent className={`h-4 w-4 ${kpi.iconColor}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{kpi.value}</div>
                <p className="text-xs text-muted-foreground">
                  {kpi.description}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* View Toggle */}
      <div className="flex gap-2">
        <Button
          variant={activeView === 'revenue' ? "default" : "outline"}
          onClick={() => setActiveView('revenue')}
        >
          Revenue
        </Button>
        <Button
          variant={activeView === 'dso' ? "default" : "outline"}
          onClick={() => setActiveView('dso')}
        >
          Days Sales Outstanding (DSO)
        </Button>
      </div>

      {/* Charts */}
      <div className="h-[600px]">
        {activeView === 'revenue' ? (
          <RevenueChart />
        ) : (
          <DSOChart />
        )}
      </div>
    </div>
  )
}
