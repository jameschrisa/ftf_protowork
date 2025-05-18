import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Database, Network, FolderOpen, Clock, BarChart, Users, PlusCircle } from "lucide-react"
import { useState } from "react"
import { DataConnectionDialog } from "../components/ui/data-connection-dialog"
import { ERPSystemsTable } from "../components/data-management/erp-systems-table"
import { APIIntegrationsTable } from "../components/data-management/api-integrations-table"
import { SharedDrivesTable } from "../components/data-management/shared-drives-table"
import { erpSystems } from "../data/erp-systems-data"
import { apiIntegrations } from "../data/api-integration-data"
import { sharedDrives } from "../data/shared-drives-data"

export default function DataManagementPage() {
  const [activeView, setActiveView] = useState<'database' | 'api' | 'drives'>('database')
  const [isConnectionDialogOpen, setIsConnectionDialogOpen] = useState(false)

  // Calculate metrics for cards
  const activeERPs = erpSystems.filter(system => system.status === 'active').length
  const totalDataSources = erpSystems.length + apiIntegrations.length + sharedDrives.length
  
  const totalAPICalls = apiIntegrations.reduce((sum, api) => sum + api.callVolume, 0)
  const avgErrorRate = apiIntegrations.reduce((sum, api) => sum + api.errorRate, 0) / apiIntegrations.length
  const avgResponseTime = apiIntegrations.reduce((sum, api) => sum + api.responseTime, 0) / apiIntegrations.length
  
  const totalFiles = sharedDrives.reduce((sum, drive) => sum + drive.fileCount, 0)

  // Get the most recent update time for data freshness
  const mostRecentUpdate = new Date(Math.max(
    ...erpSystems.map(system => new Date(system.lastUpdate).getTime())
  ))
  
  // Calculate time difference for data freshness
  const now = new Date()
  const timeDiff = now.getTime() - mostRecentUpdate.getTime()
  const hoursDiff = Math.floor(timeDiff / (1000 * 60 * 60))
  const minutesDiff = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60))
  const freshness = hoursDiff > 0 
    ? `${hoursDiff} hours ${minutesDiff} minutes ago` 
    : `${minutesDiff} minutes ago`

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Database className="h-8 w-8" />
          <h1 className="text-3xl font-bold tracking-tight">Data Management</h1>
        </div>
      </div>
      
      {/* New Data Connection Dialog */}
      <DataConnectionDialog 
        open={isConnectionDialogOpen} 
        onOpenChange={setIsConnectionDialogOpen} 
      />
      
      {/* Tabs Section */}
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0">
          <div className="flex flex-row items-center justify-between px-6 py-5">
            <div className="grid gap-1">
              <CardTitle>Data Sources</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage database connections, API integrations, and shared drives
              </p>
            </div>
            <Button 
              onClick={() => setIsConnectionDialogOpen(true)}
              className="flex items-center gap-2"
            >
              <PlusCircle className="h-4 w-4" />
              New Data Connection
            </Button>
          </div>
          <div className="flex">
            <button
              data-active={activeView === 'database'}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveView('database')}
            >
              <span className="text-base font-semibold">
                Database and ERP
              </span>
              <span className="text-sm text-muted-foreground">
                Manage database connections and ERP systems
              </span>
            </button>
            <button
              data-active={activeView === 'api'}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-l px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveView('api')}
            >
              <span className="text-base font-semibold">
                API Integration
              </span>
              <span className="text-sm text-muted-foreground">
                Manage API connections and integrations
              </span>
            </button>
            <button
              data-active={activeView === 'drives'}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-l px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveView('drives')}
            >
              <span className="text-base font-semibold">
                Shared Drives & Folders
              </span>
              <span className="text-sm text-muted-foreground">
                Manage shared drives and folder connections
              </span>
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {activeView === 'database' ? (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Number of Data Sources</span>
                      <Database className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Total number of connected data sources across all types
                    </p>
                    <div className="text-2xl font-bold text-center py-2">
                      {totalDataSources}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Data Quality</span>
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Metrics on data completeness, accuracy, and consistency
                    </p>
                    <div className="text-2xl font-bold text-center py-2">
                      95%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>System Uptime</span>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Current uptime percentage for ERP systems
                    </p>
                    <div className="text-2xl font-bold text-center py-2">
                      99.9%
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* ERP Systems Table */}
              <Card>
                <CardHeader>
                  <CardTitle>ERP Systems</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Connected ERP and financial systems
                  </p>
                </CardHeader>
                <CardContent>
                  <ERPSystemsTable data={erpSystems} />
                </CardContent>
              </Card>
            </div>
          ) : activeView === 'api' ? (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>API Call Volume</span>
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Number of API calls made to external services
                    </p>
                    <div className="text-2xl font-bold text-center py-2">
                      {totalAPICalls.toLocaleString()} calls
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>API Error Rate</span>
                      <BarChart className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Percentage of failed API calls
                    </p>
                    <div className="text-2xl font-bold text-center py-2">
                      {avgErrorRate.toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>API Response Time</span>
                      <Clock className="h-4 w-4 text-muted-foreground" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Average response time for API calls
                    </p>
                    <div className="text-2xl font-bold text-center py-2">
                      {avgResponseTime.toFixed(0)} ms
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* API Integrations Table */}
              <Card>
                <CardHeader>
                  <CardTitle>API Integrations</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Third-party and internal API connections
                  </p>
                </CardHeader>
                <CardContent>
                  <APIIntegrationsTable data={apiIntegrations} />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Shared Drives Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Shared Drives & Folders</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Connected shared drives and folders ({totalFiles.toLocaleString()} total files)
                  </p>
                </CardHeader>
                <CardContent>
                  <SharedDrivesTable data={sharedDrives} />
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
