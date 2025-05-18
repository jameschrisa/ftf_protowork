import * as React from "react"
import { useNavigate } from "react-router-dom"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./dialog"
import { EnhancedProgress } from "./enhanced-spinner"
import { Check } from "lucide-react"
import { cn } from "../../lib/utils"
import { motion } from "framer-motion"

interface AnalysisDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const steps = [
  "Loading financial data",
  "Analyzing payment patterns",
  "Processing transaction history",
  "Calculating financial metrics",
  "Generating performance report"
]

export function AnalysisDialog({ open, onOpenChange }: AnalysisDialogProps) {
  const [progress, setProgress] = React.useState(0)
  const [completedSteps, setCompletedSteps] = React.useState<number[]>([])
  const [currentStep, setCurrentStep] = React.useState(0)
  const navigate = useNavigate()

  React.useEffect(() => {
    if (!open) {
      // Reset state when dialog closes
      setProgress(0)
      setCompletedSteps([])
      setCurrentStep(0)
      return
    }

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + 1
      })
    }, 50)

    // Step completion animation
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= steps.length - 1) {
          clearInterval(stepInterval)
          return prev
        }
        return prev + 1
      })
    }, 2000)

    return () => {
      clearInterval(progressInterval)
      clearInterval(stepInterval)
    }
  }, [open])

  // Update completed steps based on progress
  React.useEffect(() => {
    const stepProgress = (progress / 100) * steps.length
    const completedStepIndex = Math.floor(stepProgress)
    if (completedStepIndex > 0 && !completedSteps.includes(completedStepIndex - 1)) {
      setCompletedSteps(prev => [...prev, completedStepIndex - 1])
    }

    // When analysis is complete, close dialog and navigate to results
    if (progress === 100) {
      setTimeout(() => {
        onOpenChange(false)
        navigate('/analysis-results', { replace: true })
      }, 1000)
    }
  }, [progress, completedSteps, onOpenChange, navigate])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Analyzing Financial Data</DialogTitle>
        </DialogHeader>
        <div className="py-6">
          <EnhancedProgress 
            value={progress} 
            className="h-3" 
            shimmer={true}
            gradient={true}
            showPercentage={true}
          />
          <div className="mt-6 space-y-4">
            {steps.map((step, index) => (
              <div
                key={step}
                className={cn(
                  "flex items-center gap-3 text-sm",
                  index === currentStep ? "text-blue-500" :
                  completedSteps.includes(index) ? "text-muted-foreground" :
                  "text-muted-foreground/50"
                )}
              >
                <div className="flex-shrink-0 w-5 h-5">
                  {completedSteps.includes(index) ? (
                    <motion.div 
                      initial={{ scale: 0.8, opacity: 0.8 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="flex items-center justify-center w-5 h-5 rounded-full bg-blue-500/20"
                    >
                      <Check className="w-3 h-3 text-blue-500" />
                    </motion.div>
                  ) : index === currentStep ? (
                    <motion.div 
                      animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="w-2 h-2 mt-1.5 rounded-full bg-blue-500"
                    />
                  ) : (
                    <div className="w-2 h-2 mt-1.5 rounded-full bg-muted" />
                  )}
                </div>
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
