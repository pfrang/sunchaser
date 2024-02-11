"use client";

import { Collapse } from "@mui/material";
import { capitalize } from "lodash";
import { useUseSwipeable } from "app/hooks/use-swipeable";
import {
  FooterItemType,
  useDisplayFooter,
  useDisplayIsFooterExpanded,
} from "states/footer";

import { Forecast } from "./forecast";
import { SunchaserListWrapper } from "./sunchaser/components/result-list-wrapper";
import { FooterExpandableLine } from "./_shared/footer-expandable-line";

export const Footer = () => {
  const { isFooterExpanded, setIsFooterExpanded } =
    useDisplayIsFooterExpanded();
  const { footerItem } = useDisplayFooter();

  const handlers = useUseSwipeable({
    onSwipedUp: () => setIsFooterExpanded(true),
    onSwipedDown: () => setIsFooterExpanded(false),
  });

  return (
    <div className={`absolute`}>
      <div className="fixed bottom-0 z-40 w-full rounded-custom border-2 border-green-100 bg-gray-100 pr-1">
        <FooterExpandableLine
          expandableSwipe={handlers}
          expandableClick={() => setIsFooterExpanded(!isFooterExpanded)}
        />

        <Collapse
          style={{
            width: "100%",
          }}
          in={isFooterExpanded}
        >
          <div className="h-[250px] w-full overflow-y-auto bg-white scrollbar-thin scrollbar-track-slate-50">
            <div className="bg-gray-100">
              <p className="text-variant-regular bg-gray-100 pl-4 text-xl">
                Resultater
              </p>
              <span className="block h-4"></span>
            </div>
            <div className="flex w-full justify-between bg-gray-100">
              <FooterButton item="sunchaser" />
              <FooterButton item="forecast" />
            </div>
            <div className="size-full bg-white shadow-top">
              <span className="block h-4"></span>
              {footerItem === "forecast" && <Forecast />}
              {footerItem === "sunchaser" && <SunchaserListWrapper />}
            </div>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

const FooterButton = ({ item }: { item: FooterItemType }) => {
  const { footerItem, setFooterItem } = useDisplayFooter();
  const isSelected = footerItem === item;
  const isSunchaser = item === "sunchaser";
  const buttonClass = `w-full ${
    isSunchaser ? "rounded-tr-lg" : "rounded-tl-lg"
  } ${isSelected ? "border-t-2 border-greens-300 bg-white p-2" : "bg-gray-100 border-none"}`;

  return (
    <button className={buttonClass} onClick={() => setFooterItem(item)}>
      {capitalize(item)}
    </button>
  );
};
