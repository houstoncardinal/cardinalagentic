import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Cloud, Server, Globe, Shield } from "lucide-react";

export const DeploymentSection = () => {
  const deploymentOptions = [
    {
      title: "Cloud Hosted",
      icon: Cloud,
      description: "Fully managed cloud deployment with automatic scaling and updates",
      features: [
        "No infrastructure management",
        "Automatic updates & patches",
        "Global CDN distribution",
        "24/7 monitoring & support"
      ],
      badge: "Most Popular"
    },
    {
      title: "Private Cloud",
      icon: Shield,
      description: "Dedicated cloud instance in your preferred region with enhanced security",
      features: [
        "Dedicated resources",
        "Region selection",
        "Enhanced security controls",
        "Custom SLA options"
      ],
      badge: "Enterprise"
    },
    {
      title: "On-Premises",
      icon: Server,
      description: "Deploy within your own infrastructure for maximum control and compliance",
      features: [
        "Complete data sovereignty",
        "Custom integrations",
        "Air-gapped deployment",
        "White-glove setup support"
      ],
      badge: "Custom"
    },
    {
      title: "Hybrid",
      icon: Globe,
      description: "Combine cloud and on-premises deployment for optimal flexibility",
      features: [
        "Best of both worlds",
        "Flexible data routing",
        "Gradual migration path",
        "Unified management"
      ],
      badge: "Flexible"
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Deployment Options</h2>
        <p className="text-muted-foreground">
          Choose the deployment model that best fits your security, compliance, and operational requirements.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {deploymentOptions.map((option, idx) => {
          const Icon = option.icon;
          return (
            <Card key={idx} className="p-6 border-border bg-card hover:border-accent/50 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{option.title}</h3>
                    <Badge variant="secondary" className="mt-1">{option.badge}</Badge>
                  </div>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{option.description}</p>
              <ul className="space-y-2 mb-6">
                {option.features.map((feature, featureIdx) => (
                  <li key={featureIdx} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    <span className="text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant="outline" className="w-full">
                Learn More
              </Button>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
