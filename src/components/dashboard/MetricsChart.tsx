import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown } from "lucide-react";

interface MetricsChartProps {
  title: string;
  data: Array<{
    time: string;
    value: number;
  }>;
  unit?: string;
  trend?: "up" | "down";
  trendValue?: string;
}

export const MetricsChart = ({ title, data, unit = "", trend, trendValue }: MetricsChartProps) => {
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue;

  return (
    <Card className="p-6 border-border bg-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {trend && trendValue && (
          <Badge variant={trend === "up" ? "default" : "secondary"} className="gap-1">
            {trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {trendValue}
          </Badge>
        )}
      </div>
      
      <div className="relative h-40 flex items-end gap-1">
        {data.map((point, idx) => {
          const height = range > 0 ? ((point.value - minValue) / range) * 100 : 50;
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group">
              <div className="relative w-full">
                <div 
                  className="w-full bg-accent/20 rounded-t transition-all group-hover:bg-accent/30"
                  style={{ height: `${Math.max(height, 5)}%` }}
                />
                <div 
                  className="absolute bottom-0 w-full bg-accent rounded-t transition-all"
                  style={{ height: `${Math.max(height * 0.7, 3)}%` }}
                />
              </div>
              <span className="text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                {point.value}{unit}
              </span>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between mt-4 text-xs text-muted-foreground">
        <span>{data[0]?.time}</span>
        <span>{data[Math.floor(data.length / 2)]?.time}</span>
        <span>{data[data.length - 1]?.time}</span>
      </div>
    </Card>
  );
};
