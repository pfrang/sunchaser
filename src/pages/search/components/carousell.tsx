import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";

import { SmallCard } from "./small-card";

export const Carousell = ({ items, setHighlightedCard, highlightedCard }) => {
  return (
    <div className="relative h-[120px] tablet:h-[170px] phone:h-[120px]">
      <Swiper
        breakpoints={{
          480: {
            width: 480,
            slidesPerView: 2,
            slidesPerGroup: 2,
          },
          1100: {
            width: 1100,
            slidesPerView: 3,
            slidesPerGroup: 3,
          },
        }}
        slidesPerView={1}
        spaceBetween={30}
        slidesPerGroup={1}
        loop={true}
        loopFillGroupWithBlank={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {items.map((item, idx) => {
          return (
            <SwiperSlide
              key={`card ${idx}`}
              onClick={() => setHighlightedCard(item)}
            >
              {<SmallCard highlightedCard={highlightedCard} item={item} />}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};
