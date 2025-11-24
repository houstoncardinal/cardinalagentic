import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Search, Database, FileText, Play } from "lucide-react";
import { TaskExecutionDialog } from "./TaskExecutionDialog";
import { RecentTasks } from "./RecentTasks";
import { AgentAnalytics } from "./AgentAnalytics";

export const MarketResearchDashboard = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const taskTypes = [
    "Market Analysis",
    "Competitor Research",
    "Consumer Trends",
    "Industry Report",
    "Market Sizing",
    "SWOT Analysis"
  ];

  return (
    <div className="space-y-6">
      <AgentAnalytics agentNumber={1} />

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Execute Market Research Task
          </h3>
          <Button onClick={() => setDialogOpen(true)} className="gap-2">
            <Play className="h-4 w-4" />
            New Research Task
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Submit a research task to analyze market trends, competitors, consumer behavior, or generate comprehensive industry reports.
        </p>
        <div className="grid md:grid-cols-3 gap-2">
          {taskTypes.slice(0, 3).map((type) => (
            <Button
              key={type}
              variant="outline"
              size="sm"
              onClick={() => setDialogOpen(true)}
              className="justify-start"
            >
              <Search className="h-3 w-3 mr-2" />
              {type}
            </Button>
          ))}
        </div>
      </Card>

      <RecentTasks agentNumber={1} key={refreshKey} />

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Database className="h-4 w-4" />
            Available Capabilities
          </h4>
          <div className="space-y-2">
            {[
              "Market trend analysis",
              "Competitor intelligence",
              "Consumer behavior insights",
              "Industry benchmarking",
              "Market opportunity identification",
              "Data-driven recommendations"
            ].map((capability, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="text-sm">{capability}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h4 className="font-semibold mb-3">Research Task Types</h4>
          <div className="space-y-2">
            {taskTypes.map((type, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                onClick={() => setDialogOpen(true)}
                className="w-full justify-start"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                {type}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <TaskExecutionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        agentNumber={1}
        agentName="Market Research Agent"
        taskTypes={taskTypes}
        onTaskCreated={() => setRefreshKey(prev => prev + 1)}
      />
    </div>
  );
};
