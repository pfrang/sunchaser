"use client";

import { capitalize } from "lodash";
import { FooterItemType, useDisplayFooter, useIsSliding } from "states/states";
import React, { useEffect, useRef, useState } from "react";
import { useShouldHydrate } from "app/hooks/use-should-hydrate";

import { Forecast } from "./forecast";
import { SunchaserListWrapper } from "./sunchaser/components/result-list-wrapper";
import { FooterExpandableLine } from "./_shared/footer-expandable-line";

export const Footer = () => {
  const { footerItem } = useDisplayFooter();
  const { isSliding } = useIsSliding();

  useEffect(() => {
    if (isSliding) {
      setHeight(0);
    } else {
      setHeight(footerHeightBreakPoints[0]);
    }
  }, [isSliding]);

  const [footerHeightBreakPoints, setFooterHeightBreakPoints] = useState<
    number[]
  >([0, 0, 0]);

  useEffect(() => {
    setFooterHeightBreakPoints([
      window.innerHeight * 0.1,
      window.innerHeight * 0.4,
      window.innerHeight * 0.9,
    ]);
    setHeight(window.innerHeight * 0.1);
  }, []);

  const [height, setHeight] = useState<number>(footerHeightBreakPoints[0]);

  const isAtMaxHeight = footerHeightBreakPoints[2] === height;
  const shouldHydrate = useShouldHydrate();

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

  const initialTouchPosition = useRef<number | null>(null);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    initialTouchPosition.current = event.touches[0].clientY;
  };

  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    const currentTouchPosition = event.touches[0].clientY;

    const isScrollingUp = currentTouchPosition < initialTouchPosition?.current!;

    if (initialTouchPosition.current !== null) {
      const draggedPixels = initialTouchPosition.current - currentTouchPosition;
      const isAtMaxScroll = scrollableDivRef.current
        ? scrollableDivRef.current.scrollTop === 0
        : false;

      if (isAtMaxHeight && isScrollingUp) {
        return;
      }

      if (!isAtMaxScroll) {
        return;
      }

      // Use requestAnimationFrame to batch state updates
      requestAnimationFrame(() => {
        setHeight((prevHeight) => prevHeight + draggedPixels * 2);
      });
    }

    initialTouchPosition.current = currentTouchPosition;
  };

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    // event.preventDefault();
    const height2 = getNearestBreakpoint(height, footerHeightBreakPoints);

    requestAnimationFrame(() => {
      setHeight(height2);
    });
  };

  return (
    <div
      className={`fixed bottom-0 z-40 w-full rounded-custom border-t-2 border-green-100 bg-gray-100 pr-1`}
      // onMouseMove={handleMouseMove}
      // {...handlers}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transition: "height 0.3s ease",
        height: `${isSliding ? "0px" : `${height + 40}px`}`,
        backgroundColor: "white",
        overflowY: isAtMaxHeight ? "auto" : "hidden",
      }}
    >
      <FooterExpandableLine expandableClick={() => clickableLine()} />
      {shouldHydrate && (
        <div
          ref={scrollableDivRef}
          style={{
            transition: "height 0.3s ease",
            height: `${height}px`,
            backgroundColor: "white",
            overflowY: isAtMaxHeight ? "auto" : "hidden",
          }}
          className={"scrollbar-thin scrollbar-track-slate-50"}
        >
          <div className={`size-full`}>
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
      )}
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

function getNearestBreakpoint(
  height: number,
  footerHeightBreakPoints: number[],
) {
  let nearestBreakpoint = footerHeightBreakPoints[0];
  let smallestDifference = Math.abs(height - nearestBreakpoint);

  for (let i = 1; i < footerHeightBreakPoints.length; i++) {
    const difference = Math.abs(height - footerHeightBreakPoints[i]);
    if (difference < smallestDifference) {
      smallestDifference = difference;
      nearestBreakpoint = footerHeightBreakPoints[i];
    }
  }

  return nearestBreakpoint;
}
