import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ArrowRight, CheckCircle2, Zap, Shield, Database, ArrowLeft,
  Code, Settings, TrendingUp, Users, Clock, Star, Cpu,
  Globe, Lock, BarChart3, CheckCircle, DollarSign
} from "lucide-react";
import { agents } from "@/data/agentsData";

const AgentDetail = () => {
  const { agentId } = useParams();
  const agent = agents.find(a => a.number === Number(agentId));
  const [selectedPlan, setSelectedPlan] = useState<'starter' | 'professional' | 'enterprise'>('professional');

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

  const pricingPlans = [
    {
      name: "Starter",
      price: "$499",
      period: "/month",
      description: "Perfect for small teams getting started",
      features: [
        "Up to 10,000 operations/month",
        "5 active integrations",
        "Email support",
        "99.5% uptime SLA",
        "Basic analytics",
        "Community access"
      ],
      cta: "Start Free Trial"
    },
    {
      name: "Professional",
      price: "$1,499",
      period: "/month",
      description: "For growing businesses scaling automation",
      features: [
        "Up to 100,000 operations/month",
        "Unlimited integrations",
        "Priority support 24/7",
        "99.9% uptime SLA",
        "Advanced analytics & reporting",
        "Custom workflows",
        "API access",
        "Dedicated account manager"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "pricing",
      description: "For large organizations with specific needs",
      features: [
        "Unlimited operations",
        "White-label options",
        "99.99% uptime SLA",
        "Premium support with SLAs",
        "Custom AI model training",
        "On-premise deployment option",
        "Advanced security features",
        "Dedicated infrastructure"
      ],
      cta: "Contact Sales"
    }
  ];

  const performanceMetrics = [
    { label: "Average Response Time", value: "< 200ms", progress: 95 },
    { label: "Success Rate", value: "99.7%", progress: 99 },
    { label: "Cost Reduction", value: "73%", progress: 73 },
    { label: "Time Saved", value: "40hrs/week", progress: 85 }
  ];

  const integrationCategories = [
    { category: "CRM", tools: ["Salesforce", "HubSpot", "Zoho"] },
    { category: "Project Management", tools: ["Jira", "Asana", "Monday.com"] },
    { category: "Communication", tools: ["Slack", "Teams", "Discord"] },
    { category: "Analytics", tools: ["Tableau", "PowerBI", "Looker"] }
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
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-8">
              <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
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

            {/* Pricing Tab */}
            <TabsContent value="pricing" className="space-y-6">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Plan</h2>
                <p className="text-lg text-muted-foreground">Flexible pricing that scales with your business needs</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {pricingPlans.map((plan, idx) => (
                  <Card 
                    key={idx} 
                    className={`p-8 border-border bg-card relative ${
                      plan.popular ? 'border-accent border-2 shadow-xl scale-105' : ''
                    }`}
                  >
                    {plan.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                        Most Popular
                      </Badge>
                    )}
                    
                    <div className="text-center mb-6">
                      <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                        <span className="text-muted-foreground">{plan.period}</span>
                      </div>
                    </div>

                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2">
                          <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full ${plan.popular ? 'bg-accent hover:bg-accent/90' : ''}`}
                      variant={plan.popular ? 'default' : 'outline'}
                    >
                      {plan.cta}
                    </Button>
                  </Card>
                ))}
              </div>

              <Card className="p-8 bg-muted/30 border-border mt-12">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
                    <DollarSign className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">ROI Calculator</h3>
                    <p className="text-muted-foreground mb-4">
                      Average customers save $47,000 annually and reduce manual work by 73%. 
                      Calculate your potential ROI based on your team size and current processes.
                    </p>
                    <Button variant="outline">Calculate Your ROI</Button>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Performance Tab */}
            <TabsContent value="performance" className="space-y-8">
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
            </TabsContent>

            {/* Integrations Tab */}
            <TabsContent value="integrations" className="space-y-8">
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
                  {agent.integrations.map((integration, idx) => (
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
            </TabsContent>

            {/* API & Documentation Tab */}
            <TabsContent value="api" className="space-y-6">
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
  agentId: '${agent.number}'
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
