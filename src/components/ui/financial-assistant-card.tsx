import { useState } from "react"
import { Card, CardDescription, CardHeader, CardTitle } from "./card"
import { Button } from "./button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./dialog"
import { Progress } from "./progress"
import { CheckCircle2, Circle, Bot } from "lucide-react"
import { Avatar, AvatarFallback } from "./avatar"

const checks = [
  "Analyzing accounts receivable data...",
  "Checking customer payment patterns...",
  "Evaluating credit risk profiles...",
  "Processing invoice aging data...",
  "Calculating cash flow projections...",
  "Generating financial insights...",
]

export function FinancialAssistantCard() {
  const [isEnabled, setIsEnabled] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentCheck, setCurrentCheck] = useState(0)

  const handleToggle = () => {
    if (!isEnabled) {
      setShowDialog(true)
      setProgress(0)
      setCurrentCheck(0)

      // Simulate progress
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setTimeout(() => {
              setTimeout(() => {
                setShowDialog(false)
                setIsEnabled(true)
              }, 1000)
            }, 500)
            return 100
          }

          // Update current check based on progress
          const checkIndex = Math.floor((prev / 100) * checks.length)
          setCurrentCheck(checkIndex)

          return prev + 2
        })
      }, 100)
    } else {
      setIsEnabled(false)
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <Avatar className="h-12 w-12 border-2 border-primary">
                <AvatarFallback className="bg-primary/10">
                  <Bot className="h-6 w-6 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>Financial Intelligence Assistant</CardTitle>
                <CardDescription className="mt-2">
                  AI-powered financial assistant that analyzes real-time data to provide predictive analytics
                  about cash flow, receivables, payment patterns, and potential issues.
                </CardDescription>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="w-[110px] justify-start gap-2"
              onClick={handleToggle}
            >
              {isEnabled ? (
                <Circle className="h-3 w-3 fill-green-500 text-green-500" />
              ) : (
                <Circle className="h-3 w-3 fill-red-500 text-red-500" />
              )}
              {isEnabled ? "Enabled" : "Disabled"}
            </Button>
          </div>
        </CardHeader>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Initializing Financial Assistant</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <Progress value={progress} className="h-2" />
            <div className="grid gap-2">
              {checks.map((check, index) => (
                <div key={check} className="flex items-center gap-2">
                  {index < currentCheck ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : index === currentCheck ? (
                    <Circle className="h-4 w-4 text-blue-500 animate-pulse" />
                  ) : (
                    <Circle className="h-4 w-4 text-gray-300" />
                  )}
                  <span className={index <= currentCheck ? "text-foreground" : "text-muted-foreground"}>
                    {check}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
