import { useState, useEffect } from "react";
import { toast } from "sonner";

interface AQIReading {
  time: string;
  pm25: number | null;
  pm10: number | null;
  wqi?: number | null;
}

const HISTORY_KEY = "build_clean_air_aqi_history_v1";

const readHistory = (): AQIReading[] => {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as AQIReading[];
    // Ensure times are strings
    return parsed.map((r) => ({ time: r.time, pm25: r.pm25 ?? null, pm10: r.pm10 ?? null, wqi: r.wqi ?? null }));
  } catch (e) {
    console.error("Failed to read history:", e);
    return [];
  }
};

const writeHistory = (history: AQIReading[]) => {
  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(-500))); // keep last 500 points
  } catch (e) {
    console.error("Failed to write history:", e);
  }
};

const safeNumber = (v: any): number | null => {
  if (v === null || v === undefined) return null;
  const n = Number(v);
  return Number.isFinite(n) ? n : null;
};

export const useAQIData = () => {
  const [currentPM25, setCurrentPM25] = useState<number | null>(null);
  const [currentPM10, setCurrentPM10] = useState<number | null>(null);
  const [currentWQI, setCurrentWQI] = useState<number | null>(null);
  const [previousPM25, setPreviousPM25] = useState<number | null>(null);
  const [previousPM10, setPreviousPM10] = useState<number | null>(null);
  const [history, setHistory] = useState<AQIReading[]>(() => readHistory());
  const [lastAlertTime, setLastAlertTime] = useState<number>(0);

  // Environment / build-time variables (Vite)
  const WAQI_TOKEN = import.meta.env.VITE_WAQI_TOKEN ?? "";
  const WAQI_STATION = import.meta.env.VITE_WAQI_STATION_ID ?? "";
  const WQI_URL = import.meta.env.VITE_WQI_URL ?? ""; // optional custom WQI endpoint
  const WQI_TOKEN = import.meta.env.VITE_WQI_TOKEN ?? ""; // optional

  useEffect(() => {
    let mounted = true;

    const fetchWAQI = async () => {
      try {
        if (!WAQI_TOKEN || !WAQI_STATION) {
          console.warn("WAQI token or station not configured (VITE_WAQI_TOKEN / VITE_WAQI_STATION_ID).");
          return { pm25: null, pm10: null };
        }
        const url = `https://api.waqi.info/feed/@${WAQI_STATION}/?token=${WAQI_TOKEN}`;
        const res = await fetch(url);
        if (!res.ok) {
          console.warn("WAQI fetch failed", res.status);
          return { pm25: null, pm10: null };
        }
        const data = await res.json();
        if (data?.status === "ok" && data?.data?.iaqi) {
          const iaqi = data.data.iaqi;
          const pm25 = safeNumber(iaqi.pm25?.v ?? null);
          const pm10 = safeNumber(iaqi.pm10?.v ?? null);
          return { pm25, pm10 };
        } else {
          console.warn("WAQI returned no data", data);
          return { pm25: null, pm10: null };
        }
      } catch (e) {
        console.error("WAQI fetch error", e);
        return { pm25: null, pm10: null };
      }
    };

    const fetchWQI = async () => {
      try {
        if (!WQI_URL) return null;
        // If token expected, append as header or query param depending on your API.
        const headers: Record<string, string> = {};
        let url = WQI_URL;
        if (WQI_TOKEN) {
          // common pattern: token as query param 'token'
          const sep = url.includes("?") ? "&" : "?";
          url = `${url}${sep}token=${encodeURIComponent(WQI_TOKEN)}`;
        }
        const res = await fetch(url, { headers });
        if (!res.ok) {
          console.warn("WQI fetch failed", res.status);
          return null;
        }
        const data = await res.json();
        // Try to guess WQI numeric value
        if (typeof data === "number") return data;
        if (data?.wqi) return safeNumber(data.wqi);
        if (data?.value) return safeNumber(data.value);
        if (data?.data?.wqi) return safeNumber(data.data.wqi);
        // otherwise no wqi found
        return null;
      } catch (e) {
        console.error("WQI fetch error", e);
        return null;
      }
    };

    const update = async () => {
      const waqi = await fetchWAQI();
      const wqi = await fetchWQI();

      if (!mounted) return;

      // Update previous values
      setPreviousPM25(currentPM25);
      setPreviousPM10(currentPM10);

      if (waqi.pm25 !== null) setCurrentPM25(waqi.pm25);
      if (waqi.pm10 !== null) setCurrentPM10(waqi.pm10);
      if (wqi !== null) setCurrentWQI(wqi);

      // Persist history (use ISO time)
      const now = new Date().toISOString();
      const newEntry: AQIReading = { time: now, pm25: waqi.pm25, pm10: waqi.pm10, wqi: wqi ?? null };
      const newHistory = [...history, newEntry];
      setHistory(newHistory);
      writeHistory(newHistory);

      // Simple alert throttling (once per 10 minutes)
      try {
        const last = Date.now();
        if ((last - lastAlertTime) > 10 * 60 * 1000) {
          if ((waqi.pm25 ?? 0) > 60 || (waqi.pm10 ?? 0) > 100) {
            toast(`⚠️ High AQI detected (PM2.5: ${waqi.pm25 ?? "N/A"}, PM10: ${waqi.pm10 ?? "N/A"})`);
            setLastAlertTime(last);
          }
        }
      } catch (e) {
        // ignore toast errors in non-browser env
      }
    };

    // Initial update on mount
    update();

    // Poll every 5 minutes (300000 ms)
    const interval = setInterval(update, 300000);

    return () => {
      mounted = false;
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    currentPM25,
    currentPM10,
    currentWQI,
    previousPM25,
    previousPM10,
    history
  };
};
