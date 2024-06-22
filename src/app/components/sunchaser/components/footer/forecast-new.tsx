import PlaceIcon from "@mui/icons-material/Place";
import { useForecast } from "app/hooks/use-forecast";
import { useSearchParamsToObject } from "app/hooks/use-search-params";
import { getAverageFromKey } from "app/utils/times-helper";
import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { ListItem } from "ui-kit/list-item/list-item";
import { Spinner } from "ui-kit/spinner/spinner";

export const ForecastNew = ({ setDetailedTableExpanded }) => {
  const searchParams = useSearchParamsToObject();

  const { data, isLoading, error } = useForecast({
    params: searchParams,
  });

  const locationDisplay = `Været på ${searchParams?.location || "min lokasjon"}`;

  const onClick = () => {
    setDetailedTableExpanded(true);
  };
  return (
    <div className="flex w-full flex-col">
      <span className="block h-4"></span>
      <div className="flex">
        <PlaceIcon />
        <p className="">{locationDisplay}</p>
      </div>
      <span className="block h-4"></span>
      <div>
        <ConditionalPresenter
          isLoading={isLoading}
          renderLoading={() => (
            <div className="mt-2 flex w-full justify-center">
              <Spinner />
            </div>
          )}
          error={error}
          data={data}
          renderData={(data) => {
            const firstDay = data.days[Object.keys(data.days)[0]];
            const avgTemp = getAverageFromKey(firstDay.times, "temperature");
            const avgWind = getAverageFromKey(firstDay.times, "wind");
            const avgRain = getAverageFromKey(firstDay.times, "rain");
            return (
              <ListItem
                body={{
                  icon: firstDay.times[0].symbol || "partlycloudy",
                  temperature: avgTemp,
                  rain: avgRain,
                  wind: avgWind,
                }}
                onClick={onClick}
              />
            );
          }}
        />
      </div>
    </div>
  );
};
