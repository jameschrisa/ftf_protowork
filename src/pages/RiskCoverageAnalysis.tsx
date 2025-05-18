import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from "recharts"

const data = [
  {
    subject: "Flare Efficiency",
    value: 95,
    fullMark: 100,
  },
  {
    subject: "Emissions Control",
    value: 88,
    fullMark: 100,
  },
  {
    subject: "Maintenance",
    value: 92,
    fullMark: 100,
  },
  {
    subject: "Safety Systems",
    value: 96,
    fullMark: 100,
  },
  {
    subject: "Monitoring",
    value: 90,
    fullMark: 100,
  },
  {
    subject: "Documentation",
    value: 85,
    fullMark: 100,
  },
]

export default function RiskCoverageAnalysis() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Risk Coverage Analysis</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Risk Coverage Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar
                    name="Risk Coverage"
                    dataKey="value"
                    stroke="#3b82f6"
                    fill="#3b82f6"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
