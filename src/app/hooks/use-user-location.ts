import { Capacitor } from "@capacitor/core";
import { Geolocation, PermissionStatus } from "@capacitor/geolocation";
import { useState, useEffect, useRef } from "react";
import { UserLocation } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

export const useUserLocation = () => {
  const [userLocation, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const requestingRef = useRef(false);

  const ensurePermission = async (): Promise<boolean> => {
    try {
      const status: PermissionStatus = await Geolocation.checkPermissions();
      if (status.location === "granted") return true;
      const req = await Geolocation.requestPermissions();
      return req.location === "granted";
    } catch (e) {
      setError("Unable to check/request location permission");
      return false;
    }
  };

  const requestLocation = async () => {
    if (requestingRef.current) return;
    requestingRef.current = true;
    try {
      if (Capacitor.getPlatform() !== "web") {
        const ok = await ensurePermission();
        if (!ok) {
          setError("Location permission denied");
          requestingRef.current = false;
          return;
        }
      }
      const pos = await Geolocation.getCurrentPosition({
        // enableHighAccuracy: true,
        timeout: 15000,
      });
      if (pos?.coords?.latitude == null || pos?.coords?.longitude == null) {
        setError("No coordinates returned");
      } else {
        setLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setError(null);
      }
    } catch (e: any) {
      setError(e?.message || "Failed to get location");
      console.error("Geolocation error:", e);
    } finally {
      requestingRef.current = false;
    }
  };

  useEffect(() => {
    // Only auto-request once
    requestLocation();
  }, []);

  return { userLocation, error, requestLocation };
};
