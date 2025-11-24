import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface TaskExecutionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  agentNumber: number;
  agentName: string;
  taskTypes: string[];
  onTaskCreated?: () => void;
}

export const TaskExecutionDialog = ({
  open,
  onOpenChange,
  agentNumber,
  agentName,
  taskTypes,
  onTaskCreated
}: TaskExecutionDialogProps) => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [taskType, setTaskType] = useState("");
  const [description, setDescription] = useState("");
  const [inputData, setInputData] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!taskType || !description) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      let parsedInputData = {};
      if (inputData.trim()) {
        try {
          parsedInputData = JSON.parse(inputData);
        } catch {
          parsedInputData = { data: inputData };
        }
      }

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error("User not authenticated");
      }

      const { data, error } = await supabase.functions.invoke('run-agent-task', {
        body: {
          agentNumber,
          taskType,
          description,
          inputData: parsedInputData
        }
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      toast({
        title: "Task Submitted Successfully",
        description: `${agentName} is processing your ${taskType} task`
      });

      setTaskType("");
      setDescription("");
      setInputData("");
      onOpenChange(false);
      onTaskCreated?.();

    } catch (error: any) {
      console.error('Task execution error:', error);
      toast({
        title: "Task Submission Failed",
        description: error.message || "Please try again",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Execute Agent Task</DialogTitle>
          <DialogDescription>
            Submit a new task for {agentName} to process
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="taskType">Task Type</Label>
            <Select value={taskType} onValueChange={setTaskType}>
              <SelectTrigger>
                <SelectValue placeholder="Select task type" />
              </SelectTrigger>
              <SelectContent>
                {taskTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe what you want the agent to do..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="inputData">Additional Data (Optional)</Label>
            <Textarea
              id="inputData"
              placeholder="JSON data or text input for the task..."
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-muted-foreground">
              Provide JSON data or plain text that will be used by the agent
            </p>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Submitting..." : "Submit Task"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};