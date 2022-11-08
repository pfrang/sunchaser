import React from "react";
import styled from "styled-components";

const Header = styled.header`
  display: flex;
  width: 100%;
  height: 64px;
  border-bottom: 2px solid green;
  justify-content: center;
  padding: 20px;
`;

export default function HeaderComponent() {
  return (
    <Header>
      <h3 className="text-xl">Chase the sun with sunchaser! 🌞😎</h3>
    </Header>
  );
}
