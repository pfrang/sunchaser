"use client";
import { Collapse } from "@mui/material";
import { useUseSwipeable } from "app/hooks/use-swipeable";
import {
  useDisplayIsFooterExpanded,
  useDisplayIsSettingsExpanded,
} from "states/footer";

import { FooterExpandableLine } from "./_shared/footer-expandable-line";
import { Calendar } from "./sunchaser/components/calendar";
import { MapChooser } from "./map-chooser";

export const SettingsExpandable = () => {
  const { isSettingsExpanded, setIsSettingsExpanded } =
    useDisplayIsSettingsExpanded();
  const { setIsFooterExpanded } = useDisplayIsFooterExpanded();

  const handlers = useUseSwipeable({
    onSwipedUp: () => {},
    onSwipedDown: () => deCollapseAll(),
  });

  const deCollapseAll = () => {
    setIsSettingsExpanded(false);
    setIsFooterExpanded(false);
  };

  return (
    <div className="absolute">
      <div className="fixed bottom-0 z-50 w-full rounded-custom border-2 border-green-100 bg-white pr-1">
        <Collapse
          style={{
            width: "100%",
          }}
          in={isSettingsExpanded}
        >
          <div className="h-[400px] w-full overflow-y-auto pb-4 scrollbar-thin scrollbar-track-slate-50">
            <FooterExpandableLine
              expandableSwipe={handlers}
              expandableClick={() => deCollapseAll()}
            />
            <p className="text-variant-regular"> Maps</p>
            <MapChooser />
            <p className="text-variant-regular"> Calendar</p>
            <Calendar />
          </div>
        </Collapse>
      </div>
    </div>
  );
};
