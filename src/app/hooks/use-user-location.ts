import { Capacitor } from "@capacitor/core";
import { Geolocation } from "@capacitor/geolocation";
import { UserLocation } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { useState, useEffect } from "react";

export const useUserLocation = () => {
  const [userLocation, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const requestLocation = async () => {
    try {
      const geo = Geolocation;
      if (!geo) {
        setError("Geolocation is not supported");
        return;
      }
      const { longitude, latitude } = (await geo.getCurrentPosition()).coords;
      if (!longitude || !latitude) {
        setError("Unable to retrieve user location");
        return;
      }

      const userLocation = {
        longitude,
        latitude,
      };

      setLocation(userLocation);
      setError(null);
    } catch (err) {
      setError("Failed to get location");
      console.error("Geolocation error:", err);
    }
  };

  useEffect(() => {
    if (Capacitor.isNativePlatform()) {
      Geolocation.requestPermissions()
        .then(() => {
          requestLocation();
        })
        .catch((err) => {
          setError("Permission denied for geolocation");
          console.error("Geolocation permission error:", err);
        });
    }
    requestLocation();
  }, []);

  return { userLocation, error, requestLocation };
};
