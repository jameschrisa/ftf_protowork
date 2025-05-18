import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

// This page has been renamed to Financial Analytics
// This component now redirects to the new page
export default function HistoricalReportsPage() {
  const navigate = useNavigate()
  
  useEffect(() => {
    // Redirect to the new page
    navigate("/financial-analytics", { replace: true })
  }, [navigate])
  
  // Return null as this component will redirect immediately
  return null
}
