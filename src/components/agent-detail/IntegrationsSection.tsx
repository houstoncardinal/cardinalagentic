import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Database, Code } from "lucide-react";

interface IntegrationsSectionProps {
  agentIntegrations: string[];
}

const integrationCategories = [
  { category: "CRM", tools: ["Salesforce", "HubSpot", "Zoho"] },
  { category: "Project Management", tools: ["Jira", "Asana", "Monday.com"] },
  { category: "Communication", tools: ["Slack", "Teams", "Discord"] },
  { category: "Analytics", tools: ["Tableau", "PowerBI", "Looker"] }
];

export const IntegrationsSection = ({ agentIntegrations }: IntegrationsSectionProps) => {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Seamless Integrations</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Connect with 50+ enterprise platforms out of the box
        </p>

        <div className="space-y-8">
          {integrationCategories.map((category, idx) => (
            <div key={idx}>
              <h3 className="text-xl font-semibold text-foreground mb-4">{category.category}</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {category.tools.map((tool, tIdx) => (
                  <Card key={tIdx} className="p-4 border-border bg-card text-center hover:border-accent/50 transition-all hover:shadow-md">
                    <div className="flex items-center justify-center h-12 mb-2">
                      <Globe className="h-6 w-6 text-accent" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{tool}</span>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {agentIntegrations.map((integration, idx) => (
            <Card key={idx} className="p-6 border-border bg-card hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent flex-shrink-0">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-1">{integration}</h4>
                  <p className="text-sm text-muted-foreground">Pre-configured and ready to deploy</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Card className="p-8 bg-muted/30 border-border">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Code className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Custom Integrations</h3>
            <p className="text-muted-foreground mb-4">
              Need a custom integration? Our REST API and webhooks make it easy to connect to any system.
            </p>
            <Button variant="outline">View API Documentation</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};