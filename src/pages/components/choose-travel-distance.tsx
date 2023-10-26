import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";

import { Text } from "../../ui-kit/text";
import { Spacer } from "../../ui-kit/spacer/spacer";
import {
  distanceArray,
  getCounterValue,
} from "../utils/travel-distance-settings";

import { CircularMap } from "./circular-map";

interface ChooseTravelDistanceProps {
  travelDistanceRef: React.MutableRefObject<HTMLInputElement>;
  mapBoxKey: string;
  isHomePage?: boolean;
}

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
});

interface ChooseTravelDistanceProps {
  travelDistanceRef: React.MutableRefObject<HTMLInputElement>;
  mapBoxKey: string;
  displayMap?: boolean;
}

export const ChooseTravelDistance = ({
  travelDistanceRef,
  mapBoxKey,
  displayMap = true,
}: ChooseTravelDistanceProps) => {
  const router = useRouter();
  const valuesForSlider = distanceArray({
    step: 5,
    max: 500,
  });

  const [kilometers, setKilometers] = useState(valuesForSlider.length / 2);

  const [index, setIndex] = useState(valuesForSlider.length / 2);

  const handleSlide = (e: any, num) => {
    setIndex(num);
    setKilometers(Number(valuesForSlider[num - 1].label));
  };

  useEffect(() => {
    setKilometers(Number(router.query.distance) || 250);
    if (router.query?.distance) {
      return setIndex(
        getCounterValue(valuesForSlider, router.query?.distance as string)
      );
    }
    return setIndex(valuesForSlider.length / 2);
  }, [router.query]);

  const min = 1;
  const max = valuesForSlider.length;

  const valueToDisplay = valuesForSlider[index - 1]?.label;

  return (
    <section id="distance_traveling" className="w-full grow">
      <div className="w-full flex justify-center items-center flex-col h-full">
        <Text noWrap variant="caption-large">
          How far are you willing to travel?
        </Text>
        <Spacer height={2} />
        {/* // Remove component here for old */}
        {displayMap && (
          <CircularMap kilometers={kilometers} mapBoxKey={mapBoxKey} />
        )}
        <Text noWrap variant="body-large">{`${valueToDisplay}km`}</Text>
        <PrettoSlider
          ref={travelDistanceRef}
          aria-label="Temperature"
          value={index}
          getAriaValueText={(value: number) => `${value}km`}
          valueLabelDisplay="auto"
          valueLabelFormat={`${valueToDisplay}`}
          step={1}
          onChange={handleSlide}
          // marks={valuesForSlider}
          min={min}
          max={max}
        />
        {/* <div className="w-full flex justify-between text-xs ">
          {Array.from({ length: valuesForSlider.length }).map((_, idx) => {
            return (
              <span key={idx} className="text-black">
                |
              </span>
            );
          })}
        </div> */}

        {/* <datalist
          id="tickmarks"
          className="flex w-full mr-auto justify-between hidden "
        >
          {Object.keys(valueRange).map((item, idx) => {
            return (
              <option key={idx} value={`${item} hidden`}>
                {`${valueRange[item].label}`}
              </option>
            );
          })}
        </datalist> */}
      </div>
    </section>
  );
};
