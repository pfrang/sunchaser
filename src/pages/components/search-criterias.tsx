import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/router";

import { AppConfig } from "../../app-config";
import { gmapsDetailsUrl } from "../api/google-maps/details/index.endpoint";
import { Spacer } from "../../ui-kit/spacer";

import WhereAreYou from "./where-are-you";
import ChooseTransportationMethod from "./choose-transportation-method";
import { ChooseTravelDistance } from "./choose-travel-distance";
import { ChooseCalendarValue } from "./choose-calendar-value";

const FormStyle = styled.form`
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: center;
`;

export default function SearchCriterias() {
  const [townSearch, setTownSearch] = useState("");
  const [townId, setTownId] = useState("");
  const [highlightedTransport, setHighlightedTransport] = useState("");
  const [unfilledHighlightedTransport, setUnfilledHighlightedTransport] =
    useState(false);
  const [isLocationChosen, setLocationChosen] = useState(false);
  const [userGeoLocation, setUserGeoLocation] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [invalidCalendarValue, setInvalidCalendarValue] = useState(false);
  const [travelDistance, setTravelDistance] = useState("0:10");

  const travelItems = ["Walk", "Car", "Bike", "Public Transport"];

  const router = useRouter();

  const checkIfTransportAndCalendarValuesAreFilled = () => {
    const check = { transport: "check", calendarValue: "check" };

    if (!highlightedTransport) {
      setUnfilledHighlightedTransport(true);
      check.transport = "";
    }

    const todayAtDayChange = new Date().setHours(0, 0, 0, 0);

    if (Number(selectedDate) < todayAtDayChange) {
      setInvalidCalendarValue(true);
      check.calendarValue = "";
    }

    return check;
  };

  const fetchTownDetails = async () => {
    const town = await axios
      .get(`${new AppConfig().next.host}${gmapsDetailsUrl}?place_id=${townId}`)
      .then((response) => response.data)
      .catch((e) => console.error(e));
    return {
      latitude: town.response.latitude,
      longitude: town.response.longitude,
    };
  };

  const destructureMyPosition = () => {
    return {
      latitude: userGeoLocation.split("&")[0].split("=")[1],
      longitude: userGeoLocation.split("&")[1].split("=")[1],
    };
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setInvalidCalendarValue(false);
    setUnfilledHighlightedTransport(false);

    const check = checkIfTransportAndCalendarValuesAreFilled();

    if (check.calendarValue === "" || check.transport === "") return;

    if (!isLocationChosen) return;

    const { latitude, longitude } = userGeoLocation
      ? destructureMyPosition()
      : await fetchTownDetails();

    const params = {
      lon: longitude,
      lat: latitude,
      transport: highlightedTransport,
      date: new Date(selectedDate).toISOString().split("T")[0],
      travel_time: travelDistance,
    };

    const urlPar = Object.keys(params)
      .map((key) => key + "=" + params[key])
      .join("&");

    router.push(`search?${urlPar}`);
  };

  return (
    <FormStyle onSubmit={onSubmit}>
      <WhereAreYou
        setTownId={setTownId}
        setUserGeoLocation={setUserGeoLocation}
        isLocationChosen={isLocationChosen}
        setLocationChosen={setLocationChosen}
        townSearch={townSearch}
        setTownSearch={setTownSearch}
      />
      <ChooseCalendarValue
        invalidCalendarValue={invalidCalendarValue}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <ChooseTravelDistance
        setTravelDistance={setTravelDistance}
        travelDistance={travelDistance}
      />
      <ChooseTransportationMethod
        highlightedTransport={highlightedTransport}
        setHighlightedTransport={setHighlightedTransport}
        unfilledHighlightedTransport={unfilledHighlightedTransport}
      >
        {travelItems}
      </ChooseTransportationMethod>
      <Spacer paddingY={2} />
      <section className="submit">
        <div>
          <button className="border-2 bg-[#70b67f] p-2 w-48">Submit</button>
        </div>
      </section>
    </FormStyle>
  );
}
