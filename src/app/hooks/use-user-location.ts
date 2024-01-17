import { Geolocation } from "@capacitor/geolocation";
import { UserLocation } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { useState, useEffect } from "react";

export const useUserLocation = () => {
  const [userLocation, setLocation] = useState<UserLocation | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const geoLocation = async () => {
      const geo = Geolocation;
      if (!geo) {
        setError("Geolocation is not supported");
        return;
      }
      const { longitude, latitude } = (await geo.getCurrentPosition()).coords;

      const userLocation = {
        longitude,
        latitude,
      };

      setLocation(userLocation);
    };
    geoLocation();
  }, []);

  return { userLocation, error };
};
