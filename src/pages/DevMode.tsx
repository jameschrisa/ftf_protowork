import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Button } from "../components/ui/button"
import { Terminal as TerminalIcon, ArrowRight, X } from "lucide-react"
import { cn } from "../lib/utils"
import { logger } from "../lib/logger"

interface CommandResult {
  command: string
  output: string
  isError: boolean
}

export default function DevMode() {
  const [command, setCommand] = useState("")
  const [history, setHistory] = useState<CommandResult[]>([
    {
      command: "",
      output: "Welcome to the Financial Analytics Dashboard Developer Terminal.\nType 'help' to see available commands.",
      isError: false
    }
  ])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll to bottom when history changes
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [history])

  // Focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  // Handle command execution
  const executeCommand = async () => {
    if (!command.trim()) return

    try {
      // Log the command
      await logger.logActivity('Terminal Command', {
        command: command
      })

      // Process the command
      const result = processCommand(command)
      
      // Add command and result to history
      setHistory(prev => [
        ...prev, 
        {
          command,
          output: result.output,
          isError: result.isError
        }
      ])
      
      // Clear command input
      setCommand("")
      setHistoryIndex(-1)
    } catch (error) {
      console.error('Failed to execute command:', error)
    }
  }

  // Process command and return output
  const processCommand = (cmd: string): { output: string, isError: boolean } => {
    const parts = cmd.trim().split(/\s+/)
    const mainCommand = parts[0].toLowerCase()
    const args = parts.slice(1)
    
    switch (mainCommand) {
      case "help":
        return {
          output: `
Available commands:
  help                 - Show this help message
  clear                - Clear the terminal
  ls [directory]       - List files in the current or specified directory
  cd [directory]       - Change directory
  pwd                  - Print working directory
  echo [text]          - Display text
  cat [file]           - Display file contents
  mkdir [directory]    - Create a directory
  touch [file]         - Create a file
  rm [file]            - Remove a file
  date                 - Display current date and time
  whoami               - Display current user
  system               - Display system information
`,
          isError: false
        }
        
      case "clear":
        // Special case - we'll handle this separately
        setHistory([])
        return { output: "", isError: false }
        
      case "ls":
        return {
          output: `
Directory: ${args[0] || "/Users/jchrisa/REPOS/FAB"}

drwxr-xr-x  - jchrisa  staff  Apr 15 10:23  components/
drwxr-xr-x  - jchrisa  staff  Apr 15 10:23  public/
drwxr-xr-x  - jchrisa  staff  Apr 15 10:23  src/
-rw-r--r--  1 jchrisa  staff  2.1K  Apr 15 10:23  .gitignore
-rw-r--r--  1 jchrisa  staff  1.5K  Apr 15 10:23  components.json
-rw-r--r--  1 jchrisa  staff  3.2K  Apr 15 10:23  eslint.config.js
-rw-r--r--  1 jchrisa  staff  1.1K  Apr 15 10:23  index.html
-rw-r--r--  1 jchrisa  staff  4.5K  Apr 15 10:23  package.json
-rw-r--r--  1 jchrisa  staff  0.2K  Apr 15 10:23  postcss.config.js
-rw-r--r--  1 jchrisa  staff  5.2K  May 18 10:36  README.md
-rw-r--r--  1 jchrisa  staff  1.8K  Apr 15 10:23  tailwind.config.js
-rw-r--r--  1 jchrisa  staff  0.3K  Apr 15 10:23  tsconfig.app.json
-rw-r--r--  1 jchrisa  staff  0.7K  Apr 15 10:23  tsconfig.json
-rw-r--r--  1 jchrisa  staff  0.3K  Apr 15 10:23  tsconfig.node.json
-rw-r--r--  1 jchrisa  staff  1.2M  Apr 15 10:23  tsconfig.tsbuildinfo
-rw-r--r--  1 jchrisa  staff  0.1K  Apr 15 10:23  vercel.json
-rw-r--r--  1 jchrisa  staff  0.5K  Apr 15 10:23  vite.config.ts
`,
          isError: false
        }
        
      case "cd":
        return {
          output: `Changed directory to ${args[0] || "/Users/jchrisa/REPOS/FAB"}`,
          isError: false
        }
        
      case "pwd":
        return {
          output: "/Users/jchrisa/REPOS/FAB",
          isError: false
        }
        
      case "echo":
        return {
          output: args.join(" ") || "",
          isError: false
        }
        
      case "cat":
        if (!args[0]) {
          return {
            output: "cat: missing file operand",
            isError: true
          }
        }
        
        // Simulate cat for README.md
        if (args[0] === "README.md") {
          return {
            output: `# Financial Analytics Dashboard (FAB)

A modern, comprehensive financial intelligence platform that provides analytics, monitoring, and AI-assisted insights for financial data management and decision-making.

## Features

- Financial Analytics: Comprehensive financial data visualization
- AI-Powered Assistance: Financial Analyst Pilot provides AI-driven insights
- Client Management: Track client profiles, spending patterns, and risk levels
- Time-Based Analysis: Explore financial data across different time periods
- SOPs & Policies: Manage and access standard operating procedures
- Data Management: Integrate with ERP systems, APIs, and shared drives
- Communications Tracking: Monitor emails, texts, and messaging
- Advanced Query System: Submit queries with text, audio, and file attachments
- Expert Agent Assistance: AI-powered prompt guidance

[...truncated for brevity...]`,
            isError: false
          }
        } else {
          return {
            output: `cat: ${args[0]}: No such file or directory`,
            isError: true
          }
        }
        
      case "mkdir":
        if (!args[0]) {
          return {
            output: "mkdir: missing operand",
            isError: true
          }
        }
        return {
          output: `Directory created: ${args[0]}`,
          isError: false
        }
        
      case "touch":
        if (!args[0]) {
          return {
            output: "touch: missing file operand",
            isError: true
          }
        }
        return {
          output: `File created: ${args[0]}`,
          isError: false
        }
        
      case "rm":
        if (!args[0]) {
          return {
            output: "rm: missing operand",
            isError: true
          }
        }
        return {
          output: `File removed: ${args[0]}`,
          isError: false
        }
        
      case "date":
        return {
          output: new Date().toString(),
          isError: false
        }
        
      case "whoami":
        return {
          output: "jchrisa",
          isError: false
        }
        
      case "system":
        return {
          output: `
OS: macOS Sonoma
Node: v18.17.1
React: v18.3.1
TypeScript: v5.6.2
Vite: v5.4.11
`,
          isError: false
        }
        
      default:
        return {
          output: `Command not found: ${mainCommand}. Type 'help' to see available commands.`,
          isError: true
        }
    }
  }

  // Handle key navigation through command history
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      executeCommand()
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (history.length > 0 && historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        const historicalCommand = history[history.length - 1 - newIndex].command
        if (historicalCommand) {
          setCommand(historicalCommand)
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        const historicalCommand = history[history.length - 1 - newIndex].command
        setCommand(historicalCommand)
      } else if (historyIndex === 0) {
        setHistoryIndex(-1)
        setCommand("")
      }
    }
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3">
        <TerminalIcon className="h-8 w-8 text-blue-700" strokeWidth={1.5} />
        <h1 className="text-3xl font-bold">Developer Terminal</h1>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <TerminalIcon className="h-5 w-5" />
              Terminal
            </span>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setHistory([])}
              className="h-8 px-2"
            >
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Terminal output */}
          <div 
            ref={terminalRef}
            className="bg-black text-green-400 font-mono text-sm p-4 rounded-md h-[400px] overflow-auto mb-4"
          >
            {history.map((item, index) => (
              <div key={index} className="mb-2">
                {item.command && (
                  <div className="flex items-center gap-2">
                    <span className="text-blue-400">$</span>
                    <span>{item.command}</span>
                  </div>
                )}
                <div className={cn(
                  "ml-4 whitespace-pre-wrap",
                  item.isError && "text-red-400"
                )}>
                  {item.output}
                </div>
              </div>
            ))}
          </div>
          
          {/* Command input */}
          <div className="flex items-center gap-2">
            <div className="text-blue-500 font-mono">$</div>
            <Input
              ref={inputRef}
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter command..."
              className="font-mono"
            />
            <Button 
              onClick={executeCommand}
              disabled={!command.trim()}
              size="icon"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Quick Reference</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-semibold mb-1">File Operations</div>
              <div className="text-muted-foreground">
                <div><code>ls</code> - List files</div>
                <div><code>cat [file]</code> - View file</div>
                <div><code>touch [file]</code> - Create file</div>
                <div><code>mkdir [dir]</code> - Create directory</div>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">Navigation</div>
              <div className="text-muted-foreground">
                <div><code>cd [dir]</code> - Change directory</div>
                <div><code>pwd</code> - Current directory</div>
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">System</div>
              <div className="text-muted-foreground">
                <div><code>date</code> - Show date/time</div>
                <div><code>whoami</code> - Current user</div>
                <div><code>system</code> - System info</div>
                <div><code>help</code> - Show help</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
