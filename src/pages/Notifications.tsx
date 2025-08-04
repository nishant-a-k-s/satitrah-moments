import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  CreditCard, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Calendar,
  PiggyBank,
  AlertCircle,
  CheckCircle,
  Settings,
  Trash2
} from "lucide-react";

const Notifications = () => {
  const [settings, setSettings] = useState({
    payments: true,
    bills: true,
    squirrel: true,
    safebox: true,
    security: true,
    promotional: false
  });

  const notifications = [
    {
      id: 1,
      type: 'payment_received',
      title: 'Payment Received',
      message: 'You received ₹5,000 from Arjun via UPI',
      time: '2 hours ago',
      read: false,
      icon: ArrowDownLeft,
      color: 'text-green-500'
    },
    {
      id: 2,
      type: 'bill_reminder',
      title: 'Bill Reminder',
      message: 'Electricity bill of ₹2,450 is due on 25th Jan',
      time: '4 hours ago',
      read: false,
      icon: Calendar,
      color: 'text-orange-500'
    },
    {
      id: 3,
      type: 'squirrel_repayment',
      title: 'Squirrel Repayment Due',
      message: 'Repay ₹1,500 by tomorrow to avoid interest charges',
      time: '6 hours ago',
      read: false,
      icon: AlertCircle,
      color: 'text-red-500'
    },
    {
      id: 4,
      type: 'safebox_saving',
      title: 'Maternal safebox Goal Achieved',
      message: 'Congratulations! You\'ve reached 30% of your maternal safebox target',
      time: '1 day ago',
      read: true,
      icon: PiggyBank,
      color: 'text-purple-500'
    },
    {
      id: 5,
      type: 'payment_sent',
      title: 'Payment Sent',
      message: 'Successfully transferred ₹800 to Coffee Shop',
      time: '1 day ago',
      read: true,
      icon: ArrowUpRight,
      color: 'text-blue-500'
    },
    {
      id: 6,
      type: 'subscription_reminder',
      title: 'Subscription Renewal',
      message: 'Netflix subscription (₹799) will auto-renew on 15th Jan',
      time: '2 days ago',
      read: true,
      icon: CreditCard,
      color: 'text-indigo-500'
    },
    {
      id: 7,
      type: 'security_alert',
      title: 'Security Alert',
      message: 'New device login detected from Mumbai',
      time: '2 days ago',
      read: true,
      icon: AlertCircle,
      color: 'text-red-500'
    },
    {
      id: 8,
      type: 'squirrel_earned',
      title: 'Squirrels Earned',
      message: 'You earned 10 squirrels for spending ₹1,000 this week',
      time: '3 days ago',
      read: true,
      icon: CheckCircle,
      color: 'text-accent'
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllAsRead = () => {
    // Implementation for marking all as read
  };

  const deleteNotification = (id: number) => {
    // Implementation for deleting notification
  };

  const updateSetting = (key: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="relative">
              <div className="p-4 bg-primary/10 rounded-full">
                <Bell className="h-12 w-12 text-primary" />
              </div>
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                  {unreadCount}
                </Badge>
              )}
            </div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Notifications</h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Stay updated with your financial activities
          </p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all">
              All Notifications
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-foreground">Recent Notifications</h3>
              {unreadCount > 0 && (
                <Button size="sm" variant="outline" onClick={markAllAsRead}>
                  Mark all as read
                </Button>
              )}
            </div>

            <div className="space-y-3">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <Card key={notification.id} className={`p-4 ${!notification.read ? 'border-primary/50 bg-primary/5' : ''}`}>
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-muted ${notification.color}`}>
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0 flex-1">
                            <h4 className={`text-sm font-medium ${!notification.read ? 'text-foreground' : 'text-muted-foreground'}`}>
                              {notification.title}
                            </h4>
                            <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                            <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full" />
                            )}
                            <Button 
                              size="sm" 
                              variant="ghost" 
                              onClick={() => deleteNotification(notification.id)}
                              className="h-8 w-8 p-0"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="p-4 md:p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <Settings className="h-6 w-6 text-primary" />
                  <h3 className="text-lg font-semibold text-foreground">Notification Preferences</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">Payment Notifications</h4>
                      <p className="text-xs text-muted-foreground">Money sent, received, and failed transactions</p>
                    </div>
                    <Switch 
                      checked={settings.payments} 
                      onCheckedChange={(value) => updateSetting('payments', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">Bill Reminders</h4>
                      <p className="text-xs text-muted-foreground">Upcoming bills and subscription renewals</p>
                    </div>
                    <Switch 
                      checked={settings.bills} 
                      onCheckedChange={(value) => updateSetting('bills', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">Squirrel Lending</h4>
                      <p className="text-xs text-muted-foreground">Repayment reminders and interest alerts</p>
                    </div>
                    <Switch 
                      checked={settings.squirrel} 
                      onCheckedChange={(value) => updateSetting('squirrel', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">safebox Savings</h4>
                      <p className="text-xs text-muted-foreground">Goal achievements and saving milestones</p>
                    </div>
                    <Switch 
                      checked={settings.safebox} 
                      onCheckedChange={(value) => updateSetting('safebox', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">Security Alerts</h4>
                      <p className="text-xs text-muted-foreground">Login attempts and security updates</p>
                    </div>
                    <Switch 
                      checked={settings.security} 
                      onCheckedChange={(value) => updateSetting('security', value)}
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-sm">Promotional</h4>
                      <p className="text-xs text-muted-foreground">Offers, updates, and new features</p>
                    </div>
                    <Switch 
                      checked={settings.promotional} 
                      onCheckedChange={(value) => updateSetting('promotional', value)}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h4 className="font-semibold text-foreground">Delivery Preferences</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-3">
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">Push Notifications</h5>
                        <p className="text-xs text-muted-foreground">Instant alerts on your device</p>
                        <Switch defaultChecked />
                      </div>
                    </Card>
                    <Card className="p-3">
                      <div className="space-y-2">
                        <h5 className="font-medium text-sm">SMS Alerts</h5>
                        <p className="text-xs text-muted-foreground">Text messages for critical updates</p>
                        <Switch defaultChecked />
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Notifications;
