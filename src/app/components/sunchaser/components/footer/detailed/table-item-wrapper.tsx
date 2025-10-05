import { Times } from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { dateFormatter } from "app/utils/date-formatter";
import { getAverageItemsFromTimes, getInterval } from "app/utils/times-helper";
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import { TimeTable } from "ui-kit/list-item/list-item-detailed";

export const TableItemWrapper = ({
  day,
  expandList,
}: {
  day: Times[];
  expandList?: () => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const intervalRows: Times[] = [
    getAverageItemsFromTimes(getInterval(day, 0, 5), "00-06"),
    getAverageItemsFromTimes(getInterval(day, 6, 11), "06-12"),
    getAverageItemsFromTimes(getInterval(day, 12, 17), "12-18"),
    getAverageItemsFromTimes(getInterval(day, 18, 23), "18-23"),
  ].filter((r): r is Times => !!r);

  const date = dateFormatter(new Date(day[0].date));
  const shouldDisplayExpanded = day.length > 4;

  const fullRef = useRef<HTMLDivElement>(null);
  const collapsedRef = useRef<HTMLDivElement>(null);
  const [fullH, setFullH] = useState(0);
  const [collapsedH, setCollapsedH] = useState(0);

  // Keep showing full content during collapse animation
  const [showFullContent, setShowFullContent] = useState(false);
  const prevExpandedRef = useRef(isExpanded);

  useLayoutEffect(() => {
    if (fullRef.current) setFullH(fullRef.current.scrollHeight);
    if (collapsedRef.current) setCollapsedH(collapsedRef.current.scrollHeight);
  }, [day]);

  // When expanding: immediately show full content
  useEffect(() => {
    if (isExpanded) {
      setShowFullContent(true);
    }
    prevExpandedRef.current = isExpanded;
  }, [isExpanded]);

  const onToggle = () => {
    if (!isExpanded) {
      expandList?.();
    }
    setIsExpanded((p) => !p);
  };

  const handleTransitionEnd = () => {
    // After collapsing animation completes, switch to collapsed content
    if (!isExpanded) {
      setShowFullContent(false);
    }
  };

  return (
    <div className="rounded-lg bg-greens-300 p-2">
      <p>{date}</p>
      <span className="block h-2"></span>

      {/* Off-screen measurers */}
      <div className="absolute -z-10 -translate-y-[200vh] opacity-0 pointer-events-none">
        <div ref={collapsedRef}>
          <TimeTable times={intervalRows} />
        </div>
        <div ref={fullRef}>
          <TimeTable times={day} />
        </div>
      </div>

      {/* Animated height container */}
      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{
          maxHeight: isExpanded ? fullH || undefined : collapsedH || undefined,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        <TimeTable times={showFullContent ? day : intervalRows} />
      </div>

      {shouldDisplayExpanded && (
        <button
          type="button"
          className="flex w-full items-center justify-center border-t-2 border-greens-600 py-2"
          onClick={onToggle}
        >
          <span>Detaljer</span>
          <KeyboardArrowDownIcon
            className={`ml-1 transition-transform duration-300 ${
              isExpanded ? "rotate-180" : ""
            }`}
          />
        </button>
      )}
    </div>
  );
};
