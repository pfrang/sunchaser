import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

import { useDisplayDrawer } from "../../../../states/drawer";
import { useUserLocation } from "../../../hooks/use-user-location";
import { fetchTownDetails } from "../../../hooks/fetch-town-details";
import { createPayloadParams } from "../../../utils/create-payload-params";
import { Spacer } from "../../../../ui-kit/spacer/spacer";
import { Calendar } from "../../sunchaser/components/calendar";

import { ChooseTravelDistance } from "./choose-travel-distance";
import { WhereAreYou } from "./where-are-you";
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
  gap: 6px;
  align-items: center;
  height: 100%;
  padding: 16px;
`;

interface UserFormProps {
  header?: React.MutableRefObject<HTMLDialogElement>;
  weatherSelected?: WeatherOptions;
  mapBoxKey?: string;
}

export default function UserForm({
  header,
  weatherSelected,
  mapBoxKey,
}: UserFormProps) {
  const { setOpenDrawer } = useDisplayDrawer();
  const router = useRouter();

  const { userLocation } = useUserLocation();
  const isHomePage = router.pathname === "/";

  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(),
  );

  const [error, setError] = useState(false);
  const [townId, setTownId] = useState("");
  const locationRef = useRef<HTMLInputElement>(null);
  const travelDistanceRef = useRef<HTMLInputElement>(null);

  const sunSelected = weatherSelected === "Sun";

  const onSubmit = async (e) => {
    e.preventDefault();
    let longitudeInput;
    let latitudeInput;
    const travelDistance = Number(
      travelDistanceRef?.current?.querySelector(".MuiSlider-valueLabelLabel")
        .innerHTML,
    );

    if (isHomePage) {
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

    const payloadParams = createPayloadParams({
      longitude: longitudeInput,
      latitude: latitudeInput,
      date: selectedDate,
      travelDistance,
      townSearch: locationRef?.current?.value || "",
    });

    const urlPar = Object.keys(payloadParams)
      .map((key) => key + "=" + payloadParams[key])
      .join("&");

    router.push(`search?${urlPar}`, undefined, {
      shallow: false,
    });

    setOpenDrawer(false);
  };

  const disableButton = !isHomePage ? false : !sunSelected;

  return (
    <>
      <FormStyle onSubmit={onSubmit}>
        {!isHomePage && <WhereAreYou />}
        <Calendar />
        {/* <DatePicker
          selected={selectedDate}
          isDateBlocked={(date) => date < startOfToday()}
          onSelect={setSelectedDate}
          onChange={setSelectedDate}
          label="When do you want to travel?"
        /> */}
        {/* <CircularMap mapBoxKey={mapBoxKey} /> */}
        <ChooseTravelDistance mapBoxKey={mapBoxKey} />
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