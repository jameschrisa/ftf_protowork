import { useState, useRef, useEffect } from "react"
import { useReactMediaRecorder } from "react-media-recorder"
import { 
  Dialog,
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter, 
  DialogClose 
} from "./dialog"
import { Button } from "./button"
import { Textarea } from "./textarea"
import { Input } from "./input"
import { Mic, MicOff, Paperclip, Send, X, RefreshCw, Bot } from "lucide-react"
import { cn } from "../../lib/utils"

// Add type definitions for the Web Speech API
interface SpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
  resultIndex: number;
  error: any;
}

interface SpeechRecognitionResultList {
  length: number;
  item(index: number): SpeechRecognitionResult;
  [index: number]: SpeechRecognitionResult;
}

interface SpeechRecognitionResult {
  length: number;
  item(index: number): SpeechRecognitionAlternative;
  [index: number]: SpeechRecognitionAlternative;
  isFinal: boolean;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  abort(): void;
  onresult: (event: SpeechRecognitionEvent) => void;
  onerror: (event: SpeechRecognitionEvent) => void;
  onend: () => void;
}

interface Window {
  SpeechRecognition?: new () => SpeechRecognition;
  webkitSpeechRecognition?: new () => SpeechRecognition;
}

interface QueryRequestDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function QueryRequestDialog({ open, onOpenChange }: QueryRequestDialogProps) {
  const [requestText, setRequestText] = useState("")
  const [isTranscribing, setIsTranscribing] = useState(false)
  const [transcriptionStatus, setTranscriptionStatus] = useState("")
  const [attachment, setAttachment] = useState<File | null>(null)
  const [isExpertPanelOpen, setIsExpertPanelOpen] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Speech recognition setup
  const recognitionRef = useRef<SpeechRecognition | null>(null)
  
  // Media recorder setup
  const { 
    status, 
    startRecording, 
    stopRecording, 
    mediaBlobUrl 
  } = useReactMediaRecorder({
    audio: true,
    onStop: (blobUrl, blob) => {
      // Handle the recorded audio if needed
      console.log("Recording stopped", blobUrl)
    }
  })

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognitionAPI = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
      
      if (SpeechRecognitionAPI) {
        recognitionRef.current = new SpeechRecognitionAPI()
        
        if (recognitionRef.current) {
          recognitionRef.current.continuous = true
          recognitionRef.current.interimResults = true
          
          recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
            const transcript = Array.from(event.results)
              .map(result => result[0])
              .map(result => result.transcript)
              .join('')
            
            setRequestText(transcript)
          }
          
          recognitionRef.current.onerror = (event: SpeechRecognitionEvent) => {
            console.error('Speech recognition error', event.error)
            setTranscriptionStatus(`Error: ${event.error}`)
            setIsTranscribing(false)
          }
          
          recognitionRef.current.onend = () => {
            setIsTranscribing(false)
            setTranscriptionStatus("Transcription complete")
          }
        }
      }
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort()
      }
    }
  }, [])

  // Handle recording toggle
  const toggleRecording = () => {
    if (status === 'recording' || isTranscribing) {
      stopRecording()
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      setIsTranscribing(false)
      setTranscriptionStatus("Transcription complete")
    } else {
      startRecording()
      if (recognitionRef.current) {
        recognitionRef.current.start()
        setIsTranscribing(true)
        setTranscriptionStatus("Listening...")
      } else {
        setTranscriptionStatus("Speech recognition not supported in this browser")
      }
    }
  }

  // Handle file attachment
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setAttachment(e.target.files[0])
    }
  }

  // Clear the form
  const handleClear = () => {
    setRequestText("")
    setAttachment(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  // Toggle expert panel
  const toggleExpertPanel = () => {
    setIsExpertPanelOpen(!isExpertPanelOpen)
  }

  // Submit the request
  const handleSubmit = () => {
    // Here you would typically send the data to your backend
    console.log("Submitting request:", {
      text: requestText,
      attachment: attachment
    })
    
    // For demo purposes, just close the dialog and clear the form
    handleClear()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Submit Query or Request</DialogTitle>
        </DialogHeader>
        
        {/* Expert Agent Panel - conditionally rendered */}
        {isExpertPanelOpen && (
          <div className="mb-4 p-4 border rounded-md bg-blue-500/5 border-blue-200 dark:border-blue-800">
            <h4 className="text-sm font-medium mb-2 flex items-center">
              <Bot className="h-4 w-4 mr-2 text-blue-500" />
              Expert Agent Assistance
            </h4>
            <p className="text-sm text-muted-foreground">
              I can help craft the right prompt to get you the best information and data for your request. 
              Be specific about what financial data you're looking for, the time period, and any specific 
              format you need the information in.
            </p>
          </div>
        )}
        
        {/* Text area for typing or displaying transcription */}
        <Textarea 
          value={requestText}
          onChange={(e) => setRequestText(e.target.value)}
          placeholder="Type your request here or use the microphone to record..." 
          className="min-h-[150px] resize-none"
        />
        
        {/* Action buttons */}
        <div className="flex items-center flex-wrap gap-2 mt-2">
          <Button 
            type="button"
            variant="outline" 
            size="sm"
            onClick={toggleExpertPanel}
            className={cn(
              "transition-colors",
              isExpertPanelOpen ? "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 hover:text-blue-600" : "text-blue-500 hover:bg-blue-500/10 hover:text-blue-600"
            )}
          >
            <Bot className="h-4 w-4 mr-2" />
            Ask Expert Agent
          </Button>
          <Button 
            type="button"
            variant="outline" 
            size="sm"
            onClick={toggleRecording}
            className={cn(
              "transition-colors",
              isTranscribing && "bg-red-500/10 text-red-500 hover:bg-red-500/20 hover:text-red-600"
            )}
          >
            {isTranscribing ? (
              <>
                <MicOff className="h-4 w-4 mr-2" />
                Stop Recording
              </>
            ) : (
              <>
                <Mic className="h-4 w-4 mr-2" />
                Record Audio
              </>
            )}
          </Button>
          
          {transcriptionStatus && (
            <span className="text-sm text-muted-foreground ml-2">
              {transcriptionStatus}
            </span>
          )}
        </div>
        
        {/* File attachment */}
        <div className="mt-4 space-y-2">
          <div className="flex items-center gap-2">
            <Input 
              ref={fileInputRef}
              type="file" 
              id="attachment" 
              onChange={handleFileChange}
              className="hidden"
            />
            <Button 
              type="button"
              variant="outline" 
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4 mr-2" />
              Attach File
            </Button>
            {attachment && (
              <div className="flex items-center gap-2 text-sm">
                <span className="truncate max-w-[200px]">{attachment.name}</span>
                <Button 
                  type="button"
                  variant="ghost" 
                  size="sm"
                  className="h-6 w-6 p-0"
                  onClick={() => setAttachment(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="mt-4">
          <Button 
            type="button"
            variant="outline"
            onClick={handleClear}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Clear
          </Button>
          <DialogClose asChild>
            <Button variant="outline">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
          </DialogClose>
          <Button 
            type="button"
            onClick={handleSubmit}
            disabled={!requestText.trim() && !attachment}
          >
            <Send className="h-4 w-4 mr-2" />
            Submit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
