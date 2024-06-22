import { useCoordinates } from "app/hooks/use-coordinates";
import { useSearchParamsToObject } from "app/hooks/use-search-params";
import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { Spinner } from "ui-kit/spinner/spinner";
import { ListItem } from "ui-kit/list-item/list-item";
import { getAverageFromKey } from "app/utils/times-helper";
import { useState } from "react";

export const SunchaserResultList = ({ setDetailedTableExpanded }) => {
  const searchParams = useSearchParamsToObject();
  const [isExpanded, setIsExpanded] = useState(false);

  const { data, isLoading, error } = useCoordinates({
    method: "POST",
    params: searchParams,
    data: searchParams,
  });

  const onClick = () => {
    setIsExpanded(!true);
  };

  return (
    <div>
      <p className="">Steder med best vær</p>
      <span className="block h-3"></span>
      <ConditionalPresenter
        isLoading={isLoading}
        error={error}
        data={data}
        renderLoading={() => (
          <div className="mt-2 flex w-full justify-center">
            <Spinner />
          </div>
        )}
        renderError={() => {
          return <></>;
        }}
        renderData={(data) => {
          const { userLocation, ranks } = data;
          if (ranks.length === 0) {
            return <></>;
          }

          return (
            <div className="flex w-full flex-col gap-2">
              {ranks.map((rank, index) => {
                return (
                  <ListItem
                    key={rank.index}
                    header={{
                      placement: index + 1,
                      name: rank.primaryName,
                    }}
                    body={{
                      icon: rank.times[0].symbol || "partlycloudy",
                      temperature: getAverageFromKey(rank.times, "temperature"),
                      rain: getAverageFromKey(rank.times, "rain") || 0,
                      wind: getAverageFromKey(rank.times, "wind"),
                    }}
                    onClick={setDetailedTableExpanded}
                  />
                );
              })}
            </div>
          );
        }}
      />
    </div>
  );
};
