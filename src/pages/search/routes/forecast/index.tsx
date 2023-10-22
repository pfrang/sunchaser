import { useRouter } from "next/router";
import WhereAreYou from "pages/components/where-are-you";
import { fetchTownDetails } from "pages/hooks/fetch-town-details";
import { useForecast } from "pages/hooks/use-forecast";
import { sanitizeNextQuery } from "pages/utils/sanitize-next-query";
import { useEffect, useRef, useState } from "react";
import { Flex } from "ui-kit/flex";
import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { Spinner } from "ui-kit/spinner/spinner";

import { ForecastTableContainer } from "./components/table-container";

export const Forecast = () => {
  const router = useRouter();

  const query = sanitizeNextQuery(router.query);

  const locationRef = useRef<HTMLInputElement>(null);
  const [townId, setTownId] = useState("");

  const { data, isLoading, error } = useForecast(
    {
      params: router.query,
    },
    router.isReady
  );

  useEffect(() => {
    if (!townId) return;

    const fetcher = async () => {
      const response = await fetchTownDetails(townId);

      router.push({
        pathname: "/search",
        query: {
          ...query,
          lat: response.latitude,
          lon: response.longitude,
          location: locationRef.current.value,
        },
      });
    };
    fetcher();
  }, [townId]);

  return (
    <Flex minHeight={"100%"} flexDirection={"column"} gap={4}>
      <WhereAreYou setTownId={setTownId} locationRef={locationRef} />
      <ConditionalPresenter
        isLoading={isLoading}
        renderLoading={() => (
          <Flex position={"absolute"} bottom={"50%"} left={"50%"}>
            <Spinner />{" "}
          </Flex>
        )}
        error={error}
        data={data}
        renderData={(data) => {
          const { days } = data;

          return <ForecastTableContainer rows={days} />;
        }}
      />
    </Flex>
  );
};
