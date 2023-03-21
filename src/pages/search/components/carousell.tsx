import { Swiper, SwiperSlide } from "swiper/react";
import {
  Pagination,
  Navigation,
  Scrollbar,
  Mousewheel,
  Keyboard,
  FreeMode,
} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";

import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";
import { WeatherIconList } from "../../../ui-kit/weather-svg-ref/weather-icon-list";
import { theme } from "../../../ui-kit/theme/theme";

import { Card } from "./card";
import { HighlightedCard } from "./highlighted-card";

// SwiperCore.use([Keyboard, Mousewheel]);

interface CarousellProps {
  items: AzureFunctionCoordinatesMappedItems[];
  setZoomAndHighlightCard: (
    item: AzureFunctionCoordinatesMappedItems,
    bool: boolean
  ) => void;
  highlightedCard: AzureFunctionCoordinatesMappedItems;
}

export const Carousell = ({
  items,
  setZoomAndHighlightCard,
  highlightedCard,
}: CarousellProps) => {
  return (
    <div
      style={{ height: "100%", width: "100%", backgroundColor: theme.white }}
    >
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
        freeMode={{ enabled: true, momentum: false }}
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
        style={{ height: "100%" }}
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
                  setZoomAndHighlightCard={setZoomAndHighlightCard}
                  index={idx}
                  item={item}
                />
              }
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
