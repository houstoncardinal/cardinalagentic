import { Shield, Zap, Lock, Globe } from "lucide-react";

const trustIndicators = [
  {
    icon: Shield,
    label: "Enterprise Security",
    description: "SOC 2 Type II Certified"
  },
  {
    icon: Zap,
    label: "99.9% Uptime",
    description: "Guaranteed SLA"
  },
  {
    icon: Lock,
    label: "GDPR Compliant",
    description: "Data Privacy First"
  },
  {
    icon: Globe,
    label: "Global Scale",
    description: "Multi-Region Support"
  }
];

const TrustSection = () => {
  return (
    <section className="py-16 border-b border-border bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {trustIndicators.map((item, idx) => (
            <div
              key={item.label}
              className="text-center space-y-3 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex justify-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <item.icon className="h-6 w-6" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{item.label}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
