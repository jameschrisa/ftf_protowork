import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Settings as SettingsIcon } from "lucide-react"
import { navigation, footerNavigation } from "../config/navigation"
import { NavigationSettings } from "../components/settings/navigation-settings"
import { ThemeSettings } from "../components/settings/theme-settings"
import { LogSettings } from "../components/settings/log-settings"
import { Terminal } from "../components/settings/terminal"

export default function Settings() {
  return (
    <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center gap-2">
          <SettingsIcon className="h-8 w-8" />
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Navigation Settings */}
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Navigation</CardTitle>
          </CardHeader>
          <CardContent>
            <NavigationSettings
              navigation={navigation}
              footerNavigation={footerNavigation}
            />
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Theme</CardTitle>
          </CardHeader>
          <CardContent>
            <ThemeSettings />
          </CardContent>
        </Card>

        {/* Log Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Logging</CardTitle>
          </CardHeader>
          <CardContent>
            <LogSettings />
          </CardContent>
        </Card>

        {/* Terminal */}
        <Card className="col-span-full">
          <CardHeader>
            <CardTitle>Terminal</CardTitle>
          </CardHeader>
          <CardContent>
            <Terminal />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
