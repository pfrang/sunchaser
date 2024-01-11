"use client";
import mapboxgl from "mapbox-gl";
import { SearchLoader } from "ui-kit/search-loader/search-loader";
import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { Flex } from "ui-kit/flex";
import { useSearchParamsToObject } from "app/hooks/use-search-params";

import { useCoordinates } from "../../hooks/use-coordinates";

import { Map } from "./components/map";

export const Sunchaser = ({ mapBoxKey }: { mapBoxKey: string }) => {
  const searchParams = useSearchParamsToObject();

  mapboxgl.accessToken = mapBoxKey;

  const { data, isLoading, error } = useCoordinates({
    method: "POST",
    params: searchParams,
    data: searchParams,
  });

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
          const { ranks } = data;
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
