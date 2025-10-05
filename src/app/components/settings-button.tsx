"use client";
import {
  Drawer,
  DrawerContent,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import LayersIcon from "@mui/icons-material/Layers";
import { useIsSettingsOpen } from "states/states";
import { MapChooser } from "./sunchaser/components/footer/map-chooser";
import { useEffect, useState } from "react";
import { MapOptionsEnum } from "./sunchaser/components/footer/settings-form-values";
import { snapPoints } from "./sunchaser/components/footer/footer";

export const SettingsButton = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [snap, setSnap] = useState<number | string | null>(null);

  const [mapOption, setMapOption] = useState<MapOptionsEnum>(
    MapOptionsEnum.Standard
  );

  useEffect(() => {
    if (isSettingsOpen) {
      setSnap(snapPoints[1]); // start at 0.3
    } else {
      setSnap(null); // closed
    }
  }, [isSettingsOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setIsSettingsOpen(false);
      setSnap(null);
    } else {
      setIsSettingsOpen(true);
    }
  };

  return (
    <Drawer
      open={isSettingsOpen}
      onOpenChange={handleOpenChange}
      snapPoints={[snapPoints[1], snapPoints[2]]}
      activeSnapPoint={snap}
      shouldScaleBackground={false}
      setActiveSnapPoint={setSnap}
    >
      <div className="absolute top-20">
        <DrawerTrigger
          className="mr-2 rounded-2xl border-2 bg-white p-1"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <LayersIcon color={isSettingsOpen ? "info" : "action"} />
        </DrawerTrigger>
      </div>

      <DrawerTitle className="hidden"></DrawerTitle>
      <DrawerPortal>
        <DrawerContent
          noPortal
          noOverlay
          data-testid="content"
          className="w-full rounded-custom border-green-100 flex"
        >
          <MapChooser mapOption={mapOption} setMapOption={setMapOption} />
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};
