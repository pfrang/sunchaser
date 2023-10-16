import mapboxgl from "mapbox-gl";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";
import Swiper from "swiper";

import { AppConfig } from "../../../../app-config";
import { ConditionalPresenter } from "../../../../ui-kit/conditional-presenter/conditional-presenter";
import { Flex } from "../../../../ui-kit/flex";
import { SearchLoader } from "../../../../ui-kit/search-loader/search-loader";
import { AzureFunctionCoordinatesMappedItems } from "../../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { useCoordinates } from "../../../hooks/use-coordinates";
import { MapBoxHelper, StartAndEndCoordinates } from "../../mapbox-settings";

import { Carousell } from "./components/carousell";
import { Map } from "./components/map";

const TwoGridRow = styled.div`
  display: grid;
  grid-template-rows: 2fr 3fr;
  height: 100%;
  width: 100%;
  grid-gap: 32px;
  /* margin-bottom: 200px; */
`;

export default function Sunchaser({ mapBoxKey }: { mapBoxKey: string }) {
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
    if (map) {
      map.removeLayer("route");
      map.flyTo({
        center: [data.userLocation.longitude, data.userLocation.latitude],
        duration: 500,
      });
      mapInstance.setFitBounds(map);
    }
  };

  // useEffect(() => {
  //   if (data && data.ranks.length > 0 && !isLoading) {
  //     const longitudes = data.ranks.map((item) => item.longitude);
  //     const latitudes = data.ranks.map((item) => item.latitude);
  //     const userLocation = data.userLocation;
  //     const mapInitializer = new MapBoxHelper(
  //       longitudes,
  //       latitudes,
  //       userLocation.longitude,
  //       userLocation.latitude
  //     );

  //     const primaryMap = mapInitializer.initializeMap("map");

  //     primaryMap.on("load", () => {
  //       primaryMap.resize();
  //       primaryMap.addControl(new mapboxgl.NavigationControl());
  //       setMapInstance(mapInitializer);
  //       setMap(primaryMap);
  //     });
  //   }
  // }, [data, isLoading]);

  const onClickCard = (
    item: AzureFunctionCoordinatesMappedItems,
    swiper: Swiper
  ) => {
    if (item.index !== highlightedCard?.index && map) {
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
                  We could not find any locations with the provided coordinates,
                  please increase the distance
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
            <TwoGridRow>
              <Map
                data={data}
                setMapInstance={setMapInstance}
                setMap={setMap}
                map={map}
              />
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
            </TwoGridRow>
          );
        }}
      />
    </Flex>
  );
}

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
