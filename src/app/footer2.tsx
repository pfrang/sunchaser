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

  const [scrollY, setScrollY] = useState(0);
  // TODO remember scroll position

  return (
    <div className="fixed bottom-0 z-50 w-full rounded-custom border-2 border-green-100 bg-white pr-1">
      <Collapse
        style={{
          width: "100%",
        }}
        in={shouldExpand}
      >
        <div
          onClick={() => setIsFooterExpanded(false)}
          className="ml-auto mr-5 mt-2 h-2 w-6 cursor-pointer  border-2 border-black"
        ></div>
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
    <div
      className={`h-12 w-24 rounded-lg border-2 border-green-100 text-center shadow-lg ${
        isSelected ? "bg-gray-400" : "bg-white"
      }`}
    >
      <Button
        style={{
          height: "100%",
          width: "100%",
        }}
        fullWidth
        onClick={() => onClick()}
      >
        <div className="flex flex-col items-center hover:backdrop-brightness-100">
          <p className={`text-variant-base whitespace-nowrap text-green-200`}>
            {capitalize(item)}
          </p>
        </div>
      </Button>
    </div>
  );
};
