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

    const { agentNumber, taskType, description, inputData } = await req.json();
    
    console.log(`Running agent ${agentNumber} task: ${taskType}`);

    // Create task record
    const { data: task, error: taskError } = await supabaseClient
      .from('agent_tasks')
      .insert({
        user_id: user.id,
        agent_number: agentNumber,
        agent_name: getAgentName(agentNumber),
        task_type: taskType,
        description,
        input_data: inputData,
        status: 'running'
      })
      .select()
      .single();

    if (taskError) throw taskError;

    // Generate AI response based on agent type
    const systemPrompt = getAgentSystemPrompt(agentNumber, taskType);
    const userPrompt = generateUserPrompt(taskType, description, inputData);

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
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

    // Update task with result
    await supabaseClient
      .from('agent_tasks')
      .update({
        status: 'completed',
        output_data: { result },
        completed_at: new Date().toISOString()
      })
      .eq('id', task.id);

    // Log analytics
    await supabaseClient
      .from('agent_analytics')
      .insert({
        user_id: user.id,
        agent_number: agentNumber,
        metric_type: 'task_completed',
        metric_value: 1
      });

    return new Response(
      JSON.stringify({ success: true, task, result }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in run-agent-task:', error);
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

function getAgentName(number: number): string {
  const agents: { [key: number]: string } = {
    1: "Market Research Agent",
    2: "Product & Services Development Agent",
    3: "Branding & Marketing Agent",
    4: "Content & Copywriting Agent",
    5: "Marketing & Social Media Agent",
    6: "Speaking Engagement Agent",
    7: "Delivery & Product Development Agent",
    8: "Security & Compliance Agent",
    9: "Virtual Receptionist Agent",
    10: "Client Relationship Management Agent",
    11: "Financial Analysis Agent",
    12: "Human Resources Agent",
    13: "Training & Development Agent",
    14: "Project Management Agent"
  };
  return agents[number] || "Unknown Agent";
}

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
  
  return basePrompts[agentNumber] || "You are a helpful AI assistant.";
}

function generateUserPrompt(taskType: string, description: string, inputData: any): string {
  let prompt = `Task Type: ${taskType}\n\nDescription: ${description}\n\n`;
  
  if (inputData) {
    prompt += `Additional Context:\n${JSON.stringify(inputData, null, 2)}\n\n`;
  }
  
  prompt += "Please provide a comprehensive, actionable response with specific recommendations and next steps.";
  
  return prompt;
}