import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";

import { Spacer } from "../ui-kit/spacer/spacer";
import { theme } from "../ui-kit/theme/theme";

import SearchCriterias from "./components/search-criterias";

// const Wrapper = styled.div`
//   width: 100%;
//   display: grid;
//   grid-template-columns: repeat(12, 1fr);
//   grid-column-gap: 1em;
//   grid-row-gap: 1em;
//   @media screen and (max-width: 1100px) {
//     display: flex;
//     justify-content: center;
//     margin: auto;
//   }
//   /* @media screen and (max-width: 900px) {
//     grid-template-columns: repeat(7, 1fr);
//   }
//   @media screen and (max-width: 700px) {
//     grid-template-columns: repeat(6, 1fr);
//   }
//   @media screen and (max-width: 500px) {
//     grid-template-columns: repeat(2, 1fr);
//   } */
// `;

const Container = styled.div`
  /* background-color: #71ab71; */
  overflow: hidden;
  margin: 0px auto;
  /* background-color: ${theme.white}; */
`;
const TwoGridHorizontalContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
  height: 100%;
  border-radius: 100px;
  position: relative;
  overflow: hidden;
  border: 2px solid ${theme.lightGrey};
  background-color: ${theme.darkBlue};
`;

const Home: NextPage = () => {
  return (
    <TwoGridHorizontalContainer>
      <div className="relative rounded-[inherit] overflow-hidden">
        <Image
          className=""
          src={"/photo-and-layout/sun.png"}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <Container>
        <SearchCriterias />
      </Container>
    </TwoGridHorizontalContainer>
  );
};

export default Home;
