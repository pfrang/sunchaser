"use client";
import { useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import Image from "next/image";
import { useSearchParamsToObject } from "app/hooks/use-search-params";
import { useUpdateUrl } from "app/hooks/use-update-url";
import { useUserLocation } from "app/hooks/use-user-location";
import { fetchTownDetails } from "app/hooks/fetch-town-details";
import { useIsFilterOpen } from "states/states";
import { endOfDay } from "date-fns";
import { SunchaserLogo } from "ui-kit/logo/logo";
import { useMapInstance } from "states/sunchaser-result";

import { Search } from "./search";
import { CalendarWrapper } from "./calendar-wrapper";
import { SliderWrapper } from "./slider";

export interface FormShape {
  townSearch: string;
  townId: string | null;
  calendar: Date;
  distance: string;
}

export const RightButtonsWrapper = () => {
  const { isFilterOpen, setIsFilterOpen } = useIsFilterOpen();
  const { mapInstance } = useMapInstance();

  useEffect(() => {
    if (!isFilterOpen) {
      mapInstance?.removeCircularMap();
    }
  }, [isFilterOpen]);

  const searchParams = useSearchParamsToObject();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const initialValues: FormShape = {
    townSearch: searchParams?.location || "",
    townId: null,
    calendar: searchParams?.date
      ? new Date(searchParams?.date as string)
      : new Date(),
    distance: searchParams?.distance || "50",
  };

  const { userLocation } = useUserLocation();
  const updateUrl = useUpdateUrl();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);
        if (
          values.townSearch === "Min lokasjon" &&
          userLocation?.latitude &&
          userLocation?.longitude
        ) {
          updateUrl({
            lat: userLocation.latitude,
            lon: userLocation.longitude,
            distance: Number(values.distance),
            date: endOfDay(values.calendar).toISOString().split("T")[0],
            location: "Min lokasjon",
          });
        } else {
          const response = await fetchTownDetails(values.townId);

          updateUrl({
            lat: response?.latitude,
            lon: response?.longitude,
            distance: Number(values.distance),
            date: endOfDay(values.calendar).toISOString().split("T")[0],
            location: values.townSearch,
          });
        }
        setSubmitting(false);
        setIsFilterOpen(false);
      }}
    >
      {({ values, isSubmitting, setFieldValue }) => {
        useEffect(() => {
          const handleClickOutside = (event) => {
            if (
              wrapperRef.current &&
              !wrapperRef.current.contains(event.target)
            ) {
              setIsFilterOpen(false);
            }
          };

          document.addEventListener("mousedown", handleClickOutside);
          document.addEventListener("touchstart", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
          };
        }, [isFilterOpen]);

        return (
          <Form className="relative w-full">
            <div
              ref={wrapperRef}
              className={`relative ml-auto flex flex-col content-center gap-4 transition-width duration-300 ease-in-out
        ${isFilterOpen ? "w-full sm:w-[350px] md:w-[500px]" : "w-[52px]"}
      `}
            >
              {!isFilterOpen ? (
                <Wrapper>
                  <div className="flex w-full justify-center rounded-inherit bg-white">
                    <Image
                      // sizes="(max-width: 800px) 100px, 50px"
                      height={36}
                      width={36}
                      onClick={() => setIsFilterOpen(true)}
                      alt="Logo"
                      src={"/logo.svg"}
                    />
                  </div>
                </Wrapper>
              ) : (
                <>
                  <Wrapper>
                    <Search />
                  </Wrapper>
                  <Wrapper>
                    <CalendarWrapper />
                  </Wrapper>
                  <Wrapper>
                    <SliderWrapper />
                  </Wrapper>
                  <div className="flex w-full justify-center">
                    <button
                      disabled={isSubmitting}
                      type="submit"
                      className="flex w-fit gap-2 rounded-[36px] bg-greens-400  text-white"
                    >
                      <div className="flex items-center justify-between p-4">
                        <SunchaserLogo fill={"white"} />
                        <p className="pl-4">Chase the sun</p>
                      </div>
                    </button>
                  </div>
                </>
              )}
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

const Wrapper = ({ children }) => {
  return (
    <div
      className={`relative flex h-[52px] cursor-pointer rounded-[16px] shadow-lg`}
    >
      {children}
    </div>
  );
};
