import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Subscription {
  id: string;
  user_id: string;
  tier: "free" | "starter" | "professional" | "enterprise";
  tasks_limit: number;
  tasks_used: number;
  workflows_limit: number;
  agents_limit: number;
  period_start: string;
  period_end: string;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
}

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSubscription = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error: fetchError } = await supabase
        .from("subscriptions")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

      if (fetchError) throw fetchError;
      
      // Type cast since we know the database schema matches
      setSubscription(data as unknown as Subscription);
    } catch (err: any) {
      console.error("Error fetching subscription:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscription();
  }, []);

  const usagePercentage = subscription 
    ? Math.round((subscription.tasks_used / subscription.tasks_limit) * 100)
    : 0;

  const isNearLimit = usagePercentage >= 80;
  const isAtLimit = subscription ? subscription.tasks_used >= subscription.tasks_limit : false;

  const tierLimits = {
    free: { tasks: 50, workflows: 3, agents: 5 },
    starter: { tasks: 500, workflows: 10, agents: 10 },
    professional: { tasks: 2000, workflows: 50, agents: 14 },
    enterprise: { tasks: 999999, workflows: 999, agents: 14 }
  };

  return {
    subscription,
    loading,
    error,
    usagePercentage,
    isNearLimit,
    isAtLimit,
    tierLimits,
    refetch: fetchSubscription
  };
};
