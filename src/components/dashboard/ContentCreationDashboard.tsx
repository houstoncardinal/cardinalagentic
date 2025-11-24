import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Sparkles, Play } from "lucide-react";
import { TaskExecutionDialog } from "./TaskExecutionDialog";
import { RecentTasks } from "./RecentTasks";
import { AgentAnalytics } from "./AgentAnalytics";

export const ContentCreationDashboard = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const taskTypes = [
    "Blog Post",
    "Social Media Copy",
    "Email Campaign",
    "Product Description",
    "Landing Page Copy",
    "Video Script",
    "Ad Copy",
    "SEO Content"
  ];

  const contentFormats = [
    "Blog articles & thought leadership",
    "Social media posts & captions",
    "Email marketing campaigns",
    "Product descriptions",
    "Landing page copy",
    "Video scripts & storyboards",
    "Ad copy & headlines",
    "SEO-optimized content"
  ];

  return (
    <div className="space-y-6">
      <AgentAnalytics agentNumber={4} />

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Create Content with AI
          </h3>
          <Button onClick={() => setDialogOpen(true)} className="gap-2">
            <Play className="h-4 w-4" />
            New Content Task
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Generate high-quality, engaging content for any platform. Our AI understands your brand voice and creates content that resonates with your audience.
        </p>
        <div className="grid md:grid-cols-4 gap-2">
          {taskTypes.slice(0, 4).map((type) => (
            <Button
              key={type}
              variant="outline"
              size="sm"
              onClick={() => setDialogOpen(true)}
              className="justify-start"
            >
              <FileText className="h-3 w-3 mr-2" />
              {type}
            </Button>
          ))}
        </div>
      </Card>

      <RecentTasks agentNumber={4} key={refreshKey} />

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h4 className="font-semibold mb-3">Content Capabilities</h4>
          <div className="space-y-2">
            {contentFormats.map((format, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="text-sm">{format}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h4 className="font-semibold mb-3">Quick Templates</h4>
          <div className="space-y-2">
            {taskTypes.map((type, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                onClick={() => setDialogOpen(true)}
                className="w-full justify-start"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                {type}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <TaskExecutionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        agentNumber={4}
        agentName="Content Creation Agent"
        taskTypes={taskTypes}
        onTaskCreated={() => setRefreshKey(prev => prev + 1)}
      />
    </div>
  );
};
