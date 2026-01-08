import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      {
        global: {
          headers: { Authorization: req.headers.get('Authorization')! },
        },
      }
    );

    const { data: { user } } = await supabaseClient.auth.getUser();
    if (!user) {
      throw new Error('Not authenticated');
    }

    const { workflowId, inputData } = await req.json();
    
    console.log(`Starting workflow ${workflowId} for user ${user.id}`);

    // Fetch the workflow
    const { data: workflow, error: workflowError } = await supabaseClient
      .from('workflows')
      .select('*')
      .eq('id', workflowId)
      .eq('user_id', user.id)
      .single();

    if (workflowError || !workflow) {
      throw new Error('Workflow not found');
    }

    const steps = workflow.steps as any[];
    if (!steps || steps.length === 0) {
      throw new Error('Workflow has no steps');
    }

    // Check usage limits
    const { data: subscription } = await supabaseClient
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (subscription && subscription.tasks_used >= subscription.tasks_limit) {
      throw new Error('Task limit reached. Please upgrade your plan.');
    }

    // Create workflow run record
    const { data: workflowRun, error: runError } = await supabaseClient
      .from('workflow_runs')
      .insert({
        workflow_id: workflowId,
        user_id: user.id,
        status: 'running',
        current_step: 0,
        total_steps: steps.length,
        input_data: inputData,
        step_results: []
      })
      .select()
      .single();

    if (runError) throw runError;

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    let previousOutput = inputData || {};
    const stepResults: any[] = [];

    // Execute each step sequentially
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      console.log(`Executing step ${i + 1}/${steps.length}: ${step.agentName} - ${step.taskType}`);

      // Update current step
      await supabaseClient
        .from('workflow_runs')
        .update({ current_step: i + 1 })
        .eq('id', workflowRun.id);

      const systemPrompt = getAgentSystemPrompt(step.agentNumber, step.taskType);
      const userPrompt = generateUserPrompt(step, previousOutput, i === 0);

      try {
        const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${LOVABLE_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            model: 'google/gemini-2.5-flash',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt }
            ],
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error('AI Gateway error:', response.status, errorText);
          throw new Error(`AI Gateway error: ${response.status}`);
        }

        const data = await response.json();
        const result = data.choices[0].message.content;

        stepResults.push({
          step: i + 1,
          agentNumber: step.agentNumber,
          agentName: step.agentName,
          taskType: step.taskType,
          status: 'completed',
          output: result
        });

        previousOutput = { 
          previousStepOutput: result,
          stepNumber: i + 1,
          agentName: step.agentName
        };

        // Create individual task record for tracking
        await supabaseClient
          .from('agent_tasks')
          .insert({
            user_id: user.id,
            agent_number: step.agentNumber,
            agent_name: step.agentName,
            task_type: step.taskType,
            description: `Workflow step ${i + 1}: ${step.description || step.taskType}`,
            input_data: i === 0 ? inputData : { fromPreviousStep: true },
            output_data: { result },
            status: 'completed',
            completed_at: new Date().toISOString()
          });

        // Increment usage
        if (subscription) {
          await supabaseClient
            .from('subscriptions')
            .update({ tasks_used: subscription.tasks_used + i + 1 })
            .eq('user_id', user.id);
        }

        // Log usage
        await supabaseClient
          .from('usage_logs')
          .insert({
            user_id: user.id,
            action_type: 'workflow_step',
            agent_number: step.agentNumber,
            metadata: { workflowId, stepNumber: i + 1, workflowRunId: workflowRun.id }
          });

      } catch (stepError: any) {
        console.error(`Step ${i + 1} failed:`, stepError);
        stepResults.push({
          step: i + 1,
          agentNumber: step.agentNumber,
          agentName: step.agentName,
          taskType: step.taskType,
          status: 'failed',
          error: stepError.message
        });

        // Update workflow run as failed
        await supabaseClient
          .from('workflow_runs')
          .update({
            status: 'failed',
            step_results: stepResults,
            error_message: `Step ${i + 1} failed: ${stepError.message}`,
            completed_at: new Date().toISOString()
          })
          .eq('id', workflowRun.id);

        throw stepError;
      }
    }

    // Update workflow run as completed
    await supabaseClient
      .from('workflow_runs')
      .update({
        status: 'completed',
        step_results: stepResults,
        output_data: previousOutput,
        completed_at: new Date().toISOString()
      })
      .eq('id', workflowRun.id);

    // Update workflow run count
    await supabaseClient
      .from('workflows')
      .update({
        run_count: workflow.run_count + 1,
        last_run_at: new Date().toISOString()
      })
      .eq('id', workflowId);

    // Log analytics
    await supabaseClient
      .from('agent_analytics')
      .insert({
        user_id: user.id,
        agent_number: 0, // 0 for workflow
        metric_type: 'workflow_completed',
        metric_value: steps.length
      });

    return new Response(
      JSON.stringify({ 
        success: true, 
        workflowRun,
        stepResults,
        finalOutput: previousOutput 
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in run-workflow:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});

function getAgentSystemPrompt(agentNumber: number, taskType: string): string {
  const basePrompts: { [key: number]: string } = {
    1: "You are a Market Research Agent specialized in analyzing market trends, competitor data, and consumer insights. Provide detailed, data-driven research reports.",
    2: "You are a Product Development Agent focused on innovation and product strategy. Help create and refine product concepts based on market needs.",
    3: "You are a Branding & Marketing Agent expert in brand strategy, positioning, and visual identity. Create compelling brand narratives and marketing strategies.",
    4: "You are a Content & Copywriting Agent skilled in creating engaging, SEO-optimized content across all formats. Write clear, persuasive copy.",
    5: "You are a Marketing & Social Media Agent specialized in social media strategy, content calendars, and engagement optimization.",
    6: "You are a Speaking Engagement Agent that identifies speaking opportunities, prepares presentation materials, and manages event coordination.",
    7: "You are a Delivery & Product Development Agent focused on project execution, quality assurance, and timely delivery.",
    8: "You are a Security & Compliance Agent ensuring data protection, regulatory compliance, and security best practices.",
    9: "You are a Virtual Receptionist Agent handling inquiries, routing requests, and providing excellent customer service.",
    10: "You are a CRM Agent managing client relationships, tracking interactions, and optimizing customer engagement.",
    11: "You are a Financial Analysis Agent providing insights on financial performance, forecasting, and budgeting.",
    12: "You are a Human Resources Agent managing recruitment, employee development, and HR processes.",
    13: "You are a Training & Development Agent creating learning materials and development programs.",
    14: "You are a Project Management Agent coordinating tasks, timelines, and resources for successful project delivery."
  };
  
  return `${basePrompts[agentNumber] || "You are a helpful AI assistant."} You are currently executing a workflow step. Your output will be passed to the next agent in the chain, so provide clear, actionable, and well-structured information.`;
}

function generateUserPrompt(step: any, previousOutput: any, isFirstStep: boolean): string {
  let prompt = `Task Type: ${step.taskType}\n\n`;
  
  if (step.description) {
    prompt += `Description: ${step.description}\n\n`;
  }
  
  if (isFirstStep && previousOutput && Object.keys(previousOutput).length > 0) {
    prompt += `Input Data:\n${JSON.stringify(previousOutput, null, 2)}\n\n`;
  } else if (!isFirstStep && previousOutput) {
    prompt += `Output from previous step (${previousOutput.agentName}):\n${previousOutput.previousStepOutput}\n\n`;
    prompt += `Build upon the above output to complete your assigned task.\n\n`;
  }
  
  prompt += "Provide a comprehensive, actionable response. Structure your output clearly so it can be used by the next step in the workflow.";
  
  return prompt;
}
