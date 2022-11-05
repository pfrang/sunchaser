import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { useCoordinates } from "../hooks/use-coordinates";
import { SearchLoader } from "../../ui-kit/search-loader/search-loader";
import { CoordinatesMappedResponse } from "../api/azure-function/coordinates/mapper/coordinates-mapper";

import { Card } from "./components/card";

const Wrapper = styled.div`
  min-height: 100vh;
  position: relative;
`;

const GridWrapper = styled.div``;
const Grid = styled.div`
  padding: 20px;
  display: grid;
  text-align: center;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 20px;
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
      console.dir(data, { depth: null });
    }
  }, [data, error]);

  const top4Items = items && items.items.slice(0, 4);

  return (
    <Wrapper>
      {!items ? (
        <SearchLoader />
      ) : (
        <Grid>
          {top4Items.map((item, idx) => {
            return <Card key={idx} {...item} />;
          })}
        </Grid>
      )}
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
