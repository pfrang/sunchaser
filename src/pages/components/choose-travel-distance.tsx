import { useEffect, useState } from "react";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";

import { Text } from "../../ui-kit/components/text";

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

export const ChooseTravelDistance = ({ setTravelDistance, travelDistance }) => {
  const [value, setValue] = useState(5);

  useEffect(() => {
    setTravelDistance(valueRange[value].value);
  }, [value]);

  return (
    <section id="distance_traveling" className="w-full">
      <Slider defaultValue={30} />
      <div className="w-full flex flex-col">
        <div className="flex justify-between">
          <Text noWrap variant="subtitle-small">
            How far are you willing to travel?
          </Text>
          <Text noWrap variant="subtitle-small">{`${setUIOnNumber(
            value
          )}km`}</Text>
        </div>
        <input
          type="range"
          list="tickmarks"
          onChange={(e) => setValue(Number(e.currentTarget.value))}
          step="1"
          className={`range range-lg range-warning`}
          min={1}
          max={9}
          value={value}
        />
        <div className="w-full flex justify-between text-xs px-2">
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
