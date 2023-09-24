import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { useRouter } from "next/router";
import { values } from "lodash";

import { Text } from "../../ui-kit/components/text";
import { Spacer } from "../../ui-kit/spacer/spacer";
import {
  distanceArray,
  getCounterValue,
} from "../utils/travel-distance-settings";

import { CircularMap } from "./circular-map";

interface ChooseTravelDistanceProps {
  travelDistanceRef: React.MutableRefObject<HTMLInputElement>;
  mapBoxKey: string;
}

export const ChooseTravelDistance = ({
  travelDistanceRef,
  mapBoxKey,
}: ChooseTravelDistanceProps) => {
  const router = useRouter();
  const [kilometers, setKilometers] = useState(50);

  const step = 5;
  const valuesForSlider = distanceArray(step);
  const [index, setIndex] = useState(valuesForSlider.length / 2);

  const handleSlide = (e: any, num) => {
    setIndex(num);
    setKilometers(Number(valuesForSlider[num - 1].label));
  };

  useEffect(() => {
    setKilometers(Number(router.query.distance) || 50);
    setIndex(
      // TODO jesus refactor
      getCounterValue(
        valuesForSlider,
        (router.query?.distance as string) ||
          (valuesForSlider.length / 2).toString()
      )
    );
  }, [router.query]);

  const min = 1;
  const max = valuesForSlider.length;

  const valueToDisplay = valuesForSlider[index - 1].label;

  return (
    <section id="distance_traveling" className="w-full">
      <div className="w-full flex justify-center items-center flex-col">
        <Text noWrap variant="caption-large">
          How far are you willing to travel?
        </Text>
        <Spacer height={2} />
        {/* // Remove component here for old */}
        <CircularMap kilometers={kilometers} mapBoxKey={mapBoxKey} />
        <Text noWrap variant="body-large">{`${valueToDisplay}km`}</Text>
        <Slider
          ref={travelDistanceRef}
          aria-label="Temperature"
          value={index}
          getAriaValueText={(value: number) => `${value}km`}
          valueLabelDisplay="auto"
          valueLabelFormat={`${valueToDisplay}`}
          step={1}
          onChange={handleSlide}
          marks={valuesForSlider}
          min={min}
          max={max}
        />
        <div className="w-full flex justify-between text-xs ">
          {Array.from({ length: valuesForSlider.length }).map((_, idx) => {
            return (
              <span key={idx} className="text-black">
                |
              </span>
            );
          })}
        </div>

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
