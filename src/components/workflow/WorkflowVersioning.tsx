import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitBranch, Clock, User, Check, RotateCcw, Download } from "lucide-react";

interface WorkflowVersion {
  version: string;
  timestamp: string;
  author: string;
  changes: string;
  nodeCount: number;
  status: "active" | "archived";
}

export const WorkflowVersioning = () => {
  const versions: WorkflowVersion[] = [
    {
      version: "v2.3.1",
      timestamp: "2024-01-15 14:30",
      author: "System Admin",
      changes: "Added priority check condition and optimized data flow",
      nodeCount: 5,
      status: "active"
    },
    {
      version: "v2.3.0",
      timestamp: "2024-01-14 09:15",
      author: "Sarah Johnson",
      changes: "Integrated data enrichment agent for enhanced processing",
      nodeCount: 5,
      status: "archived"
    },
    {
      version: "v2.2.0",
      timestamp: "2024-01-10 16:45",
      author: "Mike Chen",
      changes: "Added email trigger and content analysis workflow",
      nodeCount: 4,
      status: "archived"
    },
    {
      version: "v2.1.0",
      timestamp: "2024-01-05 11:20",
      author: "System Admin",
      changes: "Initial workflow setup with basic CRM integration",
      nodeCount: 3,
      status: "archived"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-info/10">
            <GitBranch className="h-5 w-5 text-info" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Version History</h3>
            <p className="text-sm text-muted-foreground">Track and restore workflow changes</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export History
        </Button>
      </div>

      <div className="space-y-3">
        {versions.map((version, idx) => (
          <Card key={version.version} className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="p-2 rounded-lg bg-muted">
                  <GitBranch className="h-4 w-4" />
                </div>
                <div className="space-y-2 flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold">{version.version}</h4>
                    {version.status === "active" && (
                      <Badge className="bg-success/10 text-success border-success/20">
                        <Check className="h-3 w-3 mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{version.changes}</p>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {version.timestamp}
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {version.author}
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {version.nodeCount} nodes
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {version.status === "archived" && (
                  <>
                    <Button variant="outline" size="sm">
                      <RotateCcw className="h-3 w-3 mr-1" />
                      Restore
                    </Button>
                    <Button variant="ghost" size="sm">
                      View
                    </Button>
                  </>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-4 bg-muted/50">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-background">
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium">Auto-save enabled</p>
            <p className="text-xs text-muted-foreground">Changes are automatically versioned every 15 minutes</p>
          </div>
          <Button variant="outline" size="sm">Configure</Button>
        </div>
      </Card>
    </div>
  );
};
