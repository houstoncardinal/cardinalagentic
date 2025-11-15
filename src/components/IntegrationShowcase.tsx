import { Code, Database, Cloud, Lock, Cpu, Globe, Boxes, Workflow } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

const integrations = [
  { icon: Database, name: "Databases", description: "PostgreSQL, MongoDB, MySQL" },
  { icon: Cloud, name: "Cloud Platforms", description: "AWS, Azure, GCP" },
  { icon: Code, name: "APIs", description: "REST, GraphQL, WebSocket" },
  { icon: Lock, name: "Security", description: "OAuth, SSO, MFA" },
  { icon: Cpu, name: "AI/ML", description: "OpenAI, Anthropic, Custom Models" },
  { icon: Globe, name: "Web Services", description: "Slack, Teams, Email" },
  { icon: Boxes, name: "CRM/ERP", description: "Salesforce, SAP, Oracle" },
  { icon: Workflow, name: "Automation", description: "Zapier, Make, n8n" },
];

const IntegrationShowcase = () => {
  return (
    <section className="py-24 bg-muted/30 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
              Seamless Integration Ecosystem
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Connect with any tool in your tech stack. Our AI agents integrate with 100+ platforms out of the box.
            </p>
          </div>
        </ScrollAnimation>

        <div className="max-w-6xl mx-auto">
          {/* Central hub visualization */}
          <div className="relative">
            <ScrollAnimation delay={200}>
              <div className="flex items-center justify-center mb-16">
                <div className="relative">
                  <div className="w-40 h-40 rounded-full bg-gradient-hero p-1 shadow-glow-accent">
                    <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                      <div className="text-center">
                        <Brain className="w-16 h-16 text-primary mx-auto mb-2" />
                        <p className="text-sm font-semibold text-foreground">AI Core</p>
                      </div>
                    </div>
                  </div>
                  {/* Orbiting elements */}
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 w-4 h-4 rounded-full bg-primary shadow-glow" />
                  </div>
                  <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 w-3 h-3 rounded-full bg-accent shadow-glow-accent" />
                  </div>
                </div>
              </div>
            </ScrollAnimation>

            {/* Integration cards in a circular layout */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {integrations.map((integration, index) => (
                <ScrollAnimation key={integration.name} delay={index * 100}>
                  <div className="group relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl blur-xl group-hover:blur-2xl transition-all opacity-0 group-hover:opacity-100" />
                    <div className="relative p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-hover">
                      <integration.icon className="w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="font-bold text-lg mb-2 text-foreground">{integration.name}</h3>
                      <p className="text-sm text-muted-foreground">{integration.description}</p>
                    </div>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>

          <ScrollAnimation delay={900}>
            <div className="mt-16 text-center">
              <p className="text-muted-foreground mb-6">
                Don't see your integration? We can build custom connectors for your specific needs.
              </p>
              <button className="px-8 py-3 rounded-lg bg-primary text-primary-foreground font-semibold hover:bg-primary/90 transition-colors shadow-elegant hover:shadow-hover">
                Request Custom Integration
              </button>
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  );
};

const Brain = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
  </svg>
);

export default IntegrationShowcase;
