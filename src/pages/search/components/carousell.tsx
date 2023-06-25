import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { Navigation, Scrollbar, Mousewheel, Keyboard, FreeMode } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";

import {
  AzureFunctionCoordinatesMappedItems,
  UserLocation,
} from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { Flex } from "../../../ui-kit/components/flex";

import { Card } from "./card";

// SwiperCore.use([Keyboard, Mousewheel]);

interface CarousellProps {
  items: AzureFunctionCoordinatesMappedItems[];
  setZoomAndHighlightCard: (
    item: AzureFunctionCoordinatesMappedItems,
    bool: boolean
  ) => void;
  highlightedCard: AzureFunctionCoordinatesMappedItems;
  userLocation: UserLocation;
}

export const Carousell = ({
  items,
  userLocation,
  setZoomAndHighlightCard,
  highlightedCard,
}: CarousellProps) => {
  return (
    <Flex height={"100%"}>
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
        id="swiper-container"
        autoHeight
        freeMode={{ enabled: true, momentum: true }}
        // mousewheel={{
        //   sensitivity: 10,

        // }}
        keyboard={{
          enabled: true,
          onlyInViewport: false,
        }}
        mousewheel
        direction="vertical"
        slidesPerView="auto"
        // spaceBetween={30}
        // pagination={{ clickable: true }}
        style={{ width: "100%" }}
        scrollbar={{
          enabled: true,
          draggable: true,
          dragSize: 98,
          hide: false,
        }}
        allowTouchMove
        // onClick={(e) => {
        //   console.log(e.el);
        // }}
        // slidesPerGroup={3}
        // loop={true}
        // loopFillGroupWithBlank={false}
        // pagination={{
        //   clickable: true,
        // }}
        // navigation={true}
        modules={[Navigation, Scrollbar, Mousewheel, Keyboard, FreeMode]}
      >
        {items.map((item, idx) => {
          const isHighlighted = item === highlightedCard;
          return (
            <SwiperSlide key={`card-${idx}`}>
              {
                <Card
                  isHighlighted={isHighlighted}
                  userLocation={userLocation}
                  setZoomAndHighlightCard={setZoomAndHighlightCard}
                  index={idx}
                  item={item}
                />
              }
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Flex>
  );
};
