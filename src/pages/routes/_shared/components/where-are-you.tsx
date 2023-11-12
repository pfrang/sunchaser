import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import SearchIcon from "@mui/icons-material/Search";
import NavigationIcon from "@mui/icons-material/Navigation";
import { Spacer } from "ui-kit/spacer/spacer";
import { useUpdateUrl } from "pages/hooks/use-update-url";
import { fetchTownDetails } from "pages/hooks/fetch-town-details";
import { useUserLocation } from "pages/hooks/use-user-location";
import { theme } from "ui-kit/theme";
import { Text } from "ui-kit/text";
import { GoogleMapsAutoSearchNextApiResponse } from "pages/api/google-maps/auto-search/index.endpoint";

import { ConditionalPresenter } from "../../../../ui-kit/conditional-presenter/conditional-presenter";
import { Flex } from "../../../../ui-kit/flex";
import { Spinner } from "../../../../ui-kit/spinner/spinner";
import { GoogleMapsAutoSearchMappedData } from "../../../api/google-maps/auto-search/mapper/gmaps-auto-search-mapper";
import { useFetchGoogleMapsSearches } from "../../../hooks/use-google-maps-auto-search";

export const WhereAreYou = () => {
  const [townSearch, setTownSearch] = useState("");
  const [isLocationChosen, setLocationChosen] = useState(false);
  const [dataFetched, setDatafetched] = useState(false);

  const [townId, setTownId] = useState("");
  const locationRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const { data, error, isLoading } = useFetchGoogleMapsSearches(townSearch);
  const { userLocation } = useUserLocation();
  const updateUrl = useUpdateUrl();

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

  const onMagnifyingGlassClick = () => {
    if (!data) return;
    const search = locationRef.current.value;
    const townId = data?.items[0].place_id;
    setTownSearch(data?.items[0].place);
    setLocationAndClearList({ value: search, id: townId });
  };

  const onUseDeviceLocation = () => {
    if (!userLocation) return;
    router.push({
      pathname: "/",
      query: {
        ...router.query,
        lat: userLocation.latitude,
        lon: userLocation.longitude,
        location: "",
      },
    });
  };

  return (
    <Flex
      flexDirection={"column"}
      paddingRight={2}
      mx={"auto"}
      maxWidth={["250px", "500px"]}
      position={"relative"}
      px={2}
    >
      <Flex
        zIndex={99}
        flexDirection={"column"}
        position={"absolute"}
        top={0}
        borderColor={theme.color.blues[2]}
        padding={2}
        borderRadius={36}
        borderWidth={2}
        backgroundColor={theme.color.blues[8]}
      >
        <Flex
          position={"relative"}
          backgroundColor={theme.color.blues[4]}
          // boxShadow={`0 0 0 2px #000000`}
          // borderColor={theme.color.blues[0]}
          borderWidth={1}
          padding={1}
          borderColor={"rgba(0, 0, 0, 0.1)"}
          borderRadius={"inherit"}
        >
          <input
            ref={locationRef}
            required
            className={`pl-6 h-10 w-full text-2xl bg-inherit text-white`}
            placeholder="Location"
            key={"inputBox"}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setLocationChosen(false)}
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
                fontSize="large"
                onClick={onMagnifyingGlassClick}
                style={{
                  cursor: "pointer",
                  color: "white",
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

            if (isLocationChosen) return;

            return (
              <ExpandedFlex>
                <Flex
                  borderRadius={"inherit"}
                  color={"white"}
                  style={{ cursor: "pointer" }}
                  backgroundColor={theme.color.blues[2]}
                  borderColor={theme.color.blues[10]}
                  borderWidth={1}
                  px={4}
                  onClick={onUseDeviceLocation}
                  alignItems={"center"}
                  gap={2}
                >
                  <NavigationIcon style={{ transform: "rotate(90deg)" }} />
                  {/* TODO filter for unique places */}
                  <Text color="white">Use device location</Text>
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
                        onClick={(e) =>
                          setLocationAndClearList({
                            value: item.place,
                            id: item.place_id,
                          })
                        }
                      >
                        {/* TODO filter for unique places */}
                        <Text color="white">{itemForUi(item)}</Text>
                      </Flex>
                    );
                  })}
              </ExpandedFlex>
            );
          }}
        />
      </Flex>
    </Flex>
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
