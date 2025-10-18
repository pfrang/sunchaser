"use client";
import {
  Drawer,
  DrawerContent,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import LayersIcon from "@mui/icons-material/Layers";
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

  return (
    <Drawer
      open={isSettingsOpen}
      onOpenChange={setIsSettingsOpen}
      snapPoints={[snapPoints[1]]}
      // snapPoints={[snapPoints[1], snapPoints[2]]}
      // activeSnapPoint={snap}
      // shouldScaleBackground={false}
      setActiveSnapPoint={setSnap}
      direction="right"
      modal
    >
      <div className="absolute top-20">
        <DrawerTrigger
          className="mr-2 rounded-2xl border-2 bg-white p-1"
          onClick={() => setIsSettingsOpen(!isSettingsOpen)}
        >
          <LayersIcon
            // onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            color={isSettingsOpen ? "info" : "action"}
          />
        </DrawerTrigger>
      </div>

      <DrawerTitle className="hidden"></DrawerTitle>
      <DrawerPortal>
        <DrawerContent
          noPortal
          noOverlay
          data-testid="content"
          className="w-full h-fit z-99 rounded-custom border-green-100 flex"
        >
          <div className="flex flex-col w-fit h-screen py-4">
            <MapChooser mapOption={mapOption} setMapOption={setMapOption} />
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};
