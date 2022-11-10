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
import { SmallCard } from "./components/small-card";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGVmZiIsImEiOiJja3d3bjQxbmgwNWR4MnZxMWJub25yZXc4In0.OHql2CO2vCja5LzugCaaCg";

const Wrapper = styled.div`
  position: relative;
`;

const CarouselList = styled.ul`
  display: flex;
  list-style: none;
  position: relative;
  width: 100%;
  justify-content: center;
  perspective: 300px;
  background-color: #1c3b59;
  li {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #914545;
    border-radius: 12px;
    box-shadow: 0px 2px 8px 0px rgba(50, 50, 50, 0.5);
    transition: all 0.3s ease-in;
    cursor: pointer;

    &:nth-child(1) {
      background: linear-gradient(45deg, #2d35eb 0%, #904ed4 100%);
      z-index: 3;
    }
    &:nth-child(2) {
      background: linear-gradient(45deg, #2d35eb 0%, #fdbb2d 100%);
      transform: translateX(-40%) scale(0.9);
      z-index: 2;
      opacity: 0.7;
      margin-left: 100px;
    }
    &:nth-child(3) {
      background: linear-gradient(45deg, #2d35eb 0%, #22c1c3 100%);
      filter: blur(3px) grayscale(20%);
      transform: translateX(70%) scale(0.8);
      opacity: 0.7;
      z-index: 1;
    }
  }
`;

const Grid = styled.div`
  padding: 20px;
  display: grid;
  text-align: center;
  grid-template-rows: 1fr auto 1fr;
  grid-gap: 20px;
  height: 100%;
  justify-items: center;
`;

export interface HookProperties {
  data: CoordinatesMappedResponse;
  isLoading: any;
  error: any;
}

export default function Search(props) {
  const { data, isLoading, error }: HookProperties = useCoordinates(props);
  const [items, setItems] = useState<undefined | CoordinatesMappedResponse>(
    undefined
  );

  const [highlightedItem, setHighlightedItem] = useState<
    undefined | AzureFunctionCoordinatesMappedItems
  >(undefined);

  const [cardsToDisplay, setCardsToDisplay] = useState<
    undefined | AzureFunctionCoordinatesMappedItems[]
  >(undefined);

  useEffect(() => {
    if (highlightedItem) {
      const { lat, lon } = {
        lat: highlightedItem.latitude,
        lon: highlightedItem.longitude,
      };
      const map = new MapBoxHelper([lon, lat]).setMarker();
      map.on("load", () => map.resize());
      const itemIndex = cardsToDisplay.findIndex(
        (item) => item.latitude === highlightedItem.latitude
      );
      setCardsToDisplay(cardsToDisplay.splice(itemIndex, 1));

      return;
    }
    if (data) {
      setItems(data);
      setHighlightedItem(data.items.userLocation[0]);
      setCardsToDisplay(data.items.ranks.slice(0, 3));
      // eslint-disable-next-line no-console
      // console.dir(data, { depth: null });
      const { lat, lon } = {
        lat: data.items.userLocation[0].latitude,
        lon: data.items.userLocation[0].longitude,
      };
      const map = new MapBoxHelper([lon, lat]).setMarker();
      map.on("load", () => map.resize());
    }
  }, [data, highlightedItem]);

  return (
    <Wrapper>
      <div className="flex flex-col h-screen -mt-[64px]">
        <Spacer vertical={64} />
        <section id="section-map">
          <div className="flex items-center justify-center">
            <div id="map" className="h-[400px] w-1/2 m-auto mt-4"></div>
          </div>
        </section>
        {!items ? (
          <SearchLoader />
        ) : (
          <section>
            <Grid>
              <Wrapper>
                <MainCard key={"firstItem"} {...highlightedItem} />
              </Wrapper>
              <div className="text-xl">
                <p>Other awesome places</p>
              </div>
              <CarouselList>
                {cardsToDisplay.map((item, idx) => {
                  return (
                    <SmallCard
                      setHighlightedItem={setHighlightedItem}
                      key={idx}
                      item={item}
                    />
                  );
                })}
              </CarouselList>
            </Grid>
          </section>
        )}
      </div>
    </Wrapper>
  );
}

export async function getServerSideProps(context) {
  const body = context.query;

  return {
    props: {
      params: body,
    },
  };
}
