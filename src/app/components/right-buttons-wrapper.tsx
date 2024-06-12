"use client";
import { useState, useRef, useEffect } from "react";
import { Formik, Form } from "formik";
import { useSearchParamsToObject } from "app/hooks/use-search-params";
import { useUpdateUrl } from "app/hooks/use-update-url";
import { useUserLocation } from "app/hooks/use-user-location";
import { fetchTownDetails } from "app/hooks/fetch-town-details";
import { sanitizeNextParams } from "app/utils/sanitize-next-query";
import { useRouter } from "next/navigation";

import { Search } from "./_shared/search";
import { CalendarWrapper } from "./sunchaser/components/calendar-wrapper";
import { ChooseTravelDistance } from "./_shared/choose-travel-distance";

export interface FormShape {
  townSearch: string;
  townId: string | null;
  calendar: Date;
  distance: string;
}

export const RightButtonsWrapper = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const searchParams = useSearchParamsToObject();
  const wrapperRef = useRef<HTMLDivElement>(null);

  const initialValues: FormShape = {
    townSearch: searchParams?.location || "",
    townId: null,
    calendar:
      new Date(searchParams?.date as string) ||
      new Date().toISOString().split("T")[0],
    distance: searchParams?.distance || "50",
  };

  const router = useRouter();

  const { userLocation } = useUserLocation();
  const updateUrl = useUpdateUrl();
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={async (values, { setSubmitting }) => {
        setSubmitting(true);

        if (
          values.townSearch === "mylocation" &&
          userLocation?.latitude &&
          userLocation?.longitude
        ) {
          const urlParams = sanitizeNextParams({
            ...searchParams,
            lat: userLocation.latitude,
            lon: userLocation.longitude,
            location: "",
          });
          setIsExpanded(false);
          router.push(`/?${urlParams}`);
          return;
        } else {
          const response = await fetchTownDetails(values.townId);

          updateUrl({
            lat: response?.latitude,
            lon: response?.longitude,
            // location: locationRef?.current?.value.split(",")[0], // TODO maybe fix if we want location to pre-populated
          });
        }
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, setFieldValue }) => {
        useEffect(() => {
          const handleClickOutside = (event) => {
            if (
              wrapperRef.current &&
              !wrapperRef.current.contains(event.target)
            ) {
              setIsExpanded(false);
              setFieldValue("townSearch", "");
            }
          };

          document.addEventListener("mousedown", handleClickOutside);
          document.addEventListener("touchstart", handleClickOutside);
          return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("touchstart", handleClickOutside);
          };
        }, [isExpanded]);
        return (
          <Form>
            <div
              ref={wrapperRef}
              className={`relative left-[2px] top-2 flex flex-col content-center gap-4 transition-width duration-300 ease-in-out
        ${isExpanded ? "w-[250px] sm:w-[350px] md:w-[500px]" : "w-[52px]"}
      `}
            >
              <Wrapper>
                <Search isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
              </Wrapper>
              <Wrapper>
                <CalendarWrapper isExpanded={isExpanded} />
              </Wrapper>
              <Wrapper>
                <ChooseTravelDistance
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                />
              </Wrapper>
            </div>
            {/* <Wrapper>
              {isExpanded && (
                <button
                  type="submit"
                  className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
                >
                  Submit
                </button>
              )}
            </Wrapper> */}
          </Form>
        );
      }}
    </Formik>
  );
};

const Wrapper = ({ children }) => {
  return (
    <div className="relative h-[52px] rounded-[16px] bg-white shadow-lg">
      {children}
    </div>
  );
};
