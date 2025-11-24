import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface AgentAnalyticsProps {
  agentNumber: number;
}

interface Analytics {
  totalTasks: number;
  completedTasks: number;
  failedTasks: number;
  successRate: number;
  avgResponseTime: number;
}

export const AgentAnalytics = ({ agentNumber }: AgentAnalyticsProps) => {
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch task statistics
        const { data: tasks, error } = await supabase
          .from('agent_tasks')
          .select('status, created_at, completed_at')
          .eq('agent_number', agentNumber)
          .eq('user_id', user.id);

        if (error) throw error;

        const totalTasks = tasks?.length || 0;
        const completedTasks = tasks?.filter(t => t.status === 'completed').length || 0;
        const failedTasks = tasks?.filter(t => t.status === 'failed').length || 0;
        const successRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

        // Calculate average response time for completed tasks
        const completedWithTime = tasks?.filter(
          t => t.status === 'completed' && t.created_at && t.completed_at
        ) || [];
        
        const avgResponseTime = completedWithTime.length > 0
          ? completedWithTime.reduce((acc, task) => {
              const start = new Date(task.created_at).getTime();
              const end = new Date(task.completed_at!).getTime();
              return acc + (end - start) / 1000;
            }, 0) / completedWithTime.length
          : 0;

        setAnalytics({
          totalTasks,
          completedTasks,
          failedTasks,
          successRate,
          avgResponseTime
        });
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();

    // Subscribe to real-time updates
    const channel = supabase
      .channel('analytics-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'agent_tasks',
          filter: `agent_number=eq.${agentNumber}`
        },
        () => {
          fetchAnalytics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [agentNumber]);

  if (loading) {
    return (
      <div className="grid md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="p-6 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </Card>
        ))}
      </div>
    );
  }

  if (!analytics) return null;

  const metrics = [
    {
      label: "Total Tasks",
      value: analytics.totalTasks.toLocaleString(),
      change: "All time"
    },
    {
      label: "Success Rate",
      value: `${analytics.successRate.toFixed(1)}%`,
      change: `${analytics.completedTasks} completed`
    },
    {
      label: "Failed Tasks",
      value: analytics.failedTasks.toLocaleString(),
      change: analytics.failedTasks > 0 ? "Requires attention" : "No failures"
    },
    {
      label: "Avg Response Time",
      value: `${analytics.avgResponseTime.toFixed(1)}s`,
      change: "Per task"
    }
  ];

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {metrics.map((metric, idx) => (
        <Card key={idx} className="p-6">
          <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
          <p className="text-3xl font-bold mb-1">{metric.value}</p>
          <p className="text-xs text-muted-foreground">{metric.change}</p>
        </Card>
      ))}
    </div>
  );
};