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
  padding: 0px 0px;
`;

const Wrapper2 = styled.div`
  margin-top: 100px;
  margin-bottom: 200px;
  margin-left: 200px;
  margin-right: 200px;
`;

const Home: NextPage = () => {
  return (
    <Wrapper>
      <HeaderComponent />
      <Wrapper2>
        <SearchCriterias />
      </Wrapper2>
    </Wrapper>
  );
};

export default Home;
