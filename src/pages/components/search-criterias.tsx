import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/router";

import { AppConfig } from "../../app-config";
import { gmapsDetailsUrl } from "../api/google-maps/details/index.endpoint";
import { Spacer } from "../../ui-kit/spacer/spacer";
import { formatDate } from "../utils/convert-date";

import { ChooseTravelDistance } from "./choose-travel-distance";
import { ChooseCalendarValue } from "./choose-calendar-value";
import { destructureMyPosition } from "./get-user-location";

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

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  padding: 16px;
`;

export default function SearchCriterias() {
  const [highlightedTransport, setHighlightedTransport] = useState("");
  const [unfilledHighlightedTransport, setUnfilledHighlightedTransport] =
    useState(false);

  const [unfilledCalendar, setUnfilledCalendar] = useState(false);
  // const [userGeoLocation, setUserGeoLocation] = useState(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
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

  // const fetchTownDetails = async () => {
  //   const town = await axios
  //     .get(`${new AppConfig().next.host}${gmapsDetailsUrl}?place_id=${townId}`)
  //     .then((response) => response.data)
  //     .catch((e) => console.error(e));
  //   return {
  //     latitude: town.response.latitude,
  //     longitude: town.response.longitude,
  //   };
  // };

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

    // setUnfilledHighlightedTransport(false);
    // const check = checkIfTransportAndCalendarValuesAreFilled();

    // if (check.calendarValue === "" || check.transport === "") return;

    // if (!isLocationChosen) return;

    const posi = getCurrentPos();
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
      {/* <WhereAreYou
        setTownId={setTownId}
        setUserGeoLocation={setUserGeoLocation}
        isLocationChosen={isLocationChosen}
        setLocationChosen={setLocationChosen}
        townSearch={townSearch}
        setTownSearch={setTownSearch}
      /> */}
      <ChooseCalendarValue
        unfilledCalendar={unfilledCalendar}
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
