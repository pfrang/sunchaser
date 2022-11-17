import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

import { useCoordinates } from "../hooks/use-coordinates";
import { SearchLoader } from "../../ui-kit/search-loader/search-loader";
import { CoordinatesMappedResponse } from "../api/azure-function/coordinates/mapper/coordinates-mapper";
import { Spacer } from "../../ui-kit/spacer/spacer";
import { AppConfig } from "../../app-config";
import { AzureFunctionCoordinatesMappedItems } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { Arrow, DirectionChoice } from "../../ui-kit/arrow/arrow";

import { MainCard } from "./components/main-card";
import { MapBoxHelper } from "./mapbox-settings";
import { SmallCard } from "./components/small-card";
import { Carousell } from "./components/carousell";

// import required modules

const Wrapper = styled.div`
  padding-left: 30px;
  padding-right: 30px;
  @media (min-width: 800px) {
    padding-left: 100px;
    padding-right: 100px;
  }
  @media (min-width: 480px) {
    padding-left: 40px;
    padding-right: 40px;
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

  const [cardsToDisplay, setCardsToDisplay] = useState<
    undefined | AzureFunctionCoordinatesMappedItems[]
  >(undefined);

  useEffect(() => {
    if (data) {
      const arr = [data.items.userLocation[0], ...data.items.ranks.slice(0, 3)];
      setItems([data.items.userLocation[0], ...data.items.ranks]);
      setCardsToDisplay(arr);
      const { lat, lon } = {
        lat: data.items.userLocation[0].latitude,
        lon: data.items.userLocation[0].longitude,
      };
      const map = new MapBoxHelper([lon, lat]).setMarker();
      map.on("load", () => map.resize());
    }
  }, [data]);

  const swapItems = (item: AzureFunctionCoordinatesMappedItems) => {
    const currentIndexOfItem = cardsToDisplay.findIndex((i) => i === item);
    const cardsArr = cardsToDisplay.slice();
    const tmpHighlightedVar = cardsArr[0];
    cardsArr[0] = item;
    cardsArr[currentIndexOfItem] = tmpHighlightedVar;
    return setCardsToDisplay(cardsArr);
  };

  useEffect(() => {
    if (cardsToDisplay) {
      const { lat, lon } = {
        lat: cardsToDisplay[0].latitude,
        lon: cardsToDisplay[0].longitude,
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
  }, [cardsToDisplay]);

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
            <MainCard key={"firstItem"} {...cardsToDisplay[0]} />
            <Spacer vertical={5} />
            <div className="text-xl text-center">
              <p>Other awesome places</p>
            </div>
            <Spacer vertical={5} />

            {/* <CarouselList>
                  {cardsToDisplay.slice(1, 4).map((item, idx) => {
                    return (
                      <SmallCard swapItems={swapItems} key={idx} item={item} />
                    );
                  })}
                </CarouselList> */}
            <Carousell items={data.items.ranks} swapItems={swapItems} />
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
