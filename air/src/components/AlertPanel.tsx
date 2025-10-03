import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Info, CheckCircle } from "lucide-react";

interface AlertPanelProps {
  pm25: number | null;
  pm10: number | null;
}

export const AlertPanel = ({ pm25, pm10 }: AlertPanelProps) => {
  const alerts = [];

  if (pm25 !== null) {
    if (pm25 > 60) {
      alerts.push({
        type: "danger",
        title: "CRITICAL: PM2.5 Above Safe Limit",
        message: "Immediate action required: Increase water sprinkling and cover all debris. Limit outdoor activities.",
        icon: AlertTriangle
      });
    } else if (pm25 > 30) {
      alerts.push({
        type: "warning",
        title: "Moderate PM2.5 Levels",
        message: "Maintain dust control measures. Monitor levels closely.",
        icon: Info
      });
    } else {
      alerts.push({
        type: "success",
        title: "PM2.5 Within Safe Range",
        message: "Current dust control measures are effective. Continue monitoring.",
        icon: CheckCircle
      });
    }
  }

  if (pm10 !== null) {
    if (pm10 > 100) {
      alerts.push({
        type: "danger",
        title: "CRITICAL: PM10 Above Safe Limit",
        message: "Immediate action required: Increase dust suppression activities. Cover all materials.",
        icon: AlertTriangle
      });
    } else if (pm10 > 50) {
      alerts.push({
        type: "warning",
        title: "Moderate PM10 Levels",
        message: "Maintain current mitigation practices. Consider additional dust control.",
        icon: Info
      });
    } else {
      alerts.push({
        type: "success",
        title: "PM10 Within Safe Range",
        message: "Dust control measures are working well. Keep up the good work!",
        icon: CheckCircle
      });
    }
  }

  const getAlertStyles = (type: string) => {
    switch (type) {
      case "danger":
        return "border-danger/50 bg-danger/10 text-danger-foreground [&>svg]:text-danger";
      case "warning":
        return "border-warning/50 bg-warning/10 text-warning-foreground [&>svg]:text-warning";
      case "success":
        return "border-success/50 bg-success/10 text-success-foreground [&>svg]:text-success";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-3">
      {alerts.map((alert, index) => {
        const Icon = alert.icon;
        return (
          <Alert key={index} className={`${getAlertStyles(alert.type)} animate-slide-up`}>
            <Icon className="h-5 w-5" />
            <AlertTitle className="font-bold">{alert.title}</AlertTitle>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        );
      })}
    </div>
  );
};
