import { useEffect, useState } from "react";

import {
  convertToTravelDistance,
  valueRange,
} from "./travel-distance-settings";

export const ChooseTravelDistance = ({ setTravelDistance, travelDistance }) => {
  const [value, setValue] = useState(1);

  return (
    <section id="distance_traveling">
      <div className="w-[300px]">
        <label>How far are you willing to travel?</label>
        <input
          type="range"
          list="tickmarks"
          onChange={(e) =>
            setTravelDistance(
              convertToTravelDistance(Number(e.currentTarget.value))
            )
          }
          step="1"
          className="w-full cursor-pointer"
          min={1}
          max={9}
        />

        <datalist
          id="tickmarks"
          className="flex w-full mr-auto justify-between"
        >
          {Object.keys(valueRange).map((item, idx) => {
            return (
              <option key={idx} value={`${item}`}>
                {`${valueRange[item].label}`}
              </option>
            );
          })}
        </datalist>
      </div>
    </section>
  );
};
