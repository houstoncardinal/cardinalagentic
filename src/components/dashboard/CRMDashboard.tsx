import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Phone, Mail, Calendar, Play, UserPlus } from "lucide-react";
import { TaskExecutionDialog } from "./TaskExecutionDialog";
import { RecentTasks } from "./RecentTasks";
import { AgentAnalytics } from "./AgentAnalytics";

export const CRMDashboard = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const taskTypes = [
    "Client Outreach",
    "Follow-up Email",
    "Meeting Scheduler",
    "Lead Qualification",
    "Proposal Generation",
    "Client Report",
    "Relationship Analysis",
    "Pipeline Management"
  ];

  const capabilities = [
    "Automated client communication",
    "Meeting scheduling & reminders",
    "Lead scoring & qualification",
    "Proposal & contract generation",
    "Client sentiment analysis",
    "Pipeline tracking & forecasting",
    "Follow-up automation",
    "Relationship health monitoring"
  ];

  return (
    <div className="space-y-6">
      <AgentAnalytics agentNumber={10} />

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <Users className="h-5 w-5" />
            CRM Automation Tasks
          </h3>
          <Button onClick={() => setDialogOpen(true)} className="gap-2">
            <Play className="h-4 w-4" />
            New CRM Task
          </Button>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Automate client relationship management tasks including outreach, follow-ups, lead qualification, and proposal generation.
        </p>
        <div className="grid md:grid-cols-4 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDialogOpen(true)}
            className="justify-start"
          >
            <Mail className="h-3 w-3 mr-2" />
            Email Campaign
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDialogOpen(true)}
            className="justify-start"
          >
            <Calendar className="h-3 w-3 mr-2" />
            Schedule Meeting
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDialogOpen(true)}
            className="justify-start"
          >
            <UserPlus className="h-3 w-3 mr-2" />
            Qualify Lead
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setDialogOpen(true)}
            className="justify-start"
          >
            <Phone className="h-3 w-3 mr-2" />
            Follow-up Call
          </Button>
        </div>
      </Card>

      <RecentTasks agentNumber={10} key={refreshKey} />

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h4 className="font-semibold mb-3">CRM Capabilities</h4>
          <div className="space-y-2">
            {capabilities.map((capability, idx) => (
              <div key={idx} className="flex items-center gap-2 p-2 bg-muted/30 rounded-lg">
                <div className="h-2 w-2 rounded-full bg-success" />
                <span className="text-sm">{capability}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h4 className="font-semibold mb-3">Task Templates</h4>
          <div className="space-y-2">
            {taskTypes.map((type, idx) => (
              <Button
                key={idx}
                variant="ghost"
                size="sm"
                onClick={() => setDialogOpen(true)}
                className="w-full justify-start"
              >
                <Users className="h-4 w-4 mr-2" />
                {type}
              </Button>
            ))}
          </div>
        </Card>
      </div>

      <TaskExecutionDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        agentNumber={10}
        agentName="CRM Agent"
        taskTypes={taskTypes}
        onTaskCreated={() => setRefreshKey(prev => prev + 1)}
      />
    </div>
  );
};
