import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";

interface AQIMetricProps {
  label: string;
  value: number | null;
  unit: string;
  safeLimit: number;
  previousValue?: number | null;
}

export const AQIMetric = ({ label, value, unit, safeLimit, previousValue }: AQIMetricProps) => {
  if (value === null) {
    return (
      <Card className="p-6 shadow-card">
        <h3 className="text-sm font-medium text-muted-foreground mb-2">{label}</h3>
        <p className="text-2xl font-bold text-muted-foreground">N/A</p>
        <p className="text-xs text-muted-foreground mt-1">{unit}</p>
      </Card>
    );
  }

  const getStatus = () => {
    if (value > safeLimit) return "danger";
    if (value > safeLimit * 0.5) return "warning";
    return "success";
  };

  const getTrend = () => {
    if (!previousValue) return null;
    if (value > previousValue) return <TrendingUp className="h-4 w-4" />;
    if (value < previousValue) return <TrendingDown className="h-4 w-4" />;
    return <Minus className="h-4 w-4" />;
  };

  const status = getStatus();
  const colorClasses = {
    danger: "bg-danger/10 border-danger text-danger",
    warning: "bg-warning/10 border-warning text-warning",
    success: "bg-success/10 border-success text-success"
  };

  const iconClasses = {
    danger: "text-danger",
    warning: "text-warning",
    success: "text-success"
  };

  return (
    <Card className={`p-6 shadow-card border-2 ${colorClasses[status]} animate-slide-up`}>
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium opacity-80">{label}</h3>
        {previousValue && (
          <div className={iconClasses[status]}>
            {getTrend()}
          </div>
        )}
      </div>
      <p className="text-4xl font-bold mb-1">{value}</p>
      <p className="text-xs opacity-80">{unit}</p>
      <div className="mt-3 pt-3 border-t border-current/20">
        <p className="text-xs">
          Safe limit: <span className="font-semibold">{safeLimit} {unit}</span>
        </p>
      </div>
    </Card>
  );
};
