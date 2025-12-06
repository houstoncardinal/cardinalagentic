import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CheckCircle, XCircle, Clock, Calendar, Bot } from "lucide-react";
import { format } from "date-fns";

interface TaskResultDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task: {
    id: string;
    agent_name: string;
    task_type: string;
    description: string;
    status: string;
    created_at: string;
    completed_at: string | null;
    input_data: any;
    output_data: any;
    error_message: string | null;
  } | null;
}

const TaskResultDialog = ({ open, onOpenChange, task }: TaskResultDialogProps) => {
  if (!task) return null;

  const getStatusIcon = () => {
    switch (task.status) {
      case "completed":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "failed":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500 animate-spin" />;
    }
  };

  const getStatusBadge = () => {
    switch (task.status) {
      case "completed":
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>;
      case "failed":
        return <Badge variant="destructive">Failed</Badge>;
      case "running":
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Running</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center gap-3">
            {getStatusIcon()}
            <div>
              <DialogTitle className="text-xl">{task.task_type}</DialogTitle>
              <p className="text-sm text-muted-foreground mt-1">{task.agent_name}</p>
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-6">
            {/* Status & Timing */}
            <div className="flex flex-wrap gap-4 items-center">
              {getStatusBadge()}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Created: {format(new Date(task.created_at), "PPp")}</span>
              </div>
              {task.completed_at && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Completed: {format(new Date(task.completed_at), "PPp")}</span>
                </div>
              )}
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="font-semibold text-foreground">Task Description</h4>
              <p className="text-muted-foreground bg-muted/50 p-4 rounded-lg">
                {task.description}
              </p>
            </div>

            {/* Input Data */}
            {task.input_data && Object.keys(task.input_data).length > 0 && (
              <div className="space-y-2">
                <h4 className="font-semibold text-foreground">Input Parameters</h4>
                <pre className="text-sm bg-muted/50 p-4 rounded-lg overflow-x-auto text-muted-foreground">
                  {JSON.stringify(task.input_data, null, 2)}
                </pre>
              </div>
            )}

            {/* Error Message */}
            {task.error_message && (
              <div className="space-y-2">
                <h4 className="font-semibold text-red-500">Error</h4>
                <p className="text-red-400 bg-red-500/10 p-4 rounded-lg border border-red-500/20">
                  {task.error_message}
                </p>
              </div>
            )}

            {/* AI Output */}
            {task.output_data?.result && (
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Bot className="h-5 w-5 text-accent" />
                  <h4 className="font-semibold text-foreground">AI Response</h4>
                </div>
                <div className="bg-accent/5 border border-accent/10 p-4 rounded-lg">
                  <div className="prose prose-sm dark:prose-invert max-w-none whitespace-pre-wrap text-foreground">
                    {task.output_data.result}
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default TaskResultDialog;