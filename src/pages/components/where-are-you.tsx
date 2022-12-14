import React, { useEffect, useState } from "react";
import useSWR from "swr";

import { Spinner } from "../../ui-kit/spinner/spinner";
import { fetcher } from "../api/common-swr-fetcher-with-params";
import { gmapsAutoSearchUrl } from "../api/google-maps/auto-search/index.endpoint";
import { GoogleMapsAutoSearchMappedData } from "../api/google-maps/auto-search/mapper/gmaps-auto-search-mapper";

export default function WhereAreYou({
  isLocationChosen,
  setTownId,
  setLocationChosen,
  townSearch,
  setTownSearch,
  setUserGeoLocation,
}) {
  const [geoLocationSearchItems, setGeoLocationSearchItems] = useState([]);
  const [isGeoLocationLoading, setIsGeoLocationLoading] = useState(false);

  const { data, error } = useSWR(
    townSearch ? [gmapsAutoSearchUrl, { input: townSearch }] : null,
    fetcher
  );

  useEffect(() => {
    if (!townSearch) return;
    if (!data && !error) {
      setIsGeoLocationLoading(true);
      return;
    }
    setIsGeoLocationLoading(false);
    setGeoLocationSearchItems(data.items);
  }, [data, error, townSearch]);

  const getCurrentPos = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;
      setTownSearch(`Min posisjon`);
      setUserGeoLocation(`lat=${crd.latitude}&lon=${crd.longitude}`);
      return crd;
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const onGetUserLocation = async () => {
    const pos = getCurrentPos();
    setLocationChosen(true);
  };

  const setLocationAndClearList = ({ value, id }) => {
    setTownSearch(value);
    setTownId(id);
    setLocationChosen(true);
    setUserGeoLocation(``);
    setGeoLocationSearchItems([]);
  };

  const onSearchChange = (e) => {
    setTownSearch(e);
    setLocationChosen(false);
  };

  return (
    <section id="where_are_you_seciton">
      <div className="flex flex-col pr-2">
        <label>Where are you?</label>
        <div className="flex justify-between relative w-full">
          <input
            required
            className="pl-2 w-full border-2 h-10 text-xl"
            placeholder="Location"
            key={"inputBox"}
            onChange={(e) => onSearchChange(e.target.value)}
            type="text"
            name=""
            id=""
            value={townSearch}
          />
          {isGeoLocationLoading && (
            <div className="absolute right-2 top-2">
              <Spinner />
            </div>
          )}
        </div>
        {!isLocationChosen && townSearch && (
          <div className="relative w-full z-10">
            <ul className="absolute left-0 w-full rounded-md border-1-black margin-0 padding-0">
              <li
                onClick={() => onGetUserLocation()}
                className="border-2 bg-slate-200 h-10 text-xl cursor-pointer border-2 rounded-sm border-slate-300"
              >
                Min posisjon
              </li>
              {geoLocationSearchItems &&
                geoLocationSearchItems.map(
                  (item: GoogleMapsAutoSearchMappedData, index) => {
                    return (
                      <li
                        key={index}
                        id={item.place_id}
                        className="relative p-2 border-2 bg-slate-200 text-xl cursor-pointer border-2 rounded-sm border-slate-300"
                        onClick={(e) =>
                          setLocationAndClearList({
                            value: e.currentTarget.innerHTML,
                            id: e.currentTarget.id,
                          })
                        }
                      >
                        {item.place}
                      </li>
                    );
                  }
                )}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
}
