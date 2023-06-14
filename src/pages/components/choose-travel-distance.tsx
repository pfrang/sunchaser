import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";

import { Text } from "../../ui-kit/components/text";
import { Spacer } from "../../ui-kit/spacer/spacer";

import { setUIOnNumber, valueRange } from "./travel-distance-settings";

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
const marks = [
  {
    value: 1,
    label: "< 1",
  },
  {
    value: 5,
    label: "10",
  },
  {
    value: 9,
    label: "> 100",
  },
];

function valueLabelFormat(value: number) {
  return `${valueRange[value].label}`;
}

interface ChooseTravelDistanceProps {
  setTravelDistance: (value: string) => void;
}

export const ChooseTravelDistance = ({
  setTravelDistance,
}: ChooseTravelDistanceProps) => {
  const [value, setValue] = useState(5);

  useEffect(() => {
    setTravelDistance(valueRange[value].value);
  }, [value]);

  const handleSlide = (e: any, num) => {
    setValue(num);
  };

  return (
    <section id="distance_traveling" className="w-full">
      <div className="w-full flex justify-center items-center flex-col">
        <Text noWrap variant="caption-large">
          How far are you willing to travel?
        </Text>
        <Spacer height={2} />
        <Text noWrap variant="body-large">{`${setUIOnNumber(value)}km`}</Text>
        <Slider
          aria-label="Temperature"
          defaultValue={5}
          getAriaValueText={valuetext}
          valueLabelDisplay="auto"
          valueLabelFormat={valueLabelFormat}
          step={1}
          onChange={handleSlide}
          marks={marks}
          min={1}
          max={9}
        />
        <div className="w-full flex justify-between text-xs ">
          {Array.from({ length: 9 }).map((_, idx) => {
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
