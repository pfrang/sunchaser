"use client";

import { capitalize } from "lodash";
import React from "react";

import { useDisplayIsFooterExpanded } from "../states/footer";
import {
  useDisplayFooter2,
  footerItems,
  FooterItemType,
} from "../states/footer2";

import { SunchaserListWrapper } from "./components/sunchaser/components/result-list-wrapper";
import { Forecast } from "./components/forecast";
import { FooterItemWrapper } from "./components/_shared/footer-item-wrapper";
import { Calendar } from "./components/sunchaser/components/calendar";

export const Footer = () => {
  return (
    <div className={`absolute`}>
      <FooterItemRouter />

      <div className="fixed right-2 top-1/3 flex w-fit flex-col items-center gap-4">
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

const FooterItemRouter = () => {
  const { footerItem } = useDisplayFooter2();

  switch (footerItem) {
    case "forecast":
      return (
        <FooterItemWrapper item="forecast">
          <Forecast />
        </FooterItemWrapper>
      );
    case "sunchaser":
      return (
        <FooterItemWrapper item="sunchaser">
          <SunchaserListWrapper />
        </FooterItemWrapper>
      );
    default:
      return (
        <FooterItemWrapper item="calendar">
          <Calendar />
        </FooterItemWrapper>
      );
  }
};

const createFooterSubItems = (item: FooterItemType) => {
  const { footerItem, setFooterItem } = useDisplayFooter2();

  const { setIsFooterExpanded } = useDisplayIsFooterExpanded();

  const onClick = () => {
    setFooterItem(item);
    setIsFooterExpanded(true);
  };

  const isSelected = footerItem === item;

  return (
    <button
      onClick={() => onClick()}
      className={`h-12 w-full rounded-lg border-2 border-green-100 p-2 text-center shadow-lg ${
        isSelected ? "bg-gray-500" : "bg-white"
      }`}
    >
      <div className="flex flex-col items-center hover:backdrop-brightness-100">
        <p className={`text-variant-base whitespace-nowrap text-green-200`}>
          {capitalize(item)}
        </p>
      </div>
    </button>
  );
};
