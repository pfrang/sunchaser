interface Range {
  value: number;
  label: string;
}

export const distanceArray = ({
  step,
  max,
}: {
  step: number;
  max: number;
}): Range[] => {
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
  label: string,
): number | undefined => {
  const match = range.find((item) => item.label === label);

  return match ? match.value : undefined;
};
