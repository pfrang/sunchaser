import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

import { useCoordinates } from "../hooks/use-coordinates";
import { SearchLoader } from "../../ui-kit/search-loader/search-loader";
import { CoordinatesMappedResponse } from "../api/azure-function/coordinates/mapper/coordinates-mapper";
import { Spacer } from "../../ui-kit/spacer/spacer";
import { AppConfig } from "../../app-config";
import { AzureFunctionCoordinatesMappedItems } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

import { MainCard } from "./components/main-card";
import { MapBoxHelper } from "./mapbox-settings";
import { Carousell } from "./components/carousell";

// import required modules

const Wrapper = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  @media screen and (min-width: 480px) {
    padding-left: 40px;
    padding-right: 40px;
  }

  @media screen and (min-width: 800px) {
    padding-left: 50px;
    padding-right: 50px;
  }
`;

export interface HookProperties {
  data: CoordinatesMappedResponse;
  isLoading: any;
  error: any;
}

export default function Search({ params, mapBoxkey }) {
  const { data, isLoading, error }: HookProperties = useCoordinates(params);

  mapboxgl.accessToken = mapBoxkey;

  const [items, setItems] = useState<
    undefined | AzureFunctionCoordinatesMappedItems[]
  >(undefined);

  const [userLocation, setUserLocation] = useState<
    undefined | AzureFunctionCoordinatesMappedItems
  >(undefined);

  const [highlightedCard, setHighlightedCard] = useState<
    undefined | AzureFunctionCoordinatesMappedItems
  >(undefined);

  const [zoom, setZoom] = useState(false);

  const [mapObject, setMap] = useState<undefined | mapboxgl.Map>(undefined);

  useEffect(() => {
    if (data) {
      const topRankCard = data.items.ranks[0];
      const userLocation = data.items.userLocation[0];
      setItems([...data.items.ranks, userLocation]);
      setHighlightedCard(topRankCard);
      setUserLocation(userLocation);

      const longitudes = data.items.ranks.map((item) => item.longitude);
      const latitudes = data.items.ranks.map((item) => item.latitude);

      let map = new MapBoxHelper(longitudes, latitudes).setMarkers();
      map.on("load", () => map.resize());
      setMap(map);
    }
  }, [data]);

  useEffect(() => {
    if (highlightedCard && zoom) {
      const { lat, lon } = {
        lat: highlightedCard.latitude,
        lon: highlightedCard.longitude,
      };

      mapObject.flyTo({
        center: [lon, lat],
        zoom: 15,
        speed: 1,
        curve: 1,
        duration: 2000,
        easing(t) {
          return t;
        },
      });
    }
  }, [highlightedCard]);

  const setZoomAndHighlightCard = (
    item: AzureFunctionCoordinatesMappedItems,
    zoom?: boolean
  ) => {
    setHighlightedCard(item);
    setZoom(zoom);
  };

  return (
    <Wrapper>
      <div className="flex flex-col h-screen -mt-[64px]">
        <Spacer vertical={64} />
        <section id="section-map">
          <div className="flex items-center justify-center">
            <div
              id="map"
              className="w-full h-[250px] tablet:h-[350px] phone:h-[250px] tablet:w-2/3  m-auto mt-4"
            ></div>
          </div>
        </section>
        {!items ? (
          <SearchLoader />
        ) : (
          <section>
            <Spacer vertical={6} />
            <MainCard key={"firstItem"} {...highlightedCard} />
            <Spacer vertical={4} />
            <div className="text-xl text-center">
              <p>Other awesome places</p>
            </div>
            <Spacer vertical={5} />
            <Carousell
              items={items}
              setZoomAndHighlightCard={setZoomAndHighlightCard}
              highlightedCard={highlightedCard}
            />
          </section>
        )}
      </div>
    </Wrapper>
  );
}

export async function getServerSideProps(context) {
  const body = context.query;
  const params = {
    params: body,
  };

  const mapBoxkey = new AppConfig().mapBox.key;

  return {
    props: {
      params,
      mapBoxkey,
    },
  };
}
