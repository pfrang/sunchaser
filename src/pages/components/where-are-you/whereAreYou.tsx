import React, { useEffect, useState } from 'react'
import useSWR from 'swr'
import { Spinner } from '../../../ui-kit/spinner/spinner'
import { fetcher } from '../../api/common-swr-fetcher-with-params'
import { gmapsAutoSearchUrl } from '../../api/google-maps/auto-search/index.endpoint'
import { GoogleMapsAutoSearchMappedData } from '../../api/google-maps/auto-search/mapper/gmaps-auto-search-mapper'

export default function WhereAreYou(props) {


  const { isLocationChosen, townSearch, setTownSearch, setLocationChosen } = props
  const [geoLocationSearchItems, setGeoLocationSearchItems] = useState([])

  const [isGeoLocationLoading, setIsGeoLocationLoading] = useState(false);
  const [allowedGeoLocation, setAllowedGeoLocation] = useState(false);


  const { data, error } = useSWR(townSearch ? [gmapsAutoSearchUrl, { input: townSearch }] : null, fetcher)

  useEffect(() => {
    if (!townSearch) return
    if (!data && !error) {
      setIsGeoLocationLoading(true)
      return
    }
    setIsGeoLocationLoading(false);
    setGeoLocationSearchItems(data.items);

  }, [data, error, townSearch])

  const getCurrentPos = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    };

    function success(pos) {
      const crd = pos.coords;
      console.log('Your current position is:');
      console.log(`Latitude : ${crd.latitude}`);
      console.log(`Longitude: ${crd.longitude}`);
      console.log(`More or less ${crd.accuracy} meters.`);

      setAllowedGeoLocation(true)

      return crd
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  }


  const onGetUserLocation = async () => {
    const pos = getCurrentPos();
    setLocationChosen(true);
  }

  const setLocationAndClearList = (value) => {
    setTownSearch(value)
    setLocationChosen(true);
    setGeoLocationSearchItems([])
  }

  const onSearchChange = (e) => {
    setTownSearch(e);
    setLocationChosen(false);
  }

  return (
    <div className='flex flex-col'>
      <h3>Where are you?</h3>
      <div className='flex justify-between relative w-full'>
        <input required className='border-2 h-10 text-xl' placeholder='Location' key={'inputBox'} onChange={(e) => onSearchChange(e.target.value)} type="text" name="" id="" value={townSearch} />
        {isGeoLocationLoading && <div className='absolute right-2 top-2'><Spinner /></div>}
      </div>
      {!isLocationChosen && townSearch &&
        <div className='relative w-full'>
          <ul className='absolute left-0 w-full rounded-md border-1-black margin-0 padding-0'>
            < li onClick={() => onGetUserLocation()} className='border-2 bg-slate-200 h-10 text-xl cursor-pointer border-2 rounded-sm border-slate-300'>Min posisjon</li>
            {geoLocationSearchItems &&
              geoLocationSearchItems.map((item: GoogleMapsAutoSearchMappedData, index) => {
                return <li key={index} className='relative p-2 border-2 bg-slate-200 text-xl cursor-pointer border-2 rounded-sm border-slate-300' onClick={(e) => setLocationAndClearList(e.currentTarget.innerHTML)}>{item.place}</li>
              })
            }
          </ul>
        </div>
      }
    </div>

  )
}
