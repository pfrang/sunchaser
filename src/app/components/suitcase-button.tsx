"use client";

import Luggage from "@mui/icons-material/Luggage";
import { useMapInstance } from "states/sunchaser-result";

export const SuitcaseButton = () => {
  const { mapInstance } = useMapInstance();
  return (
    <button
      onClick={() => mapInstance?.flyToDataLocation()}
      className="rounded-2xl border-2 bg-white p-1"
    >
      <Luggage fontSize="large" />
    </button>
  );
};
