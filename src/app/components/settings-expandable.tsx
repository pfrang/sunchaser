"use client";

import { useUseSwipeable } from "app/hooks/use-swipeable";
import {
  SettingsHeightBreakPoints,
  settingsHeightBreakPoints,
  useDisplayIsFooterExpanded,
  useDisplayIsSettingsExpanded,
} from "states/footer";
import { useEffect, useState } from "react";

import { FooterExpandableLine } from "./_shared/footer-expandable-line";
import { Calendar } from "./sunchaser/components/calendar";
import { MapChooser } from "./map-chooser";
import { ChooseTravelDistance } from "./_shared/choose-travel-distance";

export const SettingsExpandable = () => {
  const [height, setHeight] = useState<SettingsHeightBreakPoints>(
    settingsHeightBreakPoints[0],
  );
  const { setIsFooterExpanded } = useDisplayIsFooterExpanded();
  const { isSettingsExpanded, setIsSettingsExpanded } =
    useDisplayIsSettingsExpanded();

  useEffect(() => {
    if (isSettingsExpanded) {
      setHeight(settingsHeightBreakPoints[1]);
      setIsFooterExpanded(false);
    } else {
      setHeight(settingsHeightBreakPoints[0]);
    }
  }, [isSettingsExpanded]);

  const onDelapse = (e) => {
    const isHardSwipe = e.velocity > 1.8;

    switch (height) {
      case settingsHeightBreakPoints[2]:
        if (isHardSwipe) {
          setHeight(settingsHeightBreakPoints[0]);
          setIsSettingsExpanded(false);
        } else {
          setHeight(settingsHeightBreakPoints[1]);
        }
        break;
      case settingsHeightBreakPoints[1]:
        setHeight(settingsHeightBreakPoints[0]);
        setIsSettingsExpanded(false);
        break;
      default:
        break;
    }
  };

  const handlers = useUseSwipeable({
    onSwipedUp: () => setHeight(settingsHeightBreakPoints[2]),
    onSwipedDown: onDelapse,
  });

  return (
    <div className={`absolute`}>
      <div
        className={`fixed bottom-0 z-50 w-full rounded-custom ${isSettingsExpanded && "border-t-2"} border-green-100 bg-white pr-1 pb-2`}
        {...handlers}
      >
        <div
          style={{
            // overflow: "hidden",
            transition: "height 0.3s ease",
            height: height,
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
