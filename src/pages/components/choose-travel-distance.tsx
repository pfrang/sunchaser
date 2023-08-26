import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

import { Text } from "../../ui-kit/components/text";
import { Spacer } from "../../ui-kit/spacer/spacer";
import {
  setUIOnNumber,
  distanceArray,
} from "../utils/travel-distance-settings";

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

function valueLabelFormat(value: number) {
  return `${distanceArray()[value].label}`;
}

interface ChooseTravelDistanceProps {
  setTravelDistance: (value: number) => void;
}

export const ChooseTravelDistance = ({
  setTravelDistance,
}: ChooseTravelDistanceProps) => {
  const step = 5;
  const valuesForSlider = distanceArray(step);
  const [index, setIndex] = useState(valuesForSlider.length / 2);

  // const [marks, setMarks] = useState(marks);

  useEffect(() => {
    setTravelDistance(Number(valuesForSlider[index - 1].label));
  }, [index]);

  const handleSlide = (e: any, num) => {
    setIndex(num);
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
