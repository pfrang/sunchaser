"use client";

import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import NavigationIcon from "@mui/icons-material/Navigation";
import { useFetchGoogleMapsSearches } from "app/hooks/use-google-maps-auto-search";
import { useUserLocation } from "app/hooks/use-user-location";
import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { Text } from "ui-kit/text";
import { Spinner } from "ui-kit/spinner/spinner";
import { GoogleMapsAutoSearchDtoItem } from "app/api/google-maps/auto-search/dtos/google-auto-search.get-dto";
import { useFormikContext } from "formik";
import { useIsFilterOpen } from "states/states";

import { FormShape } from "./form";

export const Search = () => {
  const { isFilterOpen, setIsFilterOpen } = useIsFilterOpen();
  const [dataFetched, setDatafetched] = useState(false);
  const { values, setFieldValue } = useFormikContext<FormShape>();
  const [hasUserTyped, setHasUserTyped] = useState(false);

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
    setHasUserTyped(false);
    setFieldValue("townSearch", value);
    setFieldValue("townId", id);
  };

  const onMagnifyingGlassClick = () => {
    return setIsFilterOpen(false);
  };

  const onUseDeviceLocation = () => {
    if (!userLocation) return;
    setFieldValue("townSearch", "Min lokasjon");
    setHasUserTyped(false);
  };

  useEffect(() => {
    if (isFilterOpen) {
      setHasUserTyped(false);
    }
  }, [isFilterOpen]);

  return (
    <>
      {isFilterOpen && (
        <input
          autoFocus
          required
          disabled={!isFilterOpen}
          className={`bg-inherit ${
            isFilterOpen ? "" : "hidden"
          } size-full text-ellipsis rounded-inherit pl-4 pr-6 text-xl placeholder-black outline-none focus:ring-2 focus:ring-greens-400`}
          placeholder={values.townSearch || "Hvor vil du reise?"}
          value={values.townSearch}
          type="text"
          name="townSearch"
          onChange={(e) => {
            setFieldValue("townSearch", e.target.value);
            setHasUserTyped(true); // User has started typing
          }}
          style={{ outline: "none" }}
        />
      )}

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

          if (!hasUserTyped) return <> </>;

          if (!isFilterOpen) return <></>;

          return (
            <ResultList>
              <div
                className="flex w-full cursor-pointer items-center rounded-inherit border-2 bg-blues-200 px-2 py-3 text-white"
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
    </>
  );
};

const ResultList = React.forwardRef<
  HTMLDivElement,
  React.PropsWithChildren<{}>
>((props, ref) => {
  return (
    <>
      <div
        ref={ref}
        className="absolute top-14 z-50 flex w-full flex-col gap-2 rounded-[36px] border-2 border-blues-900 bg-blues-500 p-3 shadow-lg"
      >
        {props.children}
        <span className="h-1"></span>
        <div className="flex justify-center px-28">
          <span className="h-1 w-1/2 bg-blues-200"></span>
        </div>
      </div>
    </>
  );
});

const itemForUi = (item: GoogleMapsAutoSearchDtoItem) => {
  const { place, country } = item;

  const city = country.split(",");
  if (city.length > 1) {
    return `${place}, ${city[0]}`;
  }
  return place;
};
