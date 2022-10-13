
import { CommonData, CommonMetaData } from "../../../common-proprties";
import { AzureFunctionGetCoordinatesResponse, AzureFunctionCoordinatesResponseItems, AzureFunctionCoordinatesItem } from "../coordinates-api-client/coordinates-api-response-schema";

export interface CoordinatesMappedData extends Omit<AzureFunctionCoordinatesItem, "date"> {
  date: Date
}
export interface CoordinatesMappedResponse {
  metaData: CommonMetaData;
  items: CoordinatesMappedData[]
}
export class CoordinatesMapper {
  readonly contentData: AzureFunctionGetCoordinatesResponse
  constructor(dataProps: CommonData) {
    this.contentData = dataProps.data
  }

  assembleItems = (items: AzureFunctionCoordinatesResponseItems) => {
    const mappedItems = items.map((item) => {
      return {
        ...item,
        date: new Date(item.date),
      }
    })
    return mappedItems
  }

  getProps(): CoordinatesMappedResponse {
    return {
      metaData: { count: this.contentData.length },
      items: this.assembleItems(this.contentData)
    }
  }
}
