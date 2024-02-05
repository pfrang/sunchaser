"use client";

import React from "react";

import {
  useDisplayFooter2,
  useDisplayFooterSubItems2,
} from "../states/footer2";
import { useDisplayFooter } from "../states/footer";

import { SunchaserListWrapper } from "./components/sunchaser/components/result-list-wrapper";
import { Forecast } from "./components/forecast";
import { FooterItemWrapper } from "./components/_shared/footer-item-wrapper";
import { Calendar } from "./components/sunchaser/components/calendar";

export const Footer = () => {
  return (
    <div className={`absolute`}>
      <FooterSubItemRouter />
    </div>
  );
};

const FooterSubItemRouter = () => {
  const { footerSubItem } = useDisplayFooterSubItems2();

  switch (footerSubItem) {
    case "calendar":
      return (
        <FooterItemWrapper item="calendar">
          <Calendar />
        </FooterItemWrapper>
      );
    case "result":
      return (
        <React.Fragment>
          <FooterItemRouter />
        </React.Fragment>
      );

    default:
      return <></>;
  }
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
      return null;
  }
};
