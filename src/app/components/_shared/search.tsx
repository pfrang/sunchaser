"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import NavigationIcon from "@mui/icons-material/Navigation";
import { fetchTownDetails } from "app/hooks/fetch-town-details";
import { useFetchGoogleMapsSearches } from "app/hooks/use-google-maps-auto-search";
import { useUpdateUrl } from "app/hooks/use-update-url";
import { useUserLocation } from "app/hooks/use-user-location";
import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { Text } from "ui-kit/text";
import { sanitizeNextParams } from "app/utils/sanitize-next-query";
import { useSearchParamsToObject } from "app/hooks/use-search-params";
import { Spinner } from "ui-kit/spinner/spinner";
import { GoogleMapsAutoSearchDtoItem } from "app/api/google-maps/auto-search/dtos/google-auto-search.get-dto";

export const Search = () => {
  const [townSearch, setTownSearch] = useState("");
  const [isLocationChosen, setLocationChosen] = useState(false);
  const [dataFetched, setDatafetched] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const [townId, setTownId] = useState("");
  const searchParams = useSearchParamsToObject();
  const router = useRouter();

  const { data, error, isLoading } = useFetchGoogleMapsSearches(townSearch);
  const { userLocation } = useUserLocation();
  const updateUrl = useUpdateUrl();

  const locationRef = useRef<HTMLInputElement>(null);
  const resultListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (searchParams?.location) {
      setTownSearch((searchParams.location as string) || "");
      setLocationChosen(true);
    }
  }, []);

  useEffect(() => {
    if (!townId) return;

    const fetcher = async () => {
      const response = await fetchTownDetails(townId);

      updateUrl({
        lat: response?.latitude,
        lon: response?.longitude,
        // location: locationRef?.current?.value.split(",")[0], // TODO maybe fix if we want location to pre-populated
      });
    };
    fetcher();
  }, [townId]);

  useEffect(() => {
    if (!dataFetched && data?.items && isLocationChosen) {
      // Incase user does not change a selection on mount
      setTownId(data.items[0].place_id);
      setDatafetched(true);
    }
  }, [data, dataFetched, isLocationChosen]);

  const setLocationAndClearList = ({ value, id }) => {
    setTownSearch(value);
    setTownId(id);
    setLocationChosen(true);
    setIsExpanded(false);
  };

  const onSearchChange = (e) => {
    setTownSearch(e);
    setLocationChosen(false);
  };

  const onMagnifyingGlassClick = () => {
    setTownSearch("");
    return setIsExpanded(!isExpanded);
    if (isExpanded) {
      if (!data) return;
      // const search = locationRef?.current?.value;
      // const townId = data?.items[0].place_id;
      // setTownSearch(data?.items[0].place);
      // setLocationAndClearList({ value: search, id: townId });
    } else {
      setIsExpanded(true);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        resultListRef.current &&
        !resultListRef.current.contains(event.target)
      ) {
        setIsExpanded(false);
        setTownSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const onUseDeviceLocation = () => {
    if (!userLocation) return;

    const urlParams = sanitizeNextParams({
      ...searchParams,
      lat: userLocation.latitude,
      lon: userLocation.longitude,
      location: "",
    });
    setIsExpanded(false);
    router.push(`/?${urlParams}`);
  };

  return (
    <div
      ref={resultListRef}
      className={`relative left-[6px] top-2 z-50 flex h-[52px] flex-col content-center rounded-[16px] bg-white px-1 shadow-lg transition-width duration-300 ease-in-out
        ${
          isExpanded
            ? "w-[250px] bg-blues-400 sm:w-[350px] md:w-[500px]"
            : "w-[52px]"
        }
      `}
    >
      {isExpanded && (
        <input
          autoFocus
          ref={locationRef}
          required
          disabled={!isExpanded}
          className={`bg-inherit ${
            isExpanded ? "" : "hidden"
          } h-full items-center text-ellipsis rounded-inherit pl-4 pr-6 text-2xl outline-none`}
          placeholder={isExpanded ? "Location" : ""}
          onChange={(e) => onSearchChange(e.target.value)}
          onFocus={() => setLocationChosen(false)}
          type="text"
          value={isExpanded ? townSearch : ""}
          style={{ outline: "none" }}
        />
      )}
      {/* <input
        autoFocus
        ref={locationRef}
        required
        // disabled={!isExpanded}
        className={`h-full  items-center text-ellipsis rounded-inherit bg-inherit pl-4 pr-6 text-2xl`}
        placeholder={isExpanded ? "Location" : ""}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={() => setLocationChosen(false)}
        onClick={(e) => e.stopPropagation()}
        type="text"
        value={isExpanded ? townSearch : ""}
        style={{ outline: "none" }}
      /> */}

      <div className="absolute right-2 top-[8px]">
        {isLoading ? (
          <Spinner />
        ) : (
          <SearchIcon
            // TODO fix
            fontSize="large"
            onClick={onMagnifyingGlassClick}
            style={{
              fill: "#2C5C32",
              cursor: "pointer",
              color: isExpanded ? "white" : "black",
              // transform: "rotate(90deg)",
            }}
          />
        )}
      </div>

      <ConditionalPresenter
        data={data}
        error={error}
        isLoading={false}
        renderData={(data) => {
          const { items } = data;

          if (isLocationChosen || !isExpanded) return <></>;

          return (
            <ResultList ref={resultListRef}>
              <div
                className="flex w-full cursor-pointer items-center rounded-inherit border-2 border-blues-1000 bg-blues-200 px-2 py-3 text-white"
                onClick={onUseDeviceLocation}
              >
                <NavigationIcon
                  style={{
                    transform: "rotate(90deg)",
                    justifyContent: "center",
                  }}
                />
                {/* TODO filter for unique places */}
                <Text variant="poppins" color="black">
                  Use device location
                </Text>
              </div>

              {items &&
                !isLocationChosen &&
                items.map((item, index) => {
                  return (
                    <div
                      className={`flex cursor-pointer items-center rounded-[36px] border-2 border-blues-1000 bg-blues-400 px-4 py-3 text-white`}
                      key={item.place + index}
                      onClick={() =>
                        setLocationAndClearList({
                          value: item.place,
                          id: item.place_id,
                        })
                      }
                    >
                      {
                        <Text variant="poppins" color="white">
                          {itemForUi(item)}
                        </Text>
                      }
                    </div>
                  );
                })}
            </ResultList>
          );
        }}
      />
    </div>
  );
};

const ResultList = ({ children, ref }) => {
  return (
    <>
      <div
        ref={ref}
        className="absolute top-14 flex w-full flex-col gap-2 rounded-[36px] border-2 border-blues-900 bg-blues-500 p-3 shadow-lg"
      >
        {children}
        <span className="h-1"></span>
        <div className="flex justify-center px-28">
          <span className="h-1 w-1/2 bg-blues-200"></span>
        </div>
      </div>
    </>
  );
};

const itemForUi = (item: GoogleMapsAutoSearchDtoItem) => {
  const { place, country } = item;

  const city = country.split(",");
  if (city.length > 1) {
    return `${place}, ${city[0]}`;
  }
  return place;
};
