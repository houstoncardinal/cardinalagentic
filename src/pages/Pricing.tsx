import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Check, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScrollAnimation from "@/components/ScrollAnimation";

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const navigate = useNavigate();

  const plans = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started with AI automation",
      monthlyPrice: 999,
      annualPrice: 799,
      features: [
        "Up to 3 AI agents",
        "10,000 tasks per month",
        "Basic integrations",
        "Email support",
        "Standard analytics",
        "99.9% uptime SLA"
      ],
      cta: "Start Free Trial",
      popular: false
    },
    {
      name: "Professional",
      description: "For growing businesses scaling their AI operations",
      monthlyPrice: 2999,
      annualPrice: 2399,
      features: [
        "Up to 10 AI agents",
        "50,000 tasks per month",
        "All integrations",
        "Priority support",
        "Advanced analytics",
        "Custom workflows",
        "API access",
        "99.95% uptime SLA"
      ],
      cta: "Start Free Trial",
      popular: true
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations",
      monthlyPrice: null,
      annualPrice: null,
      features: [
        "Unlimited AI agents",
        "Unlimited tasks",
        "Custom integrations",
        "Dedicated support",
        "Advanced security",
        "On-premise deployment",
        "Custom SLA",
        "White-label options",
        "Training & onboarding"
      ],
      cta: "Contact Sales",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <ScrollAnimation>
            <div className="text-center max-w-4xl mx-auto mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Transparent Pricing
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Choose the plan that fits your needs. All plans include a 14-day free trial.
              </p>
              
              <div className="inline-flex items-center gap-4 p-1 bg-muted rounded-lg">
                <button
                  className={`px-6 py-2 rounded-md transition-all ${
                    billingCycle === "monthly"
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setBillingCycle("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`px-6 py-2 rounded-md transition-all ${
                    billingCycle === "annual"
                      ? "bg-background shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  onClick={() => setBillingCycle("annual")}
                >
                  Annual
                  <Badge className="ml-2" variant="secondary">Save 20%</Badge>
                </button>
              </div>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <ScrollAnimation key={index} delay={index * 100}>
                <Card className={`p-8 relative ${
                  plan.popular 
                    ? "border-primary shadow-xl scale-105" 
                    : "border-border/50"
                }`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-primary to-primary/80 flex items-center gap-1">
                        <Sparkles className="h-3 w-3" />
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className="text-muted-foreground">{plan.description}</p>
                  </div>

                  <div className="mb-8">
                    {plan.monthlyPrice ? (
                      <>
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold">
                            ${billingCycle === "monthly" ? plan.monthlyPrice : plan.annualPrice}
                          </span>
                          <span className="text-muted-foreground">/month</span>
                        </div>
                        {billingCycle === "annual" && (
                          <p className="text-sm text-muted-foreground mt-2">
                            Billed annually at ${plan.annualPrice * 12}
                          </p>
                        )}
                      </>
                    ) : (
                      <span className="text-4xl font-bold">Custom</span>
                    )}
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className="w-full"
                    variant={plan.popular ? "default" : "outline"}
                    size="lg"
                    onClick={() => plan.name === "Enterprise" ? window.location.href = "mailto:sales@cardinalagent.com" : navigate("/auth")}
                  >
                    {plan.cta}
                  </Button>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation delay={300}>
            <div className="mt-20 text-center">
              <p className="text-muted-foreground mb-4">
                All plans include 14-day free trial • No credit card required • Cancel anytime
              </p>
              <p className="text-sm text-muted-foreground">
                Need a custom solution? <a href="mailto:sales@cardinalagent.com" className="text-primary hover:underline">Contact our sales team</a>
              </p>
            </div>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
