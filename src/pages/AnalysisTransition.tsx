import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Card } from "../components/ui/card"
import { cn } from "../lib/utils"
import { useAnalysisState } from "../hooks/use-analysis-state"

export default function AnalysisTransition() {
  const navigate = useNavigate()
  const { completeAnalysis } = useAnalysisState()
  const [progress, setProgress] = useState(0)
  const steps = [
    "Collecting security metrics...",
    "Analyzing threat surface...",
    "Evaluating vendor risks...",
    "Calculating insurance premiums...",
    "Generating report..."
  ]
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    let progressInterval: NodeJS.Timeout
    let stepInterval: NodeJS.Timeout

    // Start progress animation
    progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          // Complete analysis and navigate after a short delay
          setTimeout(() => {
            completeAnalysis()
            navigate('/risk-coverage-analysis')
          }, 500)
          return 100
        }
        return prev + 0.5
      })
    }, 30)

    // Update steps
    stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return Math.min(Math.floor(progress / 20), steps.length - 1)
      })
    }, 100)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
    }
  }, [navigate, completeAnalysis])

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <Card className="w-full max-w-2xl p-8">
        <div className="space-y-8">
          <div>
            <h1 className="text-2xl font-bold text-center mb-2">Analyzing Risk Profile</h1>
            <p className="text-muted-foreground text-center">
              Please wait while we analyze your security posture
            </p>
          </div>

          {/* Progress bar */}
          <div className="space-y-2">
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{progress.toFixed(0)}%</span>
              <span>Analyzing...</span>
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2">
            {steps.map((step, index) => (
              <div
                key={step}
                className={cn(
                  "flex items-center gap-3 text-sm transition-colors duration-300",
                  index === currentStep ? "text-primary" : "text-muted-foreground"
                )}
              >
                <div 
                  className={cn(
                    "w-2 h-2 rounded-full transition-colors duration-300",
                    index === currentStep ? "bg-primary" : 
                    index < currentStep ? "bg-primary/50" : "bg-secondary"
                  )}
                />
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
