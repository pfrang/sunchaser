import { CommonData, CommonMetaData } from "pages/api/common-proprties";

import {
  TimeSeries,
  TimeSeriesDetails,
  YrData,
} from "../api-clients/forecast.api-response-schema";

export interface ForecastTime {
  time: string;
  temperature: number;
  rain: number;
  wind: number;
  symbol?: string;
}

export interface ForecastOverview {
  summarizedWind: number;
  averageWind: number;
  maxTemp: number;
  minTemp: number;
  summarizedRain: number;
  date: string;
}

export interface ForecastDay {
  overview: ForecastOverview;
  times: ForecastTime[];
}

export type ForecastDaysMappedData = Record<string, ForecastDay>;

export interface ForecastMappedResponse {
  metaData: CommonMetaData;
  days: ForecastDaysMappedData;
}

export class ForecastResponseMapper {
  readonly contentData: YrData;
  constructor(dataProps: CommonData<YrData>) {
    this.contentData = dataProps.data;
  }

  assembleDetails(data: TimeSeriesDetails) {
    return {
      temperature: data.instant.details.air_temperature,
      rain:
        data.next_1_hours?.details.precipitation_amount ||
        data.next_6_hours?.details.precipitation_amount,
      wind: data.instant.details.wind_speed,
      symbol:
        data.next_1_hours?.summary.symbol_code ||
        data.next_6_hours?.summary.symbol_code,
    };
  }

  assembleDays(data: TimeSeries[]) {
    const days = data.reduce((acc, item) => {
      const date = new Date(item.time).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {
          overview: {
            summarizedWind: 0.0,
            averageWind: 0,
            maxTemp: -100,
            minTemp: 100,
            summarizedRain: 0,
            date: new Date(date),
          },
          times: [],
        };
      }

      const hours = new Date(item.time).getHours().toString().padStart(2, "0");
      const minutes = new Date(item.time)
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const hhmm = `${hours}:${minutes}`;

      acc[date].times.push({ time: hhmm, ...this.assembleDetails(item.data) });

      acc[date].overview = {
        ...acc[date].overview,
        summarizedWind: Number(
          (acc[date].overview.summarizedWind +=
            item.data.instant.details.wind_speed).toFixed(2)
        ),
        averageWind: Number(
          (acc[date].overview.summarizedWind / acc[date].times.length).toFixed(
            2
          )
        ),
        maxTemp:
          acc[date].overview.maxTemp < item.data.instant.details.air_temperature
            ? item.data.instant.details.air_temperature
            : acc[date].overview.maxTemp,
        minTemp:
          acc[date].overview.minTemp > item.data.instant.details.air_temperature
            ? item.data.instant.details.air_temperature
            : acc[date].overview.minTemp,
        summarizedRain: item.data.next_1_hours
          ? (acc[date].overview.summarizedRain +=
              item.data.next_1_hours.details.precipitation_amount)
          : item.data.next_6_hours?.details?.precipitation_amount
          ? (acc[date].overview.summarizedRain +=
              item.data.next_6_hours.details.precipitation_amount)
          : acc[date].overview.summarizedRain,
      };

      return acc;
    }, {});

    return days;
  }

  getProps(): ForecastMappedResponse {
    return {
      metaData: {},
      days: this.assembleDays(this.contentData.properties.timeseries),
    };
  }
}
