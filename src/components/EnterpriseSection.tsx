import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Building2, Shield, Headphones, Globe2 } from "lucide-react";

const benefits = [
  "Custom agent development and training",
  "Dedicated account management and CSM",
  "Priority support with 1-hour SLA",
  "Advanced security and compliance",
  "Multi-region deployment options",
  "White-label capabilities"
];

const enterpriseFeatures = [
  {
    icon: Building2,
    title: "Enterprise Infrastructure",
    description: "Dedicated resources, custom SLAs, and private cloud deployment options"
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    description: "SSO, SAML, advanced encryption, and custom compliance requirements"
  },
  {
    icon: Headphones,
    title: "Premium Support",
    description: "24/7 dedicated support team, technical account manager, and priority response"
  },
  {
    icon: Globe2,
    title: "Global Scale",
    description: "Multi-region deployment, data residency options, and unlimited scalability"
  }
];

const EnterpriseSection = () => {
  return (
    <section id="enterprise" className="py-16 sm:py-20 md:py-28 bg-gradient-feature relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]" />
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="max-w-3xl mx-auto text-center space-y-6 sm:space-y-8 mb-12 sm:mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
              <Building2 className="h-4 w-4" />
              Enterprise Solutions
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              Built for Enterprise Scale
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
              Deploy AI agents across your organization with enterprise-grade security, compliance, and dedicated support. 
              Trusted by Fortune 500 companies worldwide.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12 sm:mb-16">
            {enterpriseFeatures.map((feature, idx) => (
              <div
                key={feature.title}
                className="group relative overflow-hidden p-6 rounded-2xl bg-card border border-border hover:border-accent/30 hover:shadow-enterprise transition-all duration-500 hover:-translate-y-2 animate-fade-in"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all duration-500" />
                
                <div className="relative space-y-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Benefits List */}
          <div className="bg-gradient-card border border-border rounded-2xl p-8 sm:p-10 lg:p-12 shadow-elegant mb-8 sm:mb-12 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
              <div className="space-y-6">
                <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                  Everything You Need at Enterprise Scale
                </h3>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Comprehensive enterprise features designed for organizations that demand the highest levels of performance, security, and support.
                </p>
              </div>
              
              <div className="grid gap-4">
                {benefits.map((benefit, idx) => (
                  <div
                    key={benefit}
                    className="flex items-center gap-3 animate-fade-in"
                    style={{ animationDelay: `${idx * 75 + 500}ms` }}
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-sm sm:text-base text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center animate-fade-in" style={{ animationDelay: '600ms' }}>
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow-accent hover:shadow-hover group text-base px-8 py-6">
              Contact Sales Team
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              Schedule a consultation with our enterprise team to discuss your specific needs
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSection;
