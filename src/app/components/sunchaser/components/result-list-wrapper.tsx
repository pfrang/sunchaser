"use client";

import { useSearchParamsToObject } from "app/hooks/use-search-params";

import { ConditionalPresenter } from "../../../../ui-kit/conditional-presenter/conditional-presenter";
import { SearchLoader } from "../../../../ui-kit/search-loader/search-loader";
import { useCoordinates } from "../../../hooks/use-coordinates";

import { ResultList } from "./result-list";

export const SunchaserListWrapper = ({ expandFooter }) => {
  const searchParams = useSearchParamsToObject();

  const { data, isLoading, error } = useCoordinates({
    method: "POST",
    params: searchParams,
    data: searchParams,
  });

  return (
    <div className="flex h-full w-full">
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

          // const aheadOfNow: AzureFunctionCoordinatesMappedItems[] = ranks.map(
          //   (rank) => {
          //     return {
          //       ...rank,
          //       times: rank.times.filter((time) => {
          //         const nowPlusOneHour = new Date().setHours(
          //           new Date().getHours() + 1,
          //         );

          //         const dateTimeString =
          //           time.date.toString().slice(0, 11) +
          //           time.time +
          //           time.date.toString().slice(-1);

          //         return new Date(dateTimeString) >= new Date();
          //       }),
          //     };
          //   },
          // );

          return (
            <div className="w-full">
              <section id="section-carousell w-full">
                <ResultList
                  expandFooter={expandFooter}
                  userLocation={userLocation}
                  items={ranks}
                />
              </section>
            </div>
          );
        }}
      />
    </div>
  );
};
