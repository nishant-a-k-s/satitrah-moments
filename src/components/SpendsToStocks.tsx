import { Card } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { useSafeboxData } from "@/hooks/useSafeboxData";
import { Badge } from "@/components/ui/badge";

type CompanySpending = {
  [company: string]: {
    amount: number;
    symbol: string;
    price: number;
  };
};

export default function SpendsToStocks() {
  const { spendLogs } = useSafeboxData();
  const [spendingByStock, setSpendingByStock] = useState<CompanySpending>({});

  useEffect(() => {
    if (!spendLogs || !Array.isArray(spendLogs)) return;

    const byStock: CompanySpending = {};

    spendLogs.forEach((log: any) => {
      const { company, amount, stockSymbol, currentPrice } = log;

      if (!company || !amount || !stockSymbol || !currentPrice) return;

      if (!byStock[company]) {
        byStock[company] = {
          amount: 0,
          symbol: stockSymbol,
          price: currentPrice,
        };
      }

      byStock[company].amount += amount;
    });

    setSpendingByStock(byStock);
  }, [spendLogs]);

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-lg font-bold">Your Spending Insights</h2>

      {Object.entries(spendingByStock).length === 0 ? (
        <p>No spending data found.</p>
      ) : (
        Object.entries(spendingByStock).map(([company, data]) => (
          <Card
            key={company}
            className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
          >
            <div>
              <h3 className="text-md font-semibold">{company}</h3>
              <p className="text-sm text-muted-foreground">
                You've spent ₹{data.amount.toFixed(2)} here.
              </p>
            </div>
            <div className="text-right mt-2 sm:mt-0">
              <p className="text-sm">Stock: {data.symbol}</p>
              <Badge className="text-xs mt-1">
                Current Price: ₹{data.price.toFixed(2)}
              </Badge>
            </div>
          </Card>
        ))
      )}
    </div>
  );
}
