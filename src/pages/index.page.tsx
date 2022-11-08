import type { NextPage } from "next";
import Image from "next/image";
import styled from "styled-components";

import { AppConfig } from "../app-config";
import { Spacer } from "../ui-kit/spacer/spacer";

import { CoordinatesMapper } from "./api/azure-function/coordinates/mapper/coordinates-mapper";
import HeaderComponent from "./components/header";
import SearchCriterias from "./components/search-criterias";

const Wrapper = styled.div`
  height: 100%;
`;

const ContentWrapper = styled.div`
  height: calc(100% - 60px);
  position: relative;
`;

const Container = styled.div`
  opacity: 0.9;
  margin-left: 100px;
  background-color: #71ab71;
  border-radius: 20px;
  border: 2px solid #71ab71;
  box-shadow: 0px 2px 10px;
  margin-right: 500px;
  overflow: auto;
`;

const FormWrapper = styled.div`
  width: 400px;
`;

const Home: NextPage = () => {
  return (
    <Wrapper>
      {/* <Wrapper> */}
      <ContentWrapper>
        <Image
          className="z-[-1]"
          src={"/background.jpg"}
          layout="fill"
          objectFit="cover"
        />
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
