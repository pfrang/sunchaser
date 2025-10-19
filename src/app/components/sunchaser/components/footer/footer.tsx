"use client";

import {
  useIsFilterOpen,
  useIsMapBeingTouched,
  useIsSliding,
} from "states/states";
import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Drawer,
  DrawerContent,
  DrawerPortal,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Spinner } from "ui-kit/spinner/spinner";
import { NestedDrawer } from "./nested-drawer";
import { SuitcaseButton } from "app/components/suitcase-button";
import { UserLocationButton } from "app/components/user-location-button";

export type Breakpoints = [number, number, number];

export const snapPoints: Breakpoints = [0.1, 0.25, 0.85];
export const Footer = () => {
  const { isSliding } = useIsSliding();

  const { isMapBeingTouched } = useIsMapBeingTouched();
  const { isFilterOpen } = useIsFilterOpen();

  const prevUserSnapRef = useRef<number | string | null>(snapPoints[1]);
  const [snap, setSnap] = useState<number | string | null>(snapPoints[1]);

  useEffect(() => {
    if (snap !== snapPoints[0]) {
      prevUserSnapRef.current = snap;
    }
  }, [snap]);

  useEffect(() => {
    if (isMapBeingTouched) {
      if (snap !== snapPoints[0]) {
        prevUserSnapRef.current = snap;
      }
      setSnap(snapPoints[0]);
    } else {
      // Restore previous user snap
      setSnap(prevUserSnapRef.current ?? snapPoints[1]);
    }
  }, [isMapBeingTouched]);

  const closeFooter = useMemo(() => {
    if (isSliding || isFilterOpen) {
      return true;
    } else {
      return false;
    }
  }, [isSliding, isFilterOpen]);

  const middleList = () => setSnap(snapPoints[1]);

  const isAtMaxHeight = useMemo(() => snap === snapPoints[2], [snap]);

  useLayoutEffect(() => {
    document.addEventListener("focusin", (e) => e.stopImmediatePropagation());
    document.addEventListener("focusout", (e) => e.stopImmediatePropagation());
  }, []);

  return (
    <>
      <div className="self-end fixed bottom-[calc(25vh+4px)] z-30 pr-2">
        <div className="flex flex-col gap-2">
          <SuitcaseButton />
          <UserLocationButton />
        </div>
      </div>

      {snap && !closeFooter && (
        <footer>
          <Drawer
            forceOpen
            snapPoints={snapPoints}
            activeSnapPoint={snap}
            shouldScaleBackground={false}
            dismissible={false}
            setActiveSnapPoint={setSnap}
            modal={false}
          >
            <DrawerTitle className="hidden"></DrawerTitle>
            <DrawerPortal>
              <DrawerContent
                noPortal
                noOverlay
                data-testid="content"
                className="w-full rounded-custom border-green-100 flex h-full"
              >
                <Suspense fallback={<Spinner />}>
                  <NestedDrawer
                    isAtMaxHeight={isAtMaxHeight}
                    middleList={middleList}
                  />
                </Suspense>
              </DrawerContent>
            </DrawerPortal>
          </Drawer>
        </footer>
      )}
    </>
  );
};
