import { Card } from "../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { BookOpen, Mail, MessageSquare, Phone, PlayCircle, Search } from "lucide-react"

const faqs = [
  {
    question: "How do I reset my password?",
    answer: "To reset your password, click on the 'Forgot Password' link on the login page. Follow the instructions sent to your email to create a new password."
  },
  {
    question: "How can I update my security settings?",
    answer: "Navigate to Settings > Security to manage your security preferences, including two-factor authentication and login history."
  },
  {
    question: "What should I do if I detect a security incident?",
    answer: "Immediately report any security incidents through the Incidents tab. Provide as much detail as possible to help our team investigate."
  },
  {
    question: "How often should I review my vendor assessments?",
    answer: "We recommend reviewing vendor assessments quarterly, or whenever there are significant changes in vendor relationships or security requirements."
  }
]

export default function Support() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Support Center</h1>
        <p className="text-muted-foreground mt-2">Get help with your security and compliance needs</p>
      </div>

      <Tabs defaultValue="getting-started" className="space-y-4">
        <TabsList>
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="faqs">FAQs</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        {/* Getting Started Tab */}
        <TabsContent value="getting-started" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <PlayCircle className="h-8 w-8 text-primary mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Video Tutorials</h3>
                  <p className="text-muted-foreground">Learn the basics with our getting started videos</p>
                  <Button variant="outline">Watch Now</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <BookOpen className="h-8 w-8 text-primary mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Documentation</h3>
                  <p className="text-muted-foreground">Detailed guides and API documentation</p>
                  <Button variant="outline">Read Docs</Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* FAQs Tab */}
        <TabsContent value="faqs" className="space-y-4">
          <div className="flex items-center gap-2 max-w-md mb-6">
            <Search className="h-5 w-5 text-muted-foreground" />
            <Input placeholder="Search frequently asked questions..." />
          </div>

          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contact Support Tab */}
        <TabsContent value="contact" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <Card className="p-6">
              <div className="flex items-start gap-4">
                <MessageSquare className="h-8 w-8 text-primary mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Live Chat</h3>
                  <p className="text-muted-foreground">Chat with our support team</p>
                  <p className="text-sm text-muted-foreground">Average response time: 5 minutes</p>
                  <Button>Start Chat</Button>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-start gap-4">
                <Phone className="h-8 w-8 text-primary mt-1" />
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg">Phone Support</h3>
                  <p className="text-muted-foreground">Call us directly</p>
                  <p className="text-sm text-muted-foreground">Available 24/7</p>
                  <Button>Call Now</Button>
                </div>
              </div>
            </Card>
          </div>

          <Card className="p-6">
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-start gap-4 mb-4">
                <Mail className="h-8 w-8 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">Email Support</h3>
                  <p className="text-muted-foreground">Send us a message</p>
                </div>
              </div>

              <div className="space-y-4">
                <Input placeholder="Your email address" />
                <Input placeholder="Subject" />
                <Textarea placeholder="Describe your issue" className="min-h-[150px]" />
                <Button>Send Message</Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
