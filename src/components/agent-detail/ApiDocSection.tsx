import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Code, Cpu, Settings, Lock } from "lucide-react";

interface ApiDocSectionProps {
  agentNumber: number;
}

export const ApiDocSection = ({ agentNumber }: ApiDocSectionProps) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-4">Developer Resources</h2>
        <p className="text-lg text-muted-foreground mb-8">
          Comprehensive API documentation and SDKs for seamless integration
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6 border-border bg-card">
          <Code className="h-8 w-8 text-accent mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">REST API</h3>
          <p className="text-muted-foreground mb-4">
            Full-featured REST API with comprehensive endpoints for all agent operations
          </p>
          <Button variant="outline">View API Docs</Button>
        </Card>

        <Card className="p-6 border-border bg-card">
          <Cpu className="h-8 w-8 text-accent mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">SDKs & Libraries</h3>
          <p className="text-muted-foreground mb-4">
            Official SDKs for Python, Node.js, Java, and more languages
          </p>
          <Button variant="outline">Browse SDKs</Button>
        </Card>

        <Card className="p-6 border-border bg-card">
          <Settings className="h-8 w-8 text-accent mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Webhooks</h3>
          <p className="text-muted-foreground mb-4">
            Real-time event notifications for agent activities and status changes
          </p>
          <Button variant="outline">Setup Webhooks</Button>
        </Card>

        <Card className="p-6 border-border bg-card">
          <Lock className="h-8 w-8 text-accent mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">Authentication</h3>
          <p className="text-muted-foreground mb-4">
            Secure API key and OAuth 2.0 authentication methods
          </p>
          <Button variant="outline">Security Docs</Button>
        </Card>
      </div>

      <Card className="p-8 bg-muted/30 border-border">
        <h3 className="text-xl font-bold text-foreground mb-4">Quick Start Example</h3>
        <div className="bg-background rounded-lg p-6 font-mono text-sm overflow-x-auto border border-border">
          <pre className="text-foreground">
{`import { AgentClient } from '@platform/agents';

const client = new AgentClient({
  apiKey: 'your_api_key',
  agentId: '` + agentNumber + `'
});

// Execute agent task
const result = await client.execute({
  action: 'analyze',
  data: { /* your data */ }
});

console.log(result);`}
          </pre>
        </div>
      </Card>
    </div>
  );
};