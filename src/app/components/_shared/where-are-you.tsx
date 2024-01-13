"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import SearchIcon from "@mui/icons-material/Search";
import NavigationIcon from "@mui/icons-material/Navigation";
import { fetchTownDetails } from "app/hooks/fetch-town-details";
import { useFetchGoogleMapsSearches } from "app/hooks/use-google-maps-auto-search";
import { useUpdateUrl } from "app/hooks/use-update-url";
import { useUserLocation } from "app/hooks/use-user-location";
import { GoogleMapsAutoSearchMappedData } from "app/api/google-maps/auto-search/mapper/gmaps-auto-search-mapper";
import { ConditionalPresenter } from "ui-kit/conditional-presenter/conditional-presenter";
import { Flex } from "ui-kit/flex";
import { Spacer } from "ui-kit/spacer/spacer";
import { Spinner } from "ui-kit/spinner/spinner";
import { theme } from "ui-kit/theme";
import { Text } from "ui-kit/text";
import { sanitizeNextParams } from "app/utils/sanitize-next-query";
import { useSearchParamsToObject } from "app/hooks/use-search-params";

export const WhereAreYou = () => {
  const [townSearch, setTownSearch] = useState("");
  const [isLocationChosen, setLocationChosen] = useState(false);
  const [dataFetched, setDatafetched] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const [townId, setTownId] = useState("");
  const locationRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParamsToObject();
  const router = useRouter();

  const { data, error, isLoading } = useFetchGoogleMapsSearches(townSearch);
  const { userLocation } = useUserLocation();
  const updateUrl = useUpdateUrl();

  useEffect(() => {
    if (searchParams?.distance) {
      setTownSearch((searchParams.location as string) || "");
      setLocationChosen(true);
    }
  }, [searchParams]);

  useEffect(() => {
    if (!townId) return;

    const fetcher = async () => {
      const response = await fetchTownDetails(townId);

      updateUrl({
        lat: response?.latitude,
        lon: response?.longitude,
        location: locationRef?.current?.value.split(",")[0],
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

  const onMagnifyingGlassClick = () => {
    return setIsExpanded(!isExpanded);
    if (isExpanded) {
      if (!data) return;
      const search = locationRef?.current?.value;
      const townId = data?.items[0].place_id;
      setTownSearch(data?.items[0].place);
      setLocationAndClearList({ value: search, id: townId });
    } else {
      setIsExpanded(true);
    }
  };

  const onUseDeviceLocation = () => {
    if (!userLocation) return;

    const urlParams = sanitizeNextParams({
      ...searchParams,
      lat: userLocation.latitude,
      lon: userLocation.longitude,
      location: "",
    });
    router.push(`/?${urlParams}`);
  };

  return (
    <div
      className={`transition-width duration-250 relative flex flex-col ease-in-out ${
        isExpanded ? "max-w-[250px] md:max-w-[500px]" : "max-w-[55px]"
      }`}
    >
      <div
        className={`z-99 flex flex-col rounded-[36px] border-2 border-[${theme.color.blues[2]}]`}
      >
        <Flex
          position={"relative"}
          backgroundColor={isExpanded ? theme.color.blues[4] : "transparent"}
          // boxShadow={`0 0 0 2px #000000`}
          // borderColor={theme.color.blues[0]}
          borderWidth={1}
          alignItems={"center"}
          padding={1}
          borderColor={"rgba(0, 0, 0, 0.1)"}
          borderRadius={"inherit"}
        >
          <div
            className={`relative ${
              isExpanded ? `bg-[${theme.color.blues[4]}]` : "bg-transparent"
            }] border-1 border-color vewf p-1  `}
          ></div>
          <input
            ref={locationRef}
            required
            className={`h-10 w-full bg-inherit pl-6 text-2xl text-white`}
            placeholder={isExpanded ? "Location" : ""}
            key={"inputBox"}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setLocationChosen(false)}
            type="text"
            value={isExpanded ? townSearch : ""}
            style={{ outline: "none", borderRadius: "inherit" }}
          />

          <div className="absolute right-2 top-2">
            {isLoading ? (
              <Spinner />
            ) : (
              <SearchIcon
                // TODO fix
                fontSize="large"
                onClick={onMagnifyingGlassClick}
                style={{
                  cursor: "pointer",
                  color: isExpanded ? "white" : "black",
                  transform: "rotate(90deg)",
                }}
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

            if (isLocationChosen || !isExpanded) return <></>;

            return (
              <ExpandedFlex>
                <Flex
                  borderRadius={"inherit"}
                  color={"white"}
                  style={{ cursor: "pointer" }}
                  backgroundColor={theme.color.blues[2]}
                  borderColor={theme.color.blues[10]}
                  borderWidth={1}
                  px={[2, 4]}
                  py={3}
                  onClick={onUseDeviceLocation}
                  alignItems={"center"}
                  gap={2}
                >
                  <NavigationIcon
                    style={{
                      transform: "rotate(90deg)",
                    }}
                  />
                  {/* TODO filter for unique places */}
                  <Text variant="poppins" color="white">
                    Use device location
                  </Text>
                </Flex>
                {items &&
                  !isLocationChosen &&
                  items.map((item: GoogleMapsAutoSearchMappedData, index) => {
                    return (
                      <Flex
                        borderRadius={"inherit"}
                        color={"white"}
                        key={item.place + index}
                        style={{ cursor: "pointer" }}
                        backgroundColor={theme.color.blues[4]}
                        borderColor={theme.color.blues[10]}
                        borderWidth={1}
                        px={4}
                        py={3}
                        onClick={() =>
                          setLocationAndClearList({
                            value: item.place,
                            id: item.place_id,
                          })
                        }
                      >
                        {/* TODO filter for unique places */}
                        <Text variant="poppins" color="white">
                          {itemForUi(item)}
                        </Text>
                      </Flex>
                    );
                  })}
              </ExpandedFlex>
            );
          }}
        />
      </div>
    </div>
  );
};

const ExpandedFlex = ({ children }) => {
  return (
    <>
      <Flex
        marginTop={2}
        flexDirection={"column"}
        // zIndex={99}
        padding={3}
        borderRadius={"inherit"}
        borderColor={theme.color.blues[9]}
        backgroundColor={theme.color.blues[5]}
        borderWidth={2}
        gap={2}
        boxShadow={"inset 0px 6px 10px rgba(0, 0, 0, 0.2)"}
      >
        {children}
      </Flex>
      <Spacer height={12} />
      <Flex width={"100%"} justifyContent={"center"} px="100px">
        <Spacer
          height={"18px"}
          boxShadow={"inset 0px 8px 6px rgba(0, 0, 0, 0.2)"}
          style={{ backgroundColor: "#004871" }}
        />
      </Flex>
    </>
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
