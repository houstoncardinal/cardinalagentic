import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Clock, DollarSign, Users, ArrowRight } from "lucide-react";

const metrics = [
  {
    icon: DollarSign,
    value: "85%",
    label: "Average Cost Reduction",
    description: "Across all automated workflows"
  },
  {
    icon: Clock,
    value: "10x",
    label: "Faster Processing",
    description: "Complex tasks completed in minutes"
  },
  {
    icon: Users,
    value: "40%",
    label: "Team Productivity Gain",
    description: "Focus on high-value strategic work"
  },
  {
    icon: TrendingUp,
    value: "3.2x",
    label: "Average ROI",
    description: "Within first 6 months"
  }
];

const ROISection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-feature relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.015]" />
      <div className="absolute top-1/2 left-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Content */}
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
                  <TrendingUp className="h-4 w-4" />
                  Proven Results
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Measurable Impact on Your Bottom Line
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  Our enterprise clients see transformational results within weeks, not months. 
                  AI agents deliver consistent, measurable value across every department.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent mt-0.5 flex-shrink-0">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Rapid Implementation</h3>
                    <p className="text-sm text-muted-foreground">Deploy and see results in under 30 days with our white-glove onboarding</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent mt-0.5 flex-shrink-0">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Continuous Optimization</h3>
                    <p className="text-sm text-muted-foreground">AI agents learn and improve over time, increasing efficiency month over month</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-6 w-6 items-center justify-center rounded-full bg-accent/10 text-accent mt-0.5 flex-shrink-0">
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Risk-Free Trial</h3>
                    <p className="text-sm text-muted-foreground">Start with a pilot program and scale based on proven ROI metrics</p>
                  </div>
                </div>
              </div>

              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground shadow-glow-accent group">
                Calculate Your ROI
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>

            {/* Right Column - Metrics Grid */}
            <div className="grid grid-cols-2 gap-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
              {metrics.map((metric, idx) => (
                <Card
                  key={metric.label}
                  className="group relative overflow-hidden border-border bg-card hover:shadow-enterprise transition-all duration-500 hover:-translate-y-2"
                  style={{ animationDelay: `${idx * 100 + 300}ms` }}
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl transition-all duration-500 group-hover:bg-accent/10" />
                  
                  <CardContent className="pt-6 relative space-y-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent group-hover:scale-110 transition-transform duration-300">
                      <metric.icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-1">
                      <div className="text-3xl sm:text-4xl font-bold text-accent">{metric.value}</div>
                      <div className="text-sm font-semibold text-foreground">{metric.label}</div>
                      <div className="text-xs text-muted-foreground">{metric.description}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ROISection;
