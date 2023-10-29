import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import { Spacer } from "ui-kit/spacer/spacer";
import { useUpdateUrl } from "pages/hooks/use-update-url";
import { fetchTownDetails } from "pages/hooks/fetch-town-details";
import { useUserLocation } from "pages/hooks/use-user-location";
import { theme } from "ui-kit/theme";

import { Spinner } from "../../ui-kit/spinner/spinner";
import { GoogleMapsAutoSearchMappedData } from "../api/google-maps/auto-search/mapper/gmaps-auto-search-mapper";
import { useFetchGoogleMapsSearches } from "../hooks/use-google-maps-auto-search";
import { ConditionalPresenter } from "../../ui-kit/conditional-presenter/conditional-presenter";
import { Flex } from "../../ui-kit/flex";

export const WhereAreYou = () => {
  const [townSearch, setTownSearch] = useState("");
  const [isLocationChosen, setLocationChosen] = useState(false);
  const [dataFetched, setDatafetched] = useState(false);
  const updateUrl = useUpdateUrl();
  const [townId, setTownId] = useState("");

  const locationRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { data, error, isLoading } = useFetchGoogleMapsSearches(townSearch);
  const { userLocation } = useUserLocation();

  useEffect(() => {
    if (router.query?.distance) {
      setTownSearch((router.query?.location as string) || "");
      setLocationChosen(true);
    }
  }, [router.query]);

  useEffect(() => {
    if (!townId) return;

    const fetcher = async () => {
      const response = await fetchTownDetails(townId);

      updateUrl({
        lat: response.latitude,
        lon: response.longitude,
        location: locationRef.current.value.split(",")[0],
      });
    };
    fetcher();
  }, [townId]);

  useEffect(() => {
    if (!dataFetched && data && isLocationChosen) {
      // Incase user does not change a selection on mount
      setTownId(data?.items[0].place_id);
      setDatafetched(true);
    }
  }, [data, dataFetched, isLocationChosen]);

  const setLocationAndClearList = ({ value, id }) => {
    setTownSearch(value);
    setTownId(id);
    setLocationChosen(true);
  };

  const onSearchChange = (e) => {
    setTownSearch(e);
    setLocationChosen(false);
  };

  return (
    <Flex
      flexDirection={"column"}
      paddingRight={2}
      mx={"auto"}
      maxWidth={"600px"}
    >
      <Spacer paddingTop={2} />
      <Flex
        position={"relative"}
        backgroundColor={theme.color.blues[4]}
        boxShadow={`0 0 0 2px ${theme.color.grey[3]}`}
        borderRadius={36}
      >
        <input
          ref={locationRef}
          required
          className={`border-none pl-2 w-full h-10 text-xl bg-inherit text-white`}
          placeholder="Location"
          key={"inputBox"}
          onChange={(e) => onSearchChange(e.target.value)}
          type="text"
          value={townSearch}
          style={{ outline: "none", borderRadius: "inherit" }}
        />

        <div className="absolute right-2 top-2">
          {isLoading ? (
            <Spinner />
          ) : (
            <SearchIcon
              // TODO fix
              onClick={() => {}}
              style={{ cursor: "pointer", color: "white" }}
            />
          )}
        </div>
      </Flex>
      <ConditionalPresenter
        data={data}
        error={error}
        isLoading={false}
        renderData={(data) => {
          const { items } = data;

          const uniqueItems = Array.from(new Set(items));

          return (
            <div className="relative w-full z-10">
              <ul className="absolute left-0 w-full rounded-md border-1-black margin-0 padding-0">
                {items &&
                  !isLocationChosen &&
                  uniqueItems.map(
                    (item: GoogleMapsAutoSearchMappedData, index) => {
                      return (
                        <li
                          key={index}
                          id={item.place_id}
                          className="relative p-2 border-2 bg-slate-200 text-xl cursor-pointer border-2 rounded-sm border-slate-300"
                          onClick={(e) =>
                            setLocationAndClearList({
                              value: e.currentTarget.innerHTML,
                              id: e.currentTarget.id,
                            })
                          }
                        >
                          {/* TODO filter for unique places */}
                          {itemForUi(item)}
                        </li>
                      );
                    }
                  )}
              </ul>
            </div>
          );
        }}
      />
    </Flex>
  );
};

const itemForUi = (item: GoogleMapsAutoSearchMappedData) => {
  const { place, country } = item;

  const city = country.split(",");
  if (city.length > 1) {
    return `${place}, ${city[0]}`;
  }
  return place;
};
