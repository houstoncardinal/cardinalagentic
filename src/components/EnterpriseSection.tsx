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
    <section id="enterprise" className="py-12 sm:py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6 sm:space-y-8 animate-fade-in text-center">
            <div className="space-y-3 sm:space-y-4">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs sm:text-sm font-medium">
                Enterprise Solutions
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
                Built for Enterprise Scale
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-muted-foreground px-4">
                Deploy AI agents across your organization with enterprise-grade security, compliance, and support.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto">
              {benefits.map((benefit, idx) => (
                <div
                  key={benefit}
                  className="flex items-start gap-2 sm:gap-3 text-left animate-fade-in"
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  <div className="flex h-5 w-5 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-accent/10 text-accent flex-shrink-0 mt-0.5">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <span className="text-sm sm:text-base text-foreground font-medium">{benefit}</span>
                </div>
              ))}
            </div>

            <Button size="lg" className="bg-accent hover:bg-accent/90 text-white group mt-2">
              Contact Sales
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EnterpriseSection;
