import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Home,
  CreditCard,
  Baby,
  Shield,
  Coins,
  TrendingUp,
  Settings,
  HelpCircle,
  User,
  Bell,
  ArrowRightLeft,
  Smartphone,
  FileText
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import squirrelMascot from "@/assets/squirrel-mascot.png";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Safebox", url: "/Safebox", icon: CreditCard },
  { title: "Spends to Stocks", url: "/spends-to-stocks", icon: TrendingUp },
  { title: "Transfers", url: "/transfers", icon: ArrowRightLeft },
  { title: "Pay Bills", url: "/bills", icon: Smartphone },
  { title: "Statements", url: "/statements", icon: FileText },
];

const specialItems = [
  { title: "SOS Emergency", url: "/sos", icon: Shield, urgent: true },
  { title: "Ivy", url: "/Ivy", icon: Shield },
  { title: "Maternity Safebox", url: "/maternity", icon: Baby, femaleOnly: true },
  { title: "Squirrel Lending", url: "/lending", icon: Coins },
  { title: "Investments", url: "/investments", icon: TrendingUp },
];

const bottomItems = [
  { title: "Profile", url: "/profile", icon: User },
  { title: "Notifications", url: "/notifications", icon: Bell },
  { title: "Settings", url: "/settings", icon: Settings },
  { title: "Help & Support", url: "/help", icon: HelpCircle },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Mock user data - in real app this would come from auth context
  const userGender = "female"; // This would be set based on user profile

  const isActive = (path: string) => currentPath === path;
  const getNavClass = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary border-r-2 border-primary font-medium" 
      : "hover:bg-muted/50 text-muted-foreground hover:text-foreground";

  // Filter special items based on user gender
  const filteredSpecialItems = specialItems.filter(item => 
    !item.femaleOnly || userGender === "female"
  );

  return (
    <Sidebar className={`${collapsed ? "w-16" : "w-64"} border-r border-border bg-card/95 backdrop-blur-md`}>
      <SidebarContent className="p-0 relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 right-5 w-20 h-20 bg-gradient-to-r from-primary to-secondary rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-20 left-5 w-16 h-16 bg-gradient-to-r from-accent to-primary rounded-full blur-lg animate-bounce"></div>
        </div>
        {/* Header */}
        <div className={`p-4 border-b border-border relative z-10 ${collapsed ? "px-2" : ""}`}>
          <div className="flex items-center gap-3">
            <img 
              src={squirrelMascot} 
              alt="Lifelin3" 
              className="w-8 h-8 rounded-lg"
            />
            {!collapsed && (
              <div>
                <h1 className="text-lg font-bold text-foreground">Lifelin3</h1>
                <p className="text-xs text-muted-foreground">Leaves that carry your journey 🍁</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation */}
        <SidebarGroup className="relative z-10">
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Main
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end 
                      className={getNavClass}
                    >
                      <item.icon className="h-5 w-5" />
                      {!collapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Special Features */}
        <SidebarGroup className="relative z-10">
          <SidebarGroupLabel className={collapsed ? "sr-only" : ""}>
            Features
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredSpecialItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      className={`${getNavClass} ${item.urgent ? 'text-destructive hover:text-destructive' : ''}`}
                    >
                      <item.icon className={`h-5 w-5 ${item.urgent ? 'text-destructive' : ''}`} />
                      {!collapsed && (
                        <span className={`font-medium ${item.urgent ? 'text-destructive' : ''}`}>
                          {item.title}
                        </span>
                      )}
                      {item.urgent && !collapsed && (
                        <div className="ml-auto w-2 h-2 bg-destructive rounded-full animate-pulse" />
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Bottom Navigation */}
        <div className="mt-auto">
          <SidebarGroup className="relative z-10">
            <SidebarGroupContent>
              <SidebarMenu>
                {bottomItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink 
                        to={item.url} 
                        className={getNavClass}
                      >
                        <item.icon className="h-5 w-5" />
                        {!collapsed && <span className="font-medium">{item.title}</span>}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
