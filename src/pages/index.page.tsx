import type { NextPage } from "next";
import styled from "styled-components";

import HeaderComponent from "./components/header";
import SearchCriterias from "./components/search-criterias";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  max-height: 100vh;
`;

const Spacer = styled.div`
  display: block;
  margin-top: 100px;
`;

const Container = styled.div`
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
      <HeaderComponent />
      <Spacer />
      <Container>
        <FormWrapper>
          <SearchCriterias />
        </FormWrapper>
      </Container>
      <Spacer />
    </Wrapper>
  );
};

export default Home;
