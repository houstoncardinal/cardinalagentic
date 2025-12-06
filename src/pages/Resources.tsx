import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { BookOpen, FileText, Video, Code, HelpCircle, Search } from "lucide-react";
import ScrollAnimation from "@/components/ScrollAnimation";

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const resourceCategories = [
    {
      icon: BookOpen,
      title: "Documentation",
      description: "Comprehensive guides and API references",
      items: [
        "Getting Started Guide",
        "API Documentation",
        "Integration Guides",
        "Best Practices"
      ],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Step-by-step video guides and webinars",
      items: [
        "Platform Overview",
        "Agent Configuration",
        "Workflow Builder",
        "Analytics Dashboard"
      ],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: FileText,
      title: "Case Studies",
      description: "Real-world success stories and use cases",
      items: [
        "Fortune 500 Implementations",
        "Industry-Specific Solutions",
        "ROI Reports",
        "Customer Testimonials"
      ],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Code,
      title: "Developer Tools",
      description: "SDKs, APIs, and code examples",
      items: [
        "REST API",
        "GraphQL API",
        "Python SDK",
        "JavaScript SDK"
      ],
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: HelpCircle,
      title: "Support Center",
      description: "FAQs, troubleshooting, and help articles",
      items: [
        "Common Issues",
        "Troubleshooting",
        "Account Management",
        "Billing & Pricing"
      ],
      gradient: "from-indigo-500 to-purple-500"
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
                Resources & Documentation
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Everything you need to get the most out of Cardinal Agentic. 
                From quick start guides to advanced implementations.
              </p>
              
              <div className="max-w-2xl mx-auto relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search documentation, guides, and tutorials..."
                  className="pl-12 h-12"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
          </ScrollAnimation>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {resourceCategories.map((category, index) => (
              <ScrollAnimation key={index} delay={index * 50}>
                <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border/50 group">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${category.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{category.description}</p>
                  <ul className="space-y-2">
                    {category.items.map((item, i) => (
                      <li key={i}>
                        <Button variant="link" className="p-0 h-auto text-sm">
                          {item}
                        </Button>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollAnimation>
            ))}
          </div>

          <ScrollAnimation delay={200}>
            <Card className="p-12 bg-gradient-to-br from-primary/10 to-primary/5 border-border/50">
              <div className="text-center max-w-2xl mx-auto">
                <h2 className="text-3xl font-bold mb-4">Need More Help?</h2>
                <p className="text-muted-foreground mb-6">
                  Our support team is available 24/7 to help you succeed with Cardinal Agentic.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg">Contact Support</Button>
                  <Button size="lg" variant="outline">Schedule a Demo</Button>
                </div>
              </div>
            </Card>
          </ScrollAnimation>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Resources;
