import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useWorkflows, Workflow } from "@/hooks/useWorkflows";
import { 
  Workflow as WorkflowIcon, 
  Play, 
  Edit, 
  Trash2, 
  Loader2,
  Plus,
  Clock,
  CheckCircle2
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export const SavedWorkflows = () => {
  const navigate = useNavigate();
  const { workflows, loading, deleteWorkflow, runWorkflow, refetch } = useWorkflows();
  const [runDialogOpen, setRunDialogOpen] = useState(false);
  const [selectedWorkflow, setSelectedWorkflow] = useState<Workflow | null>(null);
  const [inputData, setInputData] = useState("");
  const [running, setRunning] = useState(false);

  const handleRun = async () => {
    if (!selectedWorkflow) return;
    
    setRunning(true);
    try {
      let parsedInput = {};
      if (inputData.trim()) {
        try {
          parsedInput = JSON.parse(inputData);
        } catch {
          parsedInput = { data: inputData };
        }
      }
      
      await runWorkflow(selectedWorkflow.id, parsedInput);
      setRunDialogOpen(false);
      setInputData("");
      refetch();
    } finally {
      setRunning(false);
    }
  };

  const handleDelete = async (workflow: Workflow) => {
    if (confirm(`Are you sure you want to delete "${workflow.name}"?`)) {
      await deleteWorkflow(workflow.id);
    }
  };

  if (loading) {
    return (
      <Card className="p-6 flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </Card>
    );
  }

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Saved Workflows</h3>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate("/workflow-builder")}
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            New
          </Button>
        </div>

        {workflows.length === 0 ? (
          <div className="text-center py-8">
            <WorkflowIcon className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No workflows yet</p>
            <p className="text-sm text-muted-foreground">
              Create multi-agent workflows to automate complex tasks
            </p>
            <Button 
              className="mt-4 gap-2"
              onClick={() => navigate("/workflow-builder")}
            >
              <Plus className="h-4 w-4" />
              Create Workflow
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {workflows.slice(0, 5).map((workflow) => (
              <div
                key={workflow.id}
                className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border hover:border-accent/50 transition-colors"
              >
                <div className="p-2 rounded-lg bg-accent/10">
                  <WorkflowIcon className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm truncate">{workflow.name}</p>
                    <Badge variant="secondary" className="text-xs">
                      {workflow.steps?.length || 0} steps
                    </Badge>
                  </div>
                  {workflow.description && (
                    <p className="text-sm text-muted-foreground line-clamp-1">
                      {workflow.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      {workflow.run_count} runs
                    </span>
                    {workflow.last_run_at && (
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {formatDistanceToNow(new Date(workflow.last_run_at), { addSuffix: true })}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      setSelectedWorkflow(workflow);
                      setRunDialogOpen(true);
                    }}
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => navigate(`/workflow-builder?id=${workflow.id}`)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => handleDelete(workflow)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}

            {workflows.length > 5 && (
              <Button 
                variant="ghost" 
                className="w-full"
                onClick={() => navigate("/workflow-builder")}
              >
                View all {workflows.length} workflows
              </Button>
            )}
          </div>
        )}
      </Card>

      <Dialog open={runDialogOpen} onOpenChange={setRunDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Run Workflow</DialogTitle>
            <DialogDescription>
              Execute "{selectedWorkflow?.name}" with {selectedWorkflow?.steps?.length || 0} steps
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Initial Input Data (Optional)</Label>
              <Textarea
                value={inputData}
                onChange={(e) => setInputData(e.target.value)}
                placeholder="Enter JSON data or plain text to start the workflow..."
                rows={4}
              />
              <p className="text-xs text-muted-foreground">
                This data will be passed to the first step of the workflow
              </p>
            </div>

            {selectedWorkflow?.steps && selectedWorkflow.steps.length > 0 && (
              <div className="space-y-2">
                <Label>Workflow Steps</Label>
                <div className="space-y-1">
                  {selectedWorkflow.steps.map((step, index) => (
                    <div 
                      key={step.id} 
                      className="flex items-center gap-2 text-sm text-muted-foreground"
                    >
                      <span className="font-mono text-xs bg-muted px-1.5 py-0.5 rounded">
                        {index + 1}
                      </span>
                      <span>{step.agentName}</span>
                      <span className="text-accent">→</span>
                      <span>{step.taskType}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRunDialogOpen(false)}
              disabled={running}
            >
              Cancel
            </Button>
            <Button onClick={handleRun} disabled={running} className="gap-2">
              {running && <Loader2 className="h-4 w-4 animate-spin" />}
              {running ? "Running..." : "Run Workflow"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};
