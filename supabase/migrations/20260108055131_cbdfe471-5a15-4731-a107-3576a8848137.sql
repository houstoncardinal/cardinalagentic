-- Create enum for user roles (Enterprise requirement)
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

-- Create enum for subscription tiers
CREATE TYPE public.subscription_tier AS ENUM ('free', 'starter', 'professional', 'enterprise');

-- Create enum for workflow status
CREATE TYPE public.workflow_status AS ENUM ('draft', 'active', 'paused', 'archived');

-- Create enum for workflow run status
CREATE TYPE public.workflow_run_status AS ENUM ('pending', 'running', 'completed', 'failed', 'cancelled');

-- User roles table (for Enterprise RBAC)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL DEFAULT 'user',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Subscriptions table for usage tracking
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  tier subscription_tier NOT NULL DEFAULT 'free',
  tasks_limit INTEGER NOT NULL DEFAULT 50,
  tasks_used INTEGER NOT NULL DEFAULT 0,
  workflows_limit INTEGER NOT NULL DEFAULT 3,
  agents_limit INTEGER NOT NULL DEFAULT 5,
  period_start TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  period_end TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (now() + INTERVAL '1 month'),
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on subscriptions
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Workflows table
CREATE TABLE public.workflows (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  steps JSONB NOT NULL DEFAULT '[]',
  status workflow_status NOT NULL DEFAULT 'draft',
  is_template BOOLEAN NOT NULL DEFAULT false,
  run_count INTEGER NOT NULL DEFAULT 0,
  last_run_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on workflows
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;

-- Workflow runs table
CREATE TABLE public.workflow_runs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  workflow_id UUID REFERENCES public.workflows(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  status workflow_run_status NOT NULL DEFAULT 'pending',
  current_step INTEGER NOT NULL DEFAULT 0,
  total_steps INTEGER NOT NULL,
  input_data JSONB,
  output_data JSONB,
  step_results JSONB NOT NULL DEFAULT '[]',
  error_message TEXT,
  started_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on workflow_runs
ALTER TABLE public.workflow_runs ENABLE ROW LEVEL SECURITY;

-- Usage logs table for detailed tracking
CREATE TABLE public.usage_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  action_type TEXT NOT NULL,
  agent_number INTEGER,
  tokens_used INTEGER DEFAULT 0,
  credits_used NUMERIC(10,4) DEFAULT 0,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on usage_logs
ALTER TABLE public.usage_logs ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to check subscription limits
CREATE OR REPLACE FUNCTION public.check_usage_limit(_user_id UUID, _limit_type TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  sub RECORD;
BEGIN
  SELECT * INTO sub FROM public.subscriptions WHERE user_id = _user_id;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  IF _limit_type = 'tasks' THEN
    RETURN sub.tasks_used < sub.tasks_limit;
  ELSIF _limit_type = 'workflows' THEN
    RETURN (SELECT COUNT(*) FROM public.workflows WHERE user_id = _user_id) < sub.workflows_limit;
  END IF;
  
  RETURN TRUE;
END;
$$;

-- Function to increment task usage
CREATE OR REPLACE FUNCTION public.increment_task_usage(_user_id UUID)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  UPDATE public.subscriptions 
  SET tasks_used = tasks_used + 1,
      updated_at = now()
  WHERE user_id = _user_id;
END;
$$;

-- Function to reset monthly usage
CREATE OR REPLACE FUNCTION public.reset_monthly_usage()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.period_start != OLD.period_start THEN
    NEW.tasks_used := 0;
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger for resetting usage
CREATE TRIGGER reset_usage_on_period_change
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.reset_monthly_usage();

-- Trigger to create subscription on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user_subscription()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.subscriptions (user_id, tier, tasks_limit, workflows_limit, agents_limit)
  VALUES (NEW.id, 'free', 50, 3, 5);
  
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;

-- Create trigger for new users
CREATE TRIGGER on_auth_user_created_subscription
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user_subscription();

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all roles"
  ON public.user_roles FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies for subscriptions
CREATE POLICY "Users can view their own subscription"
  ON public.subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription"
  ON public.subscriptions FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for workflows
CREATE POLICY "Users can view their own workflows"
  ON public.workflows FOR SELECT
  USING (auth.uid() = user_id OR is_template = true);

CREATE POLICY "Users can create their own workflows"
  ON public.workflows FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workflows"
  ON public.workflows FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own workflows"
  ON public.workflows FOR DELETE
  USING (auth.uid() = user_id);

-- RLS Policies for workflow_runs
CREATE POLICY "Users can view their own workflow runs"
  ON public.workflow_runs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own workflow runs"
  ON public.workflow_runs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own workflow runs"
  ON public.workflow_runs FOR UPDATE
  USING (auth.uid() = user_id);

-- RLS Policies for usage_logs
CREATE POLICY "Users can view their own usage logs"
  ON public.usage_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own usage logs"
  ON public.usage_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Update timestamps trigger for workflows
CREATE TRIGGER update_workflows_updated_at
  BEFORE UPDATE ON public.workflows
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Update timestamps trigger for subscriptions
CREATE TRIGGER update_subscriptions_updated_at
  BEFORE UPDATE ON public.subscriptions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Enable realtime for key tables
ALTER PUBLICATION supabase_realtime ADD TABLE public.workflow_runs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.agent_tasks;