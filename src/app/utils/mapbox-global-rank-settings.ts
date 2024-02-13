import { AzureFunctionGlobalRankItem } from "app/api/azure-function/global-rank/api-client/global-rank-api-response-schema";
import { FeatureCollection, Point } from "geojson";

export class MapboxGlobalRankSettings {
  map: mapboxgl.Map;
  ranks: AzureFunctionGlobalRankItem[];
  constructor(map: mapboxgl.Map, ranks: AzureFunctionGlobalRankItem[]) {
    this.map = map;
    this.ranks = ranks;
  }

  addHeatmapWithRanksToMap() {
    const features: GeoJSON.Feature<GeoJSON.Point>[] = this.ranks.map(
      (rank) => {
        return {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: [rank.lon, rank.lat],
          },
          properties: {
            rank: Number(rank.rank),
          },
        };
      },
    );

    const data: FeatureCollection<Point> = {
      type: "FeatureCollection",
      features: features,
    };

    if (this.map.getLayer("global-rank-heatmap")) {
      // If the layer already exists, just update the data
      (
        this.map.getSource("global-rank-heatmap") as mapboxgl.GeoJSONSource
      ).setData(data);
    } else {
      // If the layer doesn't exist, add it
      this.map.addLayer({
        id: "global-rank-heatmap",
        type: "heatmap",
        maxzoom: 7,
        source: {
          type: "geojson",
          data: data,
        },
        paint: {
          "heatmap-weight": {
            property: "dbh",
            type: "exponential",
            stops: [
              [1, 0],
              [62, 1],
            ],
          },
          "heatmap-intensity": {
            stops: [
              [11, 1],
              [15, 3],
            ],
          },
          "heatmap-color": [
            "interpolate",
            ["linear"],
            ["heatmap-density"],
            0,
            "rgba(255,255,255,0)",
            0.2,
            "rgb(239,240,215)",
            0.4,
            "rgb(223,221,150)",
            0.6,
            "rgb(205,204,101)",
            0.8,
            "rgb(241,240,11)",
          ],
          "heatmap-radius": {
            stops: [
              [11, 15],
              [15, 20],
            ],
          },
          "heatmap-opacity": {
            default: 1,
            stops: [
              [14, 1],
              [15, 0],
            ],
          },
        },
      });
    }
  }
}
