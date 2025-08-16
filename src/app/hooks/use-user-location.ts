import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { UserLocation } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { useState, useEffect, useRef, useCallback } from "react";

export type UseUserLocationOptions = {
  auto?: boolean; // auto fetch on mount
  enableHighAccuracy?: boolean;
  timeoutMs?: number;
  maximumAgeMs?: number;
  deferOnWebUntilGesture?: boolean; // avoid instant prompt on web (use with auto:false)
};

export const useUserLocation = ({
  auto = true,
  enableHighAccuracy = false,
  timeoutMs = 10000,
  maximumAgeMs = 60_000,
  deferOnWebUntilGesture = false,
}: UseUserLocationOptions = {}) => {
  const [userLocation, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const isMounted = useRef(true);
  const inFlight = useRef<Promise<void> | null>(null);

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const ensurePermission = useCallback(async () => {
    try {
      // On web, optionally defer prompting until a user gesture by not calling requestPermissions
      if (!Capacitor.isNativePlatform() && deferOnWebUntilGesture) {
        return true;
      }

      const status = await Geolocation.checkPermissions();
      const granted =
        (status as any).location === "granted" ||
        (status as any).coarseLocation === "granted";
      if (granted) return true;

      const requested = await Geolocation.requestPermissions();
      const nowGranted =
        (requested as any).location === "granted" ||
        (requested as any).coarseLocation === "granted";
      return nowGranted;
    } catch {
      return false;
    }
  }, [deferOnWebUntilGesture]);

  const requestLocation = useCallback(async () => {
    if (inFlight.current) return inFlight.current;

    const run = (async () => {
      try {
        const permitted = await ensurePermission();
        if (!permitted) {
          if (!isMounted.current) return;
          setError("Permission denied for geolocation");
          return;
        }

        const pos = await Geolocation.getCurrentPosition({
          enableHighAccuracy,
          timeout: timeoutMs,
          maximumAge: maximumAgeMs,
        });

        const { longitude, latitude } = pos.coords;

        if (!Number.isFinite(longitude) || !Number.isFinite(latitude)) {
          if (!isMounted.current) return;
          setError("Unable to retrieve user location");
          return;
        }

        if (!isMounted.current) return;
        setLocation({ longitude, latitude });
        setError(null);
      } catch {
        if (!isMounted.current) return;
        setError("Failed to get location");
      } finally {
        inFlight.current = null;
      }
    })();

    inFlight.current = run;
    return run;
  }, [enableHighAccuracy, maximumAgeMs, timeoutMs, ensurePermission]);

  useEffect(() => {
    if (!auto) return;
    requestLocation();
  }, [auto, requestLocation]);

  return { userLocation, error, requestLocation };
};
