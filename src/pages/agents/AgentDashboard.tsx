import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Activity, 
  TrendingUp, 
  Clock, 
  CheckCircle2,
  AlertCircle,
  Play,
  Pause,
  Settings,
  BarChart3,
  Zap
} from "lucide-react";
import { agents } from "@/data/agentsData";

const AgentDashboard = () => {
  const { agentId } = useParams();
  const agent = agents.find(a => a.number === Number(agentId));
  const [isRunning, setIsRunning] = useState(true);

  if (!agent) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Dashboard Not Found</h1>
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const metrics = [
    { label: "Tasks Processed", value: "12,847", change: "+12.5%", trend: "up" },
    { label: "Success Rate", value: "98.3%", change: "+2.1%", trend: "up" },
    { label: "Avg Response Time", value: "1.2s", change: "-15%", trend: "down" },
    { label: "Active Integrations", value: agent.integrations.length, change: "—", trend: "neutral" }
  ];

  const recentActivity = [
    { time: "2 min ago", action: "Completed analysis task", status: "success" },
    { time: "15 min ago", action: "Processed batch request", status: "success" },
    { time: "1 hour ago", action: "Updated integration settings", status: "info" },
    { time: "2 hours ago", action: "Automated report generation", status: "success" },
    { time: "3 hours ago", action: "System health check", status: "success" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Dashboard Header */}
      <section className="border-b border-border bg-muted/30">
        <div className="container mx-auto px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link to={`/agent/${agent.number}`} className="text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h1 className="text-2xl font-bold text-foreground">{agent.name}</h1>
                  <Badge variant={isRunning ? "default" : "secondary"} className={isRunning ? "bg-success text-white" : ""}>
                    {isRunning ? "Active" : "Paused"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">Agent #{agent.number} • {agent.model}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRunning(!isRunning)}
                className="gap-2"
              >
                {isRunning ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                {isRunning ? "Pause" : "Start"}
              </Button>
              <Button variant="outline" size="sm">
                <Settings className="h-4 w-4 mr-2" />
                Configure
              </Button>
              <Button size="sm" className="bg-accent hover:bg-accent/90">
                License Agent
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Grid */}
      <section className="py-8 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, idx) => (
              <Card key={idx} className="p-6 border-border bg-card">
                <div className="flex items-start justify-between mb-2">
                  <span className="text-sm text-muted-foreground">{metric.label}</span>
                  {metric.trend === "up" && <TrendingUp className="h-4 w-4 text-success" />}
                  {metric.trend === "down" && <TrendingUp className="h-4 w-4 text-success rotate-180" />}
                </div>
                <div className="text-3xl font-bold text-foreground mb-1">{metric.value}</div>
                <div className={`text-xs ${
                  metric.trend === "up" ? "text-success" : 
                  metric.trend === "down" ? "text-success" : 
                  "text-muted-foreground"
                }`}>
                  {metric.change} from last period
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Dashboard Content */}
      <section className="py-8">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Performance Chart */}
                <Card className="lg:col-span-2 p-6 border-border bg-card">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-foreground">Performance Overview</h3>
                    <Button variant="ghost" size="sm">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Processing Efficiency</span>
                        <span className="font-semibold text-foreground">94%</span>
                      </div>
                      <Progress value={94} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Integration Health</span>
                        <span className="font-semibold text-foreground">100%</span>
                      </div>
                      <Progress value={100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Resource Utilization</span>
                        <span className="font-semibold text-foreground">67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-muted-foreground">Error Recovery Rate</span>
                        <span className="font-semibold text-foreground">99%</span>
                      </div>
                      <Progress value={99} className="h-2" />
                    </div>
                  </div>
                </Card>

                {/* System Status */}
                <Card className="p-6 border-border bg-card">
                  <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-success" />
                        <span className="text-sm text-foreground">Agent Core</span>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">Healthy</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Zap className="h-5 w-5 text-success" />
                        <span className="text-sm text-foreground">AI Model</span>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-success" />
                        <span className="text-sm text-foreground">Integrations</span>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">Connected</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Activity className="h-5 w-5 text-success" />
                        <span className="text-sm text-foreground">API Gateway</span>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">Operational</Badge>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <Card className="p-6 border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((activity, idx) => (
                    <div key={idx} className="flex items-start gap-4 pb-4 border-b border-border last:border-0 last:pb-0">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        activity.status === "success" ? "bg-success/10 text-success" :
                        activity.status === "error" ? "bg-destructive/10 text-destructive" :
                        "bg-info/10 text-info"
                      }`}>
                        {activity.status === "success" ? <CheckCircle2 className="h-4 w-4" /> :
                         activity.status === "error" ? <AlertCircle className="h-4 w-4" /> :
                         <Clock className="h-4 w-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{activity.action}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card className="p-6 border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Analytics Dashboard</h3>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Advanced analytics and reporting coming soon</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="integrations">
              <Card className="p-6 border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Active Integrations</h3>
                <div className="space-y-3">
                  {agent.integrations.map((integration, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                          <CheckCircle2 className="h-5 w-5" />
                        </div>
                        <span className="text-sm font-medium text-foreground">{integration}</span>
                      </div>
                      <Badge className="bg-success/10 text-success border-success/20">Connected</Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AgentDashboard;
