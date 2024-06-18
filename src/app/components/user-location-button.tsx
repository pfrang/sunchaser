"use client";

import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useMapInstance } from "states/sunchaser-result";

export const UserLocationButton = () => {
  const { mapInstance } = useMapInstance();
  return (
    <button
      onClick={() => mapInstance?.flyToUserLocation()}
      className="rounded-2xl border-2 bg-white p-1"
    >
      <MyLocationIcon fontSize="large" />
    </button>
  );
};
