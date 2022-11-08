import React, { useEffect, useState } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";

import "mapbox-gl/dist/mapbox-gl.css";
import { useCoordinates } from "../hooks/use-coordinates";
import { SearchLoader } from "../../ui-kit/search-loader/search-loader";
import { CoordinatesMappedResponse } from "../api/azure-function/coordinates/mapper/coordinates-mapper";
import { Spacer } from "../../ui-kit/spacer/spacer";
import { AppConfig } from "../../app-config";

import { MainCard } from "./components/main-card";
import { MapBoxHelper } from "./mapbox-settings";
import { SmallCard } from "./components/small-card";

mapboxgl.accessToken =
  "pk.eyJ1IjoicGVmZiIsImEiOiJja3d3bjQxbmgwNWR4MnZxMWJub25yZXc4In0.OHql2CO2vCja5LzugCaaCg";

const Wrapper = styled.div`
  position: relative;
`;

const ScrollingWrapper = styled.div`
  overflow-x: scroll;
  overflow-y: hidden;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  display: flex;
  justify-content: center;
  &::-webkit-scrollbar {
    width: 16px;
    border: 5px solid white;
  }

  width: 50%;
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

export default function Search(props) {
  const [items, setItems] = useState<undefined | CoordinatesMappedResponse>(
    undefined
  );
  const { data, isLoading, error } = useCoordinates(props);

  useEffect(() => {
    if (data) {
      setItems(data);
      // eslint-disable-next-line no-console
      // console.dir(data, { depth: null });
      const map = new MapBoxHelper([54, 45]).setMarker();
      map.on("load", () => map.resize());
    }
  }, [data, error]);

  const topPlaces = items && items.items;
  const topPlace = items && items.items.slice(0, 1)[0];

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
                <MainCard key={"firstItem"} {...topPlace} />
              </Wrapper>
              <div className="text-xl">
                <p>Other awesome places</p>
              </div>
              <ScrollingWrapper>
                {topPlaces.map((item, idx) => {
                  return <SmallCard key={idx} {...item} />;
                })}
              </ScrollingWrapper>
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
