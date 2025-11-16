import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";

const benefits = [
  "Custom agent development and training",
  "Dedicated account management",
  "Priority support with 1-hour SLA",
  "Advanced security and compliance",
  "Multi-region deployment options",
  "White-label capabilities"
];

const EnterpriseSection = () => {
  return (
    <section id="enterprise" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
                  Enterprise Solutions
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-foreground">
                  Built for Enterprise Scale
                </h2>
                <p className="text-xl text-muted-foreground">
                  Deploy AI agents across your organization with enterprise-grade security, compliance, and support.
                </p>
              </div>

              <div className="space-y-4">
                {benefits.map((benefit, idx) => (
                  <div
                    key={benefit}
                    className="flex items-start gap-3 animate-fade-in"
                    style={{ animationDelay: `${idx * 50}ms` }}
                  >
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0 mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </div>
                ))}
              </div>

              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white group">
                Contact Sales
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            <div className="relative animate-fade-in" style={{ animationDelay: "200ms" }}>
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-accent p-8 shadow-enterprise">
                <div className="h-full w-full rounded-xl bg-primary/90 backdrop-blur-sm border border-primary-foreground/10 p-8 flex flex-col justify-center space-y-6">
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-primary-foreground">10,000+</div>
                    <div className="text-primary-foreground/80">Active Deployments</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-primary-foreground">50M+</div>
                    <div className="text-primary-foreground/80">Tasks Processed Daily</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-5xl font-bold text-primary-foreground">99.9%</div>
                    <div className="text-primary-foreground/80">Customer Satisfaction</div>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-accent/20 rounded-full blur-3xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSection;
