import { ArrowRight, Brain, Database, Zap, Network, Shield, Target } from "lucide-react";
import ScrollAnimation from "./ScrollAnimation";

const workflowSteps = [
  {
    icon: Target,
    title: "Task Reception",
    description: "Agents receive and analyze incoming tasks with AI-powered context understanding",
    color: "from-primary to-info"
  },
  {
    icon: Brain,
    title: "Intelligent Processing",
    description: "Multi-modal AI models process data across text, voice, and visual inputs",
    color: "from-info to-accent"
  },
  {
    icon: Network,
    title: "Agent Collaboration",
    description: "Specialized agents work together, sharing insights and coordinating actions",
    color: "from-accent to-primary"
  },
  {
    icon: Database,
    title: "Data Integration",
    description: "Seamless integration with your existing systems and databases",
    color: "from-primary to-success"
  },
  {
    icon: Zap,
    title: "Real-time Execution",
    description: "Lightning-fast execution with automated workflows and decision-making",
    color: "from-success to-warning"
  },
  {
    icon: Shield,
    title: "Secure Delivery",
    description: "Enterprise-grade security ensures safe, compliant task completion",
    color: "from-warning to-primary"
  }
];

const AgentWorkflow = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-10 animate-pulse" style={{ animationDuration: '10s' }} />
      
      <div className="container mx-auto px-6 relative z-10">
        <ScrollAnimation>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-hero bg-clip-text text-transparent">
              How Our AI Agents Work Together
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Experience the power of coordinated AI agents working in harmony to deliver exceptional results
            </p>
          </div>
        </ScrollAnimation>

        <div className="relative max-w-6xl mx-auto">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-full">
            <div className="w-full h-full bg-gradient-to-b from-primary via-accent to-primary opacity-20" />
          </div>

          {workflowSteps.map((step, index) => (
            <ScrollAnimation key={step.title} delay={index * 150}>
              <div className={`relative mb-16 lg:mb-24 ${index % 2 === 0 ? 'lg:pr-1/2' : 'lg:pl-1/2'}`}>
                <div className={`flex items-center gap-6 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}>
                  {/* Icon circle */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${step.color} p-[2px] shadow-glow`}>
                      <div className="w-full h-full rounded-full bg-card flex items-center justify-center">
                        <step.icon className="w-10 h-10 text-primary" />
                      </div>
                    </div>
                    
                    {/* Pulse animation */}
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${step.color} opacity-20 animate-ping`} style={{ animationDuration: '3s', animationDelay: `${index * 0.5}s` }} />
                  </div>

                  {/* Arrow for larger screens */}
                  <div className="hidden lg:block absolute top-1/2 left-1/2 transform -translate-y-1/2">
                    <ArrowRight className={`w-8 h-8 text-primary/30 ${index % 2 === 0 ? '-translate-x-4' : 'translate-x-4 rotate-180'}`} />
                  </div>

                  {/* Content card */}
                  <div className={`flex-1 group ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-hover">
                      <h3 className="text-2xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          ))}
        </div>

        {/* Final CTA */}
        <ScrollAnimation delay={900}>
          <div className="text-center mt-16">
            <div className="inline-block px-8 py-4 rounded-full bg-gradient-hero text-white font-semibold shadow-glow hover:shadow-glow-accent transition-all duration-300 cursor-pointer hover:scale-105">
              See It In Action →
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};

export default AgentWorkflow;
