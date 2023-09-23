import { CommonData, CommonMetaData } from "../../../common-proprties";
import {
  AzureFunctionCoordinatesData,
  AzureFunctionCoordinatesItems,
  AzureFunctionCoordinatesMappedItems,
  UserLocation,
} from "../coordinates-api-client/coordinates-api-response-schema";

export interface CoordinatesMappedResponse {
  metaData: CommonMetaData;
  userLocation: UserLocation;
  ranks: AzureFunctionCoordinatesMappedItems[];
}
export class CoordinatesMapper {
  readonly contentData: AzureFunctionCoordinatesData;
  constructor(dataProps: CommonData) {
    this.contentData = dataProps.data;
  }

  assembleItem = (items: AzureFunctionCoordinatesItems[]) => {
    const mappedItems = items.map((item) => {
      return {
        time: item.time.split(":").slice(0, 2).join(":"),
        symbol: item.symbol,
        temperature: item.temperature,
        wind: item.wind,
        rank: item.rank,
        date: new Date(item.date),
      };
    });
    return mappedItems;
  };

  assembleItems = (ranks: Record<string, AzureFunctionCoordinatesItems[]>) => {
    const mappedItems = Object.keys(ranks).map((rank, idx) => {
      return {
        rank: rank,
        index: idx,
        date: new Date(ranks[rank][0].date),
        latitude: ranks[rank][0].latitude,
        longitude: ranks[rank][0].longitude,
        primaryName: ranks[rank][0].primary_name,
        secondaryName: ranks[rank][0].secondary_name,
        tertiaryName: ranks[rank][0].tertiary_name,
        quaternaryName: ranks[rank][0].quaternary_name,
        sunriseTime: ranks[rank][0].sunrise_time,
        sunsetTime: ranks[rank][0].sunset_time,
        times: this.assembleItem(ranks[rank]),
      };
    });

    return mappedItems;
  };

  getProps(): CoordinatesMappedResponse {
    try {
      return {
        metaData: {},
        userLocation: {
          ...this.contentData.user_location,
        },
        ranks: this.assembleItems(this.contentData.ranks),
      };
    } catch (e) {
      throw e;
    }
  }
}
