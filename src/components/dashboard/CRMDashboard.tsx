import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, DollarSign, TrendingUp, Calendar, Phone, Mail } from "lucide-react";

export const CRMDashboard = () => {
  const metrics = [
    { label: "Active Clients", value: "1,234", icon: Users, trend: "+8.2%" },
    { label: "Pipeline Value", value: "$2.4M", icon: DollarSign, trend: "+15.3%" },
    { label: "Conversion Rate", value: "24.5%", icon: TrendingUp, trend: "+3.1%" },
    { label: "Meetings Scheduled", value: "47", icon: Calendar, trend: "+12%" }
  ];

  const recentActivity = [
    { client: "Acme Corp", action: "Meeting scheduled", type: "meeting", time: "10 min ago" },
    { client: "TechStart Inc", action: "Proposal sent", type: "proposal", time: "1 hour ago" },
    { client: "Global Solutions", action: "Contract signed", type: "success", time: "2 hours ago" }
  ];

  const topClients = [
    { name: "Enterprise Corp", revenue: "$450K", status: "active", satisfaction: 98 },
    { name: "Innovation Labs", revenue: "$380K", status: "active", satisfaction: 95 },
    { name: "Digital Ventures", revenue: "$320K", status: "at-risk", satisfaction: 72 }
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <Card key={idx} className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-2xl font-bold">{metric.value}</p>
                  <p className="text-xs text-muted-foreground">{metric.label}</p>
                  <Badge variant="outline" className="bg-success/10 text-success mt-1">
                    {metric.trend}
                  </Badge>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Recent Activity</h3>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="space-y-3">
            {recentActivity.map((activity, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                <div className="space-y-1">
                  <p className="font-medium text-sm">{activity.client}</p>
                  <p className="text-xs text-muted-foreground">{activity.action}</p>
                </div>
                <div className="text-right">
                  <Badge variant="outline" className={
                    activity.type === "success" ? "bg-success/10 text-success" :
                    activity.type === "meeting" ? "bg-info/10 text-info" :
                    "bg-warning/10 text-warning"
                  }>
                    {activity.type}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-lg">Top Clients</h3>
            <Button variant="outline" size="sm">Manage</Button>
          </div>
          <div className="space-y-3">
            {topClients.map((client, idx) => (
              <div key={idx} className="p-4 border border-border rounded-lg space-y-2">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{client.name}</p>
                  <Badge variant={client.status === "active" ? "default" : "destructive"}>
                    {client.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Revenue: {client.revenue}</span>
                  <span className={client.satisfaction >= 90 ? "text-success" : "text-warning"}>
                    {client.satisfaction}% satisfaction
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${client.satisfaction >= 90 ? "bg-success" : "bg-warning"}`}
                    style={{ width: `${client.satisfaction}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="font-semibold text-lg mb-4">Quick Actions</h3>
        <div className="grid md:grid-cols-3 gap-3">
          <Button variant="outline" className="justify-start">
            <Phone className="h-4 w-4 mr-2" />
            Schedule Call
          </Button>
          <Button variant="outline" className="justify-start">
            <Mail className="h-4 w-4 mr-2" />
            Send Follow-up
          </Button>
          <Button variant="outline" className="justify-start">
            <Calendar className="h-4 w-4 mr-2" />
            Book Meeting
          </Button>
        </div>
      </Card>
    </div>
  );
};
