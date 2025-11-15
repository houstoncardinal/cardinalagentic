import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react";

export const CostTracker = () => {
  const currentSpend = 2847;
  const budget = 5000;
  const percentUsed = (currentSpend / budget) * 100;
  const remainingDays = 12;
  const projectedSpend = 4250;

  const breakdown = [
    { category: "Compute", amount: 1247, percentage: 43.8 },
    { category: "API Calls", amount: 892, percentage: 31.3 },
    { category: "Storage", amount: 458, percentage: 16.1 },
    { category: "Integrations", amount: 250, percentage: 8.8 }
  ];

  return (
    <Card className="p-6 border-border bg-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Cost Overview</h3>
        <Badge variant="secondary">This Month</Badge>
      </div>

      {/* Current Spend */}
      <div className="mb-6">
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-3xl font-bold text-foreground">${currentSpend.toLocaleString()}</span>
          <span className="text-sm text-muted-foreground">/ ${budget.toLocaleString()}</span>
        </div>
        <Progress value={percentUsed} className="h-2 mb-2" />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{percentUsed.toFixed(1)}% of budget used</span>
          <span>{remainingDays} days remaining</span>
        </div>
      </div>

      {/* Projected Spend Alert */}
      {projectedSpend > budget && (
        <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/20 mb-6">
          <AlertCircle className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">Budget Alert</p>
            <p className="text-xs text-muted-foreground mt-1">
              Projected to exceed budget by ${(projectedSpend - budget).toLocaleString()}
            </p>
          </div>
        </div>
      )}

      {/* Cost Breakdown */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-foreground">Cost Breakdown</h4>
        {breakdown.map((item, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.category}</span>
              <div className="flex items-center gap-2">
                <span className="font-semibold text-foreground">${item.amount}</span>
                <span className="text-xs text-muted-foreground">{item.percentage}%</span>
              </div>
            </div>
            <Progress value={item.percentage} className="h-1" />
          </div>
        ))}
      </div>

      {/* Monthly Trend */}
      <div className="mt-6 pt-6 border-t border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">vs. Last Month</span>
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive">+18.3%</span>
          </div>
        </div>
      </div>
    </Card>
  );
};
