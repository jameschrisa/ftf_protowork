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
import { Calendar } from "./calendar"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { cn } from "../../lib/utils"
import { format } from "date-fns"
import { CalendarIcon, Search, X } from "lucide-react"
import { Checkbox } from "./checkbox"

interface AdvancedSearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AdvancedSearchDialog({ open, onOpenChange }: AdvancedSearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [fromDate, setFromDate] = useState<Date>()
  const [toDate, setToDate] = useState<Date>()
  const [searchResults, setSearchResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  // Mock categories for financial search
  const categories = [
    "Financial Reports",
    "Invoices",
    "Receipts",
    "Tax Documents",
    "Budgets",
    "Forecasts",
    "Client Records"
  ]

  // Handle category selection
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  // Handle search submission
  const handleSearch = () => {
    setIsSearching(true)
    
    // Simulate search delay
    setTimeout(() => {
      // Generate mock search results
      const mockResults = generateMockResults(searchQuery, fromDate, toDate, selectedCategories)
      setSearchResults(mockResults)
      setIsSearching(false)
    }, 800)
  }

  // Clear search form
  const handleClear = () => {
    setSearchQuery("")
    setFromDate(undefined)
    setToDate(undefined)
    setSelectedCategories([])
    setSearchResults([])
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Advanced Search</DialogTitle>
        </DialogHeader>
        
        {/* Search filters */}
        <div className="grid gap-4 py-4">
          {/* Keyword search */}
          <div className="grid gap-2">
            <Label htmlFor="search-query">Keywords</Label>
            <Input
              id="search-query"
              placeholder="Search for financial documents, reports, clients..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Date range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label>From Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !fromDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {fromDate ? format(fromDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={fromDate}
                    onSelect={setFromDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="grid gap-2">
              <Label>To Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "justify-start text-left font-normal",
                      !toDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {toDate ? format(toDate, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={toDate}
                    onSelect={setToDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
          
          {/* Categories */}
          <div className="grid gap-2">
            <Label>Document Categories</Label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={() => toggleCategory(category)}
                  />
                  <label
                    htmlFor={`category-${category}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {category}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Search results */}
        {searchResults.length > 0 && (
          <div className="border rounded-md">
            <div className="p-2 bg-muted/50 border-b">
              <h3 className="text-sm font-medium">Search Results ({searchResults.length})</h3>
            </div>
            <div className="max-h-[300px] overflow-auto p-1">
              {searchResults.map((result) => (
                <div 
                  key={result.id} 
                  className="p-3 hover:bg-accent rounded-md cursor-pointer transition-colors"
                  onClick={() => {
                    // Handle result click - e.g., navigate to the document
                    console.log("Clicked result:", result)
                  }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{result.title}</h4>
                      <p className="text-sm text-muted-foreground">{result.excerpt}</p>
                    </div>
                    <span className="text-xs text-muted-foreground">{result.date}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                      {result.category}
                    </span>
                    {result.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-xs px-2 py-0.5 bg-muted rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Loading state */}
        {isSearching && (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        )}
        
        <DialogFooter className="gap-2 sm:gap-0">
          <Button 
            type="button"
            variant="outline"
            onClick={handleClear}
          >
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            type="button"
            onClick={handleSearch}
            disabled={!searchQuery && !fromDate && !toDate && selectedCategories.length === 0}
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Types for search results
interface SearchResult {
  id: string
  title: string
  excerpt: string
  date: string
  category: string
  tags: string[]
}

// Function to generate mock search results
function generateMockResults(
  query: string, 
  fromDate?: Date, 
  toDate?: Date, 
  categories?: string[]
): SearchResult[] {
  // If no search criteria, return empty results
  if (!query && !fromDate && !toDate && (!categories || categories.length === 0)) {
    return []
  }
  
  // Mock data generation
  const results: SearchResult[] = []
  
  // Financial reports
  if (!categories || categories.includes("Financial Reports")) {
    results.push({
      id: "fr-001",
      title: "Q1 2025 Financial Report",
      excerpt: "Comprehensive financial analysis for Q1 2025 including revenue growth, expense breakdown, and profitability metrics.",
      date: "Apr 15, 2025",
      category: "Financial Reports",
      tags: ["Quarterly", "Revenue", "Expenses"]
    })
    
    results.push({
      id: "fr-002",
      title: "Annual Financial Statement 2024",
      excerpt: "Complete annual financial statement including balance sheet, income statement, and cash flow analysis.",
      date: "Jan 30, 2025",
      category: "Financial Reports",
      tags: ["Annual", "Statement", "Audit"]
    })
  }
  
  // Invoices
  if (!categories || categories.includes("Invoices")) {
    results.push({
      id: "inv-001",
      title: "Invoice #INV-2025-0423",
      excerpt: "Client invoice for consulting services provided in March 2025.",
      date: "Apr 1, 2025",
      category: "Invoices",
      tags: ["Consulting", "Services", "Pending"]
    })
  }
  
  // Client Records
  if (!categories || categories.includes("Client Records")) {
    results.push({
      id: "cl-001",
      title: "Acme Corp Client Profile",
      excerpt: "Complete client profile including contact information, contract details, and financial history.",
      date: "Mar 10, 2025",
      category: "Client Records",
      tags: ["Enterprise", "Active", "High Value"]
    })
  }
  
  // Filter by search query if provided
  if (query) {
    const lowerQuery = query.toLowerCase()
    results.filter(result => 
      result.title.toLowerCase().includes(lowerQuery) || 
      result.excerpt.toLowerCase().includes(lowerQuery) ||
      result.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    )
  }
  
  return results
}
