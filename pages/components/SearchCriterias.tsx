import React, { useState } from 'react'
import { Calendar } from 'react-calendar'
import styled from 'styled-components'
import TransportChoice from './TransportChoice'
import 'react-calendar/dist/Calendar.css';

const Wrapper2 = styled.div`
display: flex;
flex-direction: column;
gap: 50px;
justify-content: center;
align-items: center;
margin: 200px;
border: 2px solid green;
background-color: green
box-shadow: 0px 2px 1px;
`

export default function SearchCriterias() {

  const [transport, setTransport] = useState('')
  const [townSearch, setTownSearch] = useState('')
  const [highlightedTransport, setHighlightedTransport] = useState('')
  const [calendarValue, setCalendarValue] = useState(new Date())

  const travelItems = ["Walk", "Car", "Boat", "Public Transport"]
  const timeValues = ["Hours", "Minutes"]

  const onClick = () => {

  }

  console.log(calendarValue);

  return (
    <Wrapper2>
      <div>
        <h3>Where are you?</h3>
        <input className='border-2 h-10 text-xl' placeholder='Location' key={'inputBox'} onChange={(e) => setTownSearch(e.target.value)} type="text" name="" id="" value={townSearch} />
      </div>
      <div className=''>
        <h3>How can you travel?</h3>
        <div className='flex'>
          {travelItems.map((item, i) => {
            return <TransportChoice highlightedTransport={highlightedTransport} setHighlightedTransport={setHighlightedTransport} key={i} item={item} />
          })}
        </div>
      </div>
      <div>
        <h3>For how far are you willing to travel with your desired way of transportation</h3>
        <div className='flex justify-between'>
          {timeValues.map((item, i) => {
              return (
                <div key={item + i} className='flex flex-col'>
                  <label htmlFor='hrs'>{item}</label>
                  <input className='border-2' type="number" name={item} id="" />
                </div>
              )
          })}

        </div>
      </div>
      <Calendar onChange={setCalendarValue} value={calendarValue} />
      <div>
        <button className='border-2 bg-[#70b67f] p-2 w-48' onClick={onClick}>Submit</button>
      </div>
    </Wrapper2>
  )
}
