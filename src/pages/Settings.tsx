import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Bell,
  Shield,
  Smartphone,
  Globe,
  Moon,
  Sun,
  Lock,
  Eye,
  CreditCard,
  Users,
  HelpCircle,
  FileText,
  Trash2,
  Download,
  Upload,
  Settings as SettingsIcon
} from "lucide-react";
import { useTheme } from "next-themes";

export default function Settings() {
  const navigate = useNavigate();
  const { theme, setTheme } = useTheme();
  
  const [settings, setSettings] = useState({
    notifications: true,
    biometric: true,
    autoLock: true,
    showBalance: true,
    darkMode: theme === "dark",
    faceId: true,
    touchId: true,
    smsNotifications: true,
    emailNotifications: true,
    pushNotifications: true,
    locationServices: false,
    analytics: true,
    crashReports: true
  });

  const toggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    if (key === "darkMode") {
      setTheme(settings.darkMode ? "light" : "dark");
    }
  };

  const securitySettings = [
    { key: "biometric", icon: Smartphone, title: "Biometric Authentication", desc: "Use fingerprint or face ID to unlock" },
    { key: "autoLock", icon: Lock, title: "Auto Lock", desc: "Lock app after 5 minutes of inactivity" },
    { key: "faceId", icon: Eye, title: "Face ID", desc: "Use Face ID for quick access" },
    { key: "touchId", icon: Smartphone, title: "Touch ID", desc: "Use fingerprint for authentication" }
  ];

  const notificationSettings = [
    { key: "pushNotifications", icon: Bell, title: "Push Notifications", desc: "Get real-time app notifications" },
    { key: "smsNotifications", icon: Bell, title: "SMS Notifications", desc: "Receive SMS for transactions" },
    { key: "emailNotifications", icon: Bell, title: "Email Notifications", desc: "Get email updates for important events" }
  ];

  const privacySettings = [
    { key: "showBalance", icon: Eye, title: "Show Balance", desc: "Display balance on home screen" },
    { key: "locationServices", icon: Globe, title: "Location Services", desc: "Allow location access for nearby offers" },
    { key: "analytics", icon: FileText, title: "Analytics", desc: "Help improve app performance" },
    { key: "crashReports", icon: Upload, title: "Crash Reports", desc: "Automatically send crash reports" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        {/* Account Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <SettingsIcon className="h-5 w-5" />
            Account Settings
          </h3>
          <div className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <Users className="h-5 w-5 mr-3" />
              Manage Profile
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <CreditCard className="h-5 w-5 mr-3" />
              Linked Cards & Accounts
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Lock className="h-5 w-5 mr-3" />
              Change PIN
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Globe className="h-5 w-5 mr-3" />
              Language & Region
            </Button>
          </div>
        </Card>

        {/* Appearance */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Appearance</h3>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <div>
                <p className="font-medium">Dark Mode</p>
                <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
              </div>
            </div>
            <Switch 
              checked={settings.darkMode} 
              onCheckedChange={() => toggleSetting("darkMode")}
            />
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & Authentication
          </h3>
          <div className="space-y-4">
            {securitySettings.map((setting, index) => (
              <div key={setting.key}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <setting.icon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">{setting.title}</p>
                      <p className="text-sm text-muted-foreground">{setting.desc}</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings[setting.key]} 
                    onCheckedChange={() => toggleSetting(setting.key)}
                  />
                </div>
                {index < securitySettings.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Notification Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notifications
          </h3>
          <div className="space-y-4">
            {notificationSettings.map((setting, index) => (
              <div key={setting.key}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <setting.icon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">{setting.title}</p>
                      <p className="text-sm text-muted-foreground">{setting.desc}</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings[setting.key]} 
                    onCheckedChange={() => toggleSetting(setting.key)}
                  />
                </div>
                {index < notificationSettings.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Privacy Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Privacy & Data
          </h3>
          <div className="space-y-4">
            {privacySettings.map((setting, index) => (
              <div key={setting.key}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <setting.icon className="h-5 w-5" />
                    <div>
                      <p className="font-medium">{setting.title}</p>
                      <p className="text-sm text-muted-foreground">{setting.desc}</p>
                    </div>
                  </div>
                  <Switch 
                    checked={settings[setting.key]} 
                    onCheckedChange={() => toggleSetting(setting.key)}
                  />
                </div>
                {index < privacySettings.length - 1 && <Separator className="mt-4" />}
              </div>
            ))}
          </div>
        </Card>

        {/* Data Management */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Data Management</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Download className="h-5 w-5 mr-3" />
              Export Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Upload className="h-5 w-5 mr-3" />
              Import Data
            </Button>
            <Button variant="outline" className="w-full justify-start text-destructive">
              <Trash2 className="h-5 w-5 mr-3" />
              Clear Cache
            </Button>
          </div>
        </Card>

        {/* Support */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Support & Legal</h3>
          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <HelpCircle className="h-5 w-5 mr-3" />
              Help Center
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-5 w-5 mr-3" />
              Terms of Service
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Shield className="h-5 w-5 mr-3" />
              Privacy Policy
            </Button>
          </div>
        </Card>

        {/* App Info */}
        <Card className="p-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">Ivysta App</p>
            <p className="text-sm text-muted-foreground">Version 1.0.0</p>
            <p className="text-xs text-muted-foreground">© 2024 Ivysta Technologies</p>
          </div>
        </Card>
      </div>
    </div>
  );
}
