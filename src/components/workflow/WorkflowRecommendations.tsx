import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, TrendingUp, Plus, ArrowRight } from "lucide-react";
import { agents } from "@/data/agentsData";

interface RecommendedWorkflow {
  id: string;
  objective: string;
  agents: number[];
  estimatedEfficiency: number;
  description: string;
  benefits: string[];
}

export const WorkflowRecommendations = () => {
  const recommendations: RecommendedWorkflow[] = [
    {
      id: "content-pipeline",
      objective: "Content Marketing Pipeline",
      agents: [1, 3, 4, 5],
      estimatedEfficiency: 94,
      description: "Automated content creation and distribution workflow",
      benefits: ["40% faster content delivery", "Consistent brand voice", "Multi-channel optimization"]
    },
    {
      id: "client-onboarding",
      objective: "Client Onboarding & Management",
      agents: [9, 10, 12, 6],
      estimatedEfficiency: 91,
      description: "Streamlined client intake and relationship management",
      benefits: ["60% reduction in onboarding time", "Improved client satisfaction", "Automated follow-ups"]
    },
    {
      id: "product-launch",
      objective: "Product Development & Launch",
      agents: [2, 3, 7, 4, 5],
      estimatedEfficiency: 88,
      description: "End-to-end product development and market launch",
      benefits: ["Faster time-to-market", "Data-driven decisions", "Coordinated marketing"]
    },
    {
      id: "compliance-security",
      objective: "Security & Compliance Monitoring",
      agents: [8, 11, 12],
      estimatedEfficiency: 96,
      description: "Real-time security monitoring and compliance automation",
      benefits: ["99.9% compliance rate", "Automated auditing", "Risk mitigation"]
    }
  ];

  const getAgentName = (agentNumber: number) => {
    return agents.find(a => a.number === agentNumber)?.name || "Unknown Agent";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Lightbulb className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">AI-Powered Recommendations</h3>
            <p className="text-sm text-muted-foreground">Optimized agent combinations for your objectives</p>
          </div>
        </div>
        <Badge variant="outline" className="gap-1">
          <TrendingUp className="h-3 w-3" />
          4 Suggestions
        </Badge>
      </div>

      <div className="grid gap-4">
        {recommendations.map((rec) => (
          <Card key={rec.id} className="p-5 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <h4 className="font-semibold text-base">{rec.objective}</h4>
                  <p className="text-sm text-muted-foreground">{rec.description}</p>
                </div>
                <Badge className="bg-success/10 text-success border-success/20">
                  {rec.estimatedEfficiency}% Efficient
                </Badge>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Recommended Agents ({rec.agents.length})
                </p>
                <div className="flex flex-wrap gap-2">
                  {rec.agents.map((agentNum) => (
                    <Badge key={agentNum} variant="outline" className="text-xs">
                      #{agentNum} {getAgentName(agentNum).split(' ')[0]}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                  Expected Benefits
                </p>
                <div className="grid gap-1">
                  {rec.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm">
                      <ArrowRight className="h-3 w-3 text-success" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
