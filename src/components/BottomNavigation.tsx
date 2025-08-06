import { NavLink, useLocation } from "react-router-dom";
import { TrendingUp } from "lucide-react";
import { Home, CreditCard, ArrowRightLeft, Shield, User } from "lucide-react";

const bottomNavItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Safebox", url: "/Safebox", icon: CreditCard },
  { title: "S2S", url: "/spends-to-stocks", icon: TrendingUp },
  { title: "Transfer", url: "/transfers", icon: ArrowRightLeft },
  { title: "SOS", url: "/sos", icon: Shield },
];

export const BottomNavigation = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border z-50 shadow-lg">
      <div className="grid grid-cols-5 h-14 max-w-md mx-auto">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.title}
            to={item.url}
            className={`flex flex-col items-center justify-center gap-0.5 transition-all duration-200 ${
              isActive(item.url)
                ? "text-primary scale-105"
                : "text-muted-foreground hover:text-foreground hover:scale-102"
            }`}
          >
            <item.icon 
              size={18} 
              className={`${item.url === "/sos" ? "text-destructive" : ""} ${
                isActive(item.url) ? "drop-shadow-sm" : ""
              }`} 
            />
            <span className={`text-[10px] font-medium leading-tight ${
              isActive(item.url) ? "font-semibold" : ""
            }`}>
              {item.title}
            </span>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
