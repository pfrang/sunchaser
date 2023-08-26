import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mapboxgl, { LngLatBounds, LngLatBoundsLike } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { InferGetServerSidePropsType } from "next";

import { useCoordinates } from "../hooks/use-coordinates";
import { SearchLoader } from "../../ui-kit/search-loader/search-loader";
import { CoordinatesMappedResponse } from "../api/azure-function/coordinates/mapper/coordinates-mapper";
import { AppConfig } from "../../app-config";
import {
  AzureFunctionCoordinatesMappedItems,
  UserLocation,
} from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { Flex } from "../../ui-kit/components/flex/flex";
import { PayloadParams } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api.post-schema";

import { MapBoxHelper, StartAndEndCoordinates } from "./mapbox-settings";
import { Carousell } from "./components/carousell";

const TwoGridRow = styled.div`
  display: grid;
  grid-template-rows: 2fr 3fr;
  height: 100%;
  width: 100%;
  grid-gap: 32px;
  /* margin-bottom: 200px; */
`;

export interface HookProperties {
  data: CoordinatesMappedResponse;
  isLoading: any;
  error: any;
}

export default function Search({
  query,
  mapBoxkey,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { data, isLoading, error }: HookProperties = useCoordinates(query);
  mapboxgl.accessToken = mapBoxkey;

  console.log(data);

  const [items, setItems] = useState<
    undefined | AzureFunctionCoordinatesMappedItems[]
  >(undefined);

  const [userLocation, setUserLocation] = useState<undefined | UserLocation>(
    undefined
  );

  const [highlightedCard, setHighlightedCard] = useState<
    undefined | AzureFunctionCoordinatesMappedItems
  >(undefined);

  const [zoom, setZoom] = useState(false);

  const [mapObject, setMap] = useState<undefined | mapboxgl.Map>(undefined);

  const emptyDataError = error && error.response.data.error === "No data found";

  useEffect(() => {
    if (data) {
      const userLocation = data.items.userLocation;
      setItems([...data.items.ranks]);
      // setHighlightedCard(topRankCard); //UNComment if we want 1st card highlighted
      setUserLocation(userLocation);

      const longitudes = data.items.ranks.map((item) => item.longitude);
      const latitudes = data.items.ranks.map((item) => item.latitude);

      let map = new MapBoxHelper(
        longitudes,
        latitudes,
        userLocation.longitude,
        userLocation.latitude
      ).setMarkersAndFitBounds();

      map.addControl(new mapboxgl.NavigationControl());

      map.on("load", () => {
        map.resize();
      });

      setMap(map);
    }
  }, [data]);

  useEffect(() => {
    if (highlightedCard && zoom) {
      const { lat, lon } = {
        lat: highlightedCard.latitude,
        lon: highlightedCard.longitude,
      };

      // mapObject.flyTo({
      //   center: [lon, lat],
      //   zoom: 10,
      //   speed: 1,
      //   curve: 1,
      //   duration: 2000,
      //   easing(t) {
      //     return t;
      //   },
      // });

      const coordinates: StartAndEndCoordinates = {
        start: {
          longitude: lon,
          latitude: lat,
        },
        end: {
          longitude: userLocation.longitude,
          latitude: userLocation.latitude,
        },
      };

      const config = {
        map: mapObject,
        coordinates,
        padding: 100,
        duration: 1000,
      };

      MapBoxHelper.fitBounds(mapObject, coordinates, 50, 1000);

      MapBoxHelper.drawLine(mapObject, coordinates);
    }
  }, [highlightedCard]);

  const setZoomAndHighlightCard = (
    item: AzureFunctionCoordinatesMappedItems,
    zoom?: boolean
  ) => {
    if (item === highlightedCard) {
      setHighlightedCard(undefined);
      return;
    }
    setHighlightedCard(item);
    zoom && setZoom(zoom);
  };

  return (
    <Flex height={"100%"}>
      <TwoGridRow>
        <section id="section-map">
          <div className="flex items-center h-full justify-center sticky top-0">
            <div id="map" className="w-full h-full m-auto "></div>
          </div>
        </section>
        {isLoading ? (
          <SearchLoader />
        ) : (
          <>
            {error && (
              <div className="flex absolute mt-[80px] top-0 items-center w-full justify-center">
                <p>
                  {emptyDataError
                    ? "We could not find any locations with the provided coordinates, please increase the distance"
                    : "Something went wrong"}
                </p>
              </div>
            )}
            {items && (
              <Flex flexDirection={"column"} paddingX={[40, 50]}>
                <section id="section-carousell" className="h-full">
                  <Carousell
                    userLocation={userLocation}
                    items={items}
                    setZoomAndHighlightCard={setZoomAndHighlightCard}
                    highlightedCard={highlightedCard}
                  />
                </section>
              </Flex>
            )}
          </>
        )}
      </TwoGridRow>
    </Flex>
  );
}

interface GetServerSidePropsSearch {
  props: {
    query: PayloadParams;
    mapBoxkey: string;
  };
}

export async function getServerSideProps(
  context
): Promise<GetServerSidePropsSearch> {
  const query: PayloadParams = context.query;

  const mapBoxkey = new AppConfig().mapBox.key;

  return {
    props: {
      query,
      mapBoxkey,
    },
  };
}
