import { useRouter } from "next/router";
import { useState } from "react";

import { ConditionalPresenter } from "../../../../ui-kit/conditional-presenter/conditional-presenter";
import { Flex } from "../../../../ui-kit/flex";
import { SearchLoader } from "../../../../ui-kit/search-loader/search-loader";
import { AzureFunctionCoordinatesMappedItems } from "../../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { useCoordinates } from "../../../hooks/use-coordinates";

import { ResultList } from "./result-list";

export const SunchaserListWrapper = () => {
  const router = useRouter();

  const { data, isLoading, error } = useCoordinates(
    {
      method: "POST",
      params: router.query,
      data: router.query,
    },
    router.isReady
  );

  const [highlightedCard, setHighlightedCard] = useState<
    undefined | AzureFunctionCoordinatesMappedItems
  >(undefined);

  return (
    <Flex height={"100%"}>
      <ConditionalPresenter
        isLoading={isLoading}
        error={error}
        data={data}
        renderLoading={() => <SearchLoader />}
        renderError={() => {
          return <></>;
        }}
        renderData={(data) => {
          const { userLocation, ranks } = data;
          if (ranks.length === 0) {
            return <></>;
          }

          const aheadOfNow: AzureFunctionCoordinatesMappedItems[] = ranks.map(
            (rank) => {
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
            }
          );

          return (
            <Flex flexDirection={"column"}>
              <section id="section-carousell" className="h-full">
                <ResultList userLocation={userLocation} items={aheadOfNow} />
              </section>
            </Flex>
          );
        }}
      />
    </Flex>
  );
};
