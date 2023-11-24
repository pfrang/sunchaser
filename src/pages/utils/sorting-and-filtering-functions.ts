import { Times } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

export type SortType = "asc" | "desc";

export const getSortedTemperatureFromArrOfTimes = (
  arr: Times[],
  sort: SortType,
) => {
  const earliestDay = getEarliestDay(arr);

  try {
    return arr
      .filter((item) => item.date === earliestDay)
      .sort((a, b) =>
        sort === "desc"
          ? b.temperature - a.temperature
          : a.temperature - b.temperature,
      )[0];
  } catch (e) {
    throw new Error("Error in getTodayFromArrayOfObjects" + e);
  }
};

export const getEarliestDay = (arr: Times[]) => {
  if (!Array.isArray(arr) || arr.length === 0) {
    return null; // Return null for invalid input or empty array
  }

  let earliestDate = arr[0].date; // Initialize with the first date

  for (const obj of arr) {
    if (obj.date < earliestDate) {
      earliestDate = obj.date;
    }
  }

  return earliestDate;
};

export const plus2HoursOnTime = (time: string | null) => {
  if (!time) return "";

  const timeParts = time.split(":");
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  const newHours = (hours + 2) % 24; // Add 2 hours and wrap around if it goes beyond 23
  const newTime = `${newHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return newTime;
};
