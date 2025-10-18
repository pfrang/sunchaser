import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { useState, useEffect, useRef } from "react";
import { UserLocation } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

type LocationError =
  | string
  | null
  | "permission_denied"
  | "location_unavailable"
  | "timeout"
  | "unknown";

export const useUserLocation = () => {
  const [userLocation, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<LocationError>(null);
  const requestingRef = useRef(false);

  const ensurePermission = async (): Promise<boolean> => {
    try {
      const status = await Geolocation.checkPermissions();

      // iOS uses "location" or "coarseLocation"
      const granted =
        status.location === "granted" || status.coarseLocation === "granted";

      if (granted) return true;

      const req = await Geolocation.requestPermissions();
      const reqGranted =
        req.location === "granted" || req.coarseLocation === "granted";

      return reqGranted;
    } catch (err) {
      console.error("Permission check failed:", err);
      setError("permission_denied");
      return false;
    }
  };

  const requestLocation = async () => {
    if (requestingRef.current) return;
    requestingRef.current = true;

    try {
      // Ensure Capacitor is initialized
      const platform = Capacitor.getPlatform();

      // Web handles permission via browser prompt
      if (platform !== "web") {
        const ok = await ensurePermission();
        if (!ok) {
          setError("permission_denied");
          requestingRef.current = false;
          return;
        }
      }

      const pos = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 60_000,
      });

      if (!pos?.coords) {
        setError("location_unavailable");
        return;
      }

      setLocation({
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
      });
      setError(null);
    } catch (e: any) {
      console.error("Geolocation error:", e);
      if (e.message?.includes("timeout")) setError("timeout");
      else if (e.message?.includes("permission")) setError("permission_denied");
      else setError("unknown");
    } finally {
      requestingRef.current = false;
    }
  };

  useEffect(() => {
    // Wait a bit after app start (especially iOS)
    const timer = setTimeout(() => {
      requestLocation();
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return { userLocation, error, requestLocation };
};
