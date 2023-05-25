import { useEffect, useState } from "react";

import { Text } from "../../ui-kit/components/text";

import { setUIOnNumber, valueRange } from "./travel-distance-settings";

export const ChooseTravelDistance = ({ setTravelDistance, travelDistance }) => {
  const [value, setValue] = useState(1);

  useEffect(() => {
    setTravelDistance(valueRange[value].value);
  }, [value]);

  return (
    <section id="distance_traveling" className="w-full">
      <div className="w-full">
        <div className="flex justify-between">
          <Text variant="body-large" color="black">
            Distance?
          </Text>
          <Text variant="body-large" color="black">{`${setUIOnNumber(
            value
          )} km`}</Text>
        </div>
        <input
          type="range"
          list="tickmarks"
          onChange={(e) => setValue(Number(e.currentTarget.value))}
          step="1"
          className="h-14"
          min={1}
          max={9}
          value={value}
        />

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
