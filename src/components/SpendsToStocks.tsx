import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SpendLog {
  merchant: string;
  amount: number;
  stockSymbol: string;
  stockPrice: number;
}

const SpendsToStocks = () => {
  const [spendLogs, setSpendLogs] = useState<SpendLog[]>([]);

  useEffect(() => {
    const fetchSpendLogs = async () => {
      try {
        const response = await fetch("/api/spend-logs");
        const data = await response.json();
        setSpendLogs(data || []);
      } catch (error) {
        console.error("Error fetching spend logs:", error);
        setSpendLogs([]);
      }
    };

    fetchSpendLogs();
  }, []);

  const spendingByStock = spendLogs.reduce((acc: Record<string, number>, curr) => {
    const { stockSymbol, amount } = curr;
    acc[stockSymbol] = (acc[stockSymbol] || 0) + amount;
    return acc;
  }, {});

  return (
    <div className="p-4 space-y-4">
      {spendLogs.length === 0 ? (
        <p className="text-center text-gray-500">No spend data available.</p>
      ) : (
        Object.entries(spendingByStock).map(([symbol, total]) => {
          const stock = spendLogs.find((log) => log.stockSymbol === symbol);
          return (
            <Card key={symbol}>
              <CardContent className="flex items-center justify-between p-4">
                <div>
                  <h4 className="text-lg font-semibold">{symbol}</h4>
                  <p className="text-sm text-muted-foreground">
                    Total Spent: ₹{total.toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <Badge variant="outline">₹{stock?.stockPrice ?? "--"}</Badge>
                </div>
              </CardContent>
            </Card>
          );
        })
      )}
    </div>
  );
};

export default SpendsToStocks;
