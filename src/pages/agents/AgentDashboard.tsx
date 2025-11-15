import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Activity, 
  TrendingUp, 
  CheckCircle2,
  Play,
  Pause,
  Settings,
  Zap,
  Bell,
  Download
} from "lucide-react";
import { agents } from "@/data/agentsData";
import { MetricsChart } from "@/components/dashboard/MetricsChart";
import { ActivityLog } from "@/components/dashboard/ActivityLog";
import { CostTracker } from "@/components/dashboard/CostTracker";

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
    { time: "2 min ago", action: "Completed data analysis task", status: "success" as const, details: "Processed 2,458 records successfully" },
    { time: "15 min ago", action: "Batch request processed", status: "success" as const, details: "345 items processed in 12.3s" },
    { time: "1 hour ago", action: "Integration settings updated", status: "info" as const, details: "Salesforce connector reconfigured" },
    { time: "2 hours ago", action: "Automated report generation", status: "success" as const, details: "Weekly analytics report sent to stakeholders" },
    { time: "3 hours ago", action: "System health check completed", status: "success" as const },
    { time: "4 hours ago", action: "API rate limit warning", status: "warning" as const, details: "85% of rate limit reached" },
    { time: "5 hours ago", action: "Integration sync completed", status: "success" as const, details: "HubSpot data synchronized" },
    { time: "6 hours ago", action: "Performance optimization applied", status: "info" as const, details: "Query caching enabled" },
    { time: "8 hours ago", action: "Data backup completed", status: "success" as const, details: "Automated backup successful" },
    { time: "10 hours ago", action: "Security scan completed", status: "success" as const, details: "No vulnerabilities detected" }
  ];

  const performanceData = [
    { time: "00:00", value: 1200 },
    { time: "04:00", value: 980 },
    { time: "08:00", value: 1450 },
    { time: "12:00", value: 1890 },
    { time: "16:00", value: 2100 },
    { time: "20:00", value: 1650 },
    { time: "24:00", value: 1340 }
  ];

  const responseTimeData = [
    { time: "Mon", value: 1.3 },
    { time: "Tue", value: 1.1 },
    { time: "Wed", value: 1.4 },
    { time: "Thu", value: 1.2 },
    { time: "Fri", value: 0.9 },
    { time: "Sat", value: 1.0 },
    { time: "Sun", value: 1.1 }
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
                {/* Performance Charts */}
                <div className="lg:col-span-2 space-y-6">
                  <MetricsChart 
                    title="Tasks Processed (24h)" 
                    data={performanceData}
                    trend="up"
                    trendValue="+12.5%"
                  />
                  <MetricsChart 
                    title="Response Time (7 days)" 
                    data={responseTimeData}
                    unit="s"
                    trend="down"
                    trendValue="-8.3%"
                  />
                </div>

                {/* System Status & Cost */}
                <div className="space-y-6">
                  <Card className="p-6 border-border bg-card">
                    <h3 className="text-lg font-semibold text-foreground mb-4">System Status</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Activity className="h-5 w-5 text-success" />
                          <span className="text-sm text-foreground">Agent Core</span>
                        </div>
                        <Badge variant="default" className="bg-success">Operational</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Zap className="h-5 w-5 text-success" />
                          <span className="text-sm text-foreground">Processing Engine</span>
                        </div>
                        <Badge variant="default" className="bg-success">Healthy</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="h-5 w-5 text-success" />
                          <span className="text-sm text-foreground">Integrations</span>
                        </div>
                        <Badge variant="default" className="bg-success">Connected</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Bell className="h-5 w-5 text-accent" />
                          <span className="text-sm text-foreground">Alerts</span>
                        </div>
                        <Badge variant="secondary">None</Badge>
                      </div>
                    </div>
                    
                    <div className="mt-6 pt-4 border-t border-border">
                      <Button variant="outline" size="sm" className="w-full gap-2">
                        <Download className="h-4 w-4" />
                        Download Report
                      </Button>
                    </div>
                  </Card>

                  <CostTracker />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="activity" className="space-y-6">
              <ActivityLog activities={recentActivity} />
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <Card className="p-6 border-border bg-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Advanced Analytics</h3>
                <p className="text-muted-foreground">
                  Detailed analytics and insights coming soon. This section will include advanced metrics, 
                  custom reports, and predictive analytics.
                </p>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {agent.integrations.map((integration, idx) => (
                  <Card key={idx} className="p-6 border-border bg-card hover:border-accent/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <h4 className="text-lg font-semibold text-foreground">{integration}</h4>
                      <Badge variant="default" className="bg-success">Active</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">
                      Connected and synchronized. Last sync: 2 minutes ago
                    </p>
                    <Button variant="outline" size="sm" className="w-full">
                      Configure
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AgentDashboard;
