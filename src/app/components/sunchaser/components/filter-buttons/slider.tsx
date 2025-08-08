"use client";

import { useEffect, useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import CreateIcon from "@mui/icons-material/Create";
import {
  distanceArray,
  getCounterValue,
} from "app/utils/travel-distance-settings";
import { useFormikContext } from "formik";
import { useIsFilterOpen, useIsSliding } from "states/states";
import { useMapInstance } from "states/sunchaser-result";
import { transform } from "lodash";

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
    color: "black",
    top: "17px",
  },
  "& .MuiSlider-markLabel[data-index='0']": {
    left: "7px !important", // Adjust this value as needed
  },
  "& .MuiSlider-markLabel[data-index='2']": {
    left: "99.5% !important", // Adjust this value as needed
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
  const { mapInstance } = useMapInstance();

  const { isSliding, setIsSliding } = useIsSliding();

  const [index, setIndex] = useState(
    getCounterValue(valuesForSlider, values.distance as string) ||
      valuesForSlider.length / 2,
  );

  useEffect(() => {
    if (isFilterOpen) {
      const newRadius = Number(valuesForSlider[index - 1].label);
      mapInstance?.updateBounds(newRadius);
      mapInstance?.addCircularMap(newRadius);
    } else {
      mapInstance?.removeCircularMap();
    }
  }, [isFilterOpen]);

  const handleSlide = (e: any, num) => {
    setIsSliding(true);
    setIndex(num);
    const newRadius = Number(valuesForSlider[num - 1].label);
    setFieldValue("distance", newRadius);

    // Assuming createCircle returns a GeoJSON circle feature with the given radius
    mapInstance?.updateBounds(newRadius);

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
        <div className="circle left-2">
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

  const inputRef = useRef<HTMLInputElement | null>(null);

  // useEffect(() => {
  //   if (isSliderExpanded) {
  //     inputRef.current?.focus();
  //   } else {
  //     inputRef.current?.blur();
  //   }
  // }, [isSliderExpanded]);

  return (
    <span className={`w-full rounded-inherit `} ref={wrapperRef}>
      <input
        ref={inputRef}
        required
        disabled={!isFilterOpen}
        readOnly
        className={`hidden bg-inherit ${
          isFilterOpen ? "" : "hidden"
        } size-full items-center text-ellipsis rounded-inherit bg-white pl-4 pr-6 text-xl outline-none ${isSliding && "opacity-30"} ${isSliderExpanded && "ring-2 ring-greens-400"}`}
        value={isFilterOpen ? `${values.distance} km` : ""}
        type="text"
        name="calendar"
        onFocus={() => setIsSliderExpanded(true)}
        style={{ outline: "none" }}
      />
      {/* <div
        onClick={() => setIsSliderExpanded(!isSliderExpanded)}
        className="absolute right-4 top-0 flex h-full items-center text-greens-400"
      >
        <CreateIcon />
      </div> */}

      <div className="flex flex-col items-center justify-center rounded-[16px] bg-white p-3 px-4">
        <div className="relative flex w-full flex-col justify-center pb-3">
          <div className="mb-2 flex w-full justify-between">
            <p>
              Hvor langt er du villig til å reise fra{" "}
              <b>{values.townSearch || "din lokasjon"}</b>
            </p>
            <p>{values.distance} km</p>
          </div>
          <PrettoSlider
            style={{
              margin: 0,
              boxSizing: "inherit",
              padding: "8px",
              width: "calc(100% - 12px)",
            }}
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
          {/* <div className="absolute bottom-2 right-4">
            <div className="flex gap-4 text-greens-400">
              <p
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && setIsSliderExpanded(false)
                }
                onClick={() => setIsSliderExpanded(false)}
              >
                Cancel
              </p>
              <p
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === "Enter" && setIsSliderExpanded(false)
                }
                onClick={() => setIsSliderExpanded(false)}
              >
                Ok
              </p>
            </div>
          </div> */}
        </div>
      </div>
    </span>
  );
};
