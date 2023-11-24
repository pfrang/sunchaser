import { useRef, useState } from "react";
import Slider from "@mui/material/Slider";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { debounce } from "lodash";
import { Flex } from "ui-kit/flex";

import { Spacer } from "../../../../ui-kit/spacer/spacer";
import {
  distanceArray,
  getCounterValue,
} from "../../../utils/travel-distance-settings";
import { Text } from "../../../../ui-kit/text";

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
});

interface ChooseTravelDistanceProps {
  mapBoxKey: string;
}

export const ChooseTravelDistance = ({
  mapBoxKey,
}: ChooseTravelDistanceProps) => {
  const travelDistanceRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const valuesForSlider = distanceArray({
    step: 5,
    max: 500,
  });

  const [kilometers, setKilometers] = useState(
    Number(router.query.distance) || 50,
  );

  const [index, setIndex] = useState(
    getCounterValue(valuesForSlider, router.query?.distance as string) ||
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
      router.push({
        pathname: "/",
        query: {
          ...router.query,
          distance: kilometers,
        },
      });
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
    <section id="distance_traveling" className="w-full grow">
      <div className="w-full flex justify-center items-center flex-col h-full">
        <Text noWrap variant="caption-large">
          How far are you willing to travel?
        </Text>
        <Spacer height={2} />
        {/* // Remove component here for old */}

        <CircularMap kilometers={kilometers} mapBoxKey={mapBoxKey} />

        <Text noWrap variant="body-large">{`${valueToDisplay}km`}</Text>
        <Flex justifyContent={"center"} marginX={20}>
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
        </Flex>
      </div>
    </section>
  );
};
