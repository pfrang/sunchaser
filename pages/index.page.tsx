import type { NextPage } from 'next'
import styled from 'styled-components'
import HeaderComponent from './components/Header'
import SearchCriterias from './components/SearchCriterias'

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  max-height: 100vh;
  `
const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

const Home: NextPage = () => {
  return (
    <Wrapper>
      <HeaderComponent />
      <SearchCriterias />
    </Wrapper>
  )
}

export default Home
