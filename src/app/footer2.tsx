"use client";
import Image from "next/image";
import { capitalize } from "lodash";
import React, { useRef } from "react";
import { useState } from "react";
import { Button, Collapse } from "@mui/material";

import { useDisplayIsFooterExpanded } from "../states/footer";
import {
  useDisplayFooter2,
  footerItems,
  FooterItemType,
} from "../states/footer2";

import { SunchaserListWrapper } from "./components/sunchaser/components/result-list-wrapper";
import { Forecast } from "./components/forecast";
import { useUseSwipeable } from "./hooks/use-swipeable";

export const Footer2 = () => {
  const { footerItem } = useDisplayFooter2();
  const { isFooterExpanded } = useDisplayIsFooterExpanded();
  return (
    <div className={`absolute`}>
      {isFooterExpanded && footerItem === "sunchaser" ? (
        <FooterItemWrapper item="sunchaser">
          <SunchaserListWrapper />
        </FooterItemWrapper>
      ) : (
        <FooterItemWrapper item="forecast">
          <Forecast />
        </FooterItemWrapper>
      )}

      <div className="fixed bottom-12 left-1/2 grid -translate-x-1/2 transform grid-cols-2 gap-10">
        {footerItems.map((item, index) => {
          return (
            <React.Fragment key={item + index}>
              {createFooterSubItems(item)}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

const FooterItemWrapper = ({ children, item }) => {
  const { isFooterExpanded, setIsFooterExpanded } =
    useDisplayIsFooterExpanded();
  const { footerItem } = useDisplayFooter2();
  const shouldExpand = item === footerItem && isFooterExpanded;

  const handlers = useUseSwipeable({
    onSwipedUp: () => setIsFooterExpanded(true),
    onSwipedDown: () => setIsFooterExpanded(false),
  });

  return (
    <div className="fixed bottom-0 z-50 w-full rounded-custom border-2 border-green-100 bg-white pr-1">
      <div className="mt-2 flex w-full justify-center" {...handlers}>
        <div
          className="w-[25px] cursor-pointer pb-2 pt-1 sm:w-[40px]"
          onClick={() => setIsFooterExpanded(!isFooterExpanded)}
        >
          <span className="block h-1 rounded-sm bg-blues-200 shadow-custom-minor"></span>
        </div>
      </div>
      <Collapse
        style={{
          width: "100%",
        }}
        in={shouldExpand}
      >
        <div className="max-h-[250px] w-full overflow-y-scroll scrollbar-thin scrollbar-track-slate-50">
          {children}
        </div>
      </Collapse>
    </div>
  );
};

const createFooterSubItems = (item: FooterItemType) => {
  const { footerItem, setFooterItem } = useDisplayFooter2();

  const { setIsFooterExpanded } = useDisplayIsFooterExpanded();

  const isSelected = item === footerItem;

  const onClick = () => {
    setFooterItem(item);
    setIsFooterExpanded(true);
  };

  return (
    <button
      onClick={() => onClick()}
      className={`h-12 w-24 rounded-lg border-2 border-green-100 bg-white text-center shadow-lg`}
    >
      <div className="flex flex-col items-center hover:backdrop-brightness-100">
        <p className={`text-variant-base whitespace-nowrap text-green-200`}>
          {capitalize(item)}
        </p>
      </div>
    </button>
  );
};
