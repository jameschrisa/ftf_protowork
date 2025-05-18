import { FlareAnalysisRadial } from "../components/ui/radial-chart"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Microscope } from "lucide-react"

export default function AnalysisResults() {
  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <Microscope className="h-8 w-8" />
          <h2 className="text-3xl font-bold tracking-tight">Analysis Results</h2>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Flare Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <FlareAnalysisRadial
                value={85}
                min={0}
                max={100}
                label="Performance"
                color="hsl(var(--primary))"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Efficiency Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <FlareAnalysisRadial
                value={92}
                min={0}
                max={100}
                label="Efficiency"
                color="hsl(var(--primary))"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <FlareAnalysisRadial
                value={78}
                min={0}
                max={100}
                label="Compliance"
                color="hsl(var(--primary))"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
