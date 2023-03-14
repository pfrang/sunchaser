import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import {
  Pagination,
  Navigation,
  Scrollbar,
  Mousewheel,
  Keyboard,
} from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";
import { useEffect, useState } from "react";

import { AzureFunctionCoordinatesMappedItems } from "../../api/azure-function/coordinates/coordinates-api-client/coordinates-api-response-schema";

import { SmallCard } from "./small-card";

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
  const [showScrollbar, setShowScrollbar] = useState(false);

  return (
    <div>
      <Swiper
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
        freeMode={true}
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
        scrollbar={{
          enabled: true,
          draggable: true,
          dragSize: 98,
          hide: !showScrollbar,
        }}
        style={{
          height: "500px",
          width: "100%",
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
        modules={[Navigation, Scrollbar, Mousewheel, Keyboard]}
      >
        {items.map((item, idx) => {
          return (
            <SwiperSlide
              key={`card ${idx}`}
              onClick={() => setZoomAndHighlightCard(item, true)}
            >
              {<SmallCard highlightedCard={highlightedCard} item={item} />}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
