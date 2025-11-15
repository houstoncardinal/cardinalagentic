import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import TrustSection from "@/components/TrustSection";
import FeaturesSection from "@/components/FeaturesSection";
import EnterpriseSection from "@/components/EnterpriseSection";
import Footer from "@/components/Footer";
import AgentCard from "@/components/AgentCard";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Shield } from "lucide-react";
import { agents } from "@/data/agentsData";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-mesh">
        <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 md:py-24 lg:py-32 relative">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left Column - Main Content */}
            <div className="space-y-6 sm:space-y-8">
              <div className="space-y-4 sm:space-y-6">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/5 border border-accent/10 text-accent text-xs sm:text-sm font-semibold">
                  <Sparkles className="h-3 w-3 sm:h-4 sm:w-4" />
                  Enterprise AI Agent Platform
                </div>
                
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight tracking-tight">
                  Automate Your Business with{" "}
                  <span className="text-accent">Intelligent AI Agents</span>
                </h1>
                
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
                  Deploy 14 specialized AI agents that work together seamlessly to transform your operations. 
                  From market research to compliance, our autonomous agents handle complex workflows while you focus on growth.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-accent/10 text-accent mt-0.5 sm:mt-1 flex-shrink-0">
                    <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5 sm:mb-1">Multi-Agent Collaboration</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Agents communicate and coordinate autonomously to complete complex business processes end-to-end</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-accent/10 text-accent mt-0.5 sm:mt-1 flex-shrink-0">
                    <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5 sm:mb-1">Enterprise-Grade Integration</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Seamlessly connect with your existing tools: Salesforce, Jira, Workday, and 50+ platforms</p>
                  </div>
                </div>

                <div className="flex items-start gap-2 sm:gap-3">
                  <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-accent/10 text-accent mt-0.5 sm:mt-1 flex-shrink-0">
                    <svg className="h-3 w-3 sm:h-3.5 sm:w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm sm:text-base mb-0.5 sm:mb-1">SOC 2 Type II Compliant</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">Bank-level security with continuous monitoring, encryption, and audit trails for every action</p>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 pt-2">
                <Link to="/auth" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg hover:shadow-xl transition-all group">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-muted">
                  <Shield className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                  <span className="hidden sm:inline">View Security & Compliance</span>
                  <span className="sm:hidden">Security</span>
                </Button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-8 pt-2 sm:pt-4 text-xs sm:text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="h-4 w-4 sm:h-5 sm:w-5 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">14-day free trial</span>
                </div>
              </div>
            </div>

            {/* Right Column - Stats & Visual - Hidden on mobile, shown on lg+ */}
            <div className="hidden lg:block space-y-6" style={{ animationDelay: '200ms' }}>
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
      <section id="pricing" className="py-24 border-b border-border bg-gradient-mesh relative overflow-hidden">
        <div className="container mx-auto px-6 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground">
              Ready to Transform Your Business?
            </h2>
            <p className="text-xl text-muted-foreground">
              Deploy Cardinal AI Agents and unlock unprecedented efficiency across your entire organization.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/auth">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-lg group">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline">
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
