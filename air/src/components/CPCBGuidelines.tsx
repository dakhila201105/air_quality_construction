import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, FileText, Volume2, Trash2, Wind, Droplets, ExternalLink, BookOpen } from "lucide-react";

const guidelines = [
  {
    parameter: "PM2.5 (Fine Particulate Matter)",
    limit: "60 µg/m³ (8-hour average)",
    action: "Water sprinkling twice daily, cover all debris and material storage",
    icon: <Wind className="h-5 w-5" />,
    color: "text-danger",
    source: "CPCB National Ambient Air Quality Standards (NAAQS), 2009"
  },
  {
    parameter: "PM10 (Respirable Dust)",
    limit: "100 µg/m³ (24-hour average)",
    action: "Dust suppression systems, green netting, wheel washing stations",
    icon: <AlertTriangle className="h-5 w-5" />,
    color: "text-warning",
    source: "CPCB NAAQS, 2009"
  },
  {
    parameter: "Noise Levels",
    limit: "75 dB (Day) / 70 dB (Night) - Commercial",
    action: "Acoustic barriers, PPE for workers, restrict noisy operations after 10 PM",
    icon: <Volume2 className="h-5 w-5" />,
    color: "text-primary",
    source: "Noise Pollution (Regulation and Control) Rules, 2000"
  },
  {
    parameter: "C&D Waste Management",
    limit: "100% segregation & authorized disposal",
    action: "Separate bins for concrete, metal, plastic, wood. Use SPCB-approved recyclers only",
    icon: <Trash2 className="h-5 w-5" />,
    color: "text-success",
    source: "Construction & Demolition Waste Management Rules, 2016 (Amended 2025)"
  },
  {
    parameter: "Water Sprinkling",
    limit: "Minimum twice daily on roads and storage",
    action: "Maintain water tanker logs with date, time, and quantity used",
    icon: <Droplets className="h-5 w-5" />,
    color: "text-primary",
    source: "CPCB C&D Waste SOP, 2017"
  },
  {
    parameter: "Site Boundary Protection",
    limit: "Mandatory green netting (minimum 8 ft height)",
    action: "HDPE green nets with 90% shade factor around full perimeter",
    icon: <FileText className="h-5 w-5" />,
    color: "text-success",
    source: "CPCB Dust Mitigation Measures SOP"
  }
];

export const CPCBGuidelines = () => {
  return (
    <Card className="p-6 shadow-card">
      <div className="flex items-center gap-2 mb-4">
        <BookOpen className="h-6 w-6 text-primary" />
        <h3 className="text-lg font-bold">CPCB Guidelines & Standards</h3>
      </div>

      <Alert className="mb-4 border-primary/20 bg-primary/5">
        <AlertDescription className="text-sm">
          Central Pollution Control Board (CPCB) mandated standards for construction sites under Environment (Protection) Act, 1986
        </AlertDescription>
      </Alert>

      <div className="space-y-3 mb-4">
        {guidelines.map((guideline, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border bg-card hover:shadow-md transition-shadow"
          >
            <div className="flex items-start gap-3">
              <div className={`mt-1 ${guideline.color}`}>
                {guideline.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <h4 className="font-semibold">{guideline.parameter}</h4>
                  <Badge variant="outline" className="text-xs">
                    {guideline.limit}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  <span className="font-medium">Required Action:</span> {guideline.action}
                </p>
                <p className="text-xs text-muted-foreground italic">
                  📄 Source: {guideline.source}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 pt-4 border-t">
        <p className="text-sm font-semibold">📚 Official CPCB References & Guidelines:</p>
        
        <Button
          variant="outline"
          className="w-full justify-between text-left h-auto py-3"
          onClick={() => window.open("https://cpcb.nic.in/technical-guidelines-5/", "_blank")}
        >
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 mt-0.5 text-primary" />
            <div>
              <p className="text-sm font-medium">CPCB C&D Waste Management SOP (2017)</p>
              <p className="text-xs text-muted-foreground">Technical guidelines for construction sites</p>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </Button>

        <Button
          variant="outline"
          className="w-full justify-between text-left h-auto py-3"
          onClick={() => window.open("https://kunakair.com/air-pollution-from-construction-sites/", "_blank")}
        >
          <div className="flex items-start gap-2">
            <Wind className="h-4 w-4 mt-0.5 text-primary" />
            <div>
              <p className="text-sm font-medium">Air Pollution from Construction Sites</p>
              <p className="text-xs text-muted-foreground">Environmental impact analysis & monitoring</p>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </Button>

        <Button
          variant="outline"
          className="w-full justify-between text-left h-auto py-3"
          onClick={() => window.open("https://www.ppsthane.com/blog/cpcb-guidelines-large-small-construction-sites", "_blank")}
        >
          <div className="flex items-start gap-2">
            <BookOpen className="h-4 w-4 mt-0.5 text-primary" />
            <div>
              <p className="text-sm font-medium">CPCB Guidelines 2025 Checklist</p>
              <p className="text-xs text-muted-foreground">Complete compliance guide for construction sites</p>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 text-muted-foreground" />
        </Button>
      </div>

      <div className="mt-4 p-4 rounded-lg bg-warning/10 border border-warning/20">
        <p className="text-xs font-medium text-warning mb-1">⚠️ Penalty Information</p>
        <p className="text-xs text-muted-foreground">
          Non-compliance with CPCB guidelines can result in penalties up to <span className="font-bold">₹2 lakh per violation</span> and potential project suspension by SPCB.
        </p>
      </div>
    </Card>
  );
};
