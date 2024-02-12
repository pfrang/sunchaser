"use client";

import { capitalize } from "lodash";
import { useUseSwipeable } from "app/hooks/use-swipeable";
import {
  FooterHeightBreakPoints,
  FooterItemType,
  footerHeightBreakPoints,
  useDisplayFooter,
  useDisplayIsSettingsExpanded,
} from "states/footer";
import { useEffect, useRef, useState } from "react";

import { Forecast } from "./forecast";
import { SunchaserListWrapper } from "./sunchaser/components/result-list-wrapper";
import { FooterExpandableLine } from "./_shared/footer-expandable-line";

export const Footer = () => {
  const { isSettingsExpanded } = useDisplayIsSettingsExpanded();
  const { footerItem } = useDisplayFooter();
  const [height, setHeight] = useState<FooterHeightBreakPoints>(
    footerHeightBreakPoints[0],
  );

  useEffect(() => {
    if (isSettingsExpanded) {
      setHeight(footerHeightBreakPoints[0]);
    }
  }, [isSettingsExpanded]);

  const onExpand = (e) => {
    const isHardSwipe = e.velocity > 1.8;

    switch (height) {
      case footerHeightBreakPoints[0]:
        if (isHardSwipe) {
          setHeight(footerHeightBreakPoints[2]);
        } else {
          setHeight(footerHeightBreakPoints[1]);
        }
        break;
      case footerHeightBreakPoints[1]:
        setHeight(footerHeightBreakPoints[2]);
        break;
      case footerHeightBreakPoints[2]:
        break;
    }
  };

  const onDelapse = (e) => {
    const isHardSwipe = e.velocity > 1.8;

    switch (height) {
      case footerHeightBreakPoints[2]:
        if (isHardSwipe) {
          setHeight(footerHeightBreakPoints[0]);
        } else {
          setHeight(footerHeightBreakPoints[1]);
        }
        break;
      case footerHeightBreakPoints[1]:
        setHeight(footerHeightBreakPoints[0]);
        break;
      default:
        break;
    }
  };

  const handlers = useUseSwipeable({
    onSwipedUp: onExpand,
    onSwipedDown: onDelapse,
  });

  const clickableLine = () => {
    switch (height) {
      case footerHeightBreakPoints[0]:
        setHeight(footerHeightBreakPoints[1]);
        break;
      case footerHeightBreakPoints[1]:
        setHeight(footerHeightBreakPoints[0]);
        break;
      case footerHeightBreakPoints[2]:
        setHeight(footerHeightBreakPoints[0]);
        break;
    }
  };

  const scrollableDiv = useRef<null | HTMLDivElement>(null);

  return (
    <div className="absolute">
      <div
        className="fixed bottom-0 z-40 w-full rounded-custom border-t-2 border-green-100 bg-gray-100 pr-1"
        {...handlers}
      >
        <FooterExpandableLine expandableClick={() => clickableLine()} />
        <div
          style={{
            transition: "height 0.3s ease",
            height: height,
            backgroundColor: "white",
            overflowY: "auto",
          }}
        >
          <div className={`size-full scrollbar-thin scrollbar-track-slate-50`}>
            <div className="bg-gray-100">
              <p className="text-variant-regular bg-gray-100 pl-4 text-xl">
                Resultater
              </p>
              <span className="block h-4"></span>
            </div>
            <div className="flex w-full justify-between bg-gray-100 shadow-lg">
              <FooterButton item="sunchaser" />
              <FooterButton item="forecast" />
            </div>
            <div className="size-full bg-white shadow-top">
              <span className="block h-4"></span>
              {footerItem === "forecast" && <Forecast />}
              {footerItem === "sunchaser" && <SunchaserListWrapper />}
            </div>
          </div>
        </div>
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
