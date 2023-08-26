import React, { useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/router";

import { AppConfig } from "../../app-config";
import { gmapsDetailsUrl } from "../api/google-maps/details/index.endpoint";
import { Spacer } from "../../ui-kit/spacer/spacer";
import { formatDate } from "../utils/convert-date";
import { GoogleMapsDetailsResponse } from "../api/google-maps/details/mapper/gmaps-details-mapper";
import { ResponseDTO } from "../api/next-api.client";
import { PayloadParams } from "../api/azure-function/coordinates/coordinates-api-client/coordinates-api.post-schema";
import { destructureMyPosition } from "../utils/get-user-location";

import { ChooseTravelDistance } from "./choose-travel-distance";
import { ChooseCalendarValue } from "./choose-calendar-value";
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

  const fetchTownDetails = async () => {
    const town = await axios
      .get<ResponseDTO<GoogleMapsDetailsResponse>>(
        `${new AppConfig().next.host}${gmapsDetailsUrl}?place_id=${townId}`
      )
      .then((response) => response.data)
      .catch((e) => {
        setError(true);
        console.error(e);
      });

    if (!town) return;

    return {
      latitude: town.data.latitude,
      longitude: town.data.longitude,
    };
  };

  const getCurrentPos = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;
      const str = `lat=${crd.latitude}&lon=${crd.longitude}`;
      sendData(str);
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
      setError(true);
      return;
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!header) {
      getCurrentPos();
      return;
    }
    const { longitude, latitude } = await fetchTownDetails();
    // const { longitude, latitude } = await fetchTownDetails();
    // // console.log(",,", longitude, latitude);

    // setUnfilledHighlightedTransport(false);
    // const check = checkIfTransportAndCalendarValuesAreFilled();

    // if (check.calendarValue === "" || check.transport === "") return;

    const params: PayloadParams = {
      lon: longitude,
      lat: latitude,
      date: formatDate(selectedDate),
      distance: travelDistance.toString(),
    };

    const urlPar = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");

    router.push(`search?${urlPar}`);
    header.current.close();
  };

  const sendData = (str: string) => {
    const { longitude, latitude } = destructureMyPosition(str);

    const params = {
      lon: longitude,
      lat: latitude,
      date: formatDate(selectedDate),
      distance: travelDistance,
    };

    const urlPar = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");

    router.push(`search?${urlPar}`);
  };

  const disableButton = !isHomePage ? false : !sunSelected;

  return (
    //TODO submit is not triggering
    <>
      <FormStyle onSubmit={onSubmit}>
        {header && (
          <WhereAreYou setTownId={setTownId} locationRef={locationRef} />
        )}
        <ChooseCalendarValue
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
