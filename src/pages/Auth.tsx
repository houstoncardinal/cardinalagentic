import { useState } from "react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, ArrowRight, Shield, Zap, CheckCircle2 } from "lucide-react";

const Auth = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Left Side - Marketing Content */}
          <div className="space-y-6 sm:space-y-8 animate-fade-in hidden lg:block">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/5 border border-accent/10 text-accent text-sm font-semibold">
              <Sparkles className="h-4 w-4" />
              Start Your Automation Journey
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              Join 500+ Companies{" "}
              <span className="text-accent">Automating with AI</span>
            </h1>
            
            <p className="text-lg text-muted-foreground">
              Get started in minutes. No credit card required. Deploy your first AI agent today.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Instant Setup</h3>
                  <p className="text-sm text-muted-foreground">Launch your first agent in under 5 minutes</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Enterprise Security</h3>
                  <p className="text-sm text-muted-foreground">SOC 2 Type II certified with end-to-end encryption</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">14-Day Free Trial</h3>
                  <p className="text-sm text-muted-foreground">Full access to all features, cancel anytime</p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border">
              <p className="text-sm text-muted-foreground mb-4">Trusted by leading companies</p>
              <div className="flex flex-wrap gap-6 items-center opacity-60">
                <span className="text-lg font-bold">Microsoft</span>
                <span className="text-lg font-bold">Salesforce</span>
                <span className="text-lg font-bold">Oracle</span>
                <span className="text-lg font-bold">SAP</span>
              </div>
            </div>
          </div>

          {/* Right Side - Auth Forms */}
          <Card className="p-4 sm:p-6 md:p-8 border-border bg-card shadow-xl">
            <Tabs defaultValue="signup" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 sm:mb-8">
                <TabsTrigger value="signup" className="text-sm sm:text-base">Sign Up</TabsTrigger>
                <TabsTrigger value="login" className="text-sm sm:text-base">Log In</TabsTrigger>
              </TabsList>

              {/* Sign Up Form */}
              <TabsContent value="signup">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input 
                      id="signup-name" 
                      placeholder="John Doe" 
                      required 
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Work Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="john@company.com" 
                      required 
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-company">Company Name</Label>
                    <Input 
                      id="signup-company" 
                      placeholder="Your Company" 
                      required 
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input 
                      id="signup-password" 
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      className="bg-background"
                    />
                  </div>

                  <div className="flex items-start gap-2 pt-2">
                    <input 
                      type="checkbox" 
                      id="terms" 
                      required 
                      className="mt-1"
                    />
                    <label htmlFor="terms" className="text-xs text-muted-foreground">
                      I agree to the Terms of Service and Privacy Policy
                    </label>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button" className="w-full">
                      Google
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                      Microsoft
                    </Button>
                  </div>
                </form>
              </TabsContent>

              {/* Login Form */}
              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input 
                      id="login-email" 
                      type="email" 
                      placeholder="john@company.com" 
                      required 
                      className="bg-background"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="login-password">Password</Label>
                      <Link to="/forgot-password" className="text-xs text-accent hover:underline">
                        Forgot password?
                      </Link>
                    </div>
                    <Input 
                      id="login-password" 
                      type="password" 
                      placeholder="••••••••" 
                      required 
                      className="bg-background"
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90" 
                    size="lg"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In"}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-border" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <Button variant="outline" type="button" className="w-full">
                      Google
                    </Button>
                    <Button variant="outline" type="button" className="w-full">
                      Microsoft
                    </Button>
                  </div>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;