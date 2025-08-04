import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  CreditCard, 
  HelpCircle, 
  Phone, 
  Mail, 
  MapPin,
  Edit,
  LogOut,
  Moon,
  Sun,
  Globe,
  Lock,
  Smartphone,
  Eye,
  EyeOff
} from "lucide-react";
import { useTheme } from "next-themes";
import squirrelMascot from "@/assets/squirrel-mascot.png";

const Profile = () => {
  const { theme, setTheme } = useTheme();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [biometricEnabled, setBiometricEnabled] = useState(true);
  const [sosEnabled, setSosEnabled] = useState(true);
  const [showBalance, setShowBalance] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const userProfile = {
    name: "@username",
    email: "sati@example.com",
    phone: "+91 98765 43210",
    gender: "female",
    address: "Mumbai, Maharashtra",
    kycStatus: "Verified",
    safeboxBalance: "₹2,45,267",
    squirrelBalance: "145 🐿️"
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Profile Header */}
        <Card className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="relative">
              <img 
                src={squirrelMascot} 
                alt="Profile" 
                className="w-20 h-20 rounded-full border-4 border-primary/20"
              />
              <Button 
                size="sm" 
                variant="outline" 
                className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
              >
                <Edit className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-foreground">{userProfile.name}</h2>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                  {userProfile.kycStatus}
                </Badge>
              </div>
              <p className="text-muted-foreground flex items-center gap-2">
                <Mail className="h-4 w-4" />
                {userProfile.email}
              </p>
              <p className="text-muted-foreground flex items-center gap-2">
                <Phone className="h-4 w-4" />
                {userProfile.phone}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-primary/5 rounded-lg text-center">
              <p className="text-2xl font-bold text-primary">{userProfile.safeboxBalance}</p>
              <p className="text-sm text-muted-foreground">safebox Balance</p>
            </div>
            <div className="p-4 bg-accent/5 rounded-lg text-center">
              <p className="text-2xl font-bold text-accent">{userProfile.squirrelBalance}</p>
              <p className="text-sm text-muted-foreground">Squirrel Balance</p>
            </div>
            <div className="p-4 bg-secondary/5 rounded-lg text-center">
              <p className="text-2xl font-bold text-secondary">Gold</p>
              <p className="text-sm text-muted-foreground">Member Status</p>
            </div>
          </div>
        </Card>

        {/* Personal Information */}
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Personal Information</h3>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit className="h-4 w-4 mr-2" />
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">Full Name</label>
              <Input 
                value={userProfile.name} 
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <Input 
                value={userProfile.email} 
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <Input 
                value={userProfile.phone} 
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Address</label>
              <Input 
                value={userProfile.address} 
                disabled={!isEditing}
                className="mt-1"
              />
            </div>
          </div>
        </Card>

        {/* App Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">App Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {theme === "dark" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                <div>
                  <p className="font-medium">Dark Mode</p>
                  <p className="text-sm text-muted-foreground">Switch between light and dark theme</p>
                </div>
              </div>
              <Switch 
                checked={theme === "dark"} 
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Bell className="h-5 w-5" />
                <div>
                  <p className="font-medium">Push Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive app notifications</p>
                </div>
              </div>
              <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Eye className="h-5 w-5" />
                <div>
                  <p className="font-medium">Show Balance</p>
                  <p className="text-sm text-muted-foreground">Display safebox balance on home screen</p>
                </div>
              </div>
              <Switch checked={showBalance} onCheckedChange={setShowBalance} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-5 w-5" />
                <div>
                  <p className="font-medium">Language</p>
                  <p className="text-sm text-muted-foreground">English (US)</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </div>
        </Card>

        {/* Security Settings */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Security Settings</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Smartphone className="h-5 w-5" />
                <div>
                  <p className="font-medium">Biometric Authentication</p>
                  <p className="text-sm text-muted-foreground">Use fingerprint or face ID</p>
                </div>
              </div>
              <Switch checked={biometricEnabled} onCheckedChange={setBiometricEnabled} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5" />
                <div>
                  <p className="font-medium">SOS Emergency</p>
                  <p className="text-sm text-muted-foreground">Enable emergency features</p>
                </div>
              </div>
              <Switch checked={sosEnabled} onCheckedChange={setSosEnabled} />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Lock className="h-5 w-5" />
                <div>
                  <p className="font-medium">Change PIN</p>
                  <p className="text-sm text-muted-foreground">Update your transaction PIN</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Change</Button>
            </div>
          </div>
        </Card>

        {/* Support & Help */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Support & Help</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" className="justify-start">
              <HelpCircle className="h-5 w-5 mr-3" />
              Help Center
            </Button>
            <Button variant="outline" className="justify-start">
              <Phone className="h-5 w-5 mr-3" />
              Contact Support
            </Button>
            <Button variant="outline" className="justify-start">
              <CreditCard className="h-5 w-5 mr-3" />
              Manage Cards
            </Button>
            <Button variant="outline" className="justify-start">
              <Settings className="h-5 w-5 mr-3" />
              Advanced Settings
            </Button>
          </div>
        </Card>

        {/* Emergency Contacts */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-foreground mb-4">Emergency Contacts</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div>
                <p className="font-medium">Rajesh Kumar (Husband)</p>
                <p className="text-sm text-muted-foreground">+91 98765 43211</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-card rounded-lg border">
              <div>
                <p className="font-medium">Meera Devi (Mother)</p>
                <p className="text-sm text-muted-foreground">+91 98765 43212</p>
              </div>
              <Button variant="outline" size="sm">Edit</Button>
            </div>
            <Button variant="outline" className="w-full">
              Add Emergency Contact
            </Button>
          </div>
        </Card>

        {/* Logout */}
        <Card className="p-6">
          <Button variant="destructive" className="w-full">
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
