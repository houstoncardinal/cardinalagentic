import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Image, Video, Calendar, TrendingUp } from "lucide-react";

export const ContentCreationDashboard = () => {
  const contentStats = [
    { type: "Blog Posts", count: 1247, icon: FileText, color: "text-blue-500" },
    { type: "Social Media", count: 3456, icon: Image, color: "text-purple-500" },
    { type: "Videos", count: 234, icon: Video, color: "text-red-500" },
    { type: "Scheduled", count: 89, icon: Calendar, color: "text-green-500" }
  ];

  const recentContent = [
    { title: "10 Tips for Effective Marketing", type: "Blog", status: "published", engagement: "High" },
    { title: "Product Launch Campaign", type: "Social", status: "scheduled", engagement: "—" },
    { title: "Customer Success Story", type: "Video", status: "draft", engagement: "—" }
  ];

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-4">
        {contentStats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card key={idx} className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-muted">
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.count.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">{stat.type}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-lg">Recent Content</h3>
          <Button size="sm">Create New</Button>
        </div>
        <div className="space-y-3">
          {recentContent.map((content, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div className="space-y-1">
                <p className="font-medium">{content.title}</p>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{content.type}</Badge>
                  <Badge variant={content.status === "published" ? "default" : "outline"}>
                    {content.status}
                  </Badge>
                </div>
              </div>
              {content.engagement !== "—" && (
                <Badge className="bg-success/10 text-success">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {content.engagement}
                </Badge>
              )}
            </div>
          ))}
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-5">
          <h4 className="font-semibold mb-3">Content Performance</h4>
          <div className="space-y-3">
            {[
              { platform: "Blog", engagement: 94 },
              { platform: "LinkedIn", engagement: 87 },
              { platform: "Twitter", engagement: 76 }
            ].map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.platform}</span>
                  <span className="text-muted-foreground">{item.engagement}% engagement</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-primary/60"
                    style={{ width: `${item.engagement}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h4 className="font-semibold mb-3">Content Calendar</h4>
          <div className="space-y-2">
            <div className="p-3 bg-success/10 border border-success/20 rounded-lg">
              <p className="text-sm font-medium">Today: 5 posts scheduled</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-sm">This Week: 23 posts planned</p>
            </div>
            <div className="p-3 bg-muted/30 rounded-lg">
              <p className="text-sm">Next Month: 87 posts in pipeline</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
