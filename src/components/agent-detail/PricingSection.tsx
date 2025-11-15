import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle, DollarSign } from "lucide-react";

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$499",
    period: "/month",
    description: "Perfect for small teams getting started",
    features: [
      "Up to 10,000 operations/month",
      "5 active integrations",
      "Email support",
      "99.5% uptime SLA",
      "Basic analytics",
      "Community access"
    ],
    cta: "Start Free Trial"
  },
  {
    name: "Professional",
    price: "$1,499",
    period: "/month",
    description: "For growing businesses scaling automation",
    features: [
      "Up to 100,000 operations/month",
      "Unlimited integrations",
      "Priority support 24/7",
      "99.9% uptime SLA",
      "Advanced analytics & reporting",
      "Custom workflows",
      "API access",
      "Dedicated account manager"
    ],
    cta: "Start Free Trial",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "pricing",
    description: "For large organizations with specific needs",
    features: [
      "Unlimited operations",
      "White-label options",
      "99.99% uptime SLA",
      "Premium support with SLAs",
      "Custom AI model training",
      "On-premise deployment option",
      "Advanced security features",
      "Dedicated infrastructure"
    ],
    cta: "Contact Sales"
  }
];

export const PricingSection = () => {
  return (
    <>
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-foreground mb-4">Choose Your Plan</h2>
        <p className="text-lg text-muted-foreground">Flexible pricing that scales with your business needs</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {pricingPlans.map((plan, idx) => (
          <Card 
            key={idx} 
            className={`p-8 border-border bg-card relative ${
              plan.popular ? 'border-accent border-2 shadow-xl scale-105' : ''
            }`}
          >
            {plan.popular && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-accent text-accent-foreground">
                Most Popular
              </Badge>
            )}
            
            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold text-foreground mb-2">{plan.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
              <div className="flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                <span className="text-muted-foreground">{plan.period}</span>
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {plan.features.map((feature, fIdx) => (
                <li key={fIdx} className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-foreground">{feature}</span>
                </li>
              ))}
            </ul>

            <Button 
              className={`w-full ${plan.popular ? 'bg-accent hover:bg-accent/90' : ''}`}
              variant={plan.popular ? 'default' : 'outline'}
            >
              {plan.cta}
            </Button>
          </Card>
        ))}
      </div>

      <Card className="p-8 bg-muted/30 border-border mt-12">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 text-accent">
            <DollarSign className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">ROI Calculator</h3>
            <p className="text-muted-foreground mb-4">
              Average customers save $47,000 annually and reduce manual work by 73%. 
              Calculate your potential ROI based on your team size and current processes.
            </p>
            <Button variant="outline">Calculate Your ROI</Button>
          </div>
        </div>
      </Card>
    </>
  );
};