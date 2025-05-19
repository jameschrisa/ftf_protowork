import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { useLocalStorage } from "../../hooks/use-local-storage"
import { NavigationItem } from "../../config/navigation"

export interface NavigationSettingsProps {
  navigation: NavigationItem[]
  footerNavigation: NavigationItem[]
  onChange?: () => void
}

type NavSettings = Record<string, boolean>

export function NavigationSettings({ navigation, footerNavigation, onChange }: NavigationSettingsProps) {
  const initialSettings = [...navigation, ...footerNavigation].reduce(
    (acc, nav) => ({ ...acc, [nav.id]: true }), 
    {} as NavSettings
  )

  const [settings, setSettings] = useLocalStorage<NavSettings>(
    "dashboard-nav-settings",
    initialSettings
  )

  const handleToggle = (id: string) => {
    const newSettings = {
      ...settings,
      [id]: !settings[id]
    }
    setSettings(newSettings)
    if (onChange) onChange()
  }

  return (
    <div className="space-y-4">
      <div className="space-y-4">
        <div className="font-medium">Main Navigation</div>
        {navigation.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <Label htmlFor={item.id} className="flex items-center gap-2">
              <item.icon className="h-4 w-4" />
              {item.name}
            </Label>
            <Switch
              id={item.id}
              checked={settings[item.id]}
              onCheckedChange={() => handleToggle(item.id)}
            />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="font-medium">Footer Navigation</div>
        {footerNavigation.map((item) => (
          <div key={item.id} className="flex items-center justify-between">
            <Label htmlFor={item.id} className="flex items-center gap-2">
              <item.icon className="h-4 w-4" />
              {item.name}
            </Label>
            <Switch
              id={item.id}
              checked={settings[item.id]}
              onCheckedChange={() => handleToggle(item.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
