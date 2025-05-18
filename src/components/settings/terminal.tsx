import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { logger } from "../../lib/logger"

export function Terminal() {
  const [command, setCommand] = useState("")
  const [output, setOutput] = useState<string[]>([])

  const handleCommand = async () => {
    try {
      // Log the command
      await logger.logActivity('Terminal Command', {
        command: command
      })

      // Add command to output
      setOutput(prev => [...prev, `$ ${command}`])
      
      // Clear command input
      setCommand("")

      // In a real implementation, we would execute the command here
      // and add its output to the terminal
      
    } catch (error) {
      console.error('Failed to execute command:', error)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Terminal</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="bg-background rounded-md p-4 font-mono text-sm">
          {/* Output area */}
          <div className="min-h-[200px] max-h-[400px] overflow-auto mb-4">
            {output.map((line, index) => (
              <div key={index} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>

          {/* Command input */}
          <div className="flex gap-2">
            <Input
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && command) {
                  handleCommand()
                }
              }}
              placeholder="Enter command..."
              className="font-mono"
            />
            <Button 
              onClick={handleCommand}
              disabled={!command}
            >
              Execute
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
