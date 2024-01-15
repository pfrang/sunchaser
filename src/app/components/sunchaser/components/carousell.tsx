"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import {
  AzureFunctionCoordinatesMappedItems,
  Times,
} from "app/api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

import { CarousellDetails } from "./carousell-details";

export const Carousell = ({
  item,
}: {
  item: AzureFunctionCoordinatesMappedItems;
}) => {
  const days = item.times.reduce((acc, item) => {
    const date = item.date.toString().split("T")[0]; // Extract the date part
    if (!acc[date]) {
      acc[date] = []; // Initialize the array if it doesn't exist
    }
    acc[date].push(item); // Add the item to the array
    return acc;
  }, {});

  return (
    <>
      <Swiper
        // onSwiper={(swiper) => (swiperRef.current = swiper)}
        // breakpoints={{
        //   480: {
        //     width: 480,
        //     slidesPerView: 2,
        //     slidesPerGroup: 2,
        //   },
        //   1100: {
        //     width: 1100,
        //     slidesPerView: 3,
        //     slidesPerGroup: 3,
        //   },
        // }}

        autoHeight
        // freeMode={{ enabled: true, momentum: true }}
        // mousewheel={{
        //   sensitivity: 10,

        // }}
        // keyboard={{ // Requires Keyboard to be added to module
        //   enabled: true,
        //   onlyInViewport: false,
        // }}
        // mousewheel // Requires Mousewheel to be added to module
        // slidesPerView={1}
        direction="horizontal"
        slidesPerView="auto"
        spaceBetween={30}
        // touchStartPreventDefault={false} // To allow horizontal scroll on iOS
        pagination={{ clickable: true, el: ".swiper-pagination-custom" }}
        style={{ width: "100%" }}
        // allowTouchMove
        // onClick={(e) => {
        //   console.log(e.el);
        // }}
        // slidesPerGroup={3}
        // loop={true}
        // navigation={true} // Requires Navigation to be added to module
        modules={[Pagination]}
      >
        <div
          key={item.index}
          className="flex w-full items-center justify-between rounded-[36px] border-2 border-blues-200 shadow-custom-inner"
        >
          <>
            {Object.keys(days).map((day, index) => {
              const times: Times[] = days[day];

              return (
                <SwiperSlide key={day + index}>
                  <div className="w-full justify-center">
                    <p className="text-variant-regular text-center text-white">
                      {day}
                    </p>
                  </div>

                  <div className="items-center justify-between rounded-[36px] border-2 border-blues-200 p-2">
                    <CarousellDetails times={times} />
                  </div>
                </SwiperSlide>
              );
            })}
          </>
        </div>
        <div className="flex w-full items-center justify-center pt-2">
          <div className="swiper-pagination-custom flex justify-center"></div>
        </div>
      </Swiper>
    </>
  );
};
