import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Geolocation } from "@capacitor/geolocation";

import { Spacer } from "../../ui-kit/spacer/spacer";
import { formatDate } from "../utils/convert-date";
import { PayloadParams } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api.post-schema";
import { fetchTownDetails } from "../hooks/fetch-town-details";
import { useUserLocation } from "../hooks/use-user-location";

import { ChooseTravelDistance } from "./choose-travel-distance";
import { Calendar } from "./calendar";
import WhereAreYou from "./where-are-you";
import { WeatherOptions } from "./weather-carousell";
import { CircularMap } from "./circular-map";

const Button = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.disabled ? "gray" : "#1215fd")};
  padding: 0.5rem;
  border: 1px solid white;
  border-radius: 0.375rem;
  width: 12rem;
  cursor: pointer;
  color: white;
  transition: 0.5s ease;
  &:hover {
    background-color: ${(props) => (props.disabled ? null : "#c7c744")};
  }
`;

export const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 16px;
`;

interface UserFormProps {
  header?: React.MutableRefObject<HTMLDialogElement>;
  weatherSelected?: WeatherOptions;
  isHomePage?: boolean;
  mapBoxKey?: string;
}

export default function UserForm({
  header,
  weatherSelected,
  isHomePage,
  mapBoxKey,
}: UserFormProps) {
  // const [userGeoLocation, setUserGeoLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const { userLocation } = useUserLocation();

  const [error, setError] = useState(false);
  const [townId, setTownId] = useState("");
  const locationRef = useRef<HTMLInputElement>(null);

  const [travelDistance, setTravelDistance] = useState<number | undefined>(
    undefined
  );

  const router = useRouter();

  const sunSelected = weatherSelected === "Sun";

  const onSubmit = async (e) => {
    e.preventDefault();
    let longitudeInput;
    let latitudeInput;

    if (!header) {
      latitudeInput = userLocation.latitude;
      longitudeInput = userLocation.longitude;
    } else {
      let townDetails;
      try {
        townDetails = await fetchTownDetails(townId);
      } catch (e) {
        setError(true);
      }

      if (!townDetails) return;
      longitudeInput = townDetails.longitude;
      latitudeInput = townDetails.latitude;
    }

    const params: PayloadParams = {
      lon: String(longitudeInput),
      lat: String(latitudeInput),
      date: formatDate(selectedDate),
      distance: travelDistance.toString(),
    };

    const urlPar = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");

    router.push(`search?${urlPar}`);
    header?.current.close();
  };

  const disableButton = !isHomePage ? false : !sunSelected;

  return (
    //TODO submit is not triggering
    <>
      <FormStyle onSubmit={onSubmit}>
        {header && (
          <WhereAreYou setTownId={setTownId} locationRef={locationRef} />
        )}
        <Calendar
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        {/* <CircularMap mapBoxKey={mapBoxKey} /> */}
        <ChooseTravelDistance
          setTravelDistance={setTravelDistance}
          mapBoxKey={mapBoxKey}
        />
        {/* <ChooseTransportationMethod
        highlightedTransport={highlightedTransport}
        setHighlightedTransport={setHighlightedTransport}
        unfilledHighlightedTransport={unfilledHighlightedTransport}
      >
        {travelItems}
      </ChooseTransportationMethod> */}
        <Spacer paddingTop={3} />
        <Button disabled={disableButton}>Find the sun</Button>
      </FormStyle>
      {error && (
        <div className="flex justify-center">
          <p>Something went wrong</p>
        </div>
      )}
    </>
  );
}
