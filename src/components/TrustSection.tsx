import { Shield, Zap, Lock, Globe, Award, CheckCircle2 } from "lucide-react";

const trustIndicators = [
  {
    icon: Shield,
    label: "SOC 2 Type II",
    description: "Certified Security"
  },
  {
    icon: Zap,
    label: "99.9% Uptime",
    description: "Guaranteed SLA"
  },
  {
    icon: Lock,
    label: "GDPR & CCPA",
    description: "Full Compliance"
  },
  {
    icon: Globe,
    label: "Multi-Region",
    description: "Global Infrastructure"
  },
  {
    icon: Award,
    label: "ISO 27001",
    description: "Certified"
  },
  {
    icon: CheckCircle2,
    label: "HIPAA Ready",
    description: "Healthcare Compliant"
  }
];

const TrustSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 border-b border-border bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16 animate-fade-in">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Enterprise-Grade Security & Compliance
            </h3>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Trusted by Fortune 500 companies with bank-level security and comprehensive compliance certifications
            </p>
          </div>

          {/* Trust Indicators Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
            {trustIndicators.map((item, idx) => (
              <div
                key={item.label}
                className="group text-center space-y-3 sm:space-y-4 animate-fade-in p-6 rounded-xl bg-card border border-border hover:border-accent/30 hover:shadow-elegant transition-all duration-300"
                style={{ animationDelay: `${idx * 75}ms` }}
              >
                <div className="flex justify-center">
                  <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-accent/10 text-accent group-hover:scale-110 group-hover:bg-accent/15 transition-all duration-300">
                    <item.icon className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                </div>
                <div>
                  <p className="font-bold text-foreground text-sm sm:text-base mb-1">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Trust Bar */}
          <div className="mt-12 sm:mt-16 pt-8 border-t border-border">
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-12 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="font-medium">256-bit Encryption</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="font-medium">Annual Penetration Testing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="font-medium">24/7 Security Monitoring</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-success" />
                <span className="font-medium">Complete Audit Trails</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
