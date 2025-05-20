import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { FileText, Clock, Users } from "lucide-react"
import { useState } from "react"
import { ClientProfilesTable } from "../components/financial/client-profiles-table"
import { ClientProfileCard } from "../components/financial/client-profile-card"
import { ClientSearchDialog } from "../components/financial/client-search-dialog"
import { clientProfiles } from "../data/client-profiles-data"

export default function ClientProfilesPage() {
  const [activeView, setActiveView] = useState<'overview' | 'risk'>('overview')
  const [selectedClient, setSelectedClient] = useState(clientProfiles[0])

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <Users className="h-8 w-8" />
          <h1 className="text-3xl font-bold tracking-tight">Client Profiles</h1>
        </div>
      </div>
      
      {/* Tabs Section */}
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0">
          <div className="flex flex-row items-center justify-between px-6 py-5">
            <div className="grid gap-1">
              <CardTitle>Client Management</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage client profiles and risk assessments
              </p>
            </div>
          </div>
          <div className="flex">
            <button
              data-active={activeView === 'overview'}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveView('overview')}
            >
              <span className="text-base font-semibold">
                Client Overview
              </span>
              <span className="text-sm text-muted-foreground">
                Manage client profiles and financial health
              </span>
            </button>
            <button
              data-active={activeView === 'risk'}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-l px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveView('risk')}
            >
              <span className="text-base font-semibold">
                Risk Assessment
              </span>
              <span className="text-sm text-muted-foreground">
                Manage client risk profiles and exposure
              </span>
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {activeView === 'overview' ? (
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Client Profile</h2>
                <ClientSearchDialog 
                  clients={clientProfiles} 
                  onClientSelect={setSelectedClient} 
                />
              </div>
              
              <ClientProfileCard client={selectedClient} />

              {/* Client Profiles Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Client Profiles</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Active client accounts and their current status
                  </p>
                </CardHeader>
                <CardContent>
                  <ClientProfilesTable data={clientProfiles} />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Risk Assessment Framework</span>
                    <Button variant="outline" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Updated:</span>
                      <span>2024-03-10</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last Reviewed:</span>
                      <span>2024-03-25</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Owner:</span>
                      <span>Risk Management Team</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Average Risk Score</span>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    The average risk score across all client accounts.
                  </p>
                  <div className="text-2xl font-bold text-center py-4">
                    3.2 / 10
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>High Risk Clients</span>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Number of clients currently classified as high risk.
                  </p>
                  <div className="text-2xl font-bold text-center py-4">
                    {clientProfiles.filter(client => client.riskLevel === 'high').length}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
