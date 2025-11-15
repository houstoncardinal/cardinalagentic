import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowRight, CheckCircle2, Zap, Shield, Database, ArrowLeft
} from "lucide-react";
import { agents } from "@/data/agentsData";
import { PricingSection } from "@/components/agent-detail/PricingSection";
import { PerformanceSection } from "@/components/agent-detail/PerformanceSection";
import { IntegrationsSection } from "@/components/agent-detail/IntegrationsSection";
import { ApiDocSection } from "@/components/agent-detail/ApiDocSection";
import { TechnicalSpecsSection } from "@/components/agent-detail/TechnicalSpecsSection";
import { DeploymentSection } from "@/components/agent-detail/DeploymentSection";
import WorkflowCanvas from "@/components/WorkflowCanvas";

const AgentDetail = () => {
  const { agentId } = useParams();
  const agent = agents.find(a => a.number === Number(agentId));

  if (!agent) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-6 py-24 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Agent Not Found</h1>
          <Link to="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const capabilities = [
    "Real-time data processing and analysis",
    "Automated workflow execution",
    "Multi-system integration support",
    "Advanced error handling and recovery",
    "24/7 autonomous operation",
    "Continuous learning and optimization",
    "Enterprise-grade security and compliance",
    "Scalable performance under load"
  ];

  const useCases = [
    {
      title: "Enterprise Automation",
      description: "Streamline complex business processes across departments"
    },
    {
      title: "Data Intelligence",
      description: "Extract actionable insights from multiple data sources"
    },
    {
      title: "Workflow Optimization",
      description: "Reduce manual tasks and improve operational efficiency"
    },
    {
      title: "Integration Hub",
      description: "Connect and coordinate between existing business systems"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-mesh">
        <div className="container mx-auto px-6 py-16 md:py-24">
          <div className="max-w-4xl">
            <Link to="/#agents" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
              <ArrowLeft className="h-4 w-4" />
              Back to All Agents
            </Link>
            
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              Agent #{agent.number}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              {agent.name}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Specialized AI agent designed for {agent.name.toLowerCase()} with advanced {agent.modality.toLowerCase()} capabilities, 
              powered by {agent.model} for optimal performance and accuracy.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to={`/agent/${agent.number}/dashboard`}>
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground group">
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
                Request Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-16 border-b border-border bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl">
            <Card className="p-6 border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Zap className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground">Processing Type</h3>
              </div>
              <p className="text-sm text-muted-foreground">{agent.modality}</p>
            </Card>
            
            <Card className="p-6 border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Database className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground">AI Model</h3>
              </div>
              <p className="text-sm text-muted-foreground">{agent.model}</p>
            </Card>
            
            <Card className="p-6 border-border bg-card">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Shield className="h-5 w-5" />
                </div>
                <h3 className="font-semibold text-foreground">Compliance</h3>
              </div>
              <p className="text-sm text-muted-foreground">SOC 2 Type II, GDPR</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Capabilities */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
              Key Capabilities
            </h2>
            
            <div className="grid md:grid-cols-2 gap-4">
              {capabilities.map((capability, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-muted-foreground">{capability}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Advanced Tabs Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <Tabs defaultValue="capabilities" className="max-w-6xl mx-auto">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-8 mb-8">
              <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
              <TabsTrigger value="workflows">Workflows</TabsTrigger>
              <TabsTrigger value="specs">Tech Specs</TabsTrigger>
              <TabsTrigger value="deployment">Deployment</TabsTrigger>
              <TabsTrigger value="pricing">Pricing</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="api">API & Docs</TabsTrigger>
            </TabsList>

            {/* Capabilities Tab */}
            <TabsContent value="capabilities" className="space-y-8">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Core Capabilities</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {capabilities.map((capability, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg border border-border bg-card hover:border-accent/50 transition-colors">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                      <span className="text-foreground">{capability}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-foreground mb-6">Use Cases</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {useCases.map((useCase, idx) => (
                    <Card key={idx} className="p-6 border-border bg-card hover:shadow-lg transition-shadow">
                      <h4 className="text-lg font-semibold text-foreground mb-2">{useCase.title}</h4>
                      <p className="text-muted-foreground">{useCase.description}</p>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="workflows" className="space-y-8">
              <WorkflowCanvas />
            </TabsContent>

            <TabsContent value="specs" className="space-y-8">
              <TechnicalSpecsSection agent={agent} />
            </TabsContent>

            <TabsContent value="deployment" className="space-y-8">
              <DeploymentSection />
            </TabsContent>

            <TabsContent value="pricing" className="space-y-6">
              <PricingSection />
            </TabsContent>

            <TabsContent value="performance" className="space-y-8">
              <PerformanceSection />
            </TabsContent>

            <TabsContent value="integrations" className="space-y-8">
              <IntegrationsSection agentIntegrations={agent.integrations} />
            </TabsContent>

            <TabsContent value="api" className="space-y-6">
              <ApiDocSection agentNumber={agent.number} />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 border-t border-border bg-gradient-mesh">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Ready to Transform Your Operations?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Start your 14-day free trial today. No credit card required.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Link to="/auth">
                <Button size="lg" className="bg-accent hover:bg-accent/90 group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to={`/agent/${agent.number}/dashboard`}>
                <Button size="lg" variant="outline">
                  View Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AgentDetail;