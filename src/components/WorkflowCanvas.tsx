import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Network, 
  Play, 
  Pause, 
  Save, 
  Share2, 
  Plus,
  GitBranch,
  Database,
  Zap,
  Settings,
  Eye
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WorkflowNode {
  id: string;
  type: "agent" | "trigger" | "action" | "condition";
  name: string;
  status: "idle" | "running" | "completed" | "error";
  position: { x: number; y: number };
  connections: string[];
}

const WorkflowCanvas = () => {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const sampleWorkflow: WorkflowNode[] = [
    {
      id: "1",
      type: "trigger",
      name: "New Email Received",
      status: "completed",
      position: { x: 50, y: 100 },
      connections: ["2"]
    },
    {
      id: "2",
      type: "agent",
      name: "Content Analysis Agent",
      status: "running",
      position: { x: 300, y: 100 },
      connections: ["3", "4"]
    },
    {
      id: "3",
      type: "condition",
      name: "Priority Check",
      status: "idle",
      position: { x: 550, y: 50 },
      connections: ["5"]
    },
    {
      id: "4",
      type: "agent",
      name: "Data Enrichment Agent",
      status: "idle",
      position: { x: 550, y: 150 },
      connections: ["5"]
    },
    {
      id: "5",
      type: "action",
      name: "Update CRM",
      status: "idle",
      position: { x: 800, y: 100 },
      connections: []
    }
  ];

  const getNodeIcon = (type: string) => {
    switch (type) {
      case "agent": return Network;
      case "trigger": return Zap;
      case "action": return Database;
      case "condition": return GitBranch;
      default: return Network;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-success/10 text-success border-success/20";
      case "running": return "bg-info/10 text-info border-info/20";
      case "error": return "bg-destructive/10 text-destructive border-destructive/20";
      default: return "bg-muted text-muted-foreground border-border";
    }
  };

  return (
    <div className="space-y-6">
      {/* Workflow Controls */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Network className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Visual Workflow Builder</h3>
            </div>
            <Badge variant="outline" className="gap-1">
              <Eye className="h-3 w-3" />
              Live Preview
            </Badge>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsRunning(!isRunning)}
            >
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Run Workflow
                </>
              )}
            </Button>
            <Button variant="outline" size="sm">
              <Save className="h-4 w-4 mr-2" />
              Save
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button size="sm" className="bg-primary">
              <Plus className="h-4 w-4 mr-2" />
              Add Node
            </Button>
          </div>
        </div>
      </Card>

      {/* Main Workflow Canvas */}
      <div className="grid lg:grid-cols-4 gap-6">
        {/* Canvas Area */}
        <Card className="lg:col-span-3 p-6 bg-muted/30">
          <div className="relative h-[600px] bg-background/50 rounded-lg border-2 border-dashed border-border overflow-hidden">
            {/* Grid Background */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `
                  linear-gradient(hsl(var(--border)) 1px, transparent 1px),
                  linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)
                `,
                backgroundSize: "20px 20px"
              }}
            />

            {/* Workflow Nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {sampleWorkflow.map(node => 
                node.connections.map(connId => {
                  const targetNode = sampleWorkflow.find(n => n.id === connId);
                  if (!targetNode) return null;
                  return (
                    <line
                      key={`${node.id}-${connId}`}
                      x1={node.position.x + 60}
                      y1={node.position.y + 30}
                      x2={targetNode.position.x}
                      y2={targetNode.position.y + 30}
                      stroke="hsl(var(--primary))"
                      strokeWidth="2"
                      strokeDasharray="5,5"
                      className="animate-pulse"
                    />
                  );
                })
              )}
            </svg>

            {sampleWorkflow.map((node) => {
              const Icon = getNodeIcon(node.type);
              return (
                <div
                  key={node.id}
                  className={`absolute cursor-pointer transition-all duration-200 hover:scale-105 ${
                    selectedNode === node.id ? "ring-2 ring-primary" : ""
                  }`}
                  style={{
                    left: `${node.position.x}px`,
                    top: `${node.position.y}px`
                  }}
                  onClick={() => setSelectedNode(node.id)}
                >
                  <Card className={`p-4 w-48 shadow-lg ${getStatusColor(node.status)}`}>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-background/50">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{node.name}</p>
                        <p className="text-xs opacity-70 capitalize mt-1">{node.type}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              );
            })}
          </div>

          {/* Canvas Stats */}
          <div className="grid grid-cols-4 gap-4 mt-4">
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-primary">{sampleWorkflow.length}</p>
              <p className="text-xs text-muted-foreground">Total Nodes</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-info">
                {sampleWorkflow.filter(n => n.type === "agent").length}
              </p>
              <p className="text-xs text-muted-foreground">AI Agents</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-success">
                {sampleWorkflow.filter(n => n.status === "completed").length}
              </p>
              <p className="text-xs text-muted-foreground">Completed</p>
            </Card>
            <Card className="p-4 text-center">
              <p className="text-2xl font-bold text-warning">
                {sampleWorkflow.filter(n => n.status === "running").length}
              </p>
              <p className="text-xs text-muted-foreground">Running</p>
            </Card>
          </div>
        </Card>

        {/* Properties Panel */}
        <Card className="p-4">
          <Tabs defaultValue="properties">
            <TabsList className="w-full">
              <TabsTrigger value="properties" className="flex-1">
                <Settings className="h-4 w-4 mr-2" />
                Props
              </TabsTrigger>
              <TabsTrigger value="data" className="flex-1">
                <Database className="h-4 w-4 mr-2" />
                Data
              </TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="space-y-4 mt-4">
              {selectedNode ? (
                <>
                  <div>
                    <h4 className="font-semibold mb-2">Node Configuration</h4>
                    <p className="text-sm text-muted-foreground">
                      Configure the selected workflow node
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Node Name</label>
                    <input 
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background"
                      defaultValue={sampleWorkflow.find(n => n.id === selectedNode)?.name}
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Node Type</label>
                    <select className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background">
                      <option>Agent</option>
                      <option>Trigger</option>
                      <option>Action</option>
                      <option>Condition</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Timeout (seconds)</label>
                    <input 
                      type="number"
                      className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background"
                      defaultValue="30"
                    />
                  </div>

                  <Button className="w-full" size="sm">
                    Update Node
                  </Button>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Network className="h-12 w-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Select a node to configure</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="data" className="mt-4">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Workflow Data</h4>
                  <p className="text-xs text-muted-foreground mb-4">
                    Real-time data flow through the workflow
                  </p>
                </div>

                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {sampleWorkflow.map((node) => (
                    <Card key={node.id} className="p-3">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium truncate">{node.name}</p>
                        <Badge className={getStatusColor(node.status)}>
                          {node.status}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Last updated: {new Date().toLocaleTimeString()}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};

export default WorkflowCanvas;
