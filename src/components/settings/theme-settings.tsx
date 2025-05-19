import { useTheme } from "../../components/theme-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select"
import { Label } from "../ui/label"

type Theme = "light" | "dark" | "system"

interface ThemeSettingsProps {
  onChange?: () => void
}

export function ThemeSettings({ onChange }: ThemeSettingsProps) {
  const { theme, setTheme } = useTheme()

  const handleThemeChange = (value: Theme) => {
    setTheme(value)
    if (onChange) onChange()
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Preferences</CardTitle>
        <CardDescription>
          Customize the appearance of your dashboard
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="theme">Theme</Label>
          <Select
            value={theme}
            onValueChange={handleThemeChange}
          >
            <SelectTrigger id="theme" className="w-[180px]">
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
