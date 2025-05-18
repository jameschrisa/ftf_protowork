import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { Info } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"

type HeatmapType = 'efficiency' | 'volume' | 'steam'

interface LegendInfo {
  title: string
  description: string
  ranges: {
    color: string
    label: string
    description: string
  }[]
}

const heatmapConfig: Record<HeatmapType, LegendInfo> = {
  efficiency: {
    title: "Combustion Efficiency",
    description: "Measures the completeness of combustion in the flare system",
    ranges: [
      { color: "#1e40af", label: ">98%", description: "Optimal efficiency" },
      { color: "#60a5fa", label: "95-98%", description: "Good efficiency" },
      { color: "#fbbf24", label: "90-95%", description: "Needs attention" },
      { color: "#dc2626", label: "<90%", description: "Critical - immediate action required" }
    ]
  },
  volume: {
    title: "Flare Gas Volume",
    description: "Indicates the volume of gas being processed by each flare",
    ranges: [
      { color: "#1e1e1e", label: "Very High", description: "Maximum load" },
      { color: "#3f3f3f", label: "High", description: "Heavy load" },
      { color: "#666666", label: "Medium", description: "Moderate load" },
      { color: "#999999", label: "Low", description: "Light load" }
    ]
  },
  steam: {
    title: "Steam-to-Gas Ratio",
    description: "Shows the optimization level of steam usage in the flare system",
    ranges: [
      { color: "#1e40af", label: "Optimal", description: "Ideal steam-to-gas ratio" },
      { color: "#fbbf24", label: "Under-steaming", description: "Insufficient steam flow" },
      { color: "#dc2626", label: "Over-steaming", description: "Excessive steam usage" }
    ]
  }
}

// Generate mock flare data
function generateFlareData(type: HeatmapType) {
  // Generate Eagle Ford flares
  const eagleFordFlares = Array.from({ length: 50 }, (_, i) => ({
    id: `EF-${String(i + 1).padStart(3, '0')}`,
    name: `Eagle Ford ${i + 1}`,
    location: 'Eagle Ford'
  }))

  // Generate Permian Basin flares
  const permianFlares = Array.from({ length: 50 }, (_, i) => ({
    id: `PB-${String(i + 1).padStart(3, '0')}`,
    name: `Permian Basin ${i + 1}`,
    location: 'Permian Basin'
  }))

  // Combine and add metric values
  return [...eagleFordFlares, ...permianFlares].map(flare => {
    let value: number
    let color: string
    
    switch(type) {
      case 'efficiency':
        value = Math.random() * 15 + 85 // 85-100%
        color = value > 98 ? "#1e40af" :
               value > 95 ? "#60a5fa" :
               value > 90 ? "#fbbf24" : "#dc2626"
        break
      case 'volume':
        value = Math.random() * 100
        color = value > 75 ? "#1e1e1e" :
               value > 50 ? "#3f3f3f" :
               value > 25 ? "#666666" : "#999999"
        break
      case 'steam':
        value = Math.random() * 2 // 0-2 ratio
        color = value > 1.2 ? "#dc2626" :
               value < 0.8 ? "#fbbf24" : "#1e40af"
        break
    }
    
    return {
      ...flare,
      value: Math.round(value * 10) / 10,
      color
    }
  })
}

export function PerformanceHeatmap() {
  const [selectedType, setSelectedType] = useState<HeatmapType>('efficiency')
  const config = heatmapConfig[selectedType]
  const data = generateFlareData(selectedType)

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium">Performance Metrics</h3>
          <p className="text-sm text-muted-foreground mb-4">{config.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={selectedType} onValueChange={(value) => setSelectedType(value as HeatmapType)}>
            <SelectTrigger className="w-[240px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="efficiency">Combustion Efficiency</SelectItem>
              <SelectItem value="volume">Flare Gas Volume</SelectItem>
              <SelectItem value="steam">Steam-to-Gas Ratio</SelectItem>
            </SelectContent>
          </Select>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <Info className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>{config.title} Legend</DialogTitle>
                <DialogDescription>{config.description}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                {config.ranges.map((range, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-sm" 
                      style={{ backgroundColor: range.color }}
                    />
                    <div>
                      <div className="font-medium">{range.label}</div>
                      <div className="text-sm text-muted-foreground">
                        {range.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-end gap-4">
        {config.ranges.map((range, i) => (
          <div key={i} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-sm" 
              style={{ backgroundColor: range.color }}
            />
            <span className="text-sm">{range.label}</span>
          </div>
        ))}
      </div>
      
      {/* Heatmap Grid */}
      <div className="flex justify-center">
        <div className="inline-grid grid-cols-20 gap-[1px] bg-border p-[1px]">
          {Array.from({ length: 5 }).map((_, row) => (
            data.slice(row * 20, (row + 1) * 20).map((flare) => (
              <div
                key={flare.id}
                className="aspect-square w-[36px] relative group cursor-pointer"
                style={{ backgroundColor: flare.color }}
              >
                <div className="absolute hidden group-hover:block bg-background border rounded-md p-2 z-10 -translate-x-1/2 -translate-y-full left-1/2 top-0 text-sm whitespace-nowrap">
                  <div className="font-bold">{flare.name}</div>
                  <div>{flare.location}</div>
                  <div>
                    {config.title}: {flare.value}
                    {selectedType === 'efficiency' ? '%' : 
                     selectedType === 'volume' ? ' MMSCFD' : ' ratio'}
                  </div>
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    </div>
  )
}
