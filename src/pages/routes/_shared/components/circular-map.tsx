import React, { useEffect, useRef, useState } from "react";
import * as turf from "@turf/turf";
import ReactMapGL, { Layer, MapRef, Marker, Source } from "react-map-gl";
import { useRouter } from "next/router";

import { useUserLocation } from "../../../hooks/use-user-location";
import { Flex } from "../../../../ui-kit/flex";
import {
  getBoundingBox,
  getBoundingBoxLngLatLike,
} from "../../../utils/get-boundaries-lng-lat";
import { sanitizeNextQuery } from "../../../utils/sanitize-next-query";

export const CircularMap = ({ mapBoxKey, kilometers }) => {
  const { userLocation } = useUserLocation();
  const mapRef = useRef<MapRef>();

  const router = useRouter();

  const { lat, lon } = sanitizeNextQuery(router.query);

  const [polygon, setPolygon] = useState<null | turf.helpers.Feature<
    turf.helpers.Polygon,
    {
      [name: string]: any;
    }
  >>(null);

  const currentLatLocation = React.useMemo(() => {
    return { latitude: Number(lat), longitude: Number(lon) } || userLocation;
  }, [lat, lon, userLocation]);

  useEffect(() => {
    if (!currentLatLocation) return;

    const { sw, ne } = getBoundingBox(currentLatLocation, kilometers);

    setPolygon(
      turf.circle(
        [currentLatLocation.longitude, currentLatLocation.latitude],
        kilometers,
        {
          units: "kilometers",
        },
      ),
    );

    mapRef.current?.fitBounds(
      [
        [sw.longitude, sw.latitude],
        [ne.longitude, ne.latitude],
      ],
      { padding: 20, duration: 1000 },
    );
  }, [kilometers, currentLatLocation]);

  const disableInteractivitySettings = {
    dragPan: false,
    dragRotate: false,
    scrollZoom: false,
    touchZoom: false,
    touchRotate: false,
    keyboard: false,
    doubleClickZoom: false,
  };

  return (
    <Flex justifyContent={"center"} alignItems={"center"} height={"100%"}>
      {userLocation && (
        <ReactMapGL
          ref={mapRef}
          initialViewState={{
            longitude: userLocation.longitude,
            latitude: userLocation.latitude,
            bounds: getBoundingBoxLngLatLike(currentLatLocation, kilometers),
            fitBoundsOptions: {
              padding: 20,
            },
          }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={mapBoxKey}
          // onMove={(evt) => setViewState(evt.viewState)}
          {...disableInteractivitySettings}
          style={{
            borderRadius: "5%",
          }}
        >
          <Marker
            latitude={currentLatLocation.latitude}
            longitude={currentLatLocation.longitude}
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
          {polygon && (
            <Source id="geofence" type="geojson" data={polygon}>
              <Layer
                id="geofence"
                type="fill"
                paint={{
                  "fill-color": "#007cbf",
                  "fill-opacity": 0.2,
                }}
              />
            </Source>
          )}
        </ReactMapGL>
      )}
    </Flex>
  );
};