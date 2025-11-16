import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, ArrowUpRight } from "lucide-react";

interface AgentCardProps {
  number: number;
  name: string;
  modality: string;
  integrations: string[];
  model: string;
  delay?: number;
}

const AgentCard = ({ number, name, modality, integrations, model, delay = 0 }: AgentCardProps) => {
  return (
    <Link to={`/agent/${number}`} className="block group">
      <Card 
        className="relative overflow-hidden border border-border/50 bg-card hover:bg-card/80 h-full transition-all duration-500 hover:shadow-glow hover:-translate-y-1 hover:border-accent/30 animate-fade-in"
        style={{ animationDelay: `${delay}ms` }}
      >
        {/* Gradient Overlays */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl transition-all duration-500 group-hover:bg-accent/10 group-hover:w-40 group-hover:h-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/[0.03] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Number Badge - Top Right */}
        <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 border border-accent/20 text-accent font-bold text-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-accent group-hover:text-white group-hover:border-accent z-10">
          {number}
        </div>

        <div className="relative p-5 sm:p-6 space-y-4">
          {/* Header */}
          <div className="space-y-3 pr-12">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                <Brain className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
              </div>
              <Badge variant="secondary" className="text-xs font-medium">
                {modality}
              </Badge>
            </div>
            
            <h3 className="font-bold text-base sm:text-lg text-foreground leading-tight group-hover:text-accent transition-colors duration-300">
              {name}
            </h3>
          </div>

          {/* Integrations */}
          <div className="space-y-2.5 pt-2 border-t border-border/50">
            <div className="flex items-center gap-2">
              <Zap className="h-3.5 w-3.5 text-accent flex-shrink-0" />
              <h4 className="text-xs font-semibold text-foreground uppercase tracking-wide">
                Key Integrations
              </h4>
            </div>
            
            <ul className="space-y-1.5">
              {integrations.slice(0, 2).map((integration, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                  <span className="text-accent mt-0.5 flex-shrink-0">•</span>
                  <span className="leading-relaxed line-clamp-2">{integration}</span>
                </li>
              ))}
              {integrations.length > 2 && (
                <li className="text-xs text-accent font-medium">
                  +{integrations.length - 2} more
                </li>
              )}
            </ul>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-border/50">
            <div className="flex-1">
              <p className="text-xs text-muted-foreground">
                Powered by
              </p>
              <p className="text-xs font-semibold text-foreground mt-0.5">
                {model}
              </p>
            </div>
            
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-accent/10 text-accent transition-all duration-300 group-hover:bg-accent group-hover:text-white group-hover:scale-110">
              <ArrowUpRight className="h-4 w-4" />
            </div>
          </div>
        </div>

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border border-accent/0 rounded-lg transition-all duration-500 group-hover:border-accent/20 pointer-events-none" />
      </Card>
    </Link>
  );
};

export default AgentCard;
