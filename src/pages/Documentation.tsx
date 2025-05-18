import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Home, Zap, Code2, HelpCircle, Pencil, Database, Grid, RefreshCw, FileText } from "lucide-react"
import { Badge } from "../components/ui/badge"
import logo from "../assets/logo.svg"

export default function Documentation() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-8 w-8" />
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Documentation</h1>
            <p className="text-muted-foreground">
              Learn how to use and customize the dashboard
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Pencil className="mr-2 h-4 w-4" />
            Edit Page
          </Button>
          <Button size="sm">
            <HelpCircle className="mr-2 h-4 w-4" />
            Get Help
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Quick Start</CardTitle>
            <Home className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Getting Started</div>
            <p className="text-xs text-muted-foreground mt-1">
              Learn the basics and get up and running quickly
            </p>
            <div className="mt-4">
              <Badge>Beginner Friendly</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <Zap className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Optimization</div>
            <p className="text-xs text-muted-foreground mt-1">
              Tips and tricks for optimal performance
            </p>
            <div className="mt-4">
              <Badge variant="secondary">Advanced</Badge>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">API Reference</CardTitle>
            <Code2 className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Integration</div>
            <p className="text-xs text-muted-foreground mt-1">
              Detailed API documentation and examples
            </p>
            <div className="mt-4">
              <Badge variant="outline">Technical</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Latest Updates</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <RefreshCw className="w-6 h-6 text-muted-foreground" />
              <div>
                <div className="font-medium">Performance Improvements</div>
                <div className="text-sm text-muted-foreground">
                  Optimized data loading and caching
                </div>
              </div>
              <Badge variant="outline" className="ml-auto">2 days ago</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Database className="w-6 h-6 text-muted-foreground" />
              <div>
                <div className="font-medium">Database Updates</div>
                <div className="text-sm text-muted-foreground">
                  Added new indexes for faster queries
                </div>
              </div>
              <Badge variant="outline" className="ml-auto">5 days ago</Badge>
            </div>
            <div className="flex items-center space-x-4">
              <Grid className="w-6 h-6 text-muted-foreground" />
              <div>
                <div className="font-medium">UI Enhancements</div>
                <div className="text-sm text-muted-foreground">
                  New components and improved layouts
                </div>
              </div>
              <Badge variant="outline" className="ml-auto">1 week ago</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-4">
              <img src={logo} alt="Logo" className="w-8 h-8" />
              <div>
                <div className="font-medium">Documentation</div>
                <div className="text-sm text-muted-foreground">
                  Official guides and references
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <HelpCircle className="w-8 h-8 text-muted-foreground" />
              <div>
                <div className="font-medium">Support</div>
                <div className="text-sm text-muted-foreground">
                  Get help from our team
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Code2 className="w-8 h-8 text-muted-foreground" />
              <div>
                <div className="font-medium">Examples</div>
                <div className="text-sm text-muted-foreground">
                  Code samples and templates
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
