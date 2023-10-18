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
    };
  }

  assembleDays(data: TimeSeries[]) {
    const days = data.reduce((acc, item) => {
      const date = new Date(item.time).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {};
      }
      acc[date] = {
        ...acc[date],
        [new Date(item.time).toLocaleString()]: this.assembleDetails(item.data),
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
