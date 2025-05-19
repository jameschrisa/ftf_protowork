import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Settings as SettingsIcon, Save } from "lucide-react"
import { navigation, footerNavigation } from "../config/navigation"
import { NavigationSettings } from "../components/settings/navigation-settings"
import { ThemeSettings } from "../components/settings/theme-settings"
import { LogSettings } from "../components/settings/log-settings"
import { Button } from "../components/ui/button"
import { toast } from "sonner"

export default function Settings() {
  const [hasChanges, setHasChanges] = useState(false)
  
  const handleSaveSettings = () => {
    // Save settings
    toast.success("Settings saved successfully")
    setHasChanges(false)
  }

  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-8 w-8" />
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </div>
      </div>

      <div className="space-y-6">
        {/* Navigation Settings - Full Width */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <NavigationSettings
              navigation={navigation}
              footerNavigation={footerNavigation}
              onChange={() => setHasChanges(true)}
            />
          </CardContent>
        </Card>

        {/* Theme and Log Settings - Side by Side */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Theme Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <ThemeSettings onChange={() => setHasChanges(true)} />
            </CardContent>
          </Card>

          {/* Log Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Logging</CardTitle>
            </CardHeader>
            <CardContent>
              <LogSettings onChange={() => setHasChanges(true)} />
            </CardContent>
          </Card>
        </div>
        
        {/* Save Button */}
        <div className="flex justify-end">
          <Button 
            onClick={handleSaveSettings}
            disabled={!hasChanges}
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
