import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";

interface PredictedAQIProps {
  currentPM25: number | null;
  currentPM10: number | null;
  historicalData: Array<{ pm25: number; pm10: number }>;
}

export const PredictedAQI = ({ currentPM25, currentPM10, historicalData }: PredictedAQIProps) => {
  const calculatePrediction = (current: number | null, historical: number[]) => {
    if (current === null || historical.length < 3) return null;
    
    // Simple moving average prediction
    const recent = historical.slice(-3);
    const average = recent.reduce((sum, val) => sum + val, 0) / recent.length;
    return Math.round(average * 10) / 10;
  };

  const pm25History = historicalData.map(d => d.pm25);
  const pm10History = historicalData.map(d => d.pm10);

  const predictedPM25 = calculatePrediction(currentPM25, pm25History);
  const predictedPM10 = calculatePrediction(currentPM10, pm10History);

  const getTrend = (current: number | null, predicted: number | null) => {
    if (current === null || predicted === null) return null;
    if (predicted > current) return "up";
    if (predicted < current) return "down";
    return "stable";
  };

  const pm25Trend = getTrend(currentPM25, predictedPM25);
  const pm10Trend = getTrend(currentPM10, predictedPM10);

  return (
    <Card className="p-6 shadow-card gradient-card">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-bold">Predicted Next Hour</h3>
        <Badge variant="outline" className="ml-auto">AI Forecast</Badge>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 rounded-lg bg-card border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">PM2.5</span>
            {pm25Trend === "up" && <TrendingUp className="h-4 w-4 text-danger" />}
            {pm25Trend === "down" && <TrendingDown className="h-4 w-4 text-success" />}
          </div>
          <p className="text-2xl font-bold">
            {predictedPM25 !== null ? `${predictedPM25}` : "N/A"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">µg/m³</p>
        </div>

        <div className="p-4 rounded-lg bg-card border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">PM10</span>
            {pm10Trend === "up" && <TrendingUp className="h-4 w-4 text-danger" />}
            {pm10Trend === "down" && <TrendingDown className="h-4 w-4 text-success" />}
          </div>
          <p className="text-2xl font-bold">
            {predictedPM10 !== null ? `${predictedPM10}` : "N/A"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">µg/m³</p>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-muted/50">
        <p className="text-xs text-muted-foreground">
          ℹ️ Predictions based on 3-hour moving average. Update mitigation strategies accordingly.
        </p>
      </div>
    </Card>
  );
};
