import { Button } from "@/components/ui/button";
import { Menu, LogOut, LayoutDashboard } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { useToast } from "@/hooks/use-toast";

const navLinks = [
  { label: "Agents", href: "/agents" },
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Enterprise", href: "/enterprise" },
  { label: "Resources", href: "/resources" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate("/");
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-foreground">Cardinal</span>
              {" "}
              <span className="text-accent">Agentic</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" className="gap-2">
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
                <Button variant="ghost" onClick={handleSignOut} className="gap-2">
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link to="/auth">
                  <Button className="bg-accent hover:bg-accent/90 text-white">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px]">
              <div className="flex flex-col gap-6 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 pt-4 border-t">
                  {user ? (
                    <>
                      <Link to="/dashboard" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full gap-2">
                          <LayoutDashboard className="h-4 w-4" />
                          Dashboard
                        </Button>
                      </Link>
                      <Button variant="outline" className="w-full gap-2" onClick={handleSignOut}>
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link to="/auth" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">Sign In</Button>
                      </Link>
                      <Link to="/auth" className="w-full" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-accent hover:bg-accent/90 text-white">
                          Get Started
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
