import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Shield, Coins, Heart, Zap } from "lucide-react";
import squirrelMascot from "@/assets/squirrel-mascot.png";

export const GetStartedScreen = ({ onGetStarted }: { onGetStarted: () => void }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: Shield,
      title: "Safe & Secure",
      subtitle: "Your money is protected with bank-grade security",
      color: "text-emerald-600",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20"
    },
    {
      icon: Coins,
      title: "Smart Savings",
      subtitle: "Round-off savings and lending with friends",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      icon: Heart,
      title: "Maternity Support",
      subtitle: "Special wallet for expecting mothers",
      color: "text-secondary",
      bgColor: "bg-secondary/10"
    },
    {
      icon: Zap,
      title: "Quick Payments",
      subtitle: "Pay bills, recharge, and transfer money instantly",
      color: "text-primary",
      bgColor: "bg-primary/10"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        {/* Logo */}
        <div className="flex justify-center animate-fade-in">
          <img 
            src={squirrelMascot} 
            alt="Satitrah" 
            className="w-24 h-24 rounded-3xl shadow-premium animate-bounce-in"
          />
        </div>

        {/* App Name */}
        <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <h1 className="text-4xl font-bold text-foreground">Satitrah</h1>
          <p className="text-muted-foreground text-lg">Built for Her. Backed by All.</p>
        </div>

        {/* Feature Slides */}
        <Card className={`p-8 transition-all duration-500 ${slides[currentSlide].bgColor} border-0 shadow-card animate-scale-in`}>
          <div className="space-y-4">
            {React.createElement(slides[currentSlide].icon, { 
              size: 48, 
              className: `mx-auto ${slides[currentSlide].color}` 
            })}
            <h3 className="text-xl font-semibold text-foreground">
              {slides[currentSlide].title}
            </h3>
            <p className="text-muted-foreground">
              {slides[currentSlide].subtitle}
            </p>
          </div>
        </Card>

        {/* Dots Indicator */}
        <div className="flex justify-center space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? "bg-primary w-6" : "bg-muted"
              }`}
            />
          ))}
        </div>

        {/* Tap Button to Get Started */}
        <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <Button 
            onClick={onGetStarted} 
            className="w-full h-14 rounded-2xl text-base flex items-center justify-center gap-2"
          >
            Get Started <ArrowRight className="h-5 w-5" />
          </Button>

          <p className="text-xs text-muted-foreground">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};
