import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Brain, Shield, Zap, Network, BarChart3, Clock, Lock, Workflow, Database, Code, Globe, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ScrollAnimation from "@/components/ScrollAnimation";

const Features = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Brain,
      title: "Advanced AI Models",
      description: "Powered by state-of-the-art language models and custom-trained algorithms for your specific business needs.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Workflow,
      title: "Multi-Agent Orchestration",
      description: "Seamlessly coordinate multiple AI agents to handle complex, multi-step business processes autonomously.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      description: "SOC 2 Type II certified with end-to-end encryption, role-based access control, and audit logging.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Network,
      title: "50+ Integrations",
      description: "Connect seamlessly with your existing tools including Salesforce, HubSpot, Slack, and more.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics",
      description: "Track performance, measure ROI, and gain insights with comprehensive analytics dashboards.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Clock,
      title: "24/7 Autonomous Operation",
      description: "Your AI workforce works around the clock, handling tasks and making decisions while you sleep.",
      gradient: "from-pink-500 to-rose-500"
    },
    {
      icon: Lock,
      title: "Data Privacy",
      description: "Your data never leaves your control. GDPR compliant with on-premise deployment options.",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      icon: Zap,
      title: "Instant Deployment",
      description: "Get started in minutes with pre-configured agents and workflows tailored to your industry.",
      gradient: "from-yellow-500 to-orange-500"
    },
    {
      icon: Database,
      title: "Knowledge Management",
      description: "Build and maintain a centralized knowledge base that all agents can access and learn from.",
      gradient: "from-teal-500 to-green-500"
    },
    {
      icon: Code,
      title: "API-First Architecture",
      description: "Full REST and GraphQL APIs for seamless integration with your existing systems and workflows.",
      gradient: "from-violet-500 to-purple-500"
    },
    {
      icon: Globe,
      title: "Multi-Language Support",
      description: "Operate globally with agents that understand and communicate in 50+ languages fluently.",
      gradient: "from-blue-500 to-indigo-500"
    },
    {
      icon: TrendingUp,
      title: "Continuous Learning",
      description: "Agents improve over time by learning from interactions and adapting to your business needs.",
      gradient: "from-emerald-500 to-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <ScrollAnimation>
            <div className="text-center max-w-4xl mx-auto mb-20">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Enterprise-Grade AI Platform
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Everything you need to deploy, manage, and scale your AI workforce. 
                Built for enterprises that demand reliability, security, and performance.
              </p>
              <Button size="lg" onClick={() => navigate("/auth")} className="mr-4">
                Start Free Trial
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/pricing")}>
                View Pricing
              </Button>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <ScrollAnimation key={index} delay={index * 50}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 hover:border-border group">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Features;
