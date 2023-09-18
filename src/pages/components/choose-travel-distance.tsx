import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

import { Text } from "../../ui-kit/components/text";
import { Spacer } from "../../ui-kit/spacer/spacer";
import { distanceArray } from "../utils/travel-distance-settings";

import { CircularMap } from "./circular-map";

const CustomizedSlider = styled(Slider)`
  color: #20b2aa;

  :hover {
    color: #2e8b57;
  }

  & .MuiSlider-thumb {
    border-radius: 1px;
  }
`;

function valuetext(value: number) {
  return `${value} km`;
}

interface ChooseTravelDistanceProps {
  setTravelDistance: (value: number) => void;
  mapBoxKey: string;
}

export const ChooseTravelDistance = ({
  setTravelDistance,
  mapBoxKey,
}: ChooseTravelDistanceProps) => {
  const [zoom, setZoom] = useState(8);
  const step = 5;
  const valuesForSlider = distanceArray(step);
  const [index, setIndex] = useState(valuesForSlider.length / 2);

  const handleSlide = (e: any, num) => {
    setIndex(num);
    setTravelDistance(Number(valuesForSlider[num - 1].label));
    setZoom(Number(valuesForSlider[valuesForSlider.length - num].value));
  };

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
        <CircularMap zoom={zoom} mapBoxKey={mapBoxKey} />
        <Text noWrap variant="body-large">{`${valueToDisplay}km`}</Text>
        <Slider
          aria-label="Temperature"
          value={index}
          getAriaValueText={valuetext}
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
