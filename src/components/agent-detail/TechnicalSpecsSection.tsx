import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Cpu, Database, Gauge, Shield, Zap, Cloud } from "lucide-react";

interface TechnicalSpecsSectionProps {
  agent: {
    name: string;
    model: string;
    modality: string;
  };
}

export const TechnicalSpecsSection = ({ agent }: TechnicalSpecsSectionProps) => {
  const specs = [
    {
      category: "Performance",
      icon: Gauge,
      items: [
        { label: "Max Throughput", value: "10K requests/min" },
        { label: "Avg Latency", value: "< 100ms" },
        { label: "Uptime SLA", value: "99.9%" },
        { label: "Auto-scaling", value: "Enabled" }
      ]
    },
    {
      category: "Infrastructure",
      icon: Cloud,
      items: [
        { label: "Deployment", value: "Multi-region" },
        { label: "Backup Frequency", value: "Real-time" },
        { label: "Disaster Recovery", value: "< 1 hour RPO" },
        { label: "Load Balancing", value: "Automatic" }
      ]
    },
    {
      category: "Security",
      icon: Shield,
      items: [
        { label: "Encryption", value: "AES-256 at rest" },
        { label: "Transport Security", value: "TLS 1.3" },
        { label: "Authentication", value: "OAuth 2.0, SAML" },
        { label: "Audit Logs", value: "Comprehensive" }
      ]
    },
    {
      category: "Compliance",
      icon: CheckCircle2,
      items: [
        { label: "SOC 2 Type II", value: "Certified" },
        { label: "GDPR", value: "Compliant" },
        { label: "HIPAA", value: "Available" },
        { label: "ISO 27001", value: "Certified" }
      ]
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Technical Specifications</h2>
        <p className="text-muted-foreground">
          Comprehensive technical details and infrastructure specifications for {agent.name}.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {specs.map((spec, idx) => {
          const Icon = spec.icon;
          return (
            <Card key={idx} className="p-6 border-border bg-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-xl font-semibold text-foreground">{spec.category}</h3>
              </div>
              <div className="space-y-3">
                {spec.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <span className="text-sm text-muted-foreground">{item.label}</span>
                    <Badge variant="secondary" className="text-xs">{item.value}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Model Details */}
      <Card className="p-6 border-border bg-gradient-mesh">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Cpu className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">AI Model</h4>
              <p className="text-sm text-muted-foreground">{agent.model}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Processing Type</h4>
              <p className="text-sm text-muted-foreground">{agent.modality}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
              <Database className="h-5 w-5" />
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-1">Context Window</h4>
              <p className="text-sm text-muted-foreground">128K tokens</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
