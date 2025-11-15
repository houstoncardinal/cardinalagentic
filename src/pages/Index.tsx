import Navigation from "@/components/Navigation";
import TrustSection from "@/components/TrustSection";
import FeaturesSection from "@/components/FeaturesSection";
import EnterpriseSection from "@/components/EnterpriseSection";
import Footer from "@/components/Footer";
import AgentCard from "@/components/AgentCard";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Shield } from "lucide-react";

const agents = [
  {
    number: 1,
    name: "Market Research Agent",
    modality: "Text-heavy",
    integrations: [
      "CRM Agent for client alignment",
      "Branding & Marketing Agent for market insights",
      "Industry databases and internal knowledge systems"
    ],
    model: "AWS Nova Lite"
  },
  {
    number: 2,
    name: "Product & Services Development Agent",
    modality: "Text-heavy",
    integrations: [
      "Market Research Agent for trends data",
      "Collaborative interfaces for human consultants",
      "Internal project management systems"
    ],
    model: "Deepseek"
  },
  {
    number: 3,
    name: "Branding & Marketing Agent",
    modality: "Multimodal (Text + Vision)",
    integrations: [
      "Market Research Agent for trend insights",
      "External image sources and stock photography databases",
      "Interactive dashboards and collaborative UX"
    ],
    model: "Claude Sonnet 4.5"
  },
  {
    number: 4,
    name: "Content & Copywriting Agent",
    modality: "Text (High-volume)",
    integrations: [
      "Branding & Marketing Agent for consistent branding",
      "Content management systems (CMS)",
      "Social media platforms integration"
    ],
    model: "Deepseek"
  },
  {
    number: 5,
    name: "Marketing & Social Media Agent",
    modality: "Multimodal (Visual + Text)",
    integrations: [
      "Social media APIs and analytics platforms",
      "Content & Copywriting Agent collaboration",
      "Branding & Marketing Agent coordination"
    ],
    model: "AWS Nova Lite"
  },
  {
    number: 6,
    name: "Speaking Engagement Agent",
    modality: "Text-based Analytics",
    integrations: [
      "CRM Agent for speaking opportunities alignment",
      "External event APIs integration",
      "Internal calendars and scheduling systems"
    ],
    model: "AWS Nova Lite"
  },
  {
    number: 7,
    name: "Delivery & Product Development Agent",
    modality: "Text-heavy",
    integrations: [
      "Project management systems",
      "Development team collaboration tools",
      "Quality assurance platforms"
    ],
    model: "Deepseek"
  },
  {
    number: 8,
    name: "Security & Compliance Agent",
    modality: "Text (Policy Analysis)",
    integrations: [
      "Security platforms and monitoring tools",
      "Real-time integration with all internal agents",
      "Compliance management systems"
    ],
    model: "AWS Nova Lite"
  },
  {
    number: 9,
    name: "Virtual Receptionist Agent",
    modality: "Text (Voice via STT)",
    integrations: [
      "Phone systems and communication platforms",
      "CRM for request routing",
      "Internal agent coordination"
    ],
    model: "AWS Nova Lite"
  },
  {
    number: 10,
    name: "Client Relationship Management Agent",
    modality: "Text-heavy",
    integrations: [
      "Salesforce or HubSpot CRM core integration",
      "Market research and financial agents",
      "Branding agents for client communications"
    ],
    model: "Deepseek"
  },
  {
    number: 11,
    name: "Financial Analysis Agent",
    modality: "Text-heavy",
    integrations: [
      "Financial systems and accounting software",
      "Business intelligence platforms",
      "Executive reporting dashboards"
    ],
    model: "AWS Nova Lite"
  },
  {
    number: 12,
    name: "Human Resources Agent",
    modality: "Text + Document Analysis",
    integrations: [
      "HR systems (Workday, BambooHR)",
      "Training & Development Agent collaboration",
      "Employee management platforms"
    ],
    model: "AWS Nova Lite"
  },
  {
    number: 13,
    name: "Training & Development Agent",
    modality: "Multimodal (Training Materials)",
    integrations: [
      "Internal LMS platforms and knowledge bases",
      "HR Agent collaboration",
      "Performance tracking systems"
    ],
    model: "AWS Nova Lite"
  },
  {
    number: 14,
    name: "Project Management Agent",
    modality: "Text-heavy",
    integrations: [
      "Project management tools (Jira, Asana)",
      "Team collaboration platforms",
      "Resource allocation systems"
    ],
    model: "AWS Nova Lite"
  }
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-mesh" />
        
        <div className="container mx-auto px-6 py-16 md:py-24 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Main Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/10 text-accent text-sm font-semibold">
                  <Sparkles className="h-4 w-4" />
                  Enterprise AI Agent Platform
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
                  Automate Your Business with{" "}
                  <span className="text-accent">Intelligent AI Agents</span>
                </h1>
                
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Deploy 14 specialized AI agents that work together seamlessly to transform your operations. 
                  From market research to compliance, our autonomous agents handle complex workflows while you focus on growth.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent mt-1">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Multi-Agent Collaboration</h3>
                    <p className="text-sm text-muted-foreground">Agents communicate and coordinate autonomously to complete complex business processes end-to-end</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent mt-1">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Enterprise-Grade Integration</h3>
                    <p className="text-sm text-muted-foreground">Seamlessly connect with your existing tools: Salesforce, Jira, Workday, and 50+ platforms</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent mt-1">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">SOC 2 Type II Compliant</h3>
                    <p className="text-sm text-muted-foreground">Bank-level security with continuous monitoring, encryption, and audit trails for every action</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button size="lg" variant="outline" className="border-border hover:bg-muted">
                  <Shield className="mr-2 h-5 w-5" />
                  View Security & Compliance
                </Button>
              </div>

              <div className="flex items-center gap-8 pt-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">14-day free trial</span>
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Visual */}
            <div className="space-y-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-card border border-border rounded-lg p-6 shadow-elegant hover:shadow-hover transition-all">
                  <div className="text-3xl font-bold text-foreground mb-1">99.9%</div>
                  <div className="text-sm text-muted-foreground">Uptime SLA</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 shadow-elegant hover:shadow-hover transition-all">
                  <div className="text-3xl font-bold text-foreground mb-1">10M+</div>
                  <div className="text-sm text-muted-foreground">Tasks Processed</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 shadow-elegant hover:shadow-hover transition-all">
                  <div className="text-3xl font-bold text-foreground mb-1">50+</div>
                  <div className="text-sm text-muted-foreground">Integrations</div>
                </div>
                <div className="bg-card border border-border rounded-lg p-6 shadow-elegant hover:shadow-hover transition-all">
                  <div className="text-3xl font-bold text-foreground mb-1">24/7</div>
                  <div className="text-sm text-muted-foreground">Support</div>
                </div>
              </div>

              <div className="bg-card border border-border rounded-xl p-8 shadow-elegant">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-muted-foreground">Agent Network Status</span>
                    <span className="flex items-center gap-2 text-xs font-semibold text-success">
                      <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
                      All Systems Operational
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { name: 'Market Research', value: 98 },
                      { name: 'CRM & Sales', value: 100 },
                      { name: 'Content Generation', value: 95 },
                      { name: 'Security & Compliance', value: 100 },
                    ].map((agent) => (
                      <div key={agent.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground font-medium">{agent.name}</span>
                          <span className="text-muted-foreground">{agent.value}%</span>
                        </div>
                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-accent rounded-full transition-all duration-500"
                            style={{ width: `${agent.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-center gap-8 text-muted-foreground">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">500+</div>
                  <div className="text-xs">Enterprise Clients</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">14</div>
                  <div className="text-xs">Specialized Agents</div>
                </div>
                <div className="h-12 w-px bg-border" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">85%</div>
                  <div className="text-xs">Cost Reduction</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustSection />
      
      <FeaturesSection />

      {/* Agents Grid Section */}
      <section id="agents" className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-4">
              <Sparkles className="h-4 w-4" />
              14 Specialized Agents
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Meet Your AI Workforce
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Each agent is purpose-built for specific business functions, powered by cutting-edge AI models, 
              and designed to integrate seamlessly with your existing systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {agents.map((agent, idx) => (
              <AgentCard 
                key={agent.number} 
                {...agent} 
                delay={idx * 50}
              />
            ))}
          </div>
        </div>
      </section>

      <EnterpriseSection />

      {/* CTA Section */}
      <section id="pricing" className="py-24 bg-gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-white/80">
              Deploy Cardinal AI Agents and unlock unprecedented efficiency across your entire organization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white shadow-glow group">
                Get Started Today
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Schedule Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
