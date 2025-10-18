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
import { useState } from "react";
import { MapOptionsEnum } from "./sunchaser/components/footer/settings-form-values";
import { snapPoints } from "./sunchaser/components/footer/footer";

export const SettingsButton = () => {
  const [snap, setSnap] = useState<number | string | null>(null);

  const [mapOption, setMapOption] = useState<MapOptionsEnum>(
    MapOptionsEnum.Standard
  );

  return (
    <Drawer
      snapPoints={[snapPoints[1]]}
      // snapPoints={[snapPoints[1], snapPoints[2]]}
      // activeSnapPoint={snap}
      // shouldScaleBackground={false}
      setActiveSnapPoint={setSnap}
      modal
    >
      <div className="absolute top-20">
        <DrawerTrigger className="mr-2 rounded-2xl border-2 bg-white p-1">
          <LayersIcon />
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
          <div className="flex flex-col h-screen py-4">
            <MapChooser mapOption={mapOption} setMapOption={setMapOption} />
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};
