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
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDUpIi8+PC9nPjwvc3ZnPg==')] opacity-20" />
        
        <div className="container mx-auto px-6 py-24 md:py-32 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
              <Sparkles className="h-4 w-4" />
              Next-Generation AI Agent Suite
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
              Cardinal AI Agents
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed">
              Transform your enterprise operations with 14 specialized AI agents designed for seamless integration and intelligent automation.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white group">
                Explore Our Agents
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Shield className="mr-2 h-5 w-5" />
                View Security
              </Button>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-foreground">14</p>
              <p className="text-muted-foreground">Specialized Agents</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-foreground">3</p>
              <p className="text-muted-foreground">AI Model Providers</p>
            </div>
            <div className="text-center space-y-2">
              <p className="text-4xl md:text-5xl font-bold text-foreground">100%</p>
              <p className="text-muted-foreground">Enterprise Ready</p>
            </div>
          </div>
        </div>
      </section>

      {/* Agents Grid Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 animate-fade-in">
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

      {/* CTA Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground">
              Deploy Cardinal AI Agents and unlock unprecedented efficiency across your entire organization.
            </p>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white">
              Get Started Today
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-foreground">Cardinal AI Agents</h3>
            <p className="text-muted-foreground">
              Enterprise-grade AI automation for modern businesses
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Cardinal AI Agents. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
