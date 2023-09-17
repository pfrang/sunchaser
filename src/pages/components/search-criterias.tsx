import React, { useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/router";
import { Geolocation } from "@capacitor/geolocation";

import { AppConfig } from "../../app-config";
import { gmapsDetailsUrl } from "../api/google-maps/details/index.endpoint";
import { Spacer } from "../../ui-kit/spacer/spacer";
import { formatDate } from "../utils/convert-date";
import { GoogleMapsDetailsResponse } from "../api/google-maps/details/mapper/gmaps-details-mapper";
import { ResponseDTO } from "../api/next-api.client";
import { PayloadParams } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api.post-schema";
import { destructureMyPosition } from "../utils/get-user-location";
import { fetchTownDetails } from "../hooks/fetch-town-details";

import { ChooseTravelDistance } from "./choose-travel-distance";
import { Calendar } from "./calendar";
import WhereAreYou from "./where-are-you";
import { WeatherOptions } from "./weather-carousell";

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
}

export default function UserForm({
  header,
  weatherSelected,
  isHomePage,
}: UserFormProps) {
  // const [userGeoLocation, setUserGeoLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );

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
      const position = await Geolocation.getCurrentPosition();
      const { latitude, longitude } = position.coords;
      latitudeInput = latitude;
      longitudeInput = longitude;
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
        <ChooseTravelDistance setTravelDistance={setTravelDistance} />
        {/* <ChooseTransportationMethod
        highlightedTransport={highlightedTransport}
        setHighlightedTransport={setHighlightedTransport}
        unfilledHighlightedTransport={unfilledHighlightedTransport}
      >
        {travelItems}
      </ChooseTransportationMethod> */}
        <Spacer vertical={1} />
        <div className="flex justify-center">
          <Button disabled={disableButton}>Find the sun</Button>
        </div>
      </FormStyle>
      {error && (
        <div className="flex justify-center">
          <p>Something went wrong</p>
        </div>
      )}
    </>
  );
}
