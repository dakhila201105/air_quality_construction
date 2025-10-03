import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp } from "lucide-react";

interface DataPoint {
  time: string;
  pm25: number;
  pm10: number;
}

interface AQITrendChartProps {
  data: DataPoint[];
}

export const AQITrendChart = ({ data }: AQITrendChartProps) => {
  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-bold">24-Hour AQI Trend</h3>
      </div>

      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis
              dataKey="time"
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
            />
            <YAxis
              stroke="hsl(var(--muted-foreground))"
              tick={{ fontSize: 12 }}
              label={{ value: 'µg/m³', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px"
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="pm25"
              stroke="hsl(var(--danger))"
              strokeWidth={2}
              name="PM2.5"
              dot={{ fill: "hsl(var(--danger))", r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="pm10"
              stroke="hsl(var(--warning))"
              strokeWidth={2}
              name="PM10"
              dot={{ fill: "hsl(var(--warning))", r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[300px] flex items-center justify-center text-muted-foreground">
          <p>Collecting data... Check back in a few minutes.</p>
        </div>
      )}

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="p-3 rounded-lg bg-danger/10 border border-danger/20">
          <div className="flex items-center gap-2 text-danger font-semibold">
            <div className="w-3 h-3 rounded-full bg-danger"></div>
            PM2.5 Safe Limit
          </div>
          <p className="text-lg font-bold mt-1">60 µg/m³</p>
        </div>
        <div className="p-3 rounded-lg bg-warning/10 border border-warning/20">
          <div className="flex items-center gap-2 text-warning font-semibold">
            <div className="w-3 h-3 rounded-full bg-warning"></div>
            PM10 Safe Limit
          </div>
          <p className="text-lg font-bold mt-1">100 µg/m³</p>
        </div>
      </div>
    </Card>
  );
};
