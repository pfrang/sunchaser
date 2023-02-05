export const valueRange = {
  1: {
    value: "1",
    label: "< 1",
  },
  2: {
    value: "2",
    label: "2",
  },
  3: {
    value: "3",
    label: "3",
  },
  4: {
    value: "5",
    label: "5",
  },
  5: {
    value: "7",
    label: "7",
  },
  6: {
    value: "10",
    label: "10",
  },
  7: {
    value: "15",
    label: "15",
  },
  8: {
    value: "20",
    label: "20",
  },
  9: {
    value: "100",
    label: "> 100",
  },
};

export const setUIOnNumber = (value: number) => {
  return valueRange[value].label;
};
