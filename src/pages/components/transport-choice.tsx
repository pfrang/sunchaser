import React from "react";
import styled from "styled-components";

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

export default function TransportChoice(props) {
  return (
    <>
      {props.highlightedTransport === props.item ? (
        <HighlightedDivItem>
          <h3>{props.item}</h3>
        </HighlightedDivItem>
      ) : (
        <DivItem onClick={(e) => props.setHighlightedTransport(props.item)}>
          <h3>{props.item}</h3>
        </DivItem>
      )}
    </>
  );
}
