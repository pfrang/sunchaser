import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import styles from '../styles/Home.module.css'
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

// function success(pos) {
//   const crd = pos.coords;

//   console.log('Your current position is:');
//   console.log(`Latitude : ${crd.latitude}`);
//   console.log(`Longitude: ${crd.longitude}`);
//   console.log(`More or less ${crd.accuracy} meters.`);
// }

// function error(err) {
//   console.warn(`ERROR(${err.code}): ${err.message}`);
// }

// navigator.geolocation.getCurrentPosition(success, error, options);

const Home: NextPage = () => {

  return (
    <Wrapper>
      <HeaderComponent />
      <SearchCriterias />
    </Wrapper>
  )
}

export default Home
