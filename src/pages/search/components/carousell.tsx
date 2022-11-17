import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/bundle";

import { SmallCard } from "./small-card";

export const Carousell = ({ items, swapItems }) => {
  return (
    <div className="h-[120px] tablet:h-[170px] phone:h-[120px]">
      <Swiper
        breakpoints={{
          480: {
            width: 480,
            slidesPerView: 2,
          },
          800: {
            width: 800,
            slidesPerView: 3,
          },
        }}
        slidesPerView={1}
        spaceBetween={30}
        slidesPerGroup={3}
        loop={true}
        loopFillGroupWithBlank={false}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        <>
          {items.map((item, idx) => {
            return (
              <SwiperSlide onClick={() => swapItems(item)}>
                {<SmallCard key={`card ${idx}`} {...item} />}
              </SwiperSlide>
            );
          })}
        </>
      </Swiper>
    </div>
  );
};
