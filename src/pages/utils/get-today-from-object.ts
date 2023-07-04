import { Times } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

export type SortType = "asc" | "desc";

export const getSortedTemperatureFromArrOfTimes = (
  arr: Times[],
  sort: SortType
) => {
  const today = new Date().toISOString().slice(0, 10);
  try {
    return arr
      .filter((item: any) => item.date.slice(0, 10) === today)
      .sort((a: any, b: any) =>
        sort === "asc"
          ? b.temperature - a.temperature
          : a.temperature - b.temperature
      )[0];
  } catch (e) {
    throw new Error("Error in getTodayFromArrayOfObjects" + e);
  }
};
