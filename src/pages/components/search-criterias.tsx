import React, { useRef, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/router";

import { AppConfig } from "../../app-config";
import { gmapsDetailsUrl } from "../api/google-maps/details/index.endpoint";
import { Spacer } from "../../ui-kit/spacer/spacer";
import { formatDate } from "../utils/convert-date";
import {
  GoogleMapsDetailsData,
  GoogleMapsDetailsResponse,
} from "../api/google-maps/details/mapper/gmaps-details-mapper";
import { ResponseDTO } from "../api/next-api.client";

import { ChooseTravelDistance } from "./choose-travel-distance";
import { ChooseCalendarValue } from "./choose-calendar-value";
import { destructureMyPosition } from "./get-user-location";
import WhereAreYou from "./where-are-you";

const Button = styled.button`
  background-color: #1215fd;
  padding: 0.5rem;
  border: 1px solid white;
  border-radius: 0.375rem;
  width: 12rem;
  cursor: pointer;
  color: white;
  transition: 0.5s ease;
  &:hover {
    background-color: #c7c744;
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
}

export default function UserForm({ header }: UserFormProps) {
  const [highlightedTransport, setHighlightedTransport] = useState("");
  // const [userGeoLocation, setUserGeoLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [townId, setTownId] = useState("");
  const locationRef = useRef<HTMLInputElement>(null);
  const [longitudeLatitude, setLongitudeLatitude] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [travelDistance, setTravelDistance] = useState("0:10");

  const travelItems = ["Walk", "Car", "Bike", "Public Transportation"];

  const router = useRouter();

  // const checkIfTransportAndCalendarValuesAreFilled = () => {
  //   const check = { transport: "check", calendarValue: "check" };

  //   if (!highlightedTransport) {
  //     setUnfilledHighlightedTransport(true);
  //     check.transport = "";
  //   }

  //   if (!selectedDate) {
  //     setUnfilledCalendar(true);
  //     check.calendarValue = "";
  //   }

  //   return check;
  // };

  const fetchTownDetails = async () => {
    const town = await axios
      .get<ResponseDTO<GoogleMapsDetailsResponse>>(
        `${new AppConfig().next.host}${gmapsDetailsUrl}?place_id=${townId}`
      )
      .then((response) => response.data)
      .catch((e) => console.error(e));

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
      return;
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { longitude, latitude } = await fetchTownDetails();
    // const { longitude, latitude } = await fetchTownDetails();
    // // console.log(",,", longitude, latitude);

    // setUnfilledHighlightedTransport(false);
    // const check = checkIfTransportAndCalendarValuesAreFilled();

    // if (check.calendarValue === "" || check.transport === "") return;

    // if (!isLocationChosen) return;

    // const posi = getCurrentPos();

    const params = {
      lon: longitude,
      lat: latitude,
      transport: highlightedTransport,
      date: formatDate(selectedDate),
      travel_time: travelDistance,
    };

    const urlPar = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");

    router.push(`search?${urlPar}`);
    header && header.current.close();
  };

  const sendData = (str: string) => {
    const { longitude, latitude } = destructureMyPosition(str);

    const params = {
      lon: longitude,
      lat: latitude,
      transport: highlightedTransport,
      date: formatDate(selectedDate),
      travel_time: travelDistance,
    };

    const urlPar = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");

    router.push(`search?${urlPar}`);
  };

  return (
    //TODO submit is not triggering
    <FormStyle onSubmit={onSubmit}>
      {header && (
        <WhereAreYou setTownId={setTownId} locationRef={locationRef} />
      )}
      <ChooseCalendarValue
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ChooseTravelDistance
        setTravelDistance={setTravelDistance}
        travelDistance={travelDistance}
      />
      {/* <ChooseTransportationMethod
        highlightedTransport={highlightedTransport}
        setHighlightedTransport={setHighlightedTransport}
        unfilledHighlightedTransport={unfilledHighlightedTransport}
      >
        {travelItems}
      </ChooseTransportationMethod> */}
      <Spacer vertical={1} />
      <div className="flex justify-center">
        <Button>Find the sun</Button>
      </div>
    </FormStyle>
  );
}
