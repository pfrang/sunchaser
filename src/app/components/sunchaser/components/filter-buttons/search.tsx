"use client";

import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useFetchGoogleMapsSearches } from "app/hooks/use-google-maps-auto-search";
import { useUserLocation } from "app/hooks/use-user-location";
import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { Spinner } from "ui-kit/spinner/spinner";
import { GoogleMapsAutoSearchDtoItem } from "app/api/google-maps/auto-search/dtos/google-auto-search.get-dto";
import { useFormikContext } from "formik";
import { useIsFilterOpen, useIsSliding } from "states/states";
import { XLogo } from "ui-kit/x/x";
import MyLocationIcon from "@mui/icons-material/MyLocation";

import { FormShape } from "./form";

export const Search = () => {
  const { isFilterOpen, setIsFilterOpen } = useIsFilterOpen();
  const { isSliding } = useIsSliding();
  const [dataFetched, setDatafetched] = useState(false);
  const { values, setFieldValue } = useFormikContext<FormShape>();
  const [isUserTyping, setIsUserTyping] = useState(false);

  const { data, error, isLoading } = useFetchGoogleMapsSearches(
    values.townSearch,
  );

  const { userLocation } = useUserLocation();

  useEffect(() => {
    if (!dataFetched && data?.items && values.townSearch) {
      // Incase user does not change a selection on mount
      setDatafetched(true);
      setFieldValue("townId", data.items[0].place_id);
    }
  }, [data, dataFetched, values.townSearch]);

  const setLocationAndClearList = ({ value, id }) => {
    setIsUserTyping(false);
    setFieldValue("townSearch", value);
    setFieldValue("townId", id);
  };

  const onMagnifyingGlassClick = () => {
    return setIsFilterOpen(false);
  };

  const onUseDeviceLocation = () => {
    if (!userLocation) return;
    setFieldValue("townSearch", "Min lokasjon");
    setIsUserTyping(false);
  };

  useEffect(() => {
    if (isFilterOpen) {
      setIsUserTyping(false);
    }
  }, [isFilterOpen]);

  const handleClear = () => {
    setFieldValue("townSearch", "");
    setIsUserTyping(false);
  };

  return (
    <span
      className={`w-full rounded-inherit bg-white ${isSliding && "opacity-30"}`}
    >
      {isFilterOpen && (
        <input
          autoFocus
          required
          disabled={!isFilterOpen}
          className={`bg-inherit ${
            isFilterOpen ? "" : "hidden"
          } ${isUserTyping ? "rounded-t-inherit" : "rounded-inherit"} size-full text-ellipsis pl-4 pr-6 text-lg placeholder-black outline-none`}
          placeholder={"Hvor vil du reise?"}
          value={values.townSearch}
          type="text"
          name="townSearch"
          onChange={(e) => {
            setFieldValue("townSearch", e.target.value);
            setIsUserTyping(true); // User has started typing
          }}
          style={{ outline: "none" }}
        />
      )}

      <div className="absolute right-2 top-0 flex h-full items-center">
        {isLoading ? (
          <Spinner />
        ) : isUserTyping ? (
          <div onClick={() => handleClear()}>
            <XLogo />
          </div>
        ) : (
          <SearchIcon
            fontSize="large"
            onClick={onMagnifyingGlassClick}
            style={{
              fill: "#2C5C32",
              cursor: "pointer",
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

          if (!isUserTyping) return <> </>;

          if (!isFilterOpen) return <></>;

          return (
            <ResultList>
              <div
                className="mb-1 flex w-full cursor-pointer items-center border-b-2 border-t border-black p-2 hover:bg-gray-100"
                onClick={onUseDeviceLocation}
              >
                <span className="inline-flex size-8 items-center justify-center ">
                  <MyLocationIcon
                    style={{
                      transform: "rotate(90deg)",
                      justifyContent: "center",
                    }}
                  />
                </span>
                {/* TODO filter for unique places */}
                <p className="pl-2 text-sm">Min lokasjon</p>
              </div>

              {items &&
                items.map((item, index) => {
                  return (
                    <div
                      className={`flex h-full cursor-pointer items-center p-2 hover:bg-gray-100 ${
                        index === items.length - 1 && "rounded-b-inherit"
                      }`}
                      key={item.place + index}
                      onClick={() =>
                        setLocationAndClearList({
                          value: item.place,
                          id: item.place_id,
                        })
                      }
                    >
                      {
                        <>
                          <span className="inline-flex size-8 items-center justify-center rounded-full bg-greens-500">
                            A
                          </span>
                          <p className="pl-2 text-sm ">{itemForUi(item)}</p>
                        </>
                      }
                    </div>
                  );
                })}
            </ResultList>
          );
        }}
      />
    </span>
  );
};

const ResultList = ({ children }) => {
  return (
    <div className="relative z-50 -mt-1 flex w-full flex-col rounded-b-inherit bg-inherit">
      {children}
    </div>
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
