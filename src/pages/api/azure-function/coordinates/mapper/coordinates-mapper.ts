import { CommonData, CommonMetaData } from "../../../common-proprties";
import {
  AzureFunctionCoordinateResponse,
  AzureFunctionCoordinatesItems,
  AzureFunctionCoordinatesMappedItem,
} from "../coordinates-api-client/coordinates-api-response-schema";

export interface CoordinatesMappedResponse {
  metaData: CommonMetaData;
  items: AzureFunctionCoordinatesMappedItem[];
}
export class CoordinatesMapper {
  readonly contentData: AzureFunctionCoordinateResponse;
  constructor(dataProps: CommonData) {
    this.contentData = dataProps.data;
  }

  assembleItem = (items: AzureFunctionCoordinatesItems[]) => {
    const mappedItems = items.map((item) => {
      const { weatherRank, symbol, temperature, wind, time } = item;
      return {
        weatherRank,
        symbol,
        temperature,
        wind,
        time,
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
        location: ranks[rank][0].location,
        times: this.assembleItem(ranks[rank]),
      };
    });

    return mappedItems;
  };

  getProps(): CoordinatesMappedResponse {
    return {
      metaData: {},
      items: this.assembleItems(this.contentData.rank),
    };
  }
}
