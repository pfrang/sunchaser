import { CommonData, CommonMetaData } from "../../../common-proprties";
import {
  AzureFunctionCoordinateMappedResponse,
  AzureFunctionCoordinateResponse,
  AzureFunctionCoordinatesItems,
} from "../coordinates-api-client/coordinates-api-response-schema";

export interface CoordinatesMappedResponse {
  metaData: CommonMetaData;
  items: AzureFunctionCoordinateMappedResponse[];
}
export class CoordinatesMapper {
  readonly contentData: AzureFunctionCoordinateResponse;
  constructor(dataProps: CommonData) {
    this.contentData = dataProps.data;
  }

  assembleItems = (items: AzureFunctionCoordinatesItems[]) => {
    const mappedItems = items.map((item) => {
      return {
        ...item,
        date: new Date(item.date),
      };
    });
    return mappedItems;
  };

  getProps(): CoordinatesMappedResponse {
    return {
      metaData: { count: this.contentData.length },
      items: this.assembleItems(this.contentData),
    };
  }
}
