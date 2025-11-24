import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import EnterpriseSection from "@/components/EnterpriseSection";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Building2, Shield, Users, Globe, Award, Headphones } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ScrollAnimation from "@/components/ScrollAnimation";

const Enterprise = () => {
  const [user, setUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: ""
  });
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Our enterprise team will contact you within 24 hours.",
    });
    setFormData({ name: "", email: "", company: "", message: "" });
  };

  const enterpriseBenefits = [
    {
      icon: Building2,
      title: "Custom Deployment",
      description: "On-premise, cloud, or hybrid deployment options tailored to your infrastructure needs."
    },
    {
      icon: Shield,
      title: "Advanced Security",
      description: "Enterprise-grade security with SSO, SAML, custom compliance, and dedicated security reviews."
    },
    {
      icon: Users,
      title: "Dedicated Support",
      description: "24/7 priority support with a dedicated customer success manager and technical account manager."
    },
    {
      icon: Globe,
      title: "Global Scale",
      description: "Multi-region deployment with guaranteed uptime SLAs and disaster recovery planning."
    },
    {
      icon: Award,
      title: "Custom SLA",
      description: "Tailored service level agreements with guaranteed response times and uptime commitments."
    },
    {
      icon: Headphones,
      title: "Training & Onboarding",
      description: "Comprehensive training programs and dedicated onboarding for your entire organization."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation user={user} />
      
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-7xl">
          <ScrollAnimation>
            <div className="text-center max-w-4xl mx-auto mb-20">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Enterprise Solutions
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Powerful AI automation built for the world's leading enterprises. 
                Scalable, secure, and tailored to your unique business needs.
              </p>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {enterpriseBenefits.map((benefit, index) => (
              <ScrollAnimation key={index} delay={index * 50}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-primary to-primary/80 flex items-center justify-center mb-4">
                    <benefit.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
            <ScrollAnimation>
              <div>
                <h2 className="text-3xl font-bold mb-6">Contact Our Enterprise Team</h2>
                <p className="text-muted-foreground mb-8">
                  Let's discuss how Cardinal Agentic can transform your enterprise operations. 
                  Our team will work with you to create a custom solution that meets your specific requirements.
                </p>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Input
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Work Email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Input
                      placeholder="Company Name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      placeholder="Tell us about your needs..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      rows={5}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Schedule Enterprise Demo
                  </Button>
                </form>
              </div>
            </ScrollAnimation>

            <ScrollAnimation delay={100}>
              <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl p-8 lg:p-12">
                <h3 className="text-2xl font-bold mb-6">What's Included</h3>
                <ul className="space-y-4">
                  {[
                    "Unlimited AI agents and tasks",
                    "Custom integration development",
                    "White-label deployment options",
                    "Advanced security & compliance",
                    "Dedicated infrastructure",
                    "Priority feature development",
                    "Quarterly business reviews",
                    "24/7 enterprise support"
                  ].map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8 pt-8 border-t border-border/50">
                  <p className="text-sm text-muted-foreground mb-4">
                    Trusted by Fortune 500 companies
                  </p>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 border-2 border-background" />
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">+200 enterprises</span>
                  </div>
                </div>
              </div>
            </ScrollAnimation>
          </div>

          <EnterpriseSection />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Enterprise;
