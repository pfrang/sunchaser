import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Scrollbar,
  Mousewheel,
  Keyboard,
  FreeMode,
  Pagination,
} from "swiper/modules";

import {
  AzureFunctionCoordinatesMappedItems,
  Times,
} from "../../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { theme } from "../../../../ui-kit/theme";
import { Flex } from "../../../../ui-kit/flex";
import { Text } from "../../../../ui-kit/text";

import { Carousell2Details } from "./carousell2-details";

export const Carousell2 = ({
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
        // keyboard={{
        //   enabled: true,
        //   onlyInViewport: false,
        // }}
        // mousewheel
        direction="horizontal"
        // slidesPerView="auto"
        // spaceBetween={30}
        pagination={{ clickable: true, el: ".swiper-pagination-custom" }}
        style={{ width: "100%" }}
        allowTouchMove
        // onClick={(e) => {
        //   console.log(e.el);
        // }}
        // slidesPerGroup={3}
        // loop={true}
        // navigation={true}
        modules={[Navigation, Mousewheel, Keyboard, Pagination]}
      >
        <Flex
          borderColor={theme.color.blues[2]}
          borderRadius={36}
          borderWidth={2}
          key={item.index}
          justifyContent={"space-between"}
          alignItems={"center"}
          boxShadow={" 0px 6px 10px rgba(0, 0, 0, 0.2)"}
        >
          <>
            {Object.keys(days).map((day, index) => {
              const times: Times[] = days[day];

              return (
                <SwiperSlide key={day + index}>
                  <Flex justifyContent={"center"}>
                    <Text color="white">{day}</Text>
                  </Flex>
                  <Flex
                    justifyContent={"space-between"}
                    alignItems={"center"}
                    width={"100%"}
                    borderColor={theme.color.blues[2]}
                    padding={[2]}
                    borderRadius={36}
                    borderWidth={2}
                  >
                    <Carousell2Details times={times} />
                  </Flex>
                </SwiperSlide>
              );
            })}
          </>
        </Flex>
        <Flex paddingTop={2} alignItems={"center"} justifyContent={"center"}>
          <div className="flex justify-center swiper-pagination-custom"></div>
        </Flex>
      </Swiper>
    </>
  );
};