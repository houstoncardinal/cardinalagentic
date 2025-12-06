import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import TrustSection from "@/components/TrustSection";
import FeaturesSection from "@/components/FeaturesSection";
import EnterpriseSection from "@/components/EnterpriseSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import ROISection from "@/components/ROISection";
import Footer from "@/components/Footer";
import AgentCard from "@/components/AgentCard";
import { Button } from "@/components/ui/button";
import { Sparkles, ArrowRight, Shield, Brain, Zap, Award } from "lucide-react";
import { agents } from "@/data/agentsData";
import AgentWorkflow from "@/components/AgentWorkflow";
import ScrollAnimation from "@/components/ScrollAnimation";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-mesh">
        {/* Enhanced Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute top-1/4 left-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 md:py-28 lg:py-36 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Main Content */}
            <div className="space-y-8 sm:space-y-10 animate-fade-in">
              <div className="space-y-6 sm:space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold shadow-glow">
                  <Sparkles className="h-4 w-4" />
                  Enterprise AI Agent Platform
                </div>
                
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] tracking-tight">
                  Transform Your Enterprise with{" "}
                  <span className="bg-gradient-accent bg-clip-text text-transparent">
                    Autonomous AI Agents
                  </span>
                </h1>
                
                <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  Deploy 14 specialized AI agents that orchestrate complex workflows autonomously. 
                  From market intelligence to compliance, achieve enterprise-scale automation with unprecedented precision and reliability.
                </p>
              </div>

              {/* Key Features Grid */}
              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="group p-4 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                      <Zap className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-foreground text-sm">Multi-Agent Orchestration</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Agents collaborate autonomously across departments
                  </p>
                </div>

                <div className="group p-4 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                      <Shield className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-foreground text-sm">Enterprise Security</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    SOC 2 Type II with complete audit trails
                  </p>
                </div>

                <div className="group p-4 rounded-xl bg-card border border-border hover:border-accent/50 hover:shadow-elegant transition-all duration-300">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform">
                      <Award className="h-4 w-4" />
                    </div>
                    <h3 className="font-bold text-foreground text-sm">50+ Integrations</h3>
                  </div>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Connect with Salesforce, Jira, Workday & more
                  </p>
                </div>
              </div>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
                <Link to="/auth" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow-accent hover:shadow-hover transition-all group text-base px-8 py-6">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-card hover:border-accent/50 transition-all text-base px-8 py-6">
                  Schedule Demo
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <svg className="h-5 w-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">No credit card required</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <svg className="h-5 w-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Deploy in 30 days</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <svg className="h-5 w-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">SOC 2 Type II Certified</span>
                </div>
              </div>
            </div>

            {/* Right Column - Enhanced Stats & Visual */}
            <div className="hidden lg:block space-y-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6">
                <div className="group relative overflow-hidden bg-gradient-card border border-border rounded-2xl p-8 shadow-elegant hover:shadow-enterprise transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all duration-500" />
                  <div className="relative">
                    <div className="text-4xl font-bold text-accent mb-2">99.9%</div>
                    <div className="text-sm text-muted-foreground font-medium">Uptime SLA</div>
                  </div>
                </div>
                <div className="group relative overflow-hidden bg-gradient-card border border-border rounded-2xl p-8 shadow-elegant hover:shadow-enterprise transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all duration-500" />
                  <div className="relative">
                    <div className="text-4xl font-bold text-accent mb-2">10M+</div>
                    <div className="text-sm text-muted-foreground font-medium">Tasks Automated</div>
                  </div>
                </div>
                <div className="group relative overflow-hidden bg-gradient-card border border-border rounded-2xl p-8 shadow-elegant hover:shadow-enterprise transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all duration-500" />
                  <div className="relative">
                    <div className="text-4xl font-bold text-accent mb-2">85%</div>
                    <div className="text-sm text-muted-foreground font-medium">Cost Reduction</div>
                  </div>
                </div>
                <div className="group relative overflow-hidden bg-gradient-card border border-border rounded-2xl p-8 shadow-elegant hover:shadow-enterprise transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all duration-500" />
                  <div className="relative">
                    <div className="text-4xl font-bold text-accent mb-2">$50M+</div>
                    <div className="text-sm text-muted-foreground font-medium">Client Savings</div>
                  </div>
                </div>
              </div>

              {/* Agent Status Dashboard */}
              <div className="relative overflow-hidden bg-gradient-card border border-border rounded-2xl p-8 shadow-elegant">
                <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl" />
                
                <div className="relative space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-base font-semibold text-foreground">Live Agent Performance</span>
                    <span className="flex items-center gap-2 text-xs font-semibold text-success px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
                      <span className="flex h-2 w-2 rounded-full bg-success animate-pulse" />
                      All Systems Operational
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {[
                      { name: 'Market Intelligence', value: 98, color: 'bg-accent' },
                      { name: 'Sales Automation', value: 100, color: 'bg-success' },
                      { name: 'Content Generation', value: 95, color: 'bg-accent' },
                      { name: 'Compliance & Security', value: 100, color: 'bg-success' },
                    ].map((agent) => (
                      <div key={agent.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-foreground font-medium">{agent.name}</span>
                          <span className="text-accent font-semibold">{agent.value}%</span>
                        </div>
                        <div className="h-2.5 bg-muted/50 rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${agent.color} rounded-full transition-all duration-1000 shadow-glow`}
                            style={{ width: `${agent.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Quick Stats Bar */}
              <div className="flex items-center justify-between gap-6 text-center">
                <div className="flex-1">
                  <div className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-1">500+</div>
                  <div className="text-xs text-muted-foreground font-medium">Enterprise Clients</div>
                </div>
                <div className="h-16 w-px bg-border" />
                <div className="flex-1">
                  <div className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-1">14</div>
                  <div className="text-xs text-muted-foreground font-medium">AI Agents</div>
                </div>
                <div className="h-16 w-px bg-border" />
                <div className="flex-1">
                  <div className="text-3xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-1">3.2x</div>
                  <div className="text-xs text-muted-foreground font-medium">Average ROI</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustSection />
      
      <ROISection />
      
      <FeaturesSection />

      <AgentWorkflow />

      {/* Agents Grid Section */}
      <section id="agents" className="relative py-20 sm:py-24 lg:py-32 bg-background border-b border-border overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" />
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          {/* Section Header */}
          <ScrollAnimation>
            <div className="text-center mb-12 sm:mb-16 lg:mb-20 space-y-4 sm:space-y-6">
...
            </div>
          </ScrollAnimation>
          
          {/* Agents Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
            {agents.map((agent, index) => (
              <ScrollAnimation key={agent.number} delay={index * 50}>
                <AgentCard
                  {...agent}
                  delay={0}
                />
              </ScrollAnimation>
            ))}
          </div>

          {/* Bottom CTA */}
          <ScrollAnimation delay={200}>
            <div className="mt-12 sm:mt-16 lg:mt-20 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 sm:p-8 rounded-2xl bg-gradient-card border border-border shadow-elegant hover:shadow-enterprise transition-all duration-500">
                <div className="flex-1 text-left">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    Ready to Deploy Your AI Workforce?
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    Start automating complex workflows today with our enterprise platform
                  </p>
                </div>
                <Link to="/auth">
                  <Button size="lg" className="bg-accent hover:bg-accent/90 text-white shadow-glow-accent whitespace-nowrap group">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <TestimonialsSection />
      
      <EnterpriseSection />

      {/* Enhanced CTA Section */}
      <section id="pricing" className="py-20 sm:py-24 md:py-32 border-b border-border bg-gradient-mesh relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60rem] h-[60rem] bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10">
            <div className="space-y-6 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
                <Sparkles className="h-4 w-4" />
                Start Your AI Transformation
              </div>
              
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Ready to Transform Your Enterprise?
              </h2>
              
              <p className="text-lg sm:text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Join 500+ leading organizations leveraging AI agents to achieve unprecedented operational efficiency and growth. Deploy in 30 days or less.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '200ms' }}>
              <Link to="/auth" className="w-full sm:w-auto">
                <Button size="lg" className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow-accent hover:shadow-hover transition-all group text-base px-8 py-6">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-border hover:bg-card hover:border-accent/50 transition-all text-base px-8 py-6">
                Schedule Enterprise Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 sm:gap-8 pt-8 animate-fade-in" style={{ animationDelay: '300ms' }}>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-accent">30 Days</div>
                <div className="text-sm text-muted-foreground">Average Deployment</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-accent">$0</div>
                <div className="text-sm text-muted-foreground">Upfront Cost</div>
              </div>
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-accent">24/7</div>
                <div className="text-sm text-muted-foreground">Enterprise Support</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
