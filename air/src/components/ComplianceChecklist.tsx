import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle2, Info, Droplets, Shield, Trash2, Fence, Truck, ClipboardCheck } from "lucide-react";

const checklistItems = [
  {
    id: "wheel",
    label: "Wheel Washing Station",
    icon: "🚿",
    description: "Operational wheel washing system at site exit for all vehicles",
    howItHelps: "Prevents dust-laden trucks from spreading PM10 and PM2.5 particles on public roads. Reduces road dust by up to 70% and prevents community complaints.",
    service: {
      title: "Professional Wheel Wash Installation",
      details: "We install automated wheel washing systems with water recycling. Includes daily maintenance logs and CPCB-compliant documentation.",
      specs: ["Water recycling system", "Automatic sensors", "Log book maintenance", "SPCB compliance certificate"]
    }
  },
  {
    id: "water",
    label: "Water Sprinkling System",
    icon: "💦",
    description: "Twice-daily water sprinkling on internal roads and debris areas",
    howItHelps: "Suppresses airborne dust particles. Studies show regular water sprinkling reduces PM2.5 by 40-60% and PM10 by 50-70% in construction zones.",
    service: {
      title: "Automated Sprinkling Solutions",
      details: "Install fixed or mobile water sprinklers with timers. Includes water tanker logs and photographic evidence for audits.",
      specs: ["Automated timers", "Pressure-based systems", "Daily photo logs", "Water usage tracking"]
    }
  },
  {
    id: "covering",
    label: "Material Coverage",
    icon: "🏗️",
    description: "All sand, cement, bricks, and debris covered with tarpaulin",
    howItHelps: "Prevents wind erosion of fine particles. Uncovered material can spread dust 300+ meters affecting nearby communities. Covering reduces emissions by 85%.",
    service: {
      title: "Green Netting & Tarpaulin Supply",
      details: "Heavy-duty HDPE green nets and waterproof tarpaulins. Site-specific sizing and installation with maintenance.",
      specs: ["UV-resistant materials", "Wind-rated (up to 60 km/h)", "Custom sizing", "Installation included"]
    }
  },
  {
    id: "waste",
    label: "C&D Waste Management",
    icon: "🗑️",
    description: "Segregated waste bins and authorized disposal channels",
    howItHelps: "Proper segregation allows recycling of 80-90% of construction waste. Prevents illegal dumping, methane emissions, and soil contamination.",
    service: {
      title: "Waste Segregation & Disposal",
      details: "Color-coded bins for concrete, metal, plastic, wood. Tie-up with SPCB-authorized recyclers. Complete manifest documentation.",
      specs: ["Segregation training", "SPCB-approved disposal", "Monthly reports", "Waste manifest tracking"]
    }
  },
  {
    id: "ppe",
    label: "PPE Compliance",
    icon: "🦺",
    description: "Workers wearing masks, helmets, and safety gear",
    howItHelps: "Protects workers from PM2.5 exposure (reduces respiratory issues by 60%) and prevents occupational hazards. Essential for compliance audits.",
    service: {
      title: "PPE Supply & Training",
      details: "N95 masks, safety helmets, gloves, and boots. Includes safety training sessions and compliance posters.",
      specs: ["ISI-certified gear", "Monthly replenishment", "Safety training", "Attendance records"]
    }
  },
  {
    id: "fencing",
    label: "Perimeter Fencing/Netting",
    icon: "🚧",
    description: "Green or blue netting around full site boundary",
    howItHelps: "Traps 50-60% of dust at source before it reaches community areas. Also provides visual screening and prevents debris spillage.",
    service: {
      title: "Perimeter Netting Installation",
      details: "8-foot green HDPE nets with steel framework. Covers entire site perimeter with entry/exit points.",
      specs: ["8-12 ft height", "90% shade factor", "Steel poles", "Signage integration"]
    }
  },
  {
    id: "signage",
    label: "Compliance Signage",
    icon: "📋",
    description: "Display boards showing project details and EHS contact",
    howItHelps: "Mandatory for CPCB compliance. Provides transparency to public and shows contact for complaints. Prevents miscommunication.",
    service: {
      title: "Custom Signage & AQI Boards",
      details: "Weather-proof boards with project details, safety info, and real-time AQI display for Tier-1 cities.",
      specs: ["Weather-resistant", "Reflective coating", "LED AQI display (optional)", "CPCB format compliant"]
    }
  },
  {
    id: "monitoring",
    label: "Dust Monitoring System",
    icon: "📊",
    description: "PM2.5 and PM10 continuous monitoring equipment",
    howItHelps: "Real-time data allows immediate corrective action. Sites with monitoring show 35% better compliance and reduced penalty risk.",
    service: {
      title: "AQI Monitoring Installation",
      details: "Continuous ambient air quality monitoring stations with cloud dashboard. Mandatory for 20,000+ sq.m. projects in metro cities.",
      specs: ["Real-time PM2.5/PM10", "Cloud dashboard", "SMS alerts", "Monthly calibration"]
    }
  }
];

export const ComplianceChecklist = () => {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const handleCheck = (id: string) => {
    setCheckedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const completionRate = (Object.values(checkedItems).filter(Boolean).length / checklistItems.length) * 100;
  const isFullyCompliant = completionRate === 100;

  return (
    <Card className="p-6 shadow-card">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">14-Point CPCB Compliance Checklist</h3>
        {isFullyCompliant && (
          <Badge className="bg-success text-success-foreground">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Fully Compliant
          </Badge>
        )}
      </div>

      <div className="mb-4 p-3 rounded-lg bg-primary/5 border border-primary/20 text-xs">
        <p className="font-medium mb-1">📌 Based on CPCB C&D Waste Management Rules, 2025</p>
        <p className="text-muted-foreground">Click on any item to see detailed description, impact, and available services.</p>
      </div>
      
      <div className="space-y-2 mb-4">
        {checklistItems.map((item) => (
          <div key={item.id} className="border rounded-lg overflow-hidden">
            <div className="flex items-center space-x-3 p-3 hover:bg-muted/50 transition-colors">
              <Checkbox
                id={item.id}
                checked={checkedItems[item.id] || false}
                onCheckedChange={() => handleCheck(item.id)}
                className="data-[state=checked]:bg-success data-[state=checked]:border-success"
              />
              <label
                htmlFor={item.id}
                className="flex-1 text-sm font-medium cursor-pointer flex items-center gap-2"
              >
                <span>{item.icon}</span>
                <span className={checkedItems[item.id] ? "line-through opacity-50" : ""}>
                  {item.label}
                </span>
              </label>
              <button
                onClick={() => setExpandedItem(expandedItem === item.id ? null : item.id)}
                className="p-1 hover:bg-muted rounded"
              >
                <Info className="h-4 w-4 text-primary" />
              </button>
            </div>

            {expandedItem === item.id && (
              <div className="border-t bg-muted/30">
                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="w-full grid grid-cols-3 h-auto rounded-none bg-muted/50">
                    <TabsTrigger value="description" className="text-xs py-2">Description</TabsTrigger>
                    <TabsTrigger value="impact" className="text-xs py-2">How It Helps</TabsTrigger>
                    <TabsTrigger value="service" className="text-xs py-2">Get Service</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="p-4 pt-3">
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </TabsContent>
                  
                  <TabsContent value="impact" className="p-4 pt-3">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <Shield className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        <p className="text-sm text-muted-foreground">{item.howItHelps}</p>
                      </div>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="service" className="p-4 pt-3">
                    <div className="space-y-3">
                      <h4 className="font-semibold text-sm">{item.service.title}</h4>
                      <p className="text-xs text-muted-foreground">{item.service.details}</p>
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Key Features:</p>
                        <ul className="text-xs text-muted-foreground space-y-1">
                          {item.service.specs.map((spec, idx) => (
                            <li key={idx} className="flex items-center gap-2">
                              <CheckCircle2 className="h-3 w-3 text-success" />
                              {spec}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <button className="w-full mt-2 py-2 px-4 bg-primary text-primary-foreground rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors">
                        Request Quote
                      </button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Compliance Rate</span>
          <span className="font-bold">{Math.round(completionRate)}%</span>
        </div>
        <Progress value={completionRate} className="h-3" />
        {completionRate < 100 && (
          <p className="text-xs text-warning">
            ⚠️ Incomplete compliance may result in SPCB penalties up to ₹2 lakh per violation
          </p>
        )}
      </div>
    </Card>
  );
};
