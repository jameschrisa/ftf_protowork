import { useState } from "react"
import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Mail, MessageSquare, MessagesSquare } from "lucide-react"
import { EmailTable } from "../components/communications/email-table"
import { TextTable } from "../components/communications/text-table"
import { MessagingTable } from "../components/communications/messaging-table"
import { emailMessages, textMessages, appMessages } from "../data/communication-data"

export default function CommunicationsPage() {
  const [activeTab, setActiveTab] = useState<'email' | 'text' | 'messaging'>('email')

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <MessagesSquare className="h-8 w-8 text-blue-700" strokeWidth={1.5} />
          <h1 className="text-3xl font-bold tracking-tight">Communications</h1>
        </div>
      </div>

      <div className="grid gap-4">
        <Card>
          <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0">
            <div className="flex">
              <button
                data-active={activeTab === 'email'}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveTab('email')}
              >
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  <span className="text-base font-semibold">Email</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  View email communications with the AI assistant
                </span>
              </button>
              <button
                data-active={activeTab === 'text'}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-l px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveTab('text')}
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  <span className="text-base font-semibold">Text</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  View text message communications with the AI assistant
                </span>
              </button>
              <button
                data-active={activeTab === 'messaging'}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t border-l px-6 py-4 text-left data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveTab('messaging')}
              >
                <div className="flex items-center gap-2">
                  <MessagesSquare className="h-5 w-5" />
                  <span className="text-base font-semibold">Messaging Apps</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  View communications from Slack, Teams, and other platforms
                </span>
              </button>
            </div>
          </CardHeader>
          <CardContent className="p-6">
            <div className="space-y-4">
              {activeTab === 'email' && (
                <>
                  <h3 className="text-lg font-medium">Email Communications</h3>
                  <EmailTable data={emailMessages} />
                </>
              )}
              {activeTab === 'text' && (
                <>
                  <h3 className="text-lg font-medium">Text Message Communications</h3>
                  <TextTable data={textMessages} />
                </>
              )}
              {activeTab === 'messaging' && (
                <>
                  <h3 className="text-lg font-medium">Messaging App Communications</h3>
                  <MessagingTable data={appMessages} />
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
