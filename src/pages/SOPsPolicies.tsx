import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { FileText, Clock, BookOpen } from "lucide-react"
import { useState } from "react"
import { FinancialSOPsTable } from "../components/financial/financial-sops-table"
import { financialSOPs } from "../data/financial-sops-data"

export default function SOPsPoliciesPage() {
  const [activeView, setActiveView] = useState<'procedures' | 'compliance'>('procedures')

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <BookOpen className="h-8 w-8" />
          <h1 className="text-3xl font-bold tracking-tight">SOPs & Policies</h1>
        </div>
      </div>
      
      {/* Tabs Section */}
      <Card>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0">
          <div className="flex flex-row items-center justify-between px-6 py-5">
            <div className="grid gap-1">
              <CardTitle>Financial Documentation</CardTitle>
              <p className="text-sm text-muted-foreground">
                Manage financial procedures and compliance policies
              </p>
            </div>
          </div>
          <div className="flex">
            <button
              data-active={activeView === 'procedures'}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveView('procedures')}
            >
              <span className="text-base font-semibold">
                Financial Procedures
              </span>
              <span className="text-sm text-muted-foreground">
                Manage standard operating procedures for financial operations
              </span>
            </button>
            <button
              data-active={activeView === 'compliance'}
              className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-l px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
              onClick={() => setActiveView('compliance')}
            >
              <span className="text-base font-semibold">
                Compliance Policies
              </span>
              <span className="text-sm text-muted-foreground">
                Manage financial compliance and regulatory policies
              </span>
            </button>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {activeView === 'procedures' ? (
            <div className="space-y-6">
              <div className="grid gap-4 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Accounting Procedures</span>
                      <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Standard procedures for accounting operations and financial reporting.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Updated:</span>
                        <span>2024-03-15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Reviewed:</span>
                        <span>2024-03-20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Owner:</span>
                        <span>Accounting Department</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Treasury Management</span>
                      <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Procedures for cash management, investments, and financial risk.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Updated:</span>
                        <span>2024-02-28</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Reviewed:</span>
                        <span>2024-03-10</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Owner:</span>
                        <span>Treasury Department</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Financial Controls</span>
                      <Button variant="outline" size="icon">
                        <FileText className="h-4 w-4" />
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Internal control procedures for financial operations and reporting.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Updated:</span>
                        <span>2024-03-01</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Last Reviewed:</span>
                        <span>2024-03-15</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Owner:</span>
                        <span>Controller's Office</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Financial SOPs Table */}
              <Card>
                <CardHeader>
                  <CardTitle>Financial SOPs</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Standard operating procedures for financial operations
                  </p>
                </CardHeader>
                <CardContent>
                  <FinancialSOPsTable data={financialSOPs} />
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Regulatory Framework</span>
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
                      <span>Compliance Team</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Audit Frequency</span>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Standard frequency for internal financial audits.
                  </p>
                  <div className="text-2xl font-bold text-center py-4">
                    Quarterly
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>Reporting Deadline</span>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Maximum time allowed for financial reporting after period close.
                  </p>
                  <div className="text-2xl font-bold text-center py-4">
                    15 Days
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
