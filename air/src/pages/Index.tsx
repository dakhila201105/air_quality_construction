import { Construction, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AQIMetric } from "@/components/AQIMetric";
import { ComplianceChecklist } from "@/components/ComplianceChecklist";
import { CPCBGuidelines } from "@/components/CPCBGuidelines";
import { AQITrendChart } from "@/components/AQITrendChart";
import { AlertPanel } from "@/components/AlertPanel";
import { CommunityQR } from "@/components/CommunityQR";
import { PredictedAQI } from "@/components/PredictedAQI";
import { useAQIData } from "@/hooks/useAQIData";
import { toast } from "sonner";

const Index = () => {
  const { currentPM25, currentPM10, previousPM25, previousPM10, history } = useAQIData();

  const handleRefresh = () => {
    toast.info("Refreshing data...", { duration: 2000 });
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-hero text-white py-6 px-4 shadow-elevated">
        <div className="container mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Construction className="h-8 w-8" />
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Construction Site AQI Dashboard</h1>
                <p className="text-sm opacity-90">Live Air Quality & Community Compliance Monitoring</p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={handleRefresh}
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8 space-y-8">
        {/* Live AQI Metrics */}
        <section>
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            🌫️ Live Air Quality Index
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <AQIMetric
              label="PM2.5"
              value={currentPM25}
              unit="µg/m³"
              safeLimit={60}
              previousValue={previousPM25}
            />
            <AQIMetric
              label="PM10"
              value={currentPM10}
              unit="µg/m³"
              safeLimit={100}
              previousValue={previousPM10}
            />
          </div>
        </section>

        {/* Alerts */}
        <section>
          <h2 className="text-xl font-bold mb-4">⚠️ Active Alerts & Mitigation</h2>
          <AlertPanel pm25={currentPM25} pm10={currentPM10} />
        </section>

        {/* Trend Chart */}
        <section>
          <AQITrendChart data={history} />
        </section>

        {/* Predicted AQI */}
        <section>
          <PredictedAQI
            currentPM25={currentPM25}
            currentPM10={currentPM10}
            historicalData={history}
          />
        </section>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">✅ Compliance Checklist</h2>
              <ComplianceChecklist />
            </section>

            <section>
              <h2 className="text-xl font-bold mb-4">💬 Community</h2>
              <CommunityQR />
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold mb-4">📋 CPCB Standards</h2>
              <CPCBGuidelines />
            </section>
          </div>
        </div>

        {/* Footer Info */}
        <section className="mt-12 p-6 rounded-lg bg-card shadow-card border">
          <h3 className="font-bold mb-2">About This Dashboard</h3>
          <p className="text-sm text-muted-foreground">
            This dashboard monitors real-time air quality at construction sites and ensures compliance with CPCB
            (Central Pollution Control Board) guidelines. Data refreshes automatically every 5 minutes.
            For emergencies or critical pollution levels, contact your site safety officer immediately.
          </p>
        </section>
      </main>
    </div>
  );
};

export default Index;
