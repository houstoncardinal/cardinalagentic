import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import TaskResultDialog from "@/components/dashboard/TaskResultDialog";
import { 
  Bot, 
  TrendingUp, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Activity,
  Zap,
  ArrowRight,
  LogOut,
  User,
  BarChart3,
  ListTodo
} from "lucide-react";
import { format } from "date-fns";

const agentsList = [
  { number: 1, name: "Market Research Agent", color: "from-blue-500 to-cyan-500" },
  { number: 2, name: "Product Development Agent", color: "from-purple-500 to-pink-500" },
  { number: 3, name: "Branding & Marketing Agent", color: "from-orange-500 to-red-500" },
  { number: 4, name: "Content & Copywriting Agent", color: "from-green-500 to-emerald-500" },
  { number: 5, name: "Social Media Agent", color: "from-pink-500 to-rose-500" },
  { number: 10, name: "CRM Agent", color: "from-indigo-500 to-violet-500" },
];

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [tasks, setTasks] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, failed: 0, running: 0 });
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      
      setUser(user);

      // Fetch profile
      const { data: profileData } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();
      
      setProfile(profileData);

      // Fetch recent tasks
      const { data: tasksData } = await supabase
        .from("agent_tasks")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(10);

      if (tasksData) {
        setTasks(tasksData);
        
        // Calculate stats
        const completed = tasksData.filter(t => t.status === "completed").length;
        const failed = tasksData.filter(t => t.status === "failed").length;
        const running = tasksData.filter(t => t.status === "running").length;
        setStats({ total: tasksData.length, completed, failed, running });
      }
    };

    fetchData();

    // Real-time subscription
    const channel = supabase
      .channel("dashboard-tasks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "agent_tasks" },
        () => fetchData()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast({ title: "Signed out successfully" });
    navigate("/");
  };

  const handleTaskClick = (task: any) => {
    setSelectedTask(task);
    setDialogOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "running":
        return <Clock className="h-4 w-4 text-yellow-500 animate-spin" />;
      default:
        return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                Welcome back, {profile?.full_name || user?.email?.split("@")[0] || "User"}
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage your AI agents and monitor task performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="gap-2">
                <User className="h-4 w-4" />
                Profile
              </Button>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2">
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="p-4 bg-card border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-accent/10">
                  <ListTodo className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  <p className="text-sm text-muted-foreground">Total Tasks</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-card border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
                  <p className="text-sm text-muted-foreground">Completed</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-card border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-yellow-500/10">
                  <Activity className="h-5 w-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.running}</p>
                  <p className="text-sm text-muted-foreground">Running</p>
                </div>
              </div>
            </Card>
            <Card className="p-4 bg-card border-border">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-red-500/10">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{stats.failed}</p>
                  <p className="text-sm text-muted-foreground">Failed</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Quick Access Agents */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Your AI Agents</h2>
                <Link to="/agents">
                  <Button variant="ghost" size="sm" className="gap-2">
                    View All <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {agentsList.map((agent) => (
                  <Link key={agent.number} to={`/agent/${agent.number}/dashboard`}>
                    <Card className="p-4 hover:shadow-lg transition-all duration-300 cursor-pointer group border-border bg-card hover:border-accent/30">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${agent.color} shadow-lg`}>
                          <Bot className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                            {agent.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">Agent #{agent.number}</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>

            {/* Recent Tasks */}
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Recent Tasks</h2>
                <Badge variant="secondary">{tasks.length} tasks</Badge>
              </div>
              
              <Card className="divide-y divide-border bg-card border-border">
                {tasks.length === 0 ? (
                  <div className="p-8 text-center">
                    <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No tasks yet</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Start by running your first AI agent task
                    </p>
                  </div>
                ) : (
                  tasks.slice(0, 5).map((task) => (
                    <div 
                      key={task.id} 
                      className="p-4 hover:bg-muted/50 cursor-pointer transition-colors"
                      onClick={() => handleTaskClick(task)}
                    >
                      <div className="flex items-start gap-3">
                        {getStatusIcon(task.status)}
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">{task.task_type}</p>
                          <p className="text-sm text-muted-foreground truncate">{task.agent_name}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {format(new Date(task.created_at), "MMM d, h:mm a")}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <TaskResultDialog 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
        task={selectedTask} 
      />
    </div>
  );
};

export default Dashboard;