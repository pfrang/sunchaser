export const valueRange = {
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
    value: "3:00",
    label: "3t",
  },
  9: {
    value: "24:00",
    label: "24t",
  },
};

export const convertToTravelDistance = (value: number) => {
  return valueRange[value].value;
};
