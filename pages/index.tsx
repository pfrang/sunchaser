import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'
import styles from '../styles/Home.module.css'



const Home: NextPage = () => {

  const [townSearch, setTownSearch] = useState('')

  const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  `

  console.log(townSearch);


  const handleSubmit = (e) => {
    e.preventDefault()

    console.log(e.target);

  }
  return (
    <Wrapper>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Walk</label>
          <input type="radio" name="choice" id="" />
          <label>Car</label>
          <input type="radio" name="choice" id="" />
          <label>Offentlig transport</label>
          <input type="radio" name="choice" id="" />
          <label>Boat</label>
          <input type="radio" name="choice" id="" />
        </div>

        <input onChange={(e) => setTownSearch(e.target.value)} type="text" name="" id="" value={townSearch}/>

        <input type="submit" value="Submit" />
      </form>
    </Wrapper>
  )
}

export default Home
