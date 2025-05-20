import { 
  Building2, 
  MapPin, 
  Phone, 
  Globe, 
  Users, 
  DollarSign, 
  Calendar, 
  BarChart3, 
  Leaf,
  ExternalLink,
  ChevronRight
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { ClientProfile } from "../../data/client-profiles-data"

interface ClientProfileCardProps {
  client: ClientProfile
}

export function ClientProfileCard({ client }: ClientProfileCardProps) {
  return (
    <Card className="w-full">
      <CardHeader className="border-b pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="h-6 w-6 text-primary" />
            <CardTitle>{client.name}</CardTitle>
          </div>
          <Button variant="outline" size="sm" className="gap-1">
            <span>Printer Friendly View</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold mb-2">Doing Business As:</h3>
              <p>{client.name}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Company Description:</h3>
              <p className="text-sm text-muted-foreground">
                {client.notes || "No company description available."}
              </p>
              <Button variant="link" className="p-0 h-auto mt-2 text-sm">
                Read More <ChevronRight className="h-3 w-3 ml-1" />
              </Button>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Key Principal:</h3>
              <p>{client.accountManager} <Button variant="link" className="p-0 h-auto text-sm">See more contacts <ChevronRight className="h-3 w-3 ml-1" /></Button></p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">Industry:</h3>
              <p>{client.type}</p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-2">See other industries within the {client.type} sector:</h3>
              <div className="flex flex-wrap gap-2 mt-1">
                <Button variant="link" className="p-0 h-auto text-sm">See All Industries <ChevronRight className="h-3 w-3 ml-1" /></Button>
              </div>
            </div>
          </div>
          
          {/* Right Column */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-semibold">Address:</h3>
                <p className="text-sm">123 Business St, Suite 100, New York, NY 10001</p>
                <Button variant="link" className="p-0 h-auto text-sm">See other locations <ChevronRight className="h-3 w-3 ml-1" /></Button>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-semibold">Phone:</h3>
                <p className="text-sm">+1 (555) 123-4567</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Globe className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-semibold">Website:</h3>
                <a href="#" className="text-sm text-blue-600 flex items-center">
                  {client.name.toLowerCase().replace(/\s+/g, '-')}.com
                  <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-semibold">Employees (this site):</h3>
                <div className="flex items-center">
                  <p className="text-sm">250-500</p>
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Actual</span>
                </div>
                <h3 className="font-semibold mt-2">Employees (all sites):</h3>
                <div className="flex items-center">
                  <p className="text-sm">1,000-5,000</p>
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Estimated</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <DollarSign className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-semibold">Revenue:</h3>
                <div className="flex items-center">
                  <p className="text-sm">$50-100 million</p>
                  <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">Actual</span>
                </div>
                <div className="mt-1">
                  <span className="text-sm font-semibold">Sales Growth:</span>
                  <span className="text-sm ml-1">+12.5%</span>
                  <span className="text-sm font-semibold ml-3">Net Income Growth:</span>
                  <span className="text-sm ml-1">+8.3%</span>
                </div>
                <div className="mt-1">
                  <span className="text-sm font-semibold">Assets:</span>
                  <span className="text-sm ml-1">$75 million</span>
                  <span className="text-sm font-semibold ml-3">Fiscal Year End:</span>
                  <span className="text-sm ml-1">DEC</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-semibold">Year Started:</h3>
                <p className="text-sm">2005</p>
                <h3 className="font-semibold mt-2">Incorporated:</h3>
                <p className="text-sm">2005</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <BarChart3 className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-semibold">Stock Exchange:</h3>
                <p className="text-sm">NYSE:{client.name.substring(0, 4).toUpperCase()}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Leaf className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div>
                <h3 className="font-semibold">ESG ranking:</h3>
                <p className="text-sm">B+</p>
                <h3 className="font-semibold mt-2">ESG industry average:</h3>
                <p className="text-sm">B</p>
                <Button variant="link" className="p-0 h-auto text-sm mt-1">
                  What is ESG Ranking? <ChevronRight className="h-3 w-3 ml-1" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
