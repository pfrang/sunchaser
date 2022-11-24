import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";

import { Spacer } from "../ui-kit/spacer/spacer";

import SearchCriterias from "./components/search-criterias";

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-column-gap: 1em;
  grid-row-gap: 1em;
  @media screen and (max-width: 1100px) {
    display: flex;
    justify-content: center;
    margin: auto;
  }
  /* @media screen and (max-width: 900px) {
    grid-template-columns: repeat(7, 1fr);
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(6, 1fr);
  }
  @media screen and (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  } */
`;

const ContentWrapper = styled.div`
  height: calc(100% - 60px);
  position: relative;
  grid-column: span 4;
`;

const Container = styled.div`
  opacity: 0.9;
  margin-left: 100px;
  background-color: #71ab71;
  border-radius: 20px;
  border: 2px solid #71ab71;
  box-shadow: 0px 2px 10px;
  overflow: auto;
  @media screen and (max-width: 1100px) {
    margin-left: 0px;
  }
`;

const FormWrapper = styled.div``;

const Home: NextPage = () => {
  return (
    <Wrapper>
      {/* <Wrapper> */}
      <Image
        className="z-[-1]"
        src={"/background.jpg"}
        layout="fill"
        objectFit="cover"
      />
      <ContentWrapper>
        <Spacer vertical={5} />
        <Container>
          <FormWrapper>
            <SearchCriterias />
          </FormWrapper>
        </Container>
      </ContentWrapper>
    </Wrapper>
  );
};

export default Home;
