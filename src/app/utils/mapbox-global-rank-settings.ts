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
            cluster: Number(rank.cluster),
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
        maxzoom: 6,
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

  addCircleRanksToMap() {
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
            cluster: Number(rank.cluster),
          },
        };
      },
    );

    const data: FeatureCollection<Point> = {
      type: "FeatureCollection",
      features: features,
    };

    if (this.map.getLayer("global-rank-circles")) {
      // If the layer already exists, just update the data
      (
        this.map.getSource("global-rank-circles") as mapboxgl.GeoJSONSource
      ).setData(data);
    } else {
      // If the layer doesn't exist, add it
      this.map.addLayer({
        id: "global-rank-circles",
        type: "circle",
        maxzoom: 6,
        source: {
          type: "geojson",
          data: data,
        },
        paint: {
          "circle-radius": 10, // Set the radius of the circles
          "circle-color": [
            "match",
            ["get", "cluster"],
            1,
            "rgba(241, 240, 11, 0.5)", // Brightest yellow
            2,
            "rgba(227, 226, 10, 0.5)",
            3,
            "rgba(213, 212, 9, 0.5)",
            4,
            "rgba(199, 198, 8, 0.5)",
            5,
            "rgba(185, 184, 7, 0.5)",
            6,
            "rgba(171, 170, 6, 0.5)",
            7,
            "rgba(157, 156, 5, 0.5)",
            8,
            "rgba(143, 142, 4, 0.5)",
            9,
            "rgba(129, 128, 3, 0.5)",
            10,
            "rgba(115, 114, 2, 0.5)", // Darkest yellow
            "rgba(0,0,0,0)",
          ],
          "circle-opacity": [
            "interpolate",
            ["linear"],
            ["get", "cluster"],
            1,
            1,
            10,
            0.1,
          ], // Set the opacity of the circles based on rank
        },
      });
    }
  }
}
