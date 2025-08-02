import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw, Quote } from "lucide-react";
import { useMotivationalQuotes } from "@/hooks/useMotivationalQuotes";

export const MotivationalQuote = () => {
  const { quote, isLoading, refreshQuote } = useMotivationalQuotes();

  if (isLoading) {
    return (
      <Card className="p-4 bg-gradient-indigo border-0 shadow-premium">
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-muted rounded w-1/2"></div>
        </div>
      </Card>
    );
  }

  if (!quote) return null;

  return (
    <Card className="p-4 bg-gradient-indigo border-0 shadow-premium">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-start gap-2">
            <Quote className="h-4 w-4 text-accent-foreground mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-accent-foreground font-medium italic leading-relaxed">
                "{quote.quote_text}"
              </p>
              {quote.author && (
                <p className="text-xs text-accent-foreground/80 mt-2">
                  — {quote.author}
                </p>
              )}
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={refreshQuote}
          className="ml-2 h-8 w-8 p-0 text-accent-foreground hover:bg-white/10"
        >
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};