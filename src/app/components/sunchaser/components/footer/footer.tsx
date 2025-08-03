"use client";

import {
  useIsFilterOpen,
  useIsMapBeingTouched,
  useIsSettingsOpen,
  useIsSliding,
} from "states/states";
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import { Spinner } from "ui-kit/spinner/spinner";
import { MapChooser } from "app/components/map-chooser";
import { useAnimatedHeight } from "app/hooks/use-animated-height";

import { FooterExpandableLine } from "../../../_shared/footer-expandable-line";

import { ListContainer } from "./list-container";

export const Footer = () => {
  const { isSliding } = useIsSliding();
  const footerRef = useRef<HTMLDivElement>(null);
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const { isSettingsOpen, setIsSettingsOpen } = useIsSettingsOpen();
  const { isMapBeingTouched } = useIsMapBeingTouched();
  const { isFilterOpen } = useIsFilterOpen();
  const { animateHeight, updateDOMHeight } = useAnimatedHeight(0, footerRef);

  // Touch state refs - no React re-renders during drag
  const isDragging = useRef(false);
  const startY = useRef(0);
  const startHeight = useRef(0);
  const currentHeight = useRef(0);
  const lastY = useRef(0); // Track last Y position for velocity
  const lastVelocity = useRef(0);
  const lastTime = useRef(0);

  // Only these cause re-renders
  const [breakpoints, setBreakpoints] = useState([0, 0, 0]);
  const [height, setHeight] = useState(0);
  // Direct DOM manipulation - no React re-renders

  useEffect(() => {
    animateHeight(height);
  }, [height]);

  useEffect(() => {
    if (isMapBeingTouched) {
      animateHeight(breakpoints[0]);
    } else {
      animateHeight(height);
    }
  }, [isMapBeingTouched, breakpoints]);

  useEffect(() => {
    if (isFilterOpen) {
      animateHeight(breakpoints[0]);
      setHeight(breakpoints[0]);
    }

    if (isFilterOpen && isSettingsOpen) {
      setIsSettingsOpen(false);
    } else if (isSettingsOpen) {
      animateHeight(breakpoints[1]);
      setHeight(breakpoints[1]);
    } else if (!isSettingsOpen) {
      animateHeight(breakpoints[0]);
      setHeight(breakpoints[0]);
    }
  }, [isFilterOpen, isSettingsOpen]);

  // Initialize breakpoints once
  useEffect(() => {
    const bp = [
      window.innerHeight * 0.1,
      window.innerHeight * 0.4,
      window.innerHeight * 0.9,
    ];
    setBreakpoints(bp);
    setHeight(bp[0]);
    currentHeight.current = bp[0];
  }, []);

  // Handle sliding state
  useEffect(() => {
    const newHeight = isSliding ? 0 : breakpoints[0];
    setHeight(newHeight);
    currentHeight.current = newHeight;
    updateDOMHeight(newHeight);
  }, [isSliding, breakpoints]);

  const isAtMaxHeight = breakpoints[2] === height;

  // Find nearest breakpoint
  const getNearestBreakpoint = useCallback(
    (currentHeight: number) => {
      return breakpoints.reduce((nearest, breakpoint) =>
        Math.abs(breakpoint - currentHeight) < Math.abs(nearest - currentHeight)
          ? breakpoint
          : nearest,
      );
    },
    [breakpoints],
  );

  // Get target based on velocity and position
  const getTargetBreakpoint = useCallback(
    (currentHeight: number, velocity: number) => {
      const nearest = getNearestBreakpoint(currentHeight);

      // Fast swipe detection (velocity in pixels per ms)
      const fastSwipeThreshold = 1.5; // Increased threshold for more reliable detection

      // Only override nearest breakpoint if velocity is significant
      if (Math.abs(velocity) > fastSwipeThreshold) {
        const currentIndex = breakpoints.findIndex((bp) => bp === nearest);

        if (velocity > 0 && currentIndex < breakpoints.length - 1) {
          // Fast swipe up (positive velocity) - go to next higher breakpoint
          return breakpoints[currentIndex + 1];
        } else if (velocity < 0 && currentIndex > 0) {
          // Fast swipe down (negative velocity) - go to next lower breakpoint
          return breakpoints[currentIndex - 1];
        }
      }

      // Default: snap to nearest breakpoint
      return nearest;
    },
    [breakpoints, getNearestBreakpoint],
  );

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!footerRef.current) return;

    const listContainer = scrollableDivRef.current;
    if (listContainer && listContainer.contains(e.target as Node)) {
      // If touch started inside scrollable content and not at top, don't handle footer drag
      const isAtTop = listContainer.scrollTop === 0;
      if (!isAtTop) {
        return; // Let the list handle scrolling
      }
    }

    isDragging.current = true;
    startY.current = e.touches[0].clientY;
    lastY.current = e.touches[0].clientY; // Initialize last Y position
    startHeight.current = currentHeight.current;
    lastTime.current = Date.now();
    lastVelocity.current = 0;

    // Remove transition during drag for immediate response
    footerRef.current.style.transition = "none";
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging.current || !footerRef.current) return;

      const currentY = e.touches[0].clientY;
      const deltaY = startY.current - currentY; // Total movement from start
      const now = Date.now();

      // Calculate velocity based on frame-to-frame movement
      if (lastTime.current > 0) {
        const timeDelta = now - lastTime.current;
        const positionDelta = lastY.current - currentY; // Movement since last frame

        if (timeDelta > 0) {
          lastVelocity.current = positionDelta / timeDelta; // pixels per ms
        }
      }

      lastY.current = currentY;
      lastTime.current = now;

      // Check scroll constraints
      const isScrollingUp = deltaY > 0;
      const isAtMaxScroll = scrollableDivRef.current?.scrollTop === 0;

      if (isAtMaxHeight && isScrollingUp) return;
      if (!isAtMaxScroll && isScrollingUp) return;

      // Prevent default touch behavior
      e.preventDefault();

      // Calculate new height with resistance at boundaries
      let newHeight = startHeight.current + deltaY;

      // Add resistance at edges
      const minHeight = breakpoints[0];
      const maxHeight = breakpoints[2];

      if (newHeight < minHeight) {
        newHeight = minHeight - (minHeight - newHeight) * 0.3;
      } else if (newHeight > maxHeight) {
        newHeight = maxHeight + (newHeight - maxHeight) * 0.3;
      }

      // Update DOM directly - NO React re-render
      currentHeight.current = newHeight;
      updateDOMHeight(newHeight);
    },
    [isAtMaxHeight, breakpoints, updateDOMHeight],
  );

  const handleTouchEnd = useCallback(() => {
    if (!isDragging.current || !footerRef.current) return;

    isDragging.current = false;

    // Get target breakpoint based on position and velocity
    const targetHeight = getTargetBreakpoint(
      currentHeight.current,
      lastVelocity.current,
    );

    // Animate to target with CSS transition
    footerRef.current.style.transition =
      "height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    updateDOMHeight(targetHeight);

    // Update React state ONCE at the end
    setHeight(targetHeight);
    currentHeight.current = targetHeight;

    // Clean up transition after animation
    setTimeout(() => {
      if (footerRef.current) {
        footerRef.current.style.transition = "";
      }
    }, 300);
  }, [getTargetBreakpoint, updateDOMHeight]);

  const clickableLine = useCallback(() => {
    const currentIndex = breakpoints.indexOf(height);
    let nextHeight: number;

    switch (currentIndex) {
      case 0:
        nextHeight = breakpoints[1];
        break;
      case 1:
        nextHeight = breakpoints[0];
        break;
      case 2:
        nextHeight = breakpoints[0];
        break;
      default:
        nextHeight = breakpoints[0];
    }

    // Add CSS transition for animation
    if (footerRef.current) {
      footerRef.current.style.transition =
        "height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    }

    // Update DOM height with animation
    updateDOMHeight(nextHeight);

    // Update React state
    setHeight(nextHeight);
    currentHeight.current = nextHeight;

    // Clean up transition after animation
    setTimeout(() => {
      if (footerRef.current) {
        footerRef.current.style.transition = "";
      }
    }, 300);
  }, [height, breakpoints, updateDOMHeight]);

  const expandList = useCallback(() => {
    const maxHeight = breakpoints[2];

    // Add CSS transition for animation
    if (footerRef.current) {
      footerRef.current.style.transition =
        "height 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    }

    // Update DOM height with animation
    updateDOMHeight(maxHeight);

    // Update React state
    setHeight(maxHeight);
    currentHeight.current = maxHeight;

    // Clean up transition after animation
    setTimeout(() => {
      if (footerRef.current) {
        footerRef.current.style.transition = "";
      }
    }, 300);
  }, [breakpoints, updateDOMHeight]);

  return (
    <div
      ref={footerRef}
      className="fixed bottom-0 z-40 w-full rounded-custom border-t-2 border-green-100"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{
        height: `${height + 40}px`,
        maxHeight: `${breakpoints[2] + 40}px`,
        backgroundColor: "white",
        overflow: "hidden",
        scrollbarWidth: "none",
        msOverflowStyle: "none",
        touchAction: "pan-y",
        willChange: "height", // Optimize for height animations
      }}
    >
      <FooterExpandableLine
        fullExpand={expandList}
        expandableClick={clickableLine}
      />

      <Suspense fallback={<Spinner />}>
        {isSettingsOpen ? (
          <MapChooser />
        ) : (
          <ListContainer
            parentRef={scrollableDivRef}
            isAtMaxHeight={isAtMaxHeight}
            expandList={expandList}
          />
        )}
      </Suspense>
    </div>
  );
};
