import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertTriangle,
  Activity
} from "lucide-react";

export const WorkflowAnalytics = () => {
  const analytics = {
    executions: {
      total: 45234,
      successful: 44891,
      failed: 343,
      avgDuration: "2.4s"
    },
    performance: [
      { node: "Email Trigger", executions: 45234, avgTime: "0.1s", successRate: 99.9 },
      { node: "Content Analysis", executions: 45234, avgTime: "1.8s", successRate: 99.2 },
      { node: "Priority Check", executions: 45234, avgTime: "0.2s", successRate: 100 },
      { node: "Data Enrichment", executions: 32156, avgTime: "1.2s", successRate: 98.8 },
      { node: "CRM Update", executions: 45234, avgTime: "0.5s", successRate: 99.5 }
    ],
    trends: {
      dailyExecutions: [
        { day: "Mon", count: 6234 },
        { day: "Tue", count: 7123 },
        { day: "Wed", count: 6890 },
        { day: "Thu", count: 7456 },
        { day: "Fri", count: 7234 },
        { day: "Sat", count: 5123 },
        { day: "Sun", count: 5174 }
      ]
    }
  };

  const successRate = ((analytics.executions.successful / analytics.executions.total) * 100).toFixed(2);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <BarChart3 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-lg">Workflow Analytics</h3>
          <p className="text-sm text-muted-foreground">Performance metrics and insights</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{analytics.executions.total.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">Total Executions</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-success/10">
              <CheckCircle2 className="h-4 w-4 text-success" />
            </div>
            <div>
              <p className="text-2xl font-bold">{successRate}%</p>
              <p className="text-xs text-muted-foreground">Success Rate</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-warning/10">
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
            <div>
              <p className="text-2xl font-bold">{analytics.executions.failed}</p>
              <p className="text-xs text-muted-foreground">Failed Runs</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-info/10">
              <Clock className="h-4 w-4 text-info" />
            </div>
            <div>
              <p className="text-2xl font-bold">{analytics.executions.avgDuration}</p>
              <p className="text-xs text-muted-foreground">Avg Duration</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Node Performance */}
      <Card className="p-5">
        <h4 className="font-semibold mb-4 flex items-center gap-2">
          <TrendingUp className="h-4 w-4" />
          Node Performance
        </h4>
        <div className="space-y-3">
          {analytics.performance.map((node, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium">{node.node}</span>
                <div className="flex items-center gap-3">
                  <span className="text-muted-foreground">{node.avgTime}</span>
                  <Badge 
                    variant="outline" 
                    className={node.successRate >= 99 ? "bg-success/10 text-success" : "bg-warning/10 text-warning"}
                  >
                    {node.successRate}%
                  </Badge>
                </div>
              </div>
              <div className="relative h-2 bg-muted rounded-full overflow-hidden">
                <div 
                  className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/60 rounded-full"
                  style={{ width: `${node.successRate}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{node.executions.toLocaleString()} executions</span>
                <span>{((node.executions / analytics.executions.total) * 100).toFixed(1)}% of total</span>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Daily Trend */}
      <Card className="p-5">
        <h4 className="font-semibold mb-4">Execution Trend (Last 7 Days)</h4>
        <div className="flex items-end justify-between gap-2 h-32">
          {analytics.trends.dailyExecutions.map((day, idx) => {
            const maxCount = Math.max(...analytics.trends.dailyExecutions.map(d => d.count));
            const height = (day.count / maxCount) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="relative w-full flex items-end justify-center" style={{ height: '100%' }}>
                  <div 
                    className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-lg transition-all hover:opacity-80 cursor-pointer"
                    style={{ height: `${height}%` }}
                    title={`${day.count} executions`}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{day.day}</span>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
