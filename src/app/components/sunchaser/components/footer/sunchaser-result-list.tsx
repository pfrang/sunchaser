import { useCoordinates } from "app/hooks/use-coordinates";
import { useSearchParamsToObject } from "app/hooks/use-search-params";
import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { Spinner } from "ui-kit/spinner/spinner";
import { ListItem } from "ui-kit/list-item/list-item";
import { getAverageFromKey } from "app/utils/times-helper";
import {
  AzureFunctionCoordinatesMappedItems,
  UserLocation,
} from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { StartAndEndCoordinates } from "app/utils/mapbox-settings";
import { useUserLocation } from "app/hooks/use-user-location";
import { useMapInstance, useMapObject } from "states/sunchaser-result";
import { DrawerTrigger } from "@/components/ui/drawer";

export const SunchaserResultList = ({ toggleDetailedTable }) => {
  const { mapInstance } = useMapInstance();
  const { mapObject } = useMapObject();

  const searchParams = useSearchParamsToObject();

  const { data, isLoading, error } = useCoordinates({
    method: "POST",
    params: searchParams,
    data: searchParams,
  });

  const { userLocation } = useUserLocation() as { userLocation: UserLocation };

  const onClick = (item: AzureFunctionCoordinatesMappedItems) => {
    toggleDetailedTable(item);
    const { lat, lon } = {
      lat: item.latitude,
      lon: item.longitude,
    };

    const coordinates: StartAndEndCoordinates = {
      start: {
        longitude: lon,
        latitude: lat,
      },
      end: {
        longitude: userLocation.longitude,
        latitude: userLocation.latitude,
      },
    };

    mapObject?.flyTo({
      center: [item.longitude, item.latitude],
      duration: 500,
      zoom: 11,
    });

    // mapInstance?.fitBounds(coordinates, 50, 1000);

    mapInstance?.drawLine(coordinates);
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
            return <>Fant ingen steder med disse filtrene</>;
          }

          return (
            <>
              <div className="flex flex-col gap-2">
                {ranks.map((rank, index) => {
                  return (
                    <DrawerTrigger key={rank.index} asChild>
                      <ListItem
                        key={rank.index}
                        header={{
                          placement: index + 1,
                          name: rank.primaryName,
                        }}
                        body={{
                          icon: rank.times[0].symbol || "partlycloudy",
                          temperature: getAverageFromKey(
                            rank.times,
                            "temperature"
                          ),
                          rain: getAverageFromKey(rank.times, "rain") || 0,
                          wind: getAverageFromKey(rank.times, "wind"),
                        }}
                        onClick={() => onClick(rank)}
                      />
                    </DrawerTrigger>
                  );
                })}
              </div>
            </>
          );
        }}
      />
    </div>
  );
};
