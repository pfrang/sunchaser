import React, { useEffect, useState } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

import { UserLocation } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { useUserLocation } from "../hooks/use-user-location";
import { Flex } from "../../ui-kit/components/flex";

export const CircularMap = ({ mapBoxKey, zoom }) => {
  const { userLocation } = useUserLocation();

  const [width, setWidth] = useState(0);
  const [viewState, setViewState] = React.useState({
    longitude: 0,
    latitude: 0,
    zoom: zoom,
  });

  useEffect(() => {
    setViewState({
      ...viewState,
      zoom: zoom,
    });
  }, [zoom]);

  useEffect(() => {
    if (userLocation) {
      setViewState({
        ...viewState,
        longitude: userLocation.longitude,
        latitude: userLocation.latitude,
      });
    }
  }, [userLocation]);

  return (
    <Flex justifyContent={"center"} width={"100%"} height={"200px"}>
      {userLocation && (
        <ReactMapGL
          {...viewState}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={
            "pk.eyJ1IjoicGVmZiIsImEiOiJja3d3bjQxbmgwNWR4MnZxMWJub25yZXc4In0.OHql2CO2vCja5LzugCaaCg"
          }
          // onViewportChange={setViewport}

          initialViewState={{
            longitude: userLocation?.longitude,
            latitude: userLocation?.latitude,
            zoom: 8,
          }}
          onMove={(evt) => setViewState(evt.viewState)}
          style={{
            borderRadius: "80%",
            width: "50%",
          }}
        >
          <Marker
            latitude={userLocation.latitude}
            longitude={userLocation.longitude}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: "red",
                borderRadius: "50%",
                border: "3px solid white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: "4px",
                  height: "4px",
                  backgroundColor: "black",
                  borderRadius: "50%",
                }}
              />
            </div>
          </Marker>
        </ReactMapGL>
      )}
    </Flex>
  );
};
