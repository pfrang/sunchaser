import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import { useCoordinates } from "../hooks/use-coordinates";
import { SearchLoader } from "../../ui-kit/search-loader/search-loader";
import { AppConfig } from "../../app-config";
import { AzureFunctionCoordinatesMappedItems } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { Flex } from "../../ui-kit/components/flex/flex";
import { PayloadParams } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api.post-schema";
import { ConditionalPresenter } from "../../ui-kit/conditional-presenter/conditional-presenter";

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

export default function Search({
  mapBoxKey,
}: InferGetServerSidePropsType<typeof getStaticProps>) {
  const router = useRouter();

  mapboxgl.accessToken = mapBoxKey;

  const { data, isLoading, error } = useCoordinates(
    {
      params: router.query,
      data: router.query,
    },
    router.isReady
  );

  const [highlightedCard, setHighlightedCard] = useState<
    undefined | AzureFunctionCoordinatesMappedItems
  >(undefined);

  const [zoom, setZoom] = useState(false);

  const [mapObject, setMap] = useState<undefined | mapboxgl.Map>(undefined);

  const resetMap = () => {
    if (data) {
      const longitudes = data.items.ranks.map((item) => item.longitude);
      const latitudes = data.items.ranks.map((item) => item.latitude);
      const userLocation = data.items.userLocation;

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
  };

  // useEffect(() => {
  //   const onChange = async () => {
  //     await mutate("something", query);
  //   };
  //   onChange();
  // }, [query]);

  useEffect(() => {
    if (data) {
      resetMap();
    }
  }, [data]);

  useEffect(() => {
    if (highlightedCard && zoom) {
      const userLocation = data.items.userLocation;
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

      return MapBoxHelper.drawLine(mapObject, coordinates);
    }
    resetMap();
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
        <ConditionalPresenter
          isLoading={isLoading}
          error={error}
          data={data}
          renderLoading={() => <SearchLoader />}
          renderError={() => {
            const emptyDataError = false;
            return (
              <div className="flex absolute mt-[80px] top-0 items-center w-full justify-center">
                <p>
                  {emptyDataError
                    ? "We could not find any locations with the provided coordinates, please increase the distance"
                    : "Something went wrong"}
                </p>
              </div>
            );
          }}
          renderData={(data) => {
            const { userLocation, ranks } = data.items;
            return (
              <Flex flexDirection={"column"} paddingX={[40, 50]}>
                <section id="section-carousell" className="h-full">
                  <Carousell
                    userLocation={userLocation}
                    items={ranks}
                    setZoomAndHighlightCard={setZoomAndHighlightCard}
                    highlightedCard={highlightedCard}
                  />
                </section>
              </Flex>
            );
          }}
        />
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

export const getStaticProps = async () => {
  const mapBoxKey = new AppConfig().mapBox.key;

  return {
    props: {
      mapBoxKey,
    },
  };
};

// export async function getServerSideProps(
//   context
// ): Promise<GetServerSidePropsSearch> {
//   const query: PayloadParams = context.query;

//   const mapBoxkey = new AppConfig().mapBox.key;

//   return {
//     props: {
//       query,
//       mapBoxkey,
//     },
//   };
// }
