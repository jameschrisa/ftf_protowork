import { useState } from "react"
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose 
} from "./dialog"
import { Button } from "./button"
import { Input } from "./input"
import { Label } from "./label"
import { Textarea } from "./textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./select"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "./tabs"
import { Bot, Database, Network, FolderOpen, Loader2, CheckCircle, XCircle } from "lucide-react"

interface DataConnectionDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function DataConnectionDialog({ open, onOpenChange }: DataConnectionDialogProps) {
  const [activeTab, setActiveTab] = useState<string>("database")
  const [isWizardOpen, setIsWizardOpen] = useState(false)
  const [isTestingConnection, setIsTestingConnection] = useState(false)
  const [testConnectionResult, setTestConnectionResult] = useState<'success' | 'error' | null>(null)
  
  // Database/ERP form state
  const [databaseForm, setDatabaseForm] = useState({
    name: "",
    type: "",
    server: "",
    port: "",
    database: "",
    username: "",
    password: "",
    description: ""
  })
  
  // API form state
  const [apiForm, setApiForm] = useState({
    name: "",
    provider: "",
    endpoint: "",
    authType: "",
    apiKey: "",
    username: "",
    password: "",
    description: ""
  })
  
  // Shared Drive form state
  const [driveForm, setDriveForm] = useState({
    name: "",
    path: "",
    credentials: "",
    permissions: "",
    description: ""
  })

  // Handle form changes
  const handleDatabaseFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setDatabaseForm(prev => ({ ...prev, [name]: value }))
  }
  
  const handleApiFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setApiForm(prev => ({ ...prev, [name]: value }))
  }
  
  const handleDriveFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setDriveForm(prev => ({ ...prev, [name]: value }))
  }

  // Test connection
  const handleTestConnection = () => {
    setIsTestingConnection(true)
    setTestConnectionResult(null)
    
    // Simulate connection test
    setTimeout(() => {
      setIsTestingConnection(false)
      // Randomly succeed or fail for demo purposes
      setTestConnectionResult(Math.random() > 0.3 ? 'success' : 'error')
    }, 2000)
  }

  // Save connection
  const handleSaveConnection = () => {
    // Here you would typically send the data to your backend
    let formData
    
    switch (activeTab) {
      case "database":
        formData = databaseForm
        break
      case "api":
        formData = apiForm
        break
      case "drives":
        formData = driveForm
        break
      default:
        formData = {}
    }
    
    console.log("Saving connection:", formData)
    
    // For demo purposes, just close the dialog
    onOpenChange(false)
    
    // Reset forms
    setDatabaseForm({
      name: "",
      type: "",
      server: "",
      port: "",
      database: "",
      username: "",
      password: "",
      description: ""
    })
    
    setApiForm({
      name: "",
      provider: "",
      endpoint: "",
      authType: "",
      apiKey: "",
      username: "",
      password: "",
      description: ""
    })
    
    setDriveForm({
      name: "",
      path: "",
      credentials: "",
      permissions: "",
      description: ""
    })
    
    setTestConnectionResult(null)
    setIsWizardOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Setup New Data Connection</DialogTitle>
        </DialogHeader>
        
        {/* AI Wizard Panel - conditionally rendered */}
        {isWizardOpen && (
          <div className="mb-4 p-4 border rounded-md bg-blue-500/5 border-blue-200 dark:border-blue-800">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Bot className="h-4 w-4 mr-2 text-blue-500" />
              AI Connection Wizard
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              I can help you set up your connection by guiding you through the process and troubleshooting any issues.
              Tell me what type of connection you're trying to establish and any specific requirements.
            </p>
            <Textarea 
              placeholder="Describe the connection you want to set up (e.g., 'I need to connect to our Oracle database' or 'Help me set up an API connection to Salesforce')..." 
              className="min-h-[80px] resize-none mb-3"
            />
            <div className="flex justify-end">
              <Button size="sm" className="mr-2">
                <Bot className="h-4 w-4 mr-2" />
                Get Connection Help
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsWizardOpen(false)}
              >
                Close Wizard
              </Button>
            </div>
          </div>
        )}
        
        {/* Connection Type Tabs */}
        <Tabs defaultValue="database" onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="database" className="flex items-center">
              <Database className="h-4 w-4 mr-2" />
              <span>Database/ERP</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="flex items-center">
              <Network className="h-4 w-4 mr-2" />
              <span>API</span>
            </TabsTrigger>
            <TabsTrigger value="drives" className="flex items-center">
              <FolderOpen className="h-4 w-4 mr-2" />
              <span>Shared Drives</span>
            </TabsTrigger>
          </TabsList>
          
          {/* Database/ERP Tab Content */}
          <TabsContent value="database" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="db-name">Connection Name</Label>
                <Input 
                  id="db-name" 
                  name="name"
                  value={databaseForm.name}
                  onChange={handleDatabaseFormChange}
                  placeholder="e.g., Production SAP System" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-type">Database Type</Label>
                <Select 
                  value={databaseForm.type} 
                  onValueChange={(value) => setDatabaseForm(prev => ({ ...prev, type: value }))}
                >
                  <SelectTrigger id="db-type">
                    <SelectValue placeholder="Select database type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mysql">MySQL</SelectItem>
                    <SelectItem value="postgresql">PostgreSQL</SelectItem>
                    <SelectItem value="oracle">Oracle</SelectItem>
                    <SelectItem value="sqlserver">SQL Server</SelectItem>
                    <SelectItem value="sap">SAP</SelectItem>
                    <SelectItem value="netsuite">NetSuite</SelectItem>
                    <SelectItem value="dynamics">Dynamics 365</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="db-server">Server/Host</Label>
                <Input 
                  id="db-server" 
                  name="server"
                  value={databaseForm.server}
                  onChange={handleDatabaseFormChange}
                  placeholder="e.g., db.example.com or 192.168.1.1" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-port">Port</Label>
                <Input 
                  id="db-port" 
                  name="port"
                  value={databaseForm.port}
                  onChange={handleDatabaseFormChange}
                  placeholder="e.g., 3306, 5432, 1521" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="db-database">Database Name</Label>
              <Input 
                id="db-database" 
                name="database"
                value={databaseForm.database}
                onChange={handleDatabaseFormChange}
                placeholder="e.g., finance_prod" 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="db-username">Username</Label>
                <Input 
                  id="db-username" 
                  name="username"
                  value={databaseForm.username}
                  onChange={handleDatabaseFormChange}
                  placeholder="Database username" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="db-password">Password</Label>
                <Input 
                  id="db-password" 
                  name="password"
                  value={databaseForm.password}
                  onChange={handleDatabaseFormChange}
                  type="password" 
                  placeholder="Database password" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="db-description">Description</Label>
              <Textarea 
                id="db-description" 
                name="description"
                value={databaseForm.description}
                onChange={handleDatabaseFormChange}
                placeholder="Brief description of this connection" 
              />
            </div>
          </TabsContent>
          
          {/* API Tab Content */}
          <TabsContent value="api" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="api-name">API Name</Label>
                <Input 
                  id="api-name" 
                  name="name"
                  value={apiForm.name}
                  onChange={handleApiFormChange}
                  placeholder="e.g., Payment Gateway API" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="api-provider">Provider</Label>
                <Input 
                  id="api-provider" 
                  name="provider"
                  value={apiForm.provider}
                  onChange={handleApiFormChange}
                  placeholder="e.g., Stripe, Internal, etc." 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-endpoint">Endpoint URL</Label>
              <Input 
                id="api-endpoint" 
                name="endpoint"
                value={apiForm.endpoint}
                onChange={handleApiFormChange}
                placeholder="e.g., https://api.example.com/v1/" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="api-auth-type">Authentication Type</Label>
              <Select 
                value={apiForm.authType} 
                onValueChange={(value) => setApiForm(prev => ({ ...prev, authType: value }))}
              >
                <SelectTrigger id="api-auth-type">
                  <SelectValue placeholder="Select authentication type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Authentication</SelectItem>
                  <SelectItem value="api-key">API Key</SelectItem>
                  <SelectItem value="basic">Basic Auth</SelectItem>
                  <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                  <SelectItem value="bearer">Bearer Token</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {apiForm.authType === 'api-key' && (
              <div className="space-y-2">
                <Label htmlFor="api-key">API Key</Label>
                <Input 
                  id="api-key" 
                  name="apiKey"
                  value={apiForm.apiKey}
                  onChange={handleApiFormChange}
                  placeholder="Enter your API key" 
                />
              </div>
            )}
            
            {apiForm.authType === 'basic' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="api-username">Username</Label>
                  <Input 
                    id="api-username" 
                    name="username"
                    value={apiForm.username}
                    onChange={handleApiFormChange}
                    placeholder="API username" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="api-password">Password</Label>
                  <Input 
                    id="api-password" 
                    name="password"
                    value={apiForm.password}
                    onChange={handleApiFormChange}
                    type="password" 
                    placeholder="API password" 
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="api-description">Description</Label>
              <Textarea 
                id="api-description" 
                name="description"
                value={apiForm.description}
                onChange={handleApiFormChange}
                placeholder="Brief description of this API connection" 
              />
            </div>
          </TabsContent>
          
          {/* Shared Drives Tab Content */}
          <TabsContent value="drives" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="drive-name">Drive Name</Label>
              <Input 
                id="drive-name" 
                name="name"
                value={driveForm.name}
                onChange={handleDriveFormChange}
                placeholder="e.g., Finance Department Drive" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="drive-path">Path/URL</Label>
              <Input 
                id="drive-path" 
                name="path"
                value={driveForm.path}
                onChange={handleDriveFormChange}
                placeholder="e.g., \\server\share or smb://server/share" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="drive-credentials">Credentials</Label>
              <Textarea 
                id="drive-credentials" 
                name="credentials"
                value={driveForm.credentials}
                onChange={handleDriveFormChange}
                placeholder="Username and password or access token information" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="drive-permissions">Permissions</Label>
              <Select 
                value={driveForm.permissions} 
                onValueChange={(value) => setDriveForm(prev => ({ ...prev, permissions: value }))}
              >
                <SelectTrigger id="drive-permissions">
                  <SelectValue placeholder="Select permission level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="read-only">Read Only</SelectItem>
                  <SelectItem value="read-write">Read & Write</SelectItem>
                  <SelectItem value="full-access">Full Access</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="drive-description">Description</Label>
              <Textarea 
                id="drive-description" 
                name="description"
                value={driveForm.description}
                onChange={handleDriveFormChange}
                placeholder="Brief description of this shared drive" 
              />
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Test Connection Result */}
        {testConnectionResult && (
          <div className={`p-3 rounded-md ${
            testConnectionResult === 'success' 
              ? 'bg-green-500/10 border border-green-200 dark:border-green-900' 
              : 'bg-red-500/10 border border-red-200 dark:border-red-900'
          }`}>
            <div className="flex items-center">
              {testConnectionResult === 'success' ? (
                <>
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm font-medium text-green-700 dark:text-green-400">
                    Connection successful! All parameters are valid.
                  </span>
                </>
              ) : (
                <>
                  <XCircle className="h-5 w-5 text-red-500 mr-2" />
                  <span className="text-sm font-medium text-red-700 dark:text-red-400">
                    Connection failed. Please check your settings and try again.
                  </span>
                </>
              )}
            </div>
          </div>
        )}
        
        <DialogFooter className="flex items-center justify-between mt-4">
          <div>
            {!isWizardOpen && (
              <Button 
                type="button"
                variant="outline"
                onClick={() => setIsWizardOpen(true)}
                className="mr-2"
              >
                <Bot className="h-4 w-4 mr-2" />
                AI Connection Wizard
              </Button>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              type="button"
              variant="outline"
              onClick={handleTestConnection}
              disabled={isTestingConnection}
            >
              {isTestingConnection ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>Test Connection</>
              )}
            </Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button 
              type="button"
              onClick={handleSaveConnection}
            >
              Save Connection
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
