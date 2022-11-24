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
    padding-left: 100px;
    padding-right: 100px;
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

  useEffect(() => {
    if (data) {
      const topRankCard = data.items.ranks[0];
      const userLocation = data.items.userLocation[0];
      setItems([...data.items.ranks, userLocation]);
      setHighlightedCard(topRankCard);
      setUserLocation(userLocation);
      const { lat, lon } = {
        lat: topRankCard.latitude,
        lon: topRankCard.longitude,
      };
      const map = new MapBoxHelper([lon, lat]).setMarker();
      map.on("load", () => map.resize());
    }
  }, [data]);

  useEffect(() => {
    if (highlightedCard) {
      const { lat, lon } = {
        lat: highlightedCard.latitude,
        lon: highlightedCard.longitude,
      };
      const map = new MapBoxHelper([lon, lat]).setMarker();
      map.on("load", () => map.resize());

      // const itemIndex = cardsToDisplay.findIndex(
      //   (item) => item.latitude === highlightedItem.latitude
      // );
      // console.log(highlightedItem);

      // setCardsToDisplay(cardsToDisplay.splice(itemIndex, 1));

      return;
    }
  }, [highlightedCard]);

  return (
    <Wrapper>
      <div className="flex flex-col h-screen -mt-[64px]">
        <Spacer vertical={64} />
        <section id="section-map">
          <div className="flex items-center justify-center">
            <div
              id="map"
              className="h-[250px] tablet:h-[350px] phone:h-[250px] w-4/5 tablet: w-2/3 w-full m-auto mt-4"
            ></div>
          </div>
        </section>
        {!items ? (
          <SearchLoader />
        ) : (
          <section>
            <Spacer vertical={4} />
            <MainCard key={"firstItem"} {...highlightedCard} />
            <Spacer vertical={4} />
            <div className="text-xl text-center">
              <p>Other awesome places</p>
            </div>
            <Spacer vertical={5} />
            <Carousell
              items={items}
              setHighlightedCard={setHighlightedCard}
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

  const mapBoxkey = new AppConfig().mapBox.key;

  return {
    props: {
      params: body,
      mapBoxkey,
    },
  };
}
