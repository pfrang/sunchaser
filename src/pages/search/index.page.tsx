import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { Swiper } from "swiper/types";

import { useCoordinates } from "../hooks/use-coordinates";
import { SearchLoader } from "../../ui-kit/search-loader/search-loader";
import { AppConfig } from "../../app-config";
import { AzureFunctionCoordinatesMappedItems } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { Flex } from "../../ui-kit/flex/flex";
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

  const [map, setMap] = useState<undefined | mapboxgl.Map>(undefined);
  const [mapInstance, setMapInstance] = useState<undefined | MapBoxHelper>(
    undefined
  );

  const resetMap = () => {
    map.removeLayer("route");
    map.flyTo({
      center: [data.userLocation.longitude, data.userLocation.latitude],
      duration: 500,
    });
    mapInstance.setFitBounds(map);
  };

  useEffect(() => {
    if (data && data.ranks.length > 0) {
      const longitudes = data.ranks.map((item) => item.longitude);
      const latitudes = data.ranks.map((item) => item.latitude);
      const userLocation = data.userLocation;
      const mapInitializer = new MapBoxHelper(
        longitudes,
        latitudes,
        userLocation.longitude,
        userLocation.latitude
      );

      const primaryMap = mapInitializer.initializeMap("map");

      primaryMap.on("load", () => {
        primaryMap.resize();
        primaryMap.addControl(new mapboxgl.NavigationControl());
        setMapInstance(mapInitializer);
        setMap(primaryMap);
      });
    }
  }, [data]);

  const onClickCard = (
    item: AzureFunctionCoordinatesMappedItems,
    swiper: Swiper
  ) => {
    if (item.index !== highlightedCard?.index) {
      const { lat, lon } = {
        lat: item.latitude,
        lon: item.longitude,
      };

      const coordinates: StartAndEndCoordinates = {
        start: {
          longitude: lon,
          latitude: lat,
        },
        end: {
          longitude: data.userLocation.longitude,
          latitude: data.userLocation.latitude,
        },
      };

      MapBoxHelper.fitBounds(map, coordinates, 50, 1000);

      MapBoxHelper.drawLine(map, coordinates);

      setHighlightedCard(item);

      return setTimeout(() => {
        swiper.update();
        swiper.slideTo(item.index, 1000);
      }, 500);
    }
    setHighlightedCard(undefined);
    resetMap();
    return setTimeout(() => {
      swiper.update();
    }, 500);
  };

  return (
    <Flex height={"100%"}>
      <TwoGridRow>
        <section id="section-map">
          {data && data.ranks.length > 0 && (
            <div className="flex items-center h-full justify-center sticky top-0">
              <div id="map" className="w-full h-full m-auto "></div>
              <div
                id="original-map"
                className="w-full h-full m-auto hidden"
              ></div>
            </div>
          )}
        </section>
        <ConditionalPresenter
          isLoading={isLoading}
          error={error}
          data={data}
          renderLoading={() => <SearchLoader />}
          renderError={() => {
            return (
              <Flex justifyContent={"center"}>
                <p>Something went wrong</p>
              </Flex>
            );
          }}
          renderData={(data) => {
            const { userLocation, ranks } = data;
            if (ranks.length === 0) {
              return (
                <Flex justifyContent={"center"}>
                  <p>
                    We could not find any locations with the provided
                    coordinates, please increase the distance
                  </p>
                </Flex>
              );
            }

            const aheadOfNow = ranks.map((rank) => {
              return {
                ...rank,
                times: rank.times.filter((time) => {
                  const nowPlusOneHour = new Date().setHours(
                    new Date().getHours() + 1
                  );

                  const dateTimeString =
                    time.date.toString().slice(0, 11) +
                    time.time +
                    time.date.toString().slice(-1);

                  return new Date(dateTimeString) >= new Date();
                }),
              };
            });

            return (
              <Flex flexDirection={"column"} paddingX={[40, 50]}>
                <section id="section-carousell" className="h-full">
                  <Carousell
                    userLocation={userLocation}
                    items={aheadOfNow}
                    onClickCard={onClickCard}
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
