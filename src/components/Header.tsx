import { Button } from "@/components/ui/button";
import { Bell, Menu, User, Wifi, Signal, Battery } from "lucide-react";
import squirrelMascot from "@/assets/squirrel-mascot.png";

export const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-background">
      {/* Status Bar Simulation */}
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <span>9:41</span>
        <div className="ml-auto flex items-center gap-1">
          <Signal size={12} />
          <Wifi size={12} />
          <Battery size={12} />
        </div>
      </div>
      
      {/* Main Header */}
      <div className="flex items-center justify-between w-full mt-2">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">
            <Menu size={20} />
          </Button>
          <div className="flex items-center gap-2">
            <img 
              src={squirrelMascot} 
              alt="Satitrah Squirrel" 
              className="w-8 h-8 rounded-full"
            />
            <div>
              <h1 className="text-lg font-bold text-foreground">Satitrah</h1>
              <p className="text-xs text-muted-foreground">Good morning, Priya!</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="relative">
            <Bell size={20} />
            <div className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
          <Button variant="ghost" size="sm">
            <User size={20} />
          </Button>
        </div>
      </div>
    </div>
  );
};