"use client";
import SettingsIcon from "@mui/icons-material/Settings";
import { useDisplayIsSettingsExpanded } from "states/footer";

export const SettingsButton = () => {
  const { setIsSettingsExpanded } = useDisplayIsSettingsExpanded();
  return (
    <button
      onClick={() => setIsSettingsExpanded(true)}
      className="static rounded-2xl border-2 bg-white p-1"
    >
      <SettingsIcon fontSize="large" />
    </button>
  );
};
