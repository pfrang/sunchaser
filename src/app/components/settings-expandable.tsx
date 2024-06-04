"use client";

import { useUseSwipeable } from "app/hooks/use-swipeable";
import {
  useDisplayIsFooterExpanded,
  useDisplayIsSettingsExpanded,
} from "states/footer";
import { useEffect } from "react";

import { FooterExpandableLine } from "./_shared/footer-expandable-line";
import { Calendar } from "./sunchaser/components/calendar";
import { MapChooser } from "./map-chooser";
import { ChooseTravelDistance } from "./_shared/choose-travel-distance";

export const SettingsExpandable = () => {
  const { setIsFooterExpanded } = useDisplayIsFooterExpanded();
  const { isSettingsExpanded, setIsSettingsExpanded } =
    useDisplayIsSettingsExpanded();

  useEffect(() => {
    if (isSettingsExpanded) {
      return setIsFooterExpanded(false);
    }
    return setIsFooterExpanded(false);
  }, [isSettingsExpanded]);

  const handlers = useUseSwipeable({
    onSwipedUp: () => setIsSettingsExpanded(true),
    onSwipedDown: () => setIsSettingsExpanded(false),
  });

  return (
    <div className={`absolute`}>
      <div
        className={`fixed bottom-0 z-50 w-full rounded-custom ${isSettingsExpanded && "border-t-2"} border-green-100 bg-white pb-2 pr-1`}
        {...handlers}
      >
        <div
          style={{
            // overflow: "hidden",
            transition: "height 0.3s ease",
            height: isSettingsExpanded ? "90dvh" : "0px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <FooterExpandableLine
            expandableClick={() => setIsSettingsExpanded(false)}
          />
          <div
            className="flex-grow overflow-y-auto pb-4 scrollbar-thin scrollbar-track-slate-50"
            {...handlers}
          >
            <p className="text-variant-regular"> Length</p>
            <ChooseTravelDistance />
            <p className="text-variant-regular"> Calendar</p>
            <Calendar />
            <p className="text-variant-regular"> Maps</p>
            <MapChooser />
          </div>
        </div>
      </div>
    </div>
  );
};
