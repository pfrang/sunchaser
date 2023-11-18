import mapboxgl from "mapbox-gl";
import { useRouter } from "next/router";
import { useEffect } from "react";

import { ConditionalPresenter } from "../../../ui-kit/conditional-presenter/conditional-presenter";
import { Flex } from "../../../ui-kit/flex";
import { SearchLoader } from "../../../ui-kit/search-loader/search-loader";
import { useCoordinates } from "../../hooks/use-coordinates";
import { useMap, useMapInstance } from "../../../states/sunchaser-result";

import { Map } from "./components/map";

export const Sunchaser = ({ mapBoxKey }: { mapBoxKey: string }) => {
  const router = useRouter();

  mapboxgl.accessToken = mapBoxKey;

  const { data, isLoading, error } = useCoordinates(
    {
      method: "POST",
      params: router.query,
      data: router.query,
    },
    router.isReady
  );

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

          return (
            <Flex flexDirection={"column"}>
              <Flex flexDirection={"column"} height={"100%"}>
                <Map data={data} />
              </Flex>
            </Flex>
          );
        }}
      />
    </Flex>
  );
};
