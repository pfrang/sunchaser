"use client";

import React, { useEffect, useRef, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useFetchGoogleMapsSearches } from "app/hooks/use-google-maps-auto-search";
import { useUserLocation } from "app/hooks/use-user-location";
import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { Spinner } from "ui-kit/spinner/spinner";
import { GoogleMapsAutoSearchDtoItem } from "app/api/google-maps/auto-search/dtos/google-auto-search.get-dto";
import { useFormikContext } from "formik";
import { useIsFilterOpen, useIsSliding } from "states/states";
import { XLogo } from "ui-kit/x/x";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { fetchTownDetails } from "app/hooks/fetch-town-details";
import { useMapInstance, useMapObject } from "states/sunchaser-result";

import { FormShape } from "./form";

export const Search = () => {
  const inputRef = useRef<HTMLInputElement>(null); // Add a ref for the input field

  const { isFilterOpen, setIsFilterOpen } = useIsFilterOpen();
  const { isSliding } = useIsSliding();
  const { values, setFieldValue } = useFormikContext<FormShape>();
  const [searchText, setSearchText] = useState(values.townSearch);
  const [isUserTyping, setIsUserTyping] = useState(false);
  const { data, error, isLoading } = useFetchGoogleMapsSearches(searchText);
  const { mapObject } = useMapObject();
  const { mapInstance } = useMapInstance();

  const { userLocation } = useUserLocation();
  const searchContainerRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isFilterOpen) {
        setIsUserTyping(false);
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      // Check if the new focus target is outside the search container
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.relatedTarget as Node)
      ) {
        setIsUserTyping(false);
      }
    };

    const searchElement = searchContainerRef.current;

    if (isFilterOpen) {
      if (inputRef.current) {
        inputRef.current.focus(); // Ensure the input is focused when the filter is open
        inputRef.current.select(); // Highlight the text in the input field
      }

      if (searchElement) {
        searchElement.addEventListener("focusout", handleFocusOut);

        return () => {
          searchElement.removeEventListener("focusout", handleFocusOut);
        };
      }

      setIsUserTyping(false);

      document.addEventListener("keydown", handleEscape);

      return () => {
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isFilterOpen, setIsFilterOpen]);

  const setLocationAndClearList = async ({ value, id }) => {
    setIsUserTyping(false);
    setFieldValue("townSearch", value);
    setFieldValue("townId", id);
    const response = await fetchTownDetails(id);
    if (response?.longitude && mapObject && mapInstance) {
      mapObject.flyTo({
        center: [Number(response.longitude), Number(response.latitude)],
        duration: 500,
      });
      setTimeout(() => {
        mapInstance.setLatLon(response.longitude, response.latitude);
        mapInstance?.removeMarker();
        mapInstance?.setSearchMarker();
        mapInstance?.removeCircularMap();
        mapInstance?.addCircularMap(values.distance);
      }, 500);
      // mapInstance.setLatLon(response.longitude, response.latitude);
    }
  };

  const onMagnifyingGlassClick = () => {
    return setIsFilterOpen(false);
  };

  const onUseDeviceLocation = () => {
    if (!userLocation) return;
    setFieldValue("townSearch", "Min lokasjon");
    setIsUserTyping(false);
  };

  const handleClear = () => {
    setFieldValue("townSearch", "");
    setIsUserTyping(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      callback();
    }
  };

  return (
    <span
      ref={searchContainerRef}
      className={`w-full rounded-inherit bg-white ${isSliding && "opacity-30"}`}
    >
      {isFilterOpen && (
        <input
          ref={inputRef} // Attach the ref to the input field
          autoFocus
          required
          disabled={!isFilterOpen}
          className={`bg-inherit ${
            isFilterOpen ? "" : "hidden"
          } ${isUserTyping ? "rounded-t-inherit" : "rounded-inherit"} size-full overscroll-y-contain text-ellipsis pl-4 pr-6 text-lg outline-none`}
          placeholder={"Hvor vil du reise?"}
          value={searchText}
          type="text"
          name="townSearch"
          onChange={(e) => {
            setSearchText(e.target.value);
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
        isLoading={!isUserTyping}
        renderData={(data) => {
          const { items } = data;

          return (
            <div
              className="relative z-50 -mt-1 flex w-full flex-col rounded-b-inherit bg-inherit"
              role="listbox"
              aria-label="Search results"
            >
              <div
                className="mb-1 flex w-full cursor-pointer items-center border-b-2 border-t border-black p-2 hover:bg-gray-100"
                onClick={onUseDeviceLocation}
                onKeyDown={(e) => e.key === "Enter" && onUseDeviceLocation()}
                tabIndex={0}
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
                items.length > 0 &&
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
                      onKeyDown={(e) =>
                        handleKeyDown(e, () =>
                          setLocationAndClearList({
                            value: item.place,
                            id: item.place_id,
                          }),
                        )
                      }
                      tabIndex={0}
                      role="option"
                      aria-label={`Select ${itemForUi(item)}`}
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
            </div>
          );
        }}
      />
    </span>
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
