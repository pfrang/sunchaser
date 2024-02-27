"use client";
import { useRef, useState } from "react";
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

import { CircularMap } from "./circular-map";

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

export const ChooseTravelDistance = () => {
  const searchParams = useSearchParamsToObject();
  const router = useRouter();

  const travelDistanceRef = useRef<HTMLInputElement>(null);

  const valuesForSlider = distanceArray({
    step: 5,
    max: 500,
  });

  const [kilometers, setKilometers] = useState(
    Number(searchParams?.distance) || 50,
  );

  const [index, setIndex] = useState(
    getCounterValue(valuesForSlider, searchParams?.distance as string) ||
      valuesForSlider.length / 2,
  );

  let sliderChanged = false;

  const handleSlide = (e: any, num) => {
    setIndex(num);
    setKilometers(Number(valuesForSlider[num - 1].label));
    sliderChanged = true;
  };

  const debouncedUpdateUrl = debounce(() => {
    if (!sliderChanged) {
      const urlParams = sanitizeNextParams({
        ...searchParams,
        distance: kilometers,
      });

      router.push(`/?${urlParams}`);
    }
    sliderChanged = false;
  }, 2000);

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

  return (
    <div className="flex flex-col items-center justify-center">
      {searchParams?.lat && <CircularMap kilometers={kilometers} />}
      <p className="text-variant-poppins text-center text-white">
        {`${valueToDisplay}km`}
      </p>
      <div className="mx-[20px] flex w-full justify-center">
        <PrettoSlider
          style={{ width: "85%" }}
          ref={travelDistanceRef}
          aria-label="Temperature"
          value={index}
          // getAriaValueText={(value: number) => `${value}km`}
          valueLabelDisplay="auto"
          valueLabelFormat={`${valueToDisplay}`}
          step={1}
          onChange={handleSlide}
          onChangeCommitted={debouncedUpdateUrl}
          marks={marks}
          min={min}
          max={max}
        />
      </div>
    </div>
  );
};
