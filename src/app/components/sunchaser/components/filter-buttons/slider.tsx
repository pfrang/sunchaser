"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import { debounce } from "lodash";
import {
  distanceArray,
  getCounterValue,
} from "app/utils/travel-distance-settings";
import { useRouter } from "next/navigation";
import { sanitizeNextParams } from "app/utils/sanitize-next-query";
import { useSearchParamsToObject } from "app/hooks/use-search-params";
import { useFormikContext } from "formik";
import { CalendarIcon } from "ui-kit/calendar-icon/calendar-icon";
import { StateHelper } from "states/sunchaser-result";
import * as turf from "@turf/turf";
import mapboxgl from "mapbox-gl";
import { useIsFilterOpen, useIsSliding } from "states/states";

import { FormShape } from "./form";

const PrettoSlider = styled(Slider)({
  color: "#52af77",
  height: 6,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 22,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
      boxShadow: "inherit",
    },
    "&:before": {
      display: "none",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#52af77",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
  "& .MuiSlider-markLabel": {
    color: "white",
  },
  "& .MuiSlider-markActive": {
    color: "white",
  },
});

const valuesForSlider = distanceArray({
  step: 5,
  max: 500,
});

export const SliderWrapper = () => {
  const { isFilterOpen } = useIsFilterOpen();
  const { values, setFieldValue } = useFormikContext<FormShape>();
  const [isSliderExpanded, setIsSliderExpanded] = useState(false);
  const wrapperRef = useRef<HTMLInputElement | null>(null);
  const { mapObject } = StateHelper.mapObject();
  const { mapInstance } = StateHelper.useMapInstance();

  const searchParams = useSearchParamsToObject();
  const { isSliding, setIsSliding } = useIsSliding();

  const [index, setIndex] = useState(
    getCounterValue(valuesForSlider, searchParams?.distance as string) ||
      valuesForSlider.length / 2,
  );

  useEffect(() => {
    if (isSliderExpanded) {
      const newRadius = Number(valuesForSlider[index - 1].label);
      mapInstance?.addCircularMap(newRadius);
    } else {
      mapInstance?.removeCircularMap();
    }
  }, [isSliderExpanded]);

  const handleSlide = (e: any, num) => {
    setIsSliding(true);
    setIndex(num);
    const newRadius = Number(valuesForSlider[num - 1].label);
    setFieldValue("distance", newRadius);

    // Assuming createCircle returns a GeoJSON circle feature with the given radius
    const circle = turf.circle(
      [Number(searchParams?.lon), Number(searchParams?.lat)],
      newRadius,
      { units: "kilometers" },
    );

    const bounds = circle.geometry.coordinates[0].reduce(
      function (bounds, coord) {
        return bounds.extend(coord as any);
      },
      new mapboxgl.LngLatBounds(
        circle.geometry.coordinates[0][0] as any,
        circle.geometry.coordinates[0][0] as any,
      ),
    );

    mapObject?.fitBounds(bounds, {
      padding: 20,
      duration: 1000,
    });

    mapInstance?.updateCircularMap(newRadius);
  };

  // const debouncedUpdateUrl = debounce(() => {
  //   if (!sliderChanged) {
  //     const urlParams = sanitizeNextParams({
  //       ...searchParams,
  //       distance: kilometers,
  //     });

  //     router.push(`/?${urlParams}`);
  //   }
  //   sliderChanged = false;
  // }, 2000);

  const min = 1;
  const max = valuesForSlider.length;

  const valueToDisplay = valuesForSlider[index - 1]?.label;

  const marks = [
    {
      value: 1,
      label: `${valuesForSlider[0].label}km`,
      markActive: (
        <div className="circle">
          <div className="inner-circle" />
        </div>
      ),
    },
    {
      value: valuesForSlider.length / 2,
      label: `${valuesForSlider[valuesForSlider.length / 2 - 1].label}km`,
      markActive: (
        <div className="circle">
          <div className="inner-circle" />
        </div>
      ),
    },
    {
      value: valuesForSlider.length,
      label: `${valuesForSlider[valuesForSlider.length - 1].label}km`,
      markActive: (
        <div className="circle">
          <div className="inner-circle" />
        </div>
      ),
    },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsSliderExpanded(false);
      }
    };

    const addEventListeners = () => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    };

    const removeEventListeners = () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };

    if (isSliderExpanded) {
      addEventListeners();
    } else {
      removeEventListeners();
    }

    return () => {
      removeEventListeners();
    };
  }, [isSliderExpanded, wrapperRef]);

  return (
    <span className={`w-full rounded-inherit `} ref={wrapperRef}>
      <input
        required
        disabled={!isFilterOpen}
        readOnly
        className={`bg-inherit ${
          isFilterOpen ? "" : "hidden"
        } size-full items-center text-ellipsis rounded-inherit bg-white pl-4 pr-6 text-xl outline-none ${isSliding && "opacity-30"} ${isSliderExpanded && "ring-2 ring-greens-400"}`}
        value={isFilterOpen ? `${values.distance} km` : ""}
        type="text"
        name="calendar"
        onFocus={() => setIsSliderExpanded(true)}
        // onBlur={() => setIsSliderExpanded(false)}
        style={{ outline: "none" }}
      />
      <div className="absolute right-2 top-[6px] flex size-[36px] cursor-pointer justify-center">
        <CalendarIcon />
      </div>

      {isSliderExpanded && isFilterOpen && (
        <div className="mt-4 flex flex-col items-center justify-center rounded-[16px] bg-white">
          <div className="relative flex w-full flex-col justify-center px-4 py-8">
            <PrettoSlider
              style={{ margin: 0 }}
              aria-label="Temperature"
              value={index}
              // getAriaValueText={(value: number) => `${value}km`}
              valueLabelDisplay="auto"
              valueLabelFormat={`${valueToDisplay}`}
              step={1}
              onChange={handleSlide}
              // onChangeCommitted={debouncedUpdateUrl}
              onChangeCommitted={() => setIsSliding(false)}
              marks={marks}
              min={min}
              max={max}
            />
            <div className="absolute bottom-2 right-4">
              <div className="flex gap-4 text-greens-400">
                <p onClick={() => setIsSliderExpanded(false)}>Cancel</p>
                <p onClick={() => setIsSliderExpanded(false)}>Ok</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </span>
  );
};
