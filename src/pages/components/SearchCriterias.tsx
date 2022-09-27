import React, { useEffect, useState } from 'react'
import { Calendar } from 'react-calendar'
import styled from 'styled-components'
import TransportChoice from './TransportChoice'
import 'react-calendar/dist/Calendar.css';

import { useRouter } from 'next/router';
import WhereAreYou from './where-are-you/whereAreYou';

const Wrapper2 = styled.div`
  margin: 50px;
  margin-left: 100px;
  margin-right: 100px;
`

const FormStyle = styled.form`
  display: flex;
  flex-direction: column;
  gap: 50px;
  justify-content: center;
  align-items: center;
  border: 2px solid green;
  background-color: #4a804a;
  box-shadow: 0px 2px 1px;
`

export default function SearchCriterias() {

  const [townSearch, setTownSearch] = useState('');
  const [highlightedTransport, setHighlightedTransport] = useState('');
  const [unfilledHighlightedTransport, setUnfilledHighlightedTransport] = useState(false);
  const [isLocationChosen, setLocationChosen] = useState(false);
  const [calendarValue, setCalendarValue] = useState(undefined);
  const [invalidCalendarValue, setInvalidCalendarValue] = useState(false);
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');

  const travelItems = ["Walk", "Car", "Boat", "Public Transport"]

  const router = useRouter();

  // const { data, isLoading, error } = useGMapsAutoSearch(townSearch);

  useEffect(() => {
    setCalendarValue(new Date());
  }, []);


  const checkIfTransportAndCalendarValuesAreFilled = () => {
    const check = { transport: "check", calendarValue: "check" }

    if (!highlightedTransport) {
      setUnfilledHighlightedTransport(true);
      check.transport = "";
    }

    const today = new Date()

    if (calendarValue.getDate() < today.getDate()) {
      setInvalidCalendarValue(true);
      check.calendarValue = "";
    }

    return check
  }

  const onSubmit = (e) => {
    setInvalidCalendarValue(false);
    setUnfilledHighlightedTransport(false);
    e.preventDefault();
    const params = {
      town: townSearch,
      transport: highlightedTransport,
      date: new Date(calendarValue).toISOString().split("T")[0],
      hrs: hours,
      mins: minutes
    }

    const check = checkIfTransportAndCalendarValuesAreFilled();

    if (check.calendarValue === "" || check.transport === "") return;


    const urlPar = Object.keys(params).map(key => key + "=" + params[key]).join("&");

    router.push(`search?${urlPar}`);
  }

  return (
    <Wrapper2>
      <FormStyle onSubmit={onSubmit}>
        <section id="where_are_you_seciton">
          <WhereAreYou isLocationChosen={isLocationChosen} setLocationChosen={setLocationChosen} townSearch={townSearch} setTownSearch={setTownSearch}/>
        </section>
        <section id="how_can_you_travel">
          <div className=''>
            <h3>How can you travel?</h3>
            <div className='flex'>
              {travelItems.map((item, i) => {
                return <TransportChoice highlightedTransport={highlightedTransport} setHighlightedTransport={setHighlightedTransport} key={i} item={item} />
              })}
            </div>
            {unfilledHighlightedTransport && <p className='text-md text-red-500 text-center'>Please choose a transportation method</p>}
          </div>
        </section>
        <section id="distance_traveling">
          <div>
            <h3>For how far are you willing to travel with your desired way of transportation</h3>
            <div className='flex justify-between'>
              <div className='flex flex-col'>
                <label htmlFor='hrs'>Hours</label>
                <input onChange={(e) => setHours(e.target.value)} className='border-2' type="number" required name="hrs" id="" />
              </div>
              <div className='flex flex-col'>
                <label htmlFor='mns'>Minutes</label>
                <input onChange={(e) => setMinutes(e.target.value)} max="60" className='border-2' type="number" required name="mns" id="" />
              </div>
            </div>
          </div>
        </section>
        <section id="calendar">
          <div>
            {invalidCalendarValue && <p className='text-md text-red-500 text-center'>Cannot pick a date earlier than today</p>}
            {calendarValue && <Calendar onChange={setCalendarValue} value={calendarValue} />}
          </div>
        </section>
        <section className='submit'>
          <div>
            <button className='border-2 bg-[#70b67f] p-2 w-48'>Submit</button>
          </div>
        </section>
      </FormStyle>
    </Wrapper2 >
  )
}
