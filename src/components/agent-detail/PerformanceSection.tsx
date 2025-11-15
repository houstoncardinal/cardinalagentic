import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, Users, Clock, Star } from "lucide-react";

const performanceMetrics = [
  { label: "Average Response Time", value: "< 200ms", progress: 95 },
  { label: "Success Rate", value: "99.7%", progress: 99 },
  { label: "Cost Reduction", value: "73%", progress: 73 },
  { label: "Time Saved", value: "40hrs/week", progress: 85 }
];

export const PerformanceSection = () => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-8">Performance Metrics</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {performanceMetrics.map((metric, idx) => (
            <Card key={idx} className="p-6 border-border bg-card">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <p className="text-3xl font-bold text-foreground">{metric.value}</p>
                </div>
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
              <Progress value={metric.progress} className="h-2" />
            </Card>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6 border-border bg-card text-center">
          <Users className="h-8 w-8 text-accent mx-auto mb-4" />
          <div className="text-3xl font-bold text-foreground mb-2">500+</div>
          <p className="text-sm text-muted-foreground">Active Deployments</p>
        </Card>
        <Card className="p-6 border-border bg-card text-center">
          <Clock className="h-8 w-8 text-accent mx-auto mb-4" />
          <div className="text-3xl font-bold text-foreground mb-2">10M+</div>
          <p className="text-sm text-muted-foreground">Tasks Processed</p>
        </Card>
        <Card className="p-6 border-border bg-card text-center">
          <Star className="h-8 w-8 text-accent mx-auto mb-4" />
          <div className="text-3xl font-bold text-foreground mb-2">4.9/5</div>
          <p className="text-sm text-muted-foreground">Customer Rating</p>
        </Card>
      </div>

      <Card className="p-8 bg-muted/30 border-border">
        <h3 className="text-xl font-bold text-foreground mb-4">Benchmark Comparisons</h3>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground">vs. Manual Processing</span>
              <span className="font-semibold text-accent">89% faster</span>
            </div>
            <Progress value={89} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground">vs. Traditional Automation</span>
              <span className="font-semibold text-accent">64% more accurate</span>
            </div>
            <Progress value={64} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-foreground">Cost Efficiency</span>
              <span className="font-semibold text-accent">73% reduction</span>
            </div>
            <Progress value={73} className="h-2" />
          </div>
        </div>
      </Card>
    </div>
  );
};