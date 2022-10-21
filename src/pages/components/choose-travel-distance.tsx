import { useEffect, useState } from "react";

export const ChooseTravelDistance = ({ setHours, setMinutes }) => {
  const [value, setValue] = useState(1);

  const valueRange = {
    1: {
      value: "0:10",
      label: "10",
    },
    2: {
      value: "0:20",
      label: "20",
    },
    3: {
      value: "0:30",
      label: "30",
    },
    4: {
      value: "0:45",
      label: "45",
    },
    5: {
      value: "1:00",
      label: "60",
    },
    6: {
      value: "1:30",
      label: "90",
    },
    7: {
      value: "2:00",
      label: "2t",
    },
    8: {
      value: "3",
      label: "3t",
    },
    9: {
      value: "24:00",
      label: "24t",
    },
  };

  return (
    <section id="distance_traveling">
      <div className="w-[300px]">
        <label>How far are you willing to travel?</label>
        <input
          type="range"
          list="tickmarks"
          onChange={(e) => setValue(Number(e.currentTarget.value))}
          step="1"
          className="w-full cursor-pointer"
          min={1}
          max={9}
          value={value}
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
