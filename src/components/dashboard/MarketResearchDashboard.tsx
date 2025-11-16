import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Search, Database, FileText, Download } from "lucide-react";

export const MarketResearchDashboard = () => {
  const recentResearch = [
    { title: "Q4 2024 Consumer Trends Analysis", industry: "Retail", date: "2024-01-15", status: "completed" },
    { title: "Competitor Pricing Strategy Review", industry: "Technology", date: "2024-01-14", status: "completed" },
    { title: "Emerging Market Opportunities", industry: "Healthcare", date: "2024-01-13", status: "in-progress" }
  ];

  const insights = [
    { metric: "Market Reports Generated", value: "247", trend: "+18%" },
    { metric: "Data Sources Analyzed", value: "1,234", trend: "+24%" },
    { metric: "Competitor Profiles", value: "89", trend: "+12%" },
    { metric: "Trend Alerts Sent", value: "156", trend: "+31%" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        {insights.map((insight, idx) => (
          <Card key={idx} className="p-4">
            <p className="text-sm text-muted-foreground mb-1">{insight.metric}</p>
            <div className="flex items-baseline gap-2">
              <p className="text-2xl font-bold">{insight.value}</p>
              <Badge variant="outline" className="bg-success/10 text-success">
                <TrendingUp className="h-3 w-3 mr-1" />
                {insight.trend}
              </Badge>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Recent Research Projects
          </h3>
          <Button variant="outline" size="sm">
            <Search className="h-4 w-4 mr-2" />
            New Research
          </Button>
        </div>
        <div className="space-y-3">
          {recentResearch.map((project, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">{project.title}</p>
                <div className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span>{project.industry}</span>
                  <span>•</span>
                  <span>{project.date}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge variant={project.status === "completed" ? "default" : "outline"}>
                  {project.status}
                </Badge>
                <Button variant="ghost" size="sm">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h4 className="font-semibold mb-3 flex items-center gap-2">
            <Database className="h-4 w-4" />
            Active Data Integrations
          </h4>
          <div className="space-y-2">
            {["CRM Agent", "Industry Databases", "Market Analytics Tools"].map((integration, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <span className="text-sm">{integration}</span>
                <Badge variant="outline" className="bg-success/10 text-success">Connected</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h4 className="font-semibold mb-3">Top Research Topics</h4>
          <div className="space-y-3">
            {[
              { topic: "Consumer Behavior", count: 45 },
              { topic: "Competitive Analysis", count: 38 },
              { topic: "Market Sizing", count: 32 }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.topic}</span>
                  <span className="text-muted-foreground">{item.count} reports</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/60"
                    style={{ width: `${(item.count / 45) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};
