import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom"
import { Bot } from "lucide-react"

export default function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="rounded-full bg-primary/10 p-4">
          <Bot className="h-12 w-12 text-primary" />
        </div>
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="text-xl text-muted-foreground">
          Oops! The page you're looking for doesn't exist.
        </p>
        <div className="flex gap-4">
          <Button onClick={() => navigate(-1)}>
            Go Back
          </Button>
          <Button variant="outline" onClick={() => navigate("/")}>
            Go to Dashboard
          </Button>
        </div>
        <div className="mt-8 max-w-md text-center text-sm text-muted-foreground">
          <p>Common reasons for this error:</p>
          <ul className="mt-2 list-disc text-left pl-4">
            <li>The page may have been moved or deleted</li>
            <li>You might have typed the address incorrectly</li>
            <li>The link you followed may be outdated</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
