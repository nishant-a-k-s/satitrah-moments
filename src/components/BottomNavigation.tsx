import { NavLink, useLocation } from "react-router-dom";
import { Home, CreditCard, ArrowRightLeft, Shield, User } from "lucide-react";

const bottomNavItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Safebox", url: "/Safebox", icon: CreditCard },
  { title: "S2S", url: "/spends-to-stocks", icon: TrendingUp },
  { title: "Transfer", url: "/transfers", icon: ArrowRightLeft },
  { title: "SOS", url: "/sos", icon: Shield },
  { title: "Profile", url: "/profile", icon: User },
];

export const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="grid grid-cols-5 h-16">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={`flex flex-col items-center justify-center gap-1 transition-colors ${
              isActive(item.url)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon 
              size={20} 
              className={item.url === "/sos" ? "text-destructive" : ""} 
            />
            <span className="text-xs font-medium">{item.title}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
