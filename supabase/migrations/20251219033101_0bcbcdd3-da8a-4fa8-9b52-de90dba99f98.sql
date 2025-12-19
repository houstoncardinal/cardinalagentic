-- Add notification preferences column to profiles table
ALTER TABLE public.profiles 
ADD COLUMN notification_preferences jsonb DEFAULT '{"email_updates": true, "task_completed": true, "weekly_digest": false, "agent_alerts": true}'::jsonb;