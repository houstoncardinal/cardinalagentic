import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap } from "lucide-react";

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
    <Link to={`/agent/${number}`} className="block">
      <Card 
        className="group relative overflow-hidden border-border bg-gradient-card p-6 shadow-elegant transition-all duration-500 hover:shadow-enterprise hover:-translate-y-2 hover:border-accent/20 animate-fade-in cursor-pointer"
        style={{ animationDelay: `${delay}ms` }}
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-3xl transition-all duration-500 group-hover:bg-accent/15 group-hover:w-40 group-hover:h-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold text-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                {number}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-foreground leading-tight">{name}</h3>
                <Badge variant="secondary" className="mt-1 text-xs">
                  {modality}
                </Badge>
              </div>
            </div>
            <Brain className="h-6 w-6 text-accent opacity-60 group-hover:opacity-100 transition-opacity" />
          </div>

          <div className="space-y-3 pt-2">
            <div>
              <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                <Zap className="h-4 w-4 text-accent" />
                Key Integrations
              </h4>
              <ul className="space-y-1.5 text-sm text-muted-foreground">
                {integrations.map((integration, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-accent mt-0.5">•</span>
                    <span className="leading-relaxed">{integration}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-border">
              <p className="text-xs font-medium text-muted-foreground">
                Powered by:{" "}
                <span className="text-foreground font-semibold">{model}</span>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default AgentCard;
