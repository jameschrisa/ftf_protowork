import { Button } from "./button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card"
import { Upload, FileSpreadsheet } from "lucide-react"
import { useState, useRef } from "react"
import { AnalysisDialog } from "./analysis-dialog"

interface SidebarCardProps {
  onUpload: (file: File) => void
  onAnalyze: () => void
}

export function SidebarCard({ onUpload, onAnalyze }: SidebarCardProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [showAnalysis, setShowAnalysis] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedFile(file)
      onUpload(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleAnalyzeClick = () => {
    setShowAnalysis(true)
  }

  const handleDialogClose = (open: boolean) => {
    setShowAnalysis(open)
    if (!open) {
      onAnalyze()
    }
  }

  return (
    <>
      <div className="px-2">
        <Card className="border-none shadow-none bg-gradient-to-br from-blue-700/20 to-blue-900/10 relative">
          {/* Glowing border effect */}
          <div className="absolute inset-0 rounded-lg border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] pointer-events-none" />

          <CardHeader className="p-4 pb-2">
            <div className="flex items-center gap-2">
              <FileSpreadsheet className="h-4 w-4 text-blue-500" />
              <CardTitle className="text-sm text-blue-500">Upload & Analyze</CardTitle>
            </div>
            <CardDescription className="text-xs text-gray-400">
              Upload Financial Data for AI-Powered Analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".csv,.xlsx,.xls"
              className="hidden"
            />
            <Button
              variant="outline"
              className="w-full h-8 text-xs bg-blue-950/30 border-blue-800/30 hover:bg-blue-900/30 text-blue-200"
              onClick={handleUploadClick}
            >
              <Upload className="mr-2 h-3 w-3" />
              {uploadedFile ?
                uploadedFile.name.slice(0, 20) + (uploadedFile.name.length > 20 ? '...' : '')
                : 'Upload'}
            </Button>
            <Button
              className="w-full h-8 text-xs bg-blue-600 hover:bg-blue-500 text-white border-none"
              onClick={handleAnalyzeClick}
              disabled={!uploadedFile}
            >
              Analyze Data
            </Button>
          </CardContent>
        </Card>
      </div>

      <AnalysisDialog
        open={showAnalysis}
        onOpenChange={handleDialogClose}
      />
    </>
  )
}
