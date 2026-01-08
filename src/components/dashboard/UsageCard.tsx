import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useSubscription } from "@/hooks/useSubscription";
import { Zap, AlertTriangle, Crown, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";

export const UsageCard = () => {
  const { subscription, loading, usagePercentage, isNearLimit, isAtLimit } = useSubscription();

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  if (!subscription) {
    return (
      <Card className="p-6">
        <div className="text-center">
          <p className="text-muted-foreground">No subscription found</p>
        </div>
      </Card>
    );
  }

  const tierColors = {
    free: "bg-gray-500/10 text-gray-500 border-gray-500/20",
    starter: "bg-blue-500/10 text-blue-500 border-blue-500/20",
    professional: "bg-purple-500/10 text-purple-500 border-purple-500/20",
    enterprise: "bg-amber-500/10 text-amber-500 border-amber-500/20"
  };

  const tierIcons = {
    free: Zap,
    starter: Zap,
    professional: Crown,
    enterprise: Crown
  };

  const TierIcon = tierIcons[subscription.tier];

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-lg">Usage</h3>
          <Badge className={tierColors[subscription.tier]}>
            <TierIcon className="h-3 w-3 mr-1" />
            {subscription.tier.charAt(0).toUpperCase() + subscription.tier.slice(1)}
          </Badge>
        </div>
        {subscription.tier !== "enterprise" && (
          <Link to="/pricing">
            <Button variant="outline" size="sm">
              Upgrade
            </Button>
          </Link>
        )}
      </div>

      <div className="space-y-4">
        {/* Tasks Usage */}
        <div>
          <div className="flex items-center justify-between text-sm mb-2">
            <span className="text-muted-foreground">AI Tasks</span>
            <span className={isAtLimit ? "text-destructive font-medium" : "text-foreground"}>
              {subscription.tasks_used} / {subscription.tasks_limit}
            </span>
          </div>
          <Progress 
            value={usagePercentage} 
            className={`h-2 ${isAtLimit ? "[&>div]:bg-destructive" : isNearLimit ? "[&>div]:bg-yellow-500" : ""}`}
          />
          {isNearLimit && !isAtLimit && (
            <div className="flex items-center gap-1 mt-2 text-yellow-600 text-xs">
              <AlertTriangle className="h-3 w-3" />
              Approaching task limit
            </div>
          )}
          {isAtLimit && (
            <div className="flex items-center gap-1 mt-2 text-destructive text-xs">
              <AlertTriangle className="h-3 w-3" />
              Task limit reached - upgrade to continue
            </div>
          )}
        </div>

        {/* Workflows */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Saved Workflows</span>
          <span className="text-foreground">
            — / {subscription.workflows_limit}
          </span>
        </div>

        {/* Agents */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Available Agents</span>
          <span className="text-foreground">
            {subscription.agents_limit} agents
          </span>
        </div>

        {/* Period */}
        <div className="pt-2 border-t border-border">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Billing Period</span>
            <span>
              Resets {new Date(subscription.period_end).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
};
