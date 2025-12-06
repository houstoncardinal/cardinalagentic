import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { Loader2, Clock, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import TaskResultDialog from "./TaskResultDialog";

interface Task {
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
}

interface RecentTasksProps {
  agentNumber: number;
  limit?: number;
}

export const RecentTasks = ({ agentNumber, limit = 5 }: RecentTasksProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const fetchTasks = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('agent_tasks')
        .select('*')
        .eq('agent_number', agentNumber)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('agent-tasks-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'agent_tasks',
          filter: `agent_number=eq.${agentNumber}`
        },
        () => {
          fetchTasks();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [agentNumber, limit]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'running':
        return <Loader2 className="h-4 w-4 animate-spin text-accent" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-500/10 text-green-500 border-green-500/20">Completed</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'running':
        return <Badge className="bg-yellow-500/10 text-yellow-500 border-yellow-500/20">Running</Badge>;
      default:
        return <Badge variant="secondary">Pending</Badge>;
    }
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setDialogOpen(true);
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
          <h3 className="font-semibold text-lg">Recent Tasks</h3>
          <Button variant="outline" size="sm" onClick={fetchTasks}>
            Refresh
          </Button>
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-8">
            <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No tasks yet</p>
            <p className="text-sm text-muted-foreground">Submit your first task to get started</p>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => handleTaskClick(task)}
                className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg border border-border hover:border-accent/50 transition-colors cursor-pointer"
              >
                <div className="mt-1">{getStatusIcon(task.status)}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm">{task.task_type}</p>
                    {getStatusBadge(task.status)}
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {task.description}
                  </p>
                  {task.error_message && (
                    <p className="text-xs text-destructive mt-1">
                      Error: {task.error_message}
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(task.created_at), { addSuffix: true })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      <TaskResultDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        task={selectedTask}
      />
    </>
  );
};