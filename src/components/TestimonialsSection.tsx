import { Card, CardContent } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Chen",
    role: "CTO, Global Financial Services",
    company: "Fortune 500 Finance Corp",
    content: "Cardinal AI has transformed how we operate. Our market research that took weeks now completes in hours with unprecedented accuracy. The ROI was evident within the first month.",
    rating: 5,
    metric: "85% faster research cycles"
  },
  {
    name: "Michael Rodriguez",
    role: "VP of Operations",
    company: "TechScale Industries",
    content: "The multi-agent orchestration is remarkable. We've automated complex workflows across sales, compliance, and customer service. It's like having a team of expert consultants working 24/7.",
    rating: 5,
    metric: "$2.4M annual savings"
  },
  {
    name: "Dr. Emily Watson",
    role: "Chief Innovation Officer",
    company: "Healthcare Systems Network",
    content: "Security and compliance were our primary concerns. Cardinal AI exceeded our expectations with SOC 2 Type II certification and audit trails for every action. Now handling 500K+ sensitive operations monthly.",
    rating: 5,
    metric: "500K+ monthly operations"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 sm:py-20 md:py-28 bg-background border-y border-border relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-[0.02]" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 sm:px-6 relative">
        <div className="max-w-3xl mx-auto text-center space-y-4 sm:space-y-6 mb-12 sm:mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-semibold">
            <Star className="h-4 w-4 fill-current" />
            Trusted by Industry Leaders
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
            Powering Enterprise Excellence
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            Join hundreds of forward-thinking organizations leveraging AI agents to drive unprecedented efficiency and growth
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, idx) => (
            <Card
              key={testimonial.name}
              className="group relative overflow-hidden border-border bg-card hover:shadow-enterprise transition-all duration-500 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl transition-all duration-500 group-hover:bg-accent/10" />
              
              <CardContent className="pt-6 relative space-y-4">
                {/* Quote Icon */}
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent">
                  <Quote className="h-5 w-5" />
                </div>

                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Metric Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/5 border border-accent/10">
                  <span className="text-xs font-semibold text-accent">
                    {testimonial.metric}
                  </span>
                </div>

                {/* Author */}
                <div className="pt-2 border-t border-border">
                  <p className="font-semibold text-foreground text-sm">{testimonial.name}</p>
                  <p className="text-xs text-muted-foreground">{testimonial.role}</p>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">{testimonial.company}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 sm:mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-5xl mx-auto">
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="text-3xl sm:text-4xl font-bold text-accent">98%</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Customer Satisfaction</div>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '450ms' }}>
            <div className="text-3xl sm:text-4xl font-bold text-accent">500+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Enterprise Clients</div>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '500ms' }}>
            <div className="text-3xl sm:text-4xl font-bold text-accent">$50M+</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Client Savings</div>
          </div>
          <div className="text-center space-y-2 animate-fade-in" style={{ animationDelay: '550ms' }}>
            <div className="text-3xl sm:text-4xl font-bold text-accent">99.9%</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Platform Uptime</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
