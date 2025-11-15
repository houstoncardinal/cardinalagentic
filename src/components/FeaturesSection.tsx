import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Workflow, BarChart3, Cpu, CloudCog, MessageSquare } from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "Intelligent Automation",
    description: "Deploy AI agents that learn and adapt to your business processes in real-time"
  },
  {
    icon: Workflow,
    title: "Seamless Integration",
    description: "Connect with your existing tools and systems through our extensive API library"
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Track performance metrics and gain actionable insights from agent operations"
  },
  {
    icon: Cpu,
    title: "Multi-Model Support",
    description: "Leverage the best AI models from AWS, Anthropic, and DeepSeek for optimal results"
  },
  {
    icon: CloudCog,
    title: "Enterprise Infrastructure",
    description: "Built on robust, scalable architecture designed for mission-critical operations"
  },
  {
    icon: MessageSquare,
    title: "24/7 Support",
    description: "Dedicated support team and comprehensive documentation for seamless deployment"
  }
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-24 bg-gradient-feature">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground">
            Enterprise-Grade Platform
          </h2>
          <p className="text-xl text-muted-foreground">
            Built for scale, designed for performance, trusted by leading organizations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {features.map((feature, idx) => (
            <Card
              key={feature.title}
              className="group relative overflow-hidden border-border bg-card hover:shadow-enterprise transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl transition-all duration-300 group-hover:bg-accent/10" />
              
              <CardHeader className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10 text-accent mb-4 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
