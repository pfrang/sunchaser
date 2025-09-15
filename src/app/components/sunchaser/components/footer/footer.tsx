"use client";

import {
  useIsFilterOpen,
  useIsMapBeingTouched,
  useIsSettingsOpen,
  useIsSliding,
} from "states/states";
import React, { Suspense, useEffect, useRef, useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Spinner } from "ui-kit/spinner/spinner";
import { MapChooser } from "app/components/sunchaser/components/footer/map-chooser";
import { useShouldHydrate } from "app/hooks/use-should-hydrate";

import { ListContainer } from "./list-container";
import { MapOptionsEnum } from "./settings-form-values";
import clsx from "clsx";
import { Carousel } from "ui-kit/carousel/Carousel";

export type Breakpoints = [number, number, number];

const snapPoints: Breakpoints = [0.1, 0.3, 0.85];
export const Footer = () => {
  const { isSliding } = useIsSliding();
  const scrollableDivRef = useRef<HTMLDivElement>(null);

  const { isSettingsOpen, setIsSettingsOpen } = useIsSettingsOpen();
  const { isMapBeingTouched } = useIsMapBeingTouched();
  const { isFilterOpen } = useIsFilterOpen();
  const [mapOption, setMapOption] = useState<MapOptionsEnum>(
    MapOptionsEnum.Standard
  );

  const [snap, setSnap] = useState<number | string | null>(snapPoints[1]);

  useEffect(() => {
    if (isMapBeingTouched) {
      setSnap(snapPoints[0]);
    }
  }, [isMapBeingTouched, snapPoints]);

  const expandList = () => setSnap(snapPoints[2]);
  const middleList = () => setSnap(snapPoints[1]);

  const isAtMaxHeight = snap === snapPoints[2];

  return (
    snap && (
      <footer className="h-20">
        <Drawer
          forceOpen
          snapPoints={snapPoints}
          activeSnapPoint={snap}
          shouldScaleBackground={false}
          setActiveSnapPoint={setSnap}
        >
          <DrawerTitle className="hidden"></DrawerTitle>
          <DrawerPortal>
            <DrawerContent
              noPortal
              noOverlay
              data-testid="content"
              className="w-full rounded-custom border-green-100 flex h-full"
            >
              {/* <div
                data-vaul-handle
                className="mx-auto h-20 mt-1 mb-1 h-2 w-14 bg-red rounded-full bg-muted active:opacity-70"
              /> */}
              <div
                ref={scrollableDivRef}
                className={clsx(
                  "flex-1 min-h-0 w-full flex flex-col", // allow shrinking

                  {
                    "overflow-y-auto": isAtMaxHeight,
                    "overflow-hidden": !isAtMaxHeight,
                  }
                )}
              >
                <Suspense fallback={<Spinner />}>
                  {isSettingsOpen ? (
                    <MapChooser
                      mapOption={mapOption}
                      setMapOption={setMapOption}
                    />
                  ) : (
                    <Carousel className="w-full">
                      <ListContainer
                        parentRef={scrollableDivRef}
                        isAtMaxHeight={isAtMaxHeight}
                        expandList={expandList}
                        middleList={middleList}
                      />
                    </Carousel>
                  )}
                </Suspense>
              </div>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      </footer>
    )
  );

  // return (
  //   <div
  //     ref={footerRef}
  //     className="fixed bottom-0 z-40 w-full rounded-custom border-t-2 border-green-100"
  //     onTouchStart={handleTouchStart}
  //     onTouchMove={handleTouchMove}
  //     onTouchEnd={handleTouchEnd}
  //     style={{
  //       height: `${height + 40}px`,
  //       maxHeight: `${breakpoints[2] + 40}px`,
  //       backgroundColor: "white",
  //       overflow: "hidden",
  //       scrollbarWidth: "none",
  //       msOverflowStyle: "none",
  //       touchAction: "pan-y",
  //       willChange: "height", // Optimize for height animations
  //     }}
  //   >
  //     <FooterExpandableLine
  //       fullExpand={expandList} // Pass function that calls expandList with argument
  //       expandableClick={clickableLine}
  //     />

  //     <Suspense fallback={<Spinner />}>
  //       {isSettingsOpen ? (
  //         <MapChooser mapOption={mapOption} setMapOption={setMapOption} />
  //       ) : (
  //         <ListContainer
  //           parentRef={scrollableDivRef}
  //           isAtMaxHeight={isAtMaxHeight}
  //           expandList={expandList}
  //           middleList={middleList}
  //         />
  //       )}
  //     </Suspense>
  //   </div>
  // );
};
