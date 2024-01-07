import React from "react";
import styled from "styled-components";
import Image from "next/image";

import { Spacer } from "../../../../ui-kit/spacer/spacer";

const DivItem = styled.div`
  position: relative;
  /* background-color: #f0efef; */
  padding: 30px;
  cursor: pointer;
  transition: 0.5s ease;
  &:hover {
    background-color: #dedddd;
  }
`;

const HighlightedDivItem = styled.div`
  position: relative;
  background-color: #dedddd;
  padding: 30px;
  cursor: pointer;
`;

export default function ChooseTransportationMethod({
  highlightedTransport,
  setHighlightedTransport,
  unfilledHighlightedTransport,
  children,
}) {
  return (
    <section id="how_can_you_travel">
      <label>How do you travel?</label>
      {unfilledHighlightedTransport && (
        <p className="text-md text-red-500 font-bold">
          Please choose a transportation method
        </p>
      )}
      <Spacer vertical={2} />
      <div className="flex">
        {children.map((item, i) => {
          return highlightedTransport === item ? (
            <HighlightedDivItem key={i}>
              <Image
                src={`/transportation/${item}.png`}
                fill
                alt="highlighted transportation method"
              />
            </HighlightedDivItem>
          ) : (
            <DivItem key={i} onClick={() => setHighlightedTransport(item)}>
              <Image
                src={`/transportation/${item}.png`}
                fill
                alt="highlighted transportation method"
              />
            </DivItem>
          );
        })}
      </div>
    </section>
  );
}
