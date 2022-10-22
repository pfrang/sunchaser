import React from "react";
import styled from "styled-components";
import Image from "next/image";

const DivItem = styled.div`
  background-color: #f0efef;
  padding: 10px;
  cursor: pointer;
  transition: 0.5s ease;
  &:hover {
    background-color: #dedddd;
  }
`;

const HighlightedDivItem = styled.div`
  background-color: #70b67f;
  padding: 10px;
  cursor: pointer;
`;

interface ChooseTransportationMethodProps {}

export default function ChooseTransportationMethod({
  highlightedTransport,
  setHighlightedTransport,
  unfilledHighlightedTransport,
  children,
}) {
  return (
    <section id="how_can_you_travel">
      <div className="">
        <label>How can you travel?</label>
        <Image
          width={20}
          height={20}
          src={"/icons/transportation-methods/Bike.png"}
        />
        <div className="flex">
          {children.map((item, i) => {
            return highlightedTransport === item ? (
              <HighlightedDivItem key={i}>
                <h3>{item}</h3>
              </HighlightedDivItem>
            ) : (
              <DivItem key={i} onClick={(e) => setHighlightedTransport(item)}>
                <h3>{item}</h3>
              </DivItem>
            );
          })}
        </div>
        {unfilledHighlightedTransport && (
          <p className="text-md text-red-500 text-center">
            Please choose a transportation method
          </p>
        )}
      </div>
    </section>
  );
}
