interface Range {
  value: number;
  label: string;
}

export const distanceArray = (step = 3): Range[] => {
  const max = 100;
  let counter = 1;
  const range = [];
  for (let i = 1; i <= max; i += step) {
    range.push({
      value: counter,
      label: `${step + i - 1}`,
    });
    counter += 1;
  }

  return range as Range[];
};

export const getCounterValue = (
  range: Range[],
  label: string
): number | undefined => {
  const match = range.find((item) => item.label === label);

  return match ? match.value : undefined;
};

export const setUIOnNumber = (value: number) => {
  const range = distanceArray()[value];

  return range;
};
