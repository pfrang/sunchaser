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

const SearchWrapper = styled.div`
  margin-left: 100px;
  margin-right: 500px;
  overflow: auto;
`;

const Home: NextPage = () => {
  return (
    <Wrapper>
      <HeaderComponent />
      <Spacer />
      <SearchWrapper>
        <SearchCriterias />
      </SearchWrapper>
      <Spacer />
    </Wrapper>
  );
};

export default Home;
