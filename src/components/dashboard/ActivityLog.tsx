import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, AlertCircle, Info, Clock, Search } from "lucide-react";
import { useState } from "react";

interface Activity {
  time: string;
  action: string;
  status: "success" | "error" | "info" | "warning";
  details?: string;
}

interface ActivityLogProps {
  activities: Activity[];
}

export const ActivityLog = ({ activities }: ActivityLogProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("all");

  const statusConfig = {
    success: { icon: CheckCircle2, color: "text-success", bg: "bg-success/10" },
    error: { icon: AlertCircle, color: "text-destructive", bg: "bg-destructive/10" },
    warning: { icon: AlertCircle, color: "text-warning", bg: "bg-warning/10" },
    info: { icon: Info, color: "text-accent", bg: "bg-accent/10" }
  };

  const filteredActivities = activities.filter(activity => {
    const matchesSearch = activity.action.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === "all" || activity.status === filter;
    return matchesSearch && matchesFilter;
  });

  return (
    <Card className="p-6 border-border bg-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Activity Log</h3>
        <Button variant="outline" size="sm">Export</Button>
      </div>

      <div className="flex gap-2 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-1">
          {["all", "success", "error", "warning", "info"].map((status) => (
            <Button
              key={status}
              variant={filter === status ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(status)}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Button>
          ))}
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredActivities.map((activity, idx) => {
          const config = statusConfig[activity.status];
          const Icon = config.icon;
          
          return (
            <div key={idx} className="flex items-start gap-3 p-3 rounded-lg border border-border hover:border-accent/50 transition-colors">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${config.bg} ${config.color} flex-shrink-0`}>
                <Icon className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">{activity.action}</p>
                {activity.details && (
                  <p className="text-xs text-muted-foreground mt-1">{activity.details}</p>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground flex-shrink-0">
                <Clock className="h-3 w-3" />
                {activity.time}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
