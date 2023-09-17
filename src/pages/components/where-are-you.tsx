import React, { useEffect, useState } from "react";

import { Spinner } from "../../ui-kit/spinner/spinner";
import { GoogleMapsAutoSearchMappedData } from "../api/google-maps/auto-search/mapper/gmaps-auto-search-mapper";
import { Text } from "../../ui-kit/components/text";
import { useFetchGoogleMapsSearches } from "../hooks/use-google-maps-auto-search";
import { ConditionalPresenter } from "../../ui-kit/conditional-presenter/conditional-presenter";

interface WhereAreYouProps {
  locationRef: React.MutableRefObject<HTMLInputElement>;
  setTownId: (id: string) => void;
}

export default function WhereAreYou({
  locationRef,
  setTownId,
}: WhereAreYouProps) {
  const [townSearch, setTownSearch] = useState("");
  const [isLocationChosen, setLocationChosen] = useState(false);
  const [geoLocationSearchItems, setGeoLocationSearchItems] = useState([]);

  const { data, error, isLoading } = useFetchGoogleMapsSearches(townSearch);

  const setLocationAndClearList = ({ value, id }) => {
    setTownSearch(value);
    setTownId(id);
    setLocationChosen(true);
    setGeoLocationSearchItems([]);
  };

  const onSearchChange = (e) => {
    setTownSearch(e);
    setLocationChosen(false);
  };

  return (
    <section id="where_are_you_seciton">
      <div className="flex flex-col pr-2 text-center">
        <Text variant="subtitle-small">Where do you want to travel from?</Text>
        <div className="flex justify-between relative w-full">
          <input
            ref={locationRef}
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
          {isLoading && (
            <div className="absolute right-2 top-2">
              <Spinner />
            </div>
          )}
        </div>
        <ConditionalPresenter
          data={data}
          error={error}
          isLoading={false}
          renderData={(data) => {
            const { items } = data;

            return (
              <div className="relative w-full z-10">
                <ul className="absolute left-0 w-full rounded-md border-1-black margin-0 padding-0">
                  {items &&
                    !isLocationChosen &&
                    items.map((item: GoogleMapsAutoSearchMappedData, index) => {
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
                    })}
                </ul>
              </div>
            );
          }}
        />
      </div>
    </section>
  );
}
