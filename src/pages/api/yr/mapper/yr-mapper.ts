import { time } from "console";

import { CommonData, CommonMetaData } from "pages/api/common-proprties";

import {
  TimeSeries,
  TimeSeriesDetails,
  YrData,
} from "../api-clients/yr.api-response-schema";

// `${new Date(item.time).getDate()}-${new Date(item.time).getMonth()}`

export interface CoordinatesMappedResponse {
  metaData: CommonMetaData;
  data: any;
}
export class YrResponseMapper {
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
          details: {
            averageWind: 0,
            maxTemp: 0,
            minTemp: 0,
            summarizedRain: 0,
          },
          times: {},
        };
      }

      const hours = new Date(item.time).getHours().toString().padStart(2, "0");
      const minutes = new Date(item.time)
        .getMinutes()
        .toString()
        .padStart(2, "0");
      const hhmm = `${hours}:${minutes}`;

      acc[date].times = {
        ...acc[date].times,
        [hhmm]: this.assembleDetails(item.data),
      };

      acc[date].details = {
        averageWind:
          (acc[date].details.averageWind +=
            item.data.instant.details.wind_speed) / acc[date].times.length,
        maxTemp:
          acc[date].details.maxTemp < item.data.instant.details.air_temperature
            ? item.data.instant.details.air_temperature
            : acc[date].details.maxTemp,
        minTemp:
          acc[date].details.minTemp > item.data.instant.details.air_temperature
            ? item.data.instant.details.air_temperature
            : acc[date].details.minTemp,
        summarizedRain:
          acc[date].details.summarizedRain +
          (item.data.next_1_hours?.details.precipitation_amount ||
            item.data.next_6_hours?.details.precipitation_amount),
      };
      return acc;
    }, {});

    return days;
  }

  getProps() {
    return {
      data: {
        days: this.assembleDays(this.contentData.properties.timeseries),
      },
    };
  }
}
