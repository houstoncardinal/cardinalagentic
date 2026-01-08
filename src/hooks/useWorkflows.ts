import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export interface WorkflowStep {
  id: string;
  agentNumber: number;
  agentName: string;
  taskType: string;
  description: string;
  inputSource: "manual" | "previous";
}

export interface Workflow {
  id: string;
  user_id: string;
  name: string;
  description: string | null;
  steps: WorkflowStep[];
  status: "draft" | "active" | "paused" | "archived";
  is_template: boolean;
  run_count: number;
  last_run_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface WorkflowRun {
  id: string;
  workflow_id: string;
  user_id: string;
  status: "pending" | "running" | "completed" | "failed" | "cancelled";
  current_step: number;
  total_steps: number;
  input_data: any;
  output_data: any;
  step_results: any[];
  error_message: string | null;
  started_at: string;
  completed_at: string | null;
}

export const useWorkflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchWorkflows = useCallback(async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from("workflows")
        .select("*")
        .eq("user_id", user.id)
        .order("updated_at", { ascending: false });

      if (error) throw error;
      
      // Transform the data to match our interface
      const transformedData = (data || []).map(w => ({
        ...w,
        steps: (w.steps as unknown as WorkflowStep[]) || []
      })) as Workflow[];
      
      setWorkflows(transformedData);
    } catch (err: any) {
      console.error("Error fetching workflows:", err);
      toast({
        title: "Error loading workflows",
        description: err.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  const saveWorkflow = async (
    name: string,
    description: string,
    steps: WorkflowStep[],
    existingId?: string
  ): Promise<Workflow | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      if (existingId) {
        // Update existing workflow
        const { data, error } = await supabase
          .from("workflows")
          .update({
            name,
            description,
            steps: steps as any,
            updated_at: new Date().toISOString()
          })
          .eq("id", existingId)
          .eq("user_id", user.id)
          .select()
          .single();

        if (error) throw error;
        
        const transformedData = {
          ...data,
          steps: (data.steps as unknown as WorkflowStep[]) || []
        } as Workflow;
        
        await fetchWorkflows();
        return transformedData;
      } else {
        // Create new workflow
        const { data, error } = await supabase
          .from("workflows")
          .insert({
            user_id: user.id,
            name,
            description,
            steps: steps as any,
            status: "draft"
          })
          .select()
          .single();

        if (error) throw error;
        
        const transformedData = {
          ...data,
          steps: (data.steps as unknown as WorkflowStep[]) || []
        } as Workflow;
        
        await fetchWorkflows();
        return transformedData;
      }
    } catch (err: any) {
      console.error("Error saving workflow:", err);
      toast({
        title: "Error saving workflow",
        description: err.message,
        variant: "destructive"
      });
      return null;
    }
  };

  const deleteWorkflow = async (id: string): Promise<boolean> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase
        .from("workflows")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
      
      await fetchWorkflows();
      return true;
    } catch (err: any) {
      console.error("Error deleting workflow:", err);
      toast({
        title: "Error deleting workflow",
        description: err.message,
        variant: "destructive"
      });
      return false;
    }
  };

  const runWorkflow = async (workflowId: string, inputData?: any): Promise<WorkflowRun | null> => {
    try {
      const { data, error } = await supabase.functions.invoke("run-workflow", {
        body: { workflowId, inputData }
      });

      if (error) throw error;
      if (data.error) throw new Error(data.error);

      toast({
        title: "Workflow completed",
        description: `Successfully executed ${data.stepResults?.length || 0} steps`
      });

      return data.workflowRun;
    } catch (err: any) {
      console.error("Error running workflow:", err);
      toast({
        title: "Workflow failed",
        description: err.message,
        variant: "destructive"
      });
      return null;
    }
  };

  return {
    workflows,
    loading,
    saveWorkflow,
    deleteWorkflow,
    runWorkflow,
    refetch: fetchWorkflows
  };
};
