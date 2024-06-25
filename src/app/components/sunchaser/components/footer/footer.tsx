"use client";

import { useIsSliding } from "states/states";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useShouldHydrate } from "app/hooks/use-should-hydrate";

import { FooterExpandableLine } from "../../../_shared/footer-expandable-line";

import { ListContainer } from "./list-container";

export const Footer = () => {
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

  const expandList = () => {
    setHeight(footerHeightBreakPoints[2]);
  };

  return (
    <div
      className={`fixed bottom-0 z-40 w-full rounded-custom border-t-2 border-green-100`}
      // onMouseMove={handleMouseMove}
      // {...handlers}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        transition: "height 0.3s ease",
        height: `${isSliding ? "0px" : `${height + 40}px`}`,
        maxHeight: `${footerHeightBreakPoints[2]}px`,
        backgroundColor: "white",
        // overflowY: isAtMaxHeight ? "auto" : "hidden",
        // overflowY: "hidden",
        overflow: "hidden",
        scrollbarWidth: "none" /* For Firefox */,
        msOverflowStyle: "none" /* For Internet Explorer and Edge */,
      }}
    >
      <FooterExpandableLine expandableClick={() => clickableLine()} />
      {shouldHydrate && (
        <div
          ref={scrollableDivRef}
          style={{
            // transition: "height 0.3s ease",
            height: `100%`,
            backgroundColor: "white",
            overflowY: isAtMaxHeight ? "auto" : "hidden",
            // overflowY: "hidden",
            overflowX: "hidden",
          }}
          className={"scrollbar-thin scrollbar-track-slate-50"}
        >
          <ListContainer expandList={expandList} />
        </div>
      )}
    </div>
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
