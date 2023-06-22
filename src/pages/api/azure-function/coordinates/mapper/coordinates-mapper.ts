import { CommonData, CommonMetaData } from "../../../common-proprties";
import {
  AzureFunctionCoordinatesData,
  AzureFunctionCoordinatesItems,
  AzureFunctionCoordinatesMappedData,
} from "../coordinates-api-client/coordinates-api-response-schema";

export interface CoordinatesMappedResponse {
  metaData: CommonMetaData;
  items: AzureFunctionCoordinatesMappedData;
}
export class CoordinatesMapper {
  readonly contentData: AzureFunctionCoordinatesData;
  constructor(dataProps: CommonData) {
    this.contentData = dataProps.data;
  }

  assembleItem = (items: AzureFunctionCoordinatesItems[]) => {
    const mappedItems = items.map((item) => {
      return {
        weatherRank: item.total_rank,
        sunriseDate: new Date(item.sunrise_date),
        sunsetDate: new Date(item.sunset_date),
        date: new Date(item.date),
        time: item.time.split(":").slice(0, 2).join(":"),
        ...item,
      };
    });
    return mappedItems;
  };

  assembleItems = (ranks: Record<string, AzureFunctionCoordinatesItems[]>) => {
    const mappedItems = Object.keys(ranks).map((rank, idx) => {
      return {
        rank: rank,
        date: new Date(ranks[rank][0].date),
        latitude: ranks[rank][0].latitude,
        longitude: ranks[rank][0].longitude,
        primaryName: ranks[rank][0].primary_name,
        tertiaryName: ranks[rank][0].tertiary_name,
        quarternaryName: ranks[rank][0].quarternary_name,
        times: this.assembleItem(ranks[rank]),
      };
    });

    return mappedItems;
  };

  getProps(): CoordinatesMappedResponse {
    try {
      return {
        metaData: {},
        items: {
          userLocation: {
            ...this.contentData.userLocation,
          },
          ranks: this.assembleItems(this.contentData.ranks),
        },
      };
    } catch (e) {
      throw e;
    }
  }
}
