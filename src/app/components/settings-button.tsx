"use client";
import LayersIcon from "@mui/icons-material/Layers";
import { useIsSettingsOpen } from "states/states";

export const SettingsButton = () => {
  const { setIsSettingsOpen } = useIsSettingsOpen();

  return (
    <div className="absolute top-20">
      <button
        className="mr-2 rounded-2xl border-2 bg-white p-1"
        onClick={() => setIsSettingsOpen(true)}
      >
        <LayersIcon color="action" />
      </button>
    </div>
  );
};
